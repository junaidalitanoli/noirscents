"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Search,
  Clock,
  Truck,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { STORE_CONFIG } from "@/lib/store-config";
import { formatPrice } from "@/lib/formatters";

interface TrackedOrder {
  id: string;
  status: "Pending" | "Shipped" | "Delivered";
  createdAt: string;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: {
    fullName: string;
    city: string;
    phone: string;
  };
  items: Array<{
    id: string;
    product: {
      id?: string;
      name?: string;
      slug?: string;
    };
    size: {
      ml: number;
      price: number;
    };
    quantity: number;
  }>;
}

export default function AccountPage() {
  const [trackOrderId, setTrackOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackError, setTrackError] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    setTrackedOrder(null);

    const cleanId = trackOrderId.trim().toUpperCase();
    if (!cleanId) {
      setTrackError("Please enter your Order ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/order/${encodeURIComponent(cleanId)}`);
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success && data?.order) {
        setTrackedOrder(data.order);
      } else {
        setTrackError("Order not found. Please verify your Order ID (e.g. NS-12345678).");
      }
    } catch (err) {
      console.error("Order tracking error:", err);
      setTrackError("Unable to retrieve order details at this time. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
      <Breadcrumbs items={[{ label: "Order Tracking" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325] dark:text-[#d4af37]">
            Order Tracking &amp; Status
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-zinc-950 dark:text-[#f4f4f5] mt-1">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Enter your authoritative Order ID to check real-time order status, items, and delivery city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Track Order Column */}
          <div className="md:col-span-7 bg-white dark:bg-[#111115] border border-zinc-200 dark:border-white/10 p-6 sm:p-8 rounded-xl shadow-xs space-y-6 transition-colors">
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label
                  htmlFor="track-order-id"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Order ID <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <input
                    id="track-order-id"
                    name="orderId"
                    type="text"
                    required
                    aria-required="true"
                    aria-describedby="track-order-hint"
                    value={trackOrderId}
                    onChange={(e) => {
                      setTrackOrderId(e.target.value);
                      if (trackError) setTrackError("");
                    }}
                    placeholder="e.g. NS-12345678"
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#18181f] border border-zinc-300 dark:border-zinc-700 rounded-md focus:border-black dark:focus:border-[#d4af37] focus:ring-2 focus:ring-black/20 dark:focus:ring-[#d4af37]/20 focus:outline-hidden transition-all uppercase font-mono text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  />
                </div>
                <span id="track-order-hint" className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-1">
                  Enter the 8-digit Order ID from your confirmation email, SMS, or receipt.
                </span>
              </div>

              {trackError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs rounded-md flex items-start gap-2 animate-fade-in"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>{trackError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#121212] hover:bg-black dark:bg-[#d4af37] dark:hover:bg-[#e5c158] text-white dark:text-[#09090b] text-xs font-semibold tracking-wider uppercase transition-colors rounded-md mt-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-[#d4af37] focus:outline-hidden flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Search className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>{loading ? "Checking Status..." : "Check Order Status"}</span>
              </button>
            </form>

            {/* Live Tracked Order Card */}
            {trackedOrder && (
              <div
                className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-fade-in"
                role="region"
                aria-live="polite"
                aria-label="Order Tracking Status Result"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                      Order Reference
                    </span>
                    <span className="font-mono text-sm font-bold text-zinc-950 dark:text-[#f4f4f5]">
                      #{trackedOrder.id}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold border ${
                      trackedOrder.status === "Delivered"
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50"
                        : trackedOrder.status === "Shipped"
                        ? "bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-700/50"
                        : "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700/50"
                    }`}
                  >
                    {trackedOrder.status === "Delivered" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {trackedOrder.status === "Shipped" && <Truck className="w-3.5 h-3.5" />}
                    {trackedOrder.status === "Pending" && <Clock className="w-3.5 h-3.5" />}
                    <span>{trackedOrder.status}</span>
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-[#16161c] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-200/60 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Placed On:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {new Date(trackedOrder.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-zinc-200/60 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Destination City:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{trackedOrder.customer.city}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-zinc-200/60 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Recipient Phone:</span>
                    <span className="font-medium font-mono text-zinc-900 dark:text-zinc-100">{trackedOrder.customer.phone}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-zinc-200/60 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Payment Method:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{trackedOrder.paymentMethod}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-zinc-500 dark:text-zinc-400 block mb-1 font-semibold uppercase text-[10px]">
                      Package Items:
                    </span>
                    <ul className="space-y-1">
                      {trackedOrder.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-zinc-800 dark:text-zinc-200">
                          <span>
                            {item.product?.name || "Extrait de Parfum"} ({item.size.ml}ml) &times; {item.quantity}
                          </span>
                          <span className="font-medium">{formatPrice(item.size.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-zinc-300 dark:border-zinc-700 font-bold text-sm text-zinc-950 dark:text-[#f4f4f5]">
                    <span>Grand Total (COD):</span>
                    <span>{formatPrice(trackedOrder.total)}</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-[#16161c] rounded-md flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Need delivery assistance?</span>
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Noir Scent, I would like an update on my order #${trackedOrder.id}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Support
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column: VIP Perks & Concierge */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-zinc-50 dark:bg-[#111115] border border-zinc-200 dark:border-white/10 p-6 rounded-xl space-y-4 text-xs transition-colors">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                Order Tracking Guidelines
              </div>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <span>Orders are confirmed via phone or WhatsApp before dispatch from our Karachi warehouse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <span>Nationwide courier delivery with Cash on Delivery across 250+ Pakistani cities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                  <span>Every order is insured and packed in our signature luxury presentation flacon boxes.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#121212] dark:bg-[#0c0c10] border border-black/10 dark:border-[#d4af37]/30 text-white p-6 rounded-xl space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#f5e7b2]">Direct Concierge</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                Have questions about your order, tracking number, or wish to modify items before dispatch?
              </p>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 bg-[#25D366] text-white font-semibold rounded-md hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
