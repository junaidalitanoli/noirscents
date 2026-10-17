"use client";

import { useState } from "react";
import Image from "next/image";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // De-duplicate images: if all images are identical, only show one and hide thumbnail strip
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));
  const displayImages = uniqueImages.length > 0 ? uniqueImages : [DEFAULT_PRODUCT_IMAGE];
  const hasMultipleImages = displayImages.length > 1;

  const currentImage = displayImages[selectedIndex] || displayImages[0] || DEFAULT_PRODUCT_IMAGE;

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 w-full sticky top-28">
      {/* Thumbnails (hidden when images are identical) */}
      {hasMultipleImages && (
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto no-scrollbar justify-start shrink-0">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f4f4f5] border transition-all shrink-0 ${
                selectedIndex === idx
                  ? "border-black ring-1 ring-black opacity-100"
                  : "border-zinc-200 opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image thumbnail ${idx + 1} of ${productName}`}
            >
              <Image
                src={img}
                alt={`${productName} - Noir Scents Eau de Parfum thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Large Image (1:1 Aspect ratio, object-cover) */}
      <div className="relative flex-1 aspect-square w-full bg-[#f4f4f5] border border-black/6 overflow-hidden">
        <Image
          src={currentImage}
          alt={`${productName} - Noir Scents Eau de Parfum`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>
    </div>
  );
}
