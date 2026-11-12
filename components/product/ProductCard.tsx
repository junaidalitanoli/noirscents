"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, Info, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import ProductNotesModal from "./ProductNotesModal";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedSizeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
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
  const discountPercent =
    hasDiscount && product.compareAtPrice
      ? Math.round(((product.compareAtPrice - selectedSize.price) / product.compareAtPrice) * 100)
      : 0;
  const displaySize = product.sizeLabel || `${selectedSize.ml}ml`;
  const imageAlt = `${product.name} ${displaySize} Extrait de Parfum bottle by Noir Scent`;

  const isBundle = product.category === "deals";
  const bundleMatch = isBundle ? product.name.match(/^([^(]+)(?:\(([^)]+)\))?/) : null;
  const mainTitle = bundleMatch ? bundleMatch[1].trim() : product.name;
  const includedItems = bundleMatch && bundleMatch[2] ? bundleMatch[2].trim() : null;

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-[#111116] border border-stone-200/90 dark:border-white/15 rounded-2xl overflow-hidden hover:border-[#c5a059] dark:hover:border-[#d4af37] hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1:1 Aspect Ratio Image Box with secondary hover flip */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square bg-[#fbf9f6] dark:bg-[#16161b] overflow-hidden"
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
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none max-w-[65%]">
          {product.badge && (
            <span className="bg-[#121212]/90 backdrop-blur-xs text-white dark:bg-[#c9a96a] dark:text-[#09090b] text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs truncate">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-700 text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs self-start">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Category / Oil Concentration pill on top right */}
        <div className="absolute top-2 right-2 z-10 pointer-events-none">
          <span className="bg-white/90 dark:bg-black/80 backdrop-blur-xs text-[#8c530b] dark:text-[#f5e7b2] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-300/60 dark:border-white/10 shadow-2xs">
            {isBundle ? "Bundle" : "35% Oil"}
          </span>
        </div>
      </Link>

      {/* Info Column Below Image */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Gender / Category & Star Rating */}
          <div className="flex items-center justify-between text-[10.5px]">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#8c530b] dark:text-[#c9a96a]">
              {product.category === "men"
                ? "Men's Extrait"
                : product.category === "deals"
                ? "Curated Bundle"
                : product.category === "testers"
                ? "Discovery Set"
                : "Women's Extrait"}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[10.5px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating ?? 4.9}</span>
              <span className="text-stone-400 dark:text-zinc-500 font-normal text-[9.5px]">
                ({product.reviewCount ?? 140})
              </span>
            </div>
          </div>

          {/* Product Name (Clean & Un-cramped) */}
          <h3 className="text-sm sm:text-base font-medium text-stone-950 dark:text-[#f4f4f5] group-hover:text-[#8c530b] dark:group-hover:text-[#d4af37] transition-colors line-clamp-1 font-serif tracking-tight">
            <Link href={`/products/${product.slug}`} title={product.name}>
              {mainTitle}
            </Link>
          </h3>

          {/* Scent notes or Bundle Included Fragrances */}
          {isBundle ? (
            <p className="text-[11px] font-medium text-[#8c530b] dark:text-[#c9a96a] line-clamp-1">
              {includedItems || product.subtitle}
            </p>
          ) : (
            <p className="text-[11px] text-stone-600 dark:text-zinc-400 font-normal line-clamp-1">
              {product.notes.top[0]} &bull; {product.notes.heart[0]} &bull; {product.notes.base[0]}
            </p>
          )}
        </div>

        {/* Price & Size Strip (Zero Collision on Mobile) */}
        <div className="pt-2 border-t border-stone-100 dark:border-zinc-800/80 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-[#1a140e] dark:text-[#f5e7b2]">
                {formatPrice(selectedSize.price)}
              </span>
              {hasDiscount && product.compareAtPrice && (
                <span className="text-[10.5px] text-stone-400 dark:text-zinc-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-medium truncate">
              {isBundle
                ? product.sizeLabel
                  ? product.sizeLabel.replace(/\([^)]*\)/, "").trim()
                  : "Duo Set"
                : product.sizeLabel || "50ml Flacon"}
            </span>
          </div>

          {/* Dual Instant Action Buttons: Notes / Info + Add to Cart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {/* 1. Olfactory Architecture & Notes Modal */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsNotesOpen(true);
              }}
              className="w-full py-2 px-2 text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 bg-[#121212] hover:bg-black dark:bg-[#d4af37] dark:hover:bg-[#e2c158] text-white dark:text-[#0a0a0e] border border-black dark:border-amber-300/50 rounded-lg transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              title="View Olfactory Architecture and Notes"
            >
              <Info className="w-3.5 h-3.5 text-amber-300 dark:text-[#0a0a0e]" />
              <span>Notes / Info</span>
            </button>

            {/* 2. Quick Add to Cart Drawer */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`w-full py-2 px-2 text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 rounded-lg border transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                isAdded
                  ? "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500"
                  : "bg-white dark:bg-[#1f1f28] border-stone-300 dark:border-white/30 text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-[#282834] dark:hover:border-amber-400/60 ring-1 ring-black/5 dark:ring-white/10"
              }`}
              title="Add to Cart"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#d4af37]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Product Notes Architecture Modal (Matching Sample UI) */}
      <ProductNotesModal
        product={product}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        selectedSizeIndex={selectedSizeIndex}
      />
    </div>
  );
}
