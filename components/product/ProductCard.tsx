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
      className="group relative flex flex-col bg-white border border-zinc-200/90 hover:border-black/30 hover:shadow-xs transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1:1 Aspect Ratio Image Box with secondary hover flip */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square bg-[#f9f9f9] overflow-hidden"
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
          {product.isBestSeller && (
            <span className="bg-[#121212] text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Best Seller
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#cc0000] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Info Column Below Image */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">

          {/* Product Name */}
          <h3 className="text-[13px] sm:text-[15px] font-semibold text-[#121212] group-hover:underline underline-offset-4 line-clamp-1">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Scent brief / category tag */}
          <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
            {displaySize} &bull; Extrait de Parfum
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            {hasDiscount && product.compareAtPrice && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-[#121212]">
              {formatPrice(selectedSize.price)}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 text-[11px] sm:text-xs font-semibold tracking-wide uppercase flex items-center justify-center gap-1 sm:gap-1.5 transition-all border whitespace-nowrap ${
              isAdded
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-[#121212] border-[#121212] hover:bg-[#121212] hover:text-white active:scale-[0.98]"
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
