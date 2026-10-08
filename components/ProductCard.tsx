"use client";

import React from "react";
import { ShoppingBag, Sparkles } from "lucide-react";

export interface SelectedProductInfo {
  title: string;
  price: string;
  image: string;
  category: string;
  volume?: string;
}

interface ProductProps {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  volume?: string;
  onSelect: (product: SelectedProductInfo) => void;
}

export default function ProductCard({
  title,
  price,
  image,
  category,
  volume = "50ml Extrait",
  onSelect,
}: ProductProps) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-stone-400/80 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect({ title, price, image, category, volume })}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md text-[#C2A676] text-[10px] tracking-[0.2em] uppercase font-medium px-2.5 py-1 rounded-full border border-stone-800">
          {category}
        </div>

        {/* Volume Tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-stone-700 text-[10px] tracking-widest font-semibold px-2 py-1 rounded-full border border-stone-200">
          {volume}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-stone-400 text-[11px] uppercase tracking-wider mb-1">
            <Sparkles size={12} className="text-[#C2A676]" />
            <span>Pure Artisanal Perfume</span>
          </div>

          <h3
            onClick={() => onSelect({ title, price, image, category, volume })}
            className="font-serif text-lg sm:text-xl text-stone-900 font-medium tracking-wide cursor-pointer hover:text-[#C2A676] transition-colors leading-snug line-clamp-1"
          >
            {title}
          </h3>

          <p className="mt-1.5 text-base sm:text-lg font-bold text-stone-950 tracking-tight">
            {price}
          </p>
        </div>

        {/* Order Button - minimum 44px height for mobile touch accessibility */}
        <button
          type="button"
          onClick={() => onSelect({ title, price, image, category, volume })}
          className="mt-1 w-full min-h-[44px] bg-stone-950 hover:bg-stone-800 active:scale-[0.98] text-white py-2.5 px-4 rounded-lg text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingBag size={15} className="text-[#C2A676]" />
          <span>Order on WhatsApp</span>
        </button>
      </div>
    </article>
  );
}