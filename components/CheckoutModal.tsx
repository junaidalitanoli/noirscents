"use client";

import React, { useState } from "react";
import { X, Send, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { SelectedProductInfo } from "./ProductCard";
import { STORE_CONFIG, getDirectWhatsAppUrl } from "../lib/config";

interface ModalProps {
  product: SelectedProductInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ product, isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    quantity: "1",
  });

  if (!isOpen || !product) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean, structured order summary for WhatsApp
    const orderMessage =
      `*📦 NEW ORDER CONFIRMED (${STORE_CONFIG.storeName})*\n` +
      `--------------------------------\n` +
      `*Product:* ${product.title}\n` +
      `*Category:* ${product.category}\n` +
      `*Quantity:* ${formData.quantity}\n` +
      `*Price:* ${product.price}\n` +
      `--------------------------------\n` +
      `*Customer Details:*\n` +
      `• Name: ${formData.name}\n` +
      `• Contact: ${formData.phone}\n` +
      `• City: ${formData.city}\n` +
      `• Delivery Address: ${formData.address}\n` +
      `• Payment: Cash on Delivery (COD)\n` +
      `--------------------------------\n` +
      `Kindly confirm my order and share delivery dispatch tracking details.`;

    // 1. Send Order Email Notification to junaidalitanoli23@gmail.com in the background
    try {
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          productTitle: product.title,
          productPrice: product.price,
          category: product.category,
          quantity: formData.quantity,
        }),
      }).catch((err) => console.error("Order notification request error:", err));
    } catch (err) {
      console.error("Order dispatch error:", err);
    }

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const targetUrl = getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, orderMessage);

    if (isMobile) {
      // Direct navigation on mobile launches native WhatsApp app immediately without popup blockers
      window.location.href = targetUrl;
    } else {
      // Desktop opens WhatsApp Web chat directly with message prefilled
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-950 text-white px-5 sm:px-6 py-4 flex justify-between items-center border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
              <ShoppingBag size={16} className="text-[#C2A676]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-medium tracking-wide">
                Direct WhatsApp Checkout
              </h2>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase">
                Instant Order to WhatsApp ({STORE_CONFIG.whatsappNumber})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Selected Product Thumbnail & Info */}
        <div className="bg-stone-100/90 px-5 sm:px-6 py-3.5 border-b border-stone-200 flex items-center gap-3.5 shrink-0">
          <div className="w-14 h-16 rounded-md overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[#C2A676] font-semibold block">
              {product.category}
            </span>
            <h4 className="text-sm font-serif font-semibold text-stone-900 truncate">
              {product.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-stone-950">
                {product.price}
              </span>
              <span className="text-[10px] text-stone-600 font-medium bg-white px-2 py-0.5 rounded border border-stone-200">
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Fast Customer Order Form */}
        <form
          onSubmit={handleConfirmOrder}
          className="p-5 sm:p-6 space-y-3.5 overflow-y-auto flex-1 overscroll-contain"
        >
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Your Full Name *
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="e.g. Junaid Ali"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition bg-white"
            />
          </div>

          {/* Contact & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                WhatsApp / Phone *
              </label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Delivery City *
              </label>
              <input
                required
                type="text"
                name="city"
                placeholder="Karachi, Lahore, Islamabad..."
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition bg-white"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Quantity
            </label>
            <select
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
            >
              <option value="1">1 Bottle</option>
              <option value="2">2 Bottles (Bundle Offer)</option>
              <option value="3">3 Bottles (Family Pack)</option>
            </select>
          </div>

          {/* Complete Delivery Address */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Complete Delivery Address *
            </label>
            <textarea
              required
              rows={2}
              name="address"
              placeholder="House #, Street name, Area / Landmark..."
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition bg-white"
            />
          </div>

          {/* Security & Guarantees Strip */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3 flex items-center justify-between text-[11px] text-stone-600">
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#C2A676] shrink-0" />
              <span>Free Delivery &gt; PKR 5,000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#C2A676] shrink-0" />
              <span>Cash on Delivery</span>
            </div>
          </div>

          {/* One-Click Direct Order Button */}
          <button
            type="submit"
            className="w-full min-h-[48px] bg-stone-950 hover:bg-stone-800 active:scale-[0.99] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md mt-2"
          >
            <Send size={15} className="text-[#25D366]" />
            <span>Direct Order to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}