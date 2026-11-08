"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Wind, Heart, Sparkles, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface ProductNotesModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  selectedSizeIndex?: number;
}

export default function ProductNotesModal({
  product,
  isOpen,
  onClose,
  selectedSizeIndex = 0,
}: ProductNotesModalProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const primaryImage = product.images?.[0] || DEFAULT_PRODUCT_IMAGE;

  // Handle ESC key and prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addItem(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      openCart();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} Olfactory Architecture`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[430px] bg-white dark:bg-[#121215] rounded-3xl shadow-2xl border border-stone-200/90 dark:border-white/10 pt-10 sm:pt-12 pb-5 px-5 sm:px-6 my-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Overhanging Luxury Bottle Card (Popping out of Top Left) */}
        <div className="absolute -top-9 sm:-top-11 left-5 sm:left-6 w-24 sm:w-28 h-32 sm:h-36 rounded-2xl bg-white dark:bg-[#18181d] p-2 border-2 border-amber-300/80 dark:border-amber-500/50 shadow-2xl flex items-center justify-center overflow-hidden z-20">
          <div className="relative w-full h-full">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-contain p-0.5"
            />
          </div>
        </div>

        {/* 2. Top-Right Details (Badge, Close Button, Title, Subtitle, Price) */}
        <div className="pl-26 sm:pl-30 text-left min-h-[95px] sm:min-h-[110px] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <span className="bg-[#fbf4e6] dark:bg-amber-950/50 text-[#8c530b] dark:text-[#f5e7b2] border border-amber-300/80 dark:border-amber-700/60 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-md inline-block">
              {product.badge || "GOLD EDITION"}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1 -mr-1 -mt-1 text-stone-400 hover:text-stone-800 dark:hover:text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white line-clamp-1 mt-1">
              {product.name.toUpperCase()}
            </h2>

            <p className="text-[11px] sm:text-xs text-stone-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
              {product.subtitle || `${product.notes.top[0]} & ${product.notes.base[0]}`}
            </p>

            <p className="text-base sm:text-lg font-bold text-[#8c530b] dark:text-[#c9a96a] mt-1">
              {formatPrice(selectedSize.price)}
            </p>
          </div>
        </div>

        {/* 3. Section Title: Olfactory Architecture */}
        <div className="mt-5 mb-2.5 text-left">
          <span className="text-[10.5px] font-serif font-bold tracking-[0.22em] uppercase text-stone-800 dark:text-zinc-200">
            Olfactory Architecture
          </span>
        </div>

        {/* 4. The 3 Notes Architecture Cards */}
        <div className="space-y-2 text-left">
          {/* Top Notes */}
          <div className="bg-[#fbf9f5] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#c9a96a]">
              <Wind className="w-3.5 h-3.5" />
              <span>Top Notes</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-zinc-300 font-medium mt-1 leading-snug">
              {product.notes.top.join(", ")}
            </p>
          </div>

          {/* Heart Notes */}
          <div className="bg-[#fbf9f5] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#c9a96a]">
              <Heart className="w-3.5 h-3.5 fill-[#8c530b]/20" />
              <span>Heart Notes</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-zinc-300 font-medium mt-1 leading-snug">
              {product.notes.heart.join(", ")}
            </p>
          </div>

          {/* Base Notes */}
          <div className="bg-[#fbf9f5] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#c9a96a]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Base Notes</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-zinc-300 font-medium mt-1 leading-snug">
              {product.notes.base.join(", ")}
            </p>
          </div>
        </div>

        {/* 5. Longevity & Sillage Row */}
        <div className="flex items-center justify-between text-xs py-2.5 border-t border-stone-100 dark:border-zinc-800/80 mt-3 text-left">
          <span className="text-stone-500 dark:text-zinc-400 font-normal">
            Longevity &amp; Sillage:
          </span>
          <span className="font-bold text-stone-900 dark:text-white">
            {product.projection || "14+ Hours Radiant Sillage"}
          </span>
        </div>

        {/* 6. Action Button: Add to Shopping Bag */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 mt-3 cursor-pointer ${
            isAdded
              ? "bg-emerald-700 text-white"
              : "bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Shopping Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </>
          )}
        </button>

        {/* 7. View Full Product Details Link */}
        <div className="text-center mt-2.5">
          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="text-[11px] font-medium text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            View Complete Fragrance Story &amp; Reviews &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
