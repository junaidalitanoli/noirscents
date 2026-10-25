"use client";

import { MessageSquare } from "lucide-react";
import { Product } from "@/types";

interface ProductReviewsSectionProps {
  product: Product;
}

export default function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  return (
    <div className="bg-white dark:bg-[#111115] border border-black/8 dark:border-white/10 p-6 sm:p-8 space-y-4 transition-colors">
      <div className="flex items-center gap-2 pb-4 border-b border-black/8 dark:border-white/10">
        <MessageSquare className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
        <h3 className="text-base sm:text-lg font-serif font-medium uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
          Customer Experiences &amp; Reviews
        </h3>
      </div>

      <div className="py-8 text-center space-y-2">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 tracking-wide uppercase">
          Reviews launch ke baad
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
          Asli customer reviews aur ratings website launch aur delivery shuru hone ke baad verified buyers se collect kiye jayenge.
        </p>
      </div>
    </div>
  );
}
