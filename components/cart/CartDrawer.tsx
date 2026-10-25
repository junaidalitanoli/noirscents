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

  if (!isHydrated) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-500 ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Backdrop Overlay with smooth blur and fade */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <aside
          aria-label="Your Cart"
          className={`w-screen max-w-[420px] bg-white dark:bg-[#0c0c0f] text-zinc-900 dark:text-zinc-100 shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-black/8 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#0c0c0f]">
            <h2 className="text-base font-semibold uppercase tracking-[0.14em] text-[#121212] dark:text-[#f4f4f5] font-serif">
              Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-[#d4af37] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Threshold Bar */}
          <div className="bg-[#f8f8f8] dark:bg-[#141418] p-3 sm:p-4 border-b border-black/6 dark:border-white/10 text-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-zinc-700 dark:text-zinc-300">
                Add <strong className="font-semibold text-black dark:text-[#f5e7b2]">{formatPrice(amountToFreeShipping)}</strong> more for{" "}
                <span className="font-semibold uppercase text-black dark:text-[#f5e7b2]">Free Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-800 dark:text-emerald-400 font-semibold">
                ✓ You qualified for Free Delivery Across Pakistan!
              </p>
            )}
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-black dark:bg-[#d4af37] h-1.5 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <h3 className="text-base font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5] mb-2 font-serif">
                  Your cart is empty
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 max-w-xs font-light">
                  Explore our collection of long-lasting concentrated extraits de parfum.
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="px-8 py-3 bg-[#121212] dark:bg-[#d4af37] text-white dark:text-[#09090b] text-xs uppercase tracking-wider font-semibold hover:bg-black dark:hover:bg-[#e5c378] transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 last:border-b-0"
                >
                  <div className="relative w-20 aspect-square bg-[#f4f4f5] dark:bg-[#18181d] border border-black/6 dark:border-white/10 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                      alt={`${item.product.name} Extrait de Parfum by Noir Scent`}
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
                          className="text-xs sm:text-sm font-medium text-[#121212] dark:text-[#f4f4f5] hover:underline underline-offset-2 truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-black dark:hover:text-[#d4af37] p-1 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {item.size.ml}ml &bull; {formatPrice(item.size.price)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#18181d]">
                        <button
                          onClick={() => decrementItem(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-[#121212] dark:text-[#f5e7b2]">
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
            <div className="p-4 sm:p-5 border-t border-black/8 dark:border-white/10 bg-white dark:bg-[#0c0c0f] space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Subtotal</span>
                <span className="text-base font-bold text-[#121212] dark:text-[#f5e7b2]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light">
                Taxes and shipping calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3.5 px-4 bg-[#121212] dark:bg-[#d4af37] text-white dark:text-[#09090b] hover:bg-black dark:hover:bg-[#e5c378] font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-colors text-center shadow-md"
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
