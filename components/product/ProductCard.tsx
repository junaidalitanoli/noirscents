"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedSizeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const primaryImage = product.images?.[0] || DEFAULT_PRODUCT_IMAGE;
  const hoverImage = product.images?.[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, 1);
    setIsAdded(true);
    openCart();
    setTimeout(() => setIsAdded(false), 1500);
  };

  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > selectedSize.price);
  const displaySize = product.sizeLabel || `${selectedSize.ml}ml`;
  const imageAlt = `${product.name} ${displaySize} Extrait de Parfum bottle by Noir Scent`;

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl overflow-hidden hover:border-[#c5a059] dark:hover:border-[#d4af37] hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1:1 Aspect Ratio Image Box with secondary hover flip */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square bg-[#f9f9f9] dark:bg-[#16161b] overflow-hidden"
      >
        <Image
          src={isHovered ? hoverImage : primaryImage}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#121212] dark:bg-[#18181c] text-white dark:text-[#f5e7b2] border border-transparent dark:border-[#d4af37]/40 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#cc0000] dark:bg-[#991b1b] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Info Column Below Image */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">

          {/* Product Name */}
          <h3 className="text-[13px] sm:text-[15px] font-semibold text-[#121212] dark:text-[#f4f4f5] group-hover:text-[#c5a059] dark:group-hover:text-[#d4af37] transition-colors line-clamp-1 font-serif">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Scent brief / category tag */}
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
            {displaySize} &bull; Extrait de Parfum
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            {hasDiscount && product.compareAtPrice && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-[#121212] dark:text-[#f5e7b2]">
              {formatPrice(selectedSize.price)}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 text-[11px] sm:text-xs font-semibold tracking-wide uppercase flex items-center justify-center gap-1.5 transition-all duration-200 rounded-xl border whitespace-nowrap shadow-xs hover:shadow-md ${
              isAdded
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white dark:bg-[#18181d] text-[#121212] dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 hover:border-[#121212] dark:hover:border-[#d4af37] hover:bg-[#121212] hover:text-white dark:hover:bg-[#d4af37] dark:hover:text-[#09090b] active:scale-[0.98]"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" /> Added to Cart
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 shrink-0" /> Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
