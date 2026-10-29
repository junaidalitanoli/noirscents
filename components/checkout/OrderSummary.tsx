"use client";

import Image from "next/image";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/lib/constants";
import { ShieldCheck, Truck } from "lucide-react";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export default function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="bg-zinc-50 dark:bg-[#111115] border border-zinc-200/80 dark:border-white/10 rounded-2xl p-6 space-y-6 transition-colors">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-[#f4f4f5]">
          Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h3>
        <span className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold px-2.5 py-0.5 rounded-full border border-transparent dark:border-amber-700/50">
          Cash On Delivery
        </span>
      </div>

      {/* Free Delivery Threshold Bar */}
      <div className="bg-white dark:bg-[#16161c] p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-xs">
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
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 mt-2 overflow-hidden rounded-full">
          <div
            className="bg-black dark:bg-[#d4af37] h-1.5 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="relative w-14 h-14 bg-zinc-950 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
              <Image
                src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                alt={`${item.product.name} Extrait de Parfum by Noir Scent`}
                fill
                sizes="56px"
                className="object-cover"
              />
              <span className="absolute top-0 right-0 bg-zinc-800 text-white text-[10px] w-4 h-4 rounded-bl-md flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{item.product.name}</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.size.ml}ml Flacon</p>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-300 mt-0.5">
                {formatPrice(item.size.price)} &times; {item.quantity}
              </p>
            </div>

            <div className="text-xs font-bold text-zinc-950 dark:text-[#f4f4f5]">
              {formatPrice(item.size.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Financial totals */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
            Nationwide Shipping
          </span>
          <span>
            {isFreeShipping ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase">FREE</span>
            ) : (
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatPrice(STANDARD_SHIPPING_FEE)}</span>
            )}
          </span>
        </div>

        {!isFreeShipping && subtotal > 0 && (
          <p className="text-[11px] text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 p-2 rounded-md">
            Tip: Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for Free Shipping!
          </p>
        )}

        <div className="border-t border-zinc-300 dark:border-zinc-700 pt-3 flex justify-between text-base font-bold text-zinc-950 dark:text-[#f4f4f5]">
          <span>Grand Total (COD)</span>
          <span className="text-lg text-amber-900 dark:text-[#f5e7b2] font-extrabold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Trust pill */}
      <div className="p-3 bg-white dark:bg-[#16161c] rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>Pay safely in cash when the courier delivers your parcel.</span>
      </div>
    </div>
  );
}
