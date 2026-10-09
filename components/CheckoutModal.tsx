"use client";

import React, { useState } from "react";
import { X, Send, ShoppingBag, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { STORE_CONFIG, getDirectWhatsAppUrl } from "../lib/config";
import { CartItem } from "./CartDrawer";
import { Product } from "../lib/products";

interface ModalProps {
  product?: Product | null;
  cartItems?: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess?: () => void;
}

export default function CheckoutModal({
  product,
  cartItems = [],
  isOpen,
  onClose,
  onOrderSuccess,
}: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });
  const [singleQty, setSingleQty] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  // Determine items and pricing
  const isCartMode = cartItems && cartItems.length > 0;

  const orderTitle = isCartMode
    ? cartItems.map((it) => `${it.product.title} (x${it.quantity})`).join(", ")
    : product?.title || "Luxury Perfume";

  const orderTotal = isCartMode
    ? cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0)
    : (product?.price || 0) * singleQty;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const itemsSummary = isCartMode
      ? cartItems
          .map(
            (it, idx) =>
              `${idx + 1}. ${it.product.title} - Qty: ${it.quantity} (Rs.${(
                it.product.price * it.quantity
              ).toLocaleString()})`
          )
          .join("\n")
      : `1. ${product?.title} - Qty: ${singleQty} (Rs.${(
          (product?.price || 0) * singleQty
        ).toLocaleString()})`;

    // WhatsApp Message
    const orderMessage =
      `*📦 NEW ORDER CONFIRMED - ${STORE_CONFIG.storeName}*\n` +
      `--------------------------------\n` +
      `*Items Ordered:*\n${itemsSummary}\n\n` +
      `*Total Amount:* Rs.${orderTotal.toLocaleString()}\n` +
      `*Payment:* Cash on Delivery (COD)\n` +
      `*Delivery:* FREE Nationwide Shipping\n` +
      `*Complimentary Gift:* Free 3ml Luxury Perfume\n` +
      `--------------------------------\n` +
      `*Customer Details:*\n` +
      `• Name: ${formData.name}\n` +
      `• Contact: ${formData.phone}\n` +
      `• City: ${formData.city}\n` +
      `• Delivery Address: ${formData.address}\n` +
      (formData.notes.trim() ? `• Instructions: ${formData.notes}\n` : "") +
      `--------------------------------\n` +
      `Please confirm order dispatch and tracking code.`;

    // 1. Send Order Email Notification via /api/order
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          productTitle: orderTitle,
          productPrice: `Rs.${orderTotal.toLocaleString()}`,
          category: isCartMode ? "Multi-Item Order" : product?.category || "Perfume",
          quantity: isCartMode ? cartItems.length.toString() : singleQty.toString(),
          notes: formData.notes,
        }),
      });
    } catch (err) {
      console.error("Order notification error:", err);
    }

    setIsSubmitting(false);
    setIsDone(true);

    // Open WhatsApp
    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const targetUrl = getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, orderMessage);

    setTimeout(() => {
      if (isMobile) {
        window.location.href = targetUrl;
      } else {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }
      if (onOrderSuccess) onOrderSuccess();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fade"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-950 text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 block font-semibold">
              HOUSE OF SAHARÉ
            </span>
            <h2 className="text-base font-serif font-medium tracking-wide">
              Complete Your Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isDone ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 size={56} className="mx-auto text-emerald-600 animate-bounce" />
            <h3 className="text-xl font-serif font-bold text-neutral-900">
              Order Received!
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>. Your order is registered. Opening WhatsApp now to share dispatch tracking and order confirmation...
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-widest rounded"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Order Summary Box */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                Order Summary
              </span>
              <p className="text-xs font-semibold text-neutral-900 line-clamp-2">
                {orderTitle}
              </p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-200 text-xs">
                <span className="text-neutral-500">Total payable (COD):</span>
                <span className="text-sm font-bold text-neutral-950">
                  Rs.{orderTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium mt-1">
                <Truck size={12} />
                <span>FREE Nationwide Delivery + Free 3ml Tester</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmOrder} className="space-y-3.5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="e.g. Ali Khan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    placeholder="e.g. Lahore / Karachi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  name="address"
                  placeholder="House/Apartment #, Street, Area/Sector..."
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  placeholder="e.g. Call before delivery"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full text-xs px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[46px] bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white rounded py-3 px-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Confirm Order (Cash on Delivery)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Pay upon delivery &bull; 100% Original Extrait Guaranteed</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}