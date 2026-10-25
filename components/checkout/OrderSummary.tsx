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

  return (
    <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <h3 className="font-heading text-lg font-bold text-zinc-950">
          Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h3>
        <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full">
          Cash On Delivery
        </span>
      </div>

      {/* Items list */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="relative w-14 h-14 bg-zinc-950 rounded-lg overflow-hidden shrink-0 border border-zinc-200">
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
              <h4 className="text-xs font-bold text-zinc-900 truncate">{item.product.name}</h4>
              <p className="text-[11px] text-zinc-500">{item.size.ml}ml Flacon</p>
              <p className="text-xs font-semibold text-zinc-800 mt-0.5">
                {formatPrice(item.size.price)} &times; {item.quantity}
              </p>
            </div>

            <div className="text-xs font-bold text-zinc-950">
              {formatPrice(item.size.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Financial totals */}
      <div className="border-t border-zinc-200 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-zinc-600">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-zinc-600">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
            Nationwide Shipping
          </span>
          <span>
            {isFreeShipping ? (
              <span className="text-emerald-700 font-bold uppercase">FREE</span>
            ) : (
              <span className="font-semibold text-zinc-900">{formatPrice(STANDARD_SHIPPING_FEE)}</span>
            )}
          </span>
        </div>

        {!isFreeShipping && subtotal > 0 && (
          <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-md">
            Tip: Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for Free Shipping!
          </p>
        )}

        <div className="border-t border-zinc-300 pt-3 flex justify-between text-base font-bold text-zinc-950">
          <span>Grand Total (COD)</span>
          <span className="text-lg text-amber-900 font-extrabold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Trust pill */}
      <div className="p-3 bg-white rounded-xl border border-zinc-200/80 flex items-center gap-2.5 text-xs text-zinc-600">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>Pay safely in cash when the courier delivers your parcel.</span>
      </div>
    </div>
  );
}
