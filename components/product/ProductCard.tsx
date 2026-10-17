"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Check, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
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

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > selectedSize.price;

  return (
    <div
      className="group relative flex flex-col bg-white border border-black/6 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1:1 Aspect Ratio Image Box */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square bg-[#f4f4f5] overflow-hidden"
      >
        <Image
          src={isHovered ? hoverImage : primaryImage}
          alt={`${product.name} - Noir Scents Eau de Parfum`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Dawn Style Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {hasDiscount && (
            <span className="bg-[#cc0000] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Sale
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#121212] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Best Seller
            </span>
          )}
        </div>
      </Link>

      {/* Info Column Below Image */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Star Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-medium text-zinc-600">4.9 (80+)</span>
          </div>

          {/* Product Name */}
          <h3 className="text-[13px] sm:text-[14px] font-medium text-[#121212] group-hover:underline underline-offset-4 line-clamp-1">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Size Variant Selector / Badge */}
          <div className="flex items-center gap-1.5 pt-1">
            {product.sizes.length > 1 ? (
              product.sizes.map((size, idx) => (
                <button
                  key={size.ml}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSizeIndex(idx);
                  }}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all ${
                    selectedSizeIndex === idx
                      ? "border-black bg-black text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-black"
                  }`}
                >
                  {size.ml}ml
                </button>
              ))
            ) : (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {selectedSize.ml}ml Flacon
              </span>
            )}
          </div>
        </div>

        {/* Price & Quick Add Button */}
        <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-[15px] font-bold text-[#121212]">
              {formatPrice(selectedSize.price)} PKR
            </span>
            {hasDiscount && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice!)} PKR
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2 px-3 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
              isAdded
                ? "bg-emerald-700 text-white"
                : "bg-[#121212] text-white hover:bg-black active:scale-[0.98]"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
