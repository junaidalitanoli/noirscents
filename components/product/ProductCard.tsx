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
      className="group relative flex flex-col bg-white border border-zinc-200/90 hover:border-black/30 hover:shadow-sm transition-all duration-300"
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
          alt={`${product.name} - Noir Scents Eau de Parfum`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
        />

        {/* Dawn Style Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="bg-[#cc0000] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Sale
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#121212] text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          )}
        </div>
      </Link>

      {/* Info Column Below Image */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Star Rating & Review Count matching Funoon */}
          <div className="flex items-center gap-1.5 text-amber-500 text-xs">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-zinc-500 font-medium">
              4.97 (812)
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-[13px] sm:text-[15px] font-semibold text-[#121212] group-hover:underline underline-offset-4 line-clamp-1">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Scent brief / category tag */}
          <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
            50 ML &bull; Extrait de Parfum
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            {hasDiscount && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice!)} PKR
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-[#121212]">
              {formatPrice(selectedSize.price)} PKR
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all border ${
              isAdded
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-[#121212] border-[#121212] hover:bg-[#121212] hover:text-white active:scale-[0.98]"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Cart
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

