"use client";

import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/formatters";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#121212] text-white text-[12px] sm:text-[13px] py-2 px-4 sticky top-0 z-50 border-b border-white/10 tracking-[0.06em]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center text-center">
        <Link
          href="/collections/all"
          className="hover:underline flex items-center gap-1.5 transition-all text-zinc-100 font-medium"
        >
          <span>Free Delivery on orders above {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
          <span className="hidden sm:inline text-zinc-400 font-normal">
            &bull; Cash on Delivery Available Nationwide
          </span>
        </Link>
      </div>
    </div>
  );
}
