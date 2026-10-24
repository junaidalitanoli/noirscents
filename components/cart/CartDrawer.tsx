"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/store/useHydrated";
import { formatPrice } from "@/lib/formatters";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export default function CartDrawer() {
  const isHydrated = useHydrated();
  const {
    items,
    isOpen,
    setDrawerOpen,
    incrementItem,
    decrementItem,
    removeItem,
    getSubtotal,
  } = useCartStore();

  const subtotal = getSubtotal();
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isHydrated || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <aside
          aria-label="Your Cart"
          className="w-screen max-w-[420px] bg-white shadow-2xl flex flex-col animate-slide-over"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-black/8 flex items-center justify-between bg-white">
            <h2 className="text-base font-semibold uppercase tracking-[0.1em] text-[#121212]">
              Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 text-zinc-500 hover:text-black transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Threshold Bar */}
          <div className="bg-[#f8f8f8] p-3 sm:p-4 border-b border-black/6 text-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-zinc-700">
                Add <strong className="font-semibold text-black">{formatPrice(amountToFreeShipping)}</strong> more for{" "}
                <span className="font-semibold uppercase text-black">Free Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-800 font-semibold">
                ✓ You qualified for Free Delivery Across Pakistan!
              </p>
            )}
            <div className="w-full bg-zinc-200 h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-black h-1.5 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <h3 className="text-base font-semibold uppercase tracking-wider text-[#121212] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-xs text-zinc-500 mb-6 max-w-xs font-light">
                  Explore our collection of long-lasting concentrated extraits de parfum.
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="px-8 py-3 bg-[#121212] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-zinc-100 last:border-b-0"
                >
                  <div className="relative w-20 aspect-square bg-[#f4f4f5] border border-black/6 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                      alt={`${item.product.name} Extrait de Parfum by Noir Scents`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setDrawerOpen(false)}
                          className="text-xs sm:text-sm font-medium text-[#121212] hover:underline underline-offset-2 truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-black p-1 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-zinc-500 mt-0.5">
                        {item.size.ml}ml &bull; {formatPrice(item.size.price)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-300 bg-white">
                        <button
                          onClick={() => decrementItem(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-zinc-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-[#121212]">
                        {formatPrice(item.size.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-black/8 bg-white space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600 font-medium">Subtotal</span>
                <span className="text-base font-bold text-[#121212]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-light">
                Taxes and shipping calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3.5 px-4 bg-[#121212] text-white hover:bg-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-colors text-center"
              >
                Check out &rarr;
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
