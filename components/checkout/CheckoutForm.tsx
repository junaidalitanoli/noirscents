"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { PAKISTANI_CITIES, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/lib/constants";
import { isValidPakistaniPhone, formatPakistaniPhone, formatPrice } from "@/lib/formatters";
import { Order } from "@/types";

const IDEMPOTENCY_STORAGE_KEY = "ns_checkout_idempotency_key";

function getStoredIdempotencyKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const key = sessionStorage.getItem(IDEMPOTENCY_STORAGE_KEY);
    if (key && /^[A-Za-z0-9_-]{10,100}$/.test(key)) {
      return key;
    }
  } catch {
    // Ignore sessionStorage errors
  }
  return null;
}

function setStoredIdempotencyKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(IDEMPOTENCY_STORAGE_KEY, key);
  } catch {
    // Ignore sessionStorage errors
  }
}

function clearStoredIdempotencyKey(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(IDEMPOTENCY_STORAGE_KEY);
  } catch {
    // Ignore sessionStorage errors
  }
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const idempotencyKeyRef = useRef<string>("");

  const getOrCreateIdempotencyKey = () => {
    if (idempotencyKeyRef.current && /^[A-Za-z0-9_-]{10,100}$/.test(idempotencyKeyRef.current)) {
      return idempotencyKeyRef.current;
    }
    const stored = getStoredIdempotencyKey();
    if (stored) {
      idempotencyKeyRef.current = stored;
      return stored;
    }
    const newKey = `ns_chk_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    idempotencyKeyRef.current = newKey;
    setStoredIdempotencyKey(newKey);
    return newKey;
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Lahore",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full recipient name (min. 3 letters)";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone / WhatsApp number is required for delivery confirmation";
    } else if (!isValidPakistaniPhone(formData.phone)) {
      newErrors.phone = "Enter a valid Pakistani mobile number (e.g. 0300-1234567 or 03001234567)";
    }

    if (!formData.address.trim() || formData.address.trim().length < 8) {
      newErrors.address = "Please provide complete street address with house/flat # and area";
    }

    if (!formData.city) {
      newErrors.city = "Please select your city for courier routing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your shopping bag is empty. Please add items before checking out.");
      router.push("/");
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    // Client idempotency key: preserved across retries and refreshes until order succeeds
    const idempotencyKey = getOrCreateIdempotencyKey();
    // Temporary client ID used strictly as a client-side fallback if server response omits orderId
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const clientTempOrderId = `NS-${randomDigits}`;

    const newOrder: Order = {
      id: clientTempOrderId,
      customer: {
        fullName: formData.fullName.trim(),
        phone: formatPakistaniPhone(formData.phone),
        email: formData.email.trim() || undefined,
        address: formData.address.trim(),
        city: formData.city,
        notes: formData.notes.trim() || undefined,
      },
      items: [...items],
      subtotal,
      shippingFee,
      total,
      status: "Pending",
      paymentMethod: "Cash on Delivery",
      createdAt: new Date().toISOString(),
      idempotencyKey,
    };

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder, idempotencyKey }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order validation failed on server. Please check your details.");
      }

      if (data.success === false && !data.simulated) {
        throw new Error(data.error || "Order processing failed. Please contact WhatsApp support.");
      }

      // Authoritative server-confirmed order ID and figures
      const confirmedOrderId = typeof data.orderId === "string" ? data.orderId : clientTempOrderId;
      const verifiedOrder: Order = {
        ...newOrder,
        id: confirmedOrderId,
        subtotal: typeof data.subtotal === "number" ? data.subtotal : newOrder.subtotal,
        shippingFee: typeof data.shippingFee === "number" ? data.shippingFee : newOrder.shippingFee,
        total: typeof data.total === "number" ? data.total : newOrder.total,
      };

      addOrder(verifiedOrder);
      clearCart();

      // Clear idempotency key on successful order so subsequent distinct checkouts get a fresh key
      clearStoredIdempotencyKey();
      idempotencyKeyRef.current = "";

      // Redirect to Order Confirmation page with server-confirmed order ID
      router.push(`/order-success/${confirmedOrderId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to place your order. Please try again.";
      console.error("[Checkout] Order processing error:", msg);
      setSubmitError(msg);
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Order Submission Notice</strong>
            <span>{submitError}</span>
          </div>
        </div>
      )}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              Delivery Information
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Enter your shipping details for doorstep courier delivery across Pakistan.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-bit Encrypted
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Muhammad Usman / Fatima Noor"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: "" });
            }}
            className={`w-full text-sm bg-white border rounded-xl p-3 focus:outline-hidden transition-all text-zinc-900 ${
              errors.fullName
                ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                : "border-zinc-300 focus:border-[#d4af37]"
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="0300-1234567"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              className={`w-full text-sm bg-white border rounded-xl p-3 focus:outline-hidden transition-all text-zinc-900 ${
                errors.phone
                  ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                  : "border-zinc-300 focus:border-[#d4af37]"
              }`}
            />
            {errors.phone ? (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </p>
            ) : (
              <p className="text-[11px] text-zinc-500 mt-1">
                Courier rider calls this number before dispatch.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
              Email Address <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-sm bg-white border border-zinc-300 rounded-xl p-3 focus:outline-hidden focus:border-[#d4af37] text-zinc-900"
            />
            <p className="text-[11px] text-zinc-500 mt-1">For digital receipt and tracking alerts.</p>
          </div>
        </div>

        {/* City Dropdown */}
        <div>
          <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
            Destination City <span className="text-red-500">*</span>
          </label>
          <select
            id="city"
            value={formData.city}
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
              if (errors.city) setErrors({ ...errors, city: "" });
            }}
            className="w-full text-sm bg-white border border-zinc-300 rounded-xl p-3 focus:outline-hidden focus:border-[#d4af37] text-zinc-900 font-medium"
          >
            {PAKISTANI_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
            Complete Delivery Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            rows={3}
            placeholder="House/Apartment #, Street, Phase / Block / Sector, Landmark"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              if (errors.address) setErrors({ ...errors, address: "" });
            }}
            className={`w-full text-sm bg-white border rounded-xl p-3 focus:outline-hidden transition-all text-zinc-900 ${
              errors.address
                ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                : "border-zinc-300 focus:border-[#d4af37]"
            }`}
          />
          {errors.address && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
            </p>
          )}
        </div>

        {/* Special Instructions */}
        <div>
          <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
            Order Notes / Landmark <span className="text-zinc-400 font-normal">(Optional)</span>
          </label>
          <input
            id="notes"
            type="text"
            placeholder="e.g. Near Shell pump / Deliver after 3 PM"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full text-sm bg-white border border-zinc-300 rounded-xl p-3 focus:outline-hidden focus:border-[#d4af37] text-zinc-900"
          />
        </div>

        {/* Payment Method Selector */}
        <div className="pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2">
            Payment Method
          </label>
          <div className="border-2 border-zinc-900 bg-zinc-50 rounded-xl p-4 flex items-start gap-3">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              checked
              readOnly
              className="mt-1 text-zinc-900 focus:ring-zinc-900"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="cod" className="text-sm font-bold text-zinc-900 cursor-pointer">
                  Cash On Delivery (COD)
                </label>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Most Popular
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-1">
                Pay in Pakistani Rupees (PKR) at your doorstep when the courier hands over the parcel. Zero online card risks.
              </p>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full py-4 px-6 rounded-xl font-bold text-base bg-[#09090b] text-[#fef08a] hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
              Processing Order &amp; Notifying Dispatch...
            </span>
          ) : (
            <>
              Confirm Order &bull; {formatPrice(total)} (Cash On Delivery)
              <ArrowRight className="w-5 h-5 text-[#d4af37]" />
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-zinc-500">
          By placing your order, you agree to Noir Scent shipping and return policies.
        </p>
      </div>
    </form>
  );
}
