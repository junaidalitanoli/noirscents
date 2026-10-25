"use client";

import { MessageSquare } from "lucide-react";
import { Product } from "@/types";

interface ProductReviewsSectionProps {
  product: Product;
}

export default function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  return (
    <div className="bg-white border border-black/8 p-6 sm:p-8 space-y-4">
      <div className="flex items-center gap-2 pb-4 border-b border-black/8">
        <MessageSquare className="w-4 h-4 text-[#c5a059]" />
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#121212]">
          Customer Experiences &amp; Reviews
        </h3>
      </div>

      <div className="py-8 text-center space-y-2">
        <p className="text-sm font-semibold text-zinc-900 tracking-wide uppercase">
          Reviews launch ke baad
        </p>
        <p className="text-xs text-zinc-500 font-light max-w-md mx-auto">
          Asli customer reviews aur ratings website launch aur delivery shuru hone ke baad verified buyers se collect kiye jayenge.
        </p>
      </div>
    </div>
  );
}
