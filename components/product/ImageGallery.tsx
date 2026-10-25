"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Shield, Package, Truck } from "lucide-react";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

export default function ImageGallery({ images, productName, badge }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // De-duplicate images: if all images are identical, only show one and hide thumbnail strip
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));
  const displayImages = uniqueImages.length > 0 ? uniqueImages : [DEFAULT_PRODUCT_IMAGE];
  const hasMultipleImages = displayImages.length > 1;

  const currentImage = displayImages[selectedIndex] || displayImages[0] || DEFAULT_PRODUCT_IMAGE;

  return (
    <div className="space-y-4 w-full sticky top-24">
      <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto no-scrollbar justify-start shrink-0">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f4f4f5] border transition-all shrink-0 rounded-xs overflow-hidden ${
                  selectedIndex === idx
                    ? "border-black ring-2 ring-[#c5a059] opacity-100 scale-102"
                    : "border-zinc-200 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image thumbnail ${idx + 1} of ${productName}`}
              >
                <Image
                  src={img}
                  alt={`${productName} Extrait de Parfum bottle thumbnail ${idx + 1} by Noir Scents`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Large Image */}
        <div className="relative flex-1 aspect-square w-full bg-[#f4f4f5] border border-black/8 overflow-hidden rounded-xs group">
          <Image
            src={currentImage}
            alt={`${productName} Extrait de Parfum bottle by Noir Scents`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Luxury Badge Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {badge && (
              <span className="inline-flex items-center gap-1 bg-[#121212] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-md">
                <Sparkles className="w-3 h-3 text-[#c5a059]" />
                {badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-xs text-zinc-900 border border-black/10 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 shadow-2xs">
              35% Extrait Concentration
            </span>
          </div>

          {hasMultipleImages && (
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-medium px-2.5 py-1 rounded-xs">
              {selectedIndex + 1} / {displayImages.length}
            </div>
          )}
        </div>
      </div>

      {/* 3 Confidence Badges under image */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-zinc-600 font-medium">
        <div className="flex items-center justify-center gap-1.5 p-2 bg-zinc-50 border border-zinc-200/80 text-center">
          <Shield className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
          <span className="truncate">Pure Fragrance Oils</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 bg-zinc-50 border border-zinc-200/80 text-center">
          <Truck className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
          <span className="truncate">Nationwide COD</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 bg-zinc-50 border border-zinc-200/80 text-center">
          <Package className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
          <span className="truncate">Luxury Gift Box</span>
        </div>
      </div>
    </div>
  );
}
