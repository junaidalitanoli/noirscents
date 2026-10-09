"use client";

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Product } from "../lib/products";
import { STORE_CONFIG, getDirectWhatsAppUrl } from "../lib/config";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}: CartDrawerProps) {
  const [orderNotes, setOrderNotes] = useState("");

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let itemsText = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.title}*\n   Qty: ${it.quantity} | Price: ${it.product.formattedPrice}`
      )
      .join("\n\n");

    const message =
      `*🛍️ NEW ORDER INQUIRY - HOUSE OF SAHARÉ*\n` +
      `------------------------------------------\n` +
      `${itemsText}\n\n` +
      `------------------------------------------\n` +
      `*Subtotal:* Rs.${subtotal.toLocaleString()}\n` +
      `*Delivery:* FREE Nationwide Delivery 🇵🇰\n` +
      `*Gift:* FREE 3ml Extrait de Parfum Tester Included\n` +
      (orderNotes.trim() ? `*Customer Note:* ${orderNotes}\n` : "") +
      `------------------------------------------\n` +
      `Hi! I would like to confirm my order. Please share delivery time & Cash on Delivery confirmation.`;

    const targetUrl = getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, message);

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-out drawer */}
      <aside className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-drawer-right border-l border-neutral-200">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-neutral-900" />
            <h2 className="text-sm tracking-[0.2em] uppercase font-semibold text-neutral-900">
              Shopping Cart ({totalQuantity})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Promo Bar */}
        <div className="bg-[#FAF8F5] border-b border-neutral-200/80 px-6 py-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-800 font-medium">
            <Truck size={15} className="text-emerald-700 shrink-0" />
            <span>
              <strong>Unlocked:</strong> Free Delivery & Free 3ml Luxury Perfume Sample!
            </span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-neutral-900 h-full w-full rounded-full transition-all duration-500" />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-500">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                <ShoppingBag size={28} />
              </div>
              <p className="text-sm tracking-wider uppercase font-medium text-neutral-800">
                Your cart is empty
              </p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our signature collection of luxury extrait de parfum and discover your scent.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-[0.18em] font-medium rounded hover:bg-neutral-800 transition-colors"
              >
                Explore Fragrances
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 pb-5 border-b border-neutral-100 last:border-0"
              >
                {/* Product Image */}
                <div className="w-20 h-24 bg-neutral-100 rounded overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 line-clamp-1">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {item.product.volume}
                    </p>
                    <p className="text-xs font-semibold text-neutral-900 mt-1.5">
                      {item.product.formattedPrice}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 transition-colors text-xs"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold text-neutral-900 min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 transition-colors text-xs"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="text-xs text-neutral-500">
                      Total: Rs.{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions when cart has items */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-neutral-200 bg-white space-y-4 shrink-0">
            {/* Special Instructions Note */}
            <div>
              <label
                htmlFor="order-notes"
                className="text-[11px] uppercase tracking-wider font-semibold text-neutral-700 block mb-1"
              >
                Special Instructions / Gift Message
              </label>
              <input
                id="order-notes"
                type="text"
                placeholder="e.g. Please pack in luxury gift box"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-800"
              />
            </div>

            {/* Subtotal */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-xs text-neutral-600">
                <span>Shipping</span>
                <span className="text-emerald-700 font-medium">FREE Nationwide</span>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-600">
                <span>Complimentary Tester</span>
                <span className="text-neutral-900 font-medium">Free 3ml Extrait</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200">
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-900">
                  Estimated Total
                </span>
                <span className="text-base font-bold text-neutral-950">
                  Rs.{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={onOpenCheckout}
                className="w-full min-h-[46px] bg-neutral-950 hover:bg-neutral-800 text-white rounded py-3 px-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                <span>Checkout (Cash On Delivery)</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full min-h-[44px] bg-[#25D366] hover:bg-[#20ba59] text-white rounded py-2.5 px-4 text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                <ShoppingBag size={15} />
                <span>Quick Order via WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>100% Original Niche Extrait de Parfum Guaranteed</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
