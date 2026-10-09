"use client";

import React, { useState } from "react";
import { ShoppingBag, Eye, Check, Sparkles } from "lucide-react";
import { Product } from "../lib/products";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
  onAddToCart,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className="group relative flex flex-col bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F6F6F6] cursor-pointer rounded-sm border border-neutral-100/90"
      >
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Gender / Category Badge */}
        <div className="absolute top-2.5 left-2.5 bg-neutral-900/85 backdrop-blur-sm text-white text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-sm">
          {product.genderLabel}
        </div>

        {/* Best seller or discount badge */}
        {product.originalPrice && (
          <div className="absolute top-2.5 right-2.5 bg-[#C5A880] text-black text-[9px] uppercase tracking-[0.16em] font-bold px-2 py-0.5 rounded-sm">
            Save 25%
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-neutral-950 text-[10px] uppercase tracking-[0.16em] font-semibold py-2 px-3 rounded shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-1.5 border border-neutral-200"
          >
            <Eye size={12} />
            <span>Fragrance Notes</span>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between text-left">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-1">
            {product.volume}
          </span>

          <h3
            onClick={() => onSelect(product)}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors line-clamp-1"
          >
            {product.title}
          </h3>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-neutral-950">
              {product.formattedPrice}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-neutral-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Minimal Add to Cart Button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-3 w-full min-h-[38px] py-2 px-3 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
            added
              ? "bg-emerald-700 text-white"
              : "bg-neutral-950 hover:bg-neutral-800 text-white active:scale-[0.98]"
          }`}
        >
          {added ? (
            <>
              <Check size={13} />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag size={13} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}