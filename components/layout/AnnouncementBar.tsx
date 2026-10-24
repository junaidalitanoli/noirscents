"use client";

import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/formatters";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#121212] text-stone-200 text-[10.5px] sm:text-xs py-2 px-3 sticky top-0 z-50 border-b border-white/10 tracking-[0.14em] uppercase font-medium">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center text-center">
        <Link
          href="/collections/all"
          className="hover:text-amber-300 flex items-center gap-2 transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c59a3f] shrink-0 animate-pulse" />
          <span>Complimentary Delivery Above {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
          <span className="hidden sm:inline text-stone-400 font-normal">
            &bull; Pure Artisan Extraits &bull; Cash on Delivery
          </span>
        </Link>
      </div>
    </div>
  );
}

