"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Wind, Heart, Sparkles, ShoppingBag, Check, Gift, Layers, Compass } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { getAllProducts } from "@/lib/data";
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
  const [activeBundleIndex, setActiveBundleIndex] = useState(0);
  const { addItem, openCart } = useCartStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const primaryImage = product.images?.[0] || DEFAULT_PRODUCT_IMAGE;
  const isBundle = product.category === "deals";

  // Extract included perfumes if it's a bundle e.g. "Royal Monarch Duo (Desert Majesty + Sultan)"
  const bundleMatch = product.name.match(/\(([^)]+)\)/);
  const includedPerfumes = bundleMatch
    ? bundleMatch[1].split("+").map((s) => s.trim())
    : [];

  const displayNameWithoutParens = bundleMatch
    ? product.name.replace(/\s*\([^)]+\)/, "").trim()
    : product.name;

  // Resolve matching individual products from catalog to extract their unique independent notes
  const allCatalogProducts = getAllProducts();
  const matchedBundleProducts: Product[] = isBundle && includedPerfumes.length > 0
    ? includedPerfumes
        .map((perfumeName) => {
          const cleanName = perfumeName.toLowerCase().replace(/[^a-z0-9]/g, "");
          return allCatalogProducts.find(
            (p) =>
              p.category !== "deals" &&
              p.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(cleanName)
          );
        })
        .filter(Boolean) as Product[]
    : [];

  // Active notes to display (if bundle, switch between individual flacons; otherwise use product.notes)
  const activeProduct = isBundle && matchedBundleProducts.length > 0
    ? matchedBundleProducts[activeBundleIndex] || product
    : product;

  const currentNotes = activeProduct.notes || product.notes;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > selectedSize.price);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[450px] bg-white dark:bg-[#121215] rounded-3xl shadow-2xl border border-stone-200/90 dark:border-white/10 pt-10 sm:pt-11 pb-5 px-4 sm:px-6 my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-stone-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            1. Overhanging Luxury Product / Bundle Card
           ======================================================== */}
        <div
          className={`absolute -top-8 sm:-top-10 left-4 sm:left-6 rounded-2xl bg-white dark:bg-[#18181d] p-1.5 border-2 border-amber-300/80 dark:border-amber-500/50 shadow-2xl flex items-center justify-center overflow-hidden z-20 ${
            isBundle ? "w-24 sm:w-28 h-24 sm:h-28 aspect-square" : "w-22 sm:w-26 h-30 sm:h-34"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={
                isBundle && matchedBundleProducts[activeBundleIndex]?.images?.[0]
                  ? matchedBundleProducts[activeBundleIndex].images[0]
                  : primaryImage
              }
              alt={product.name}
              fill
              sizes="(max-width: 640px) 112px, 128px"
              className={isBundle && matchedBundleProducts.length === 0 ? "object-cover rounded-xl" : "object-contain p-0.5"}
            />
          </div>
        </div>

        {/* ========================================================
            2. Top-Right Header (Badge, Close, Title, Subtitle, Price)
           ======================================================== */}
        <div className="pl-24 sm:pl-28 text-left min-h-[95px] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-1">
            <span className="bg-[#fbf4e6] dark:bg-amber-950/60 text-[#8c530b] dark:text-[#f5e7b2] border border-amber-300/80 dark:border-amber-700/60 text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-md inline-block">
              {product.badge || (isBundle ? "5% EXTRA OFF • BUNDLE SET" : "GOLD EDITION")}
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

          <div className="mt-1">
            {/* Main Product / Bundle Title (Never truncated) */}
            <h2 className="font-serif text-base sm:text-xl font-bold tracking-tight text-stone-950 dark:text-white leading-tight">
              {displayNameWithoutParens.toUpperCase()}
            </h2>

            {/* Subtitle / Volume Details */}
            <p className="text-[11px] sm:text-xs text-stone-500 dark:text-zinc-400 mt-0.5 font-normal leading-snug">
              {product.subtitle || `${product.notes.top[0]} & ${product.notes.base[0]}`}
            </p>

            {/* Price & Savings */}
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-base sm:text-lg font-bold text-[#8c530b] dark:text-[#c9a96a]">
                {formatPrice(selectedSize.price)}
              </span>
              {hasDiscount && product.compareAtPrice && (
                <span className="text-xs text-stone-400 dark:text-zinc-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            3. MULTI-PRODUCT SWITCHER FOR BUNDLES (Individual Flacons)
           ======================================================== */}
        {isBundle && matchedBundleProducts.length > 0 && (
          <div className="mt-4 mb-2 p-2.5 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-400/10 dark:via-white/5 dark:to-transparent border border-amber-300/70 dark:border-amber-500/30 rounded-2xl text-left">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c530b] dark:text-[#c9a96a] flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Select Flacon to View Exact Notes:</span>
              </span>
              <span className="text-[9.5px] font-bold text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-950/80 px-2 py-0.5 rounded-full">
                {product.sizeLabel || `${matchedBundleProducts.length}x 50ml`}
              </span>
            </div>

            {/* Interactive Tab Switcher for each perfume in the bundle */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {matchedBundleProducts.map((perfume, idx) => {
                const isSelected = activeBundleIndex === idx;
                return (
                  <button
                    key={perfume.id}
                    type="button"
                    onClick={() => setActiveBundleIndex(idx)}
                    className={`py-2 px-2 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-zinc-800 border-amber-400 dark:border-amber-500 shadow-sm ring-1 ring-amber-400/30"
                        : "bg-white/60 dark:bg-white/5 border-stone-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isSelected ? "bg-amber-500" : "bg-stone-300 dark:bg-zinc-600"
                        }`}
                      />
                      <p className="font-serif font-bold text-xs text-stone-900 dark:text-white truncate">
                        {perfume.name}
                      </p>
                    </div>
                    <p className="text-[9px] text-stone-500 dark:text-zinc-400 pl-3 truncate">
                      50ml Extrait (35%)
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Bottle Impression Tag (If Available) */}
        {isBundle && activeProduct.inspiration && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fbf9f5] dark:bg-white/5 border border-amber-200/60 dark:border-white/10 rounded-xl my-2 text-left">
            <Compass className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#c9a96a] shrink-0" />
            <p className="text-[10.5px] text-stone-600 dark:text-zinc-300 font-medium leading-snug">
              <span className="font-bold text-[#8c530b] dark:text-[#c9a96a] uppercase text-[9.5px]">
                {activeProduct.name} Profile:
              </span>{" "}
              {activeProduct.inspiration}
            </p>
          </div>
        )}

        {/* ========================================================
            4. Section Title: Olfactory Architecture
           ======================================================== */}
        <div className="mt-3.5 mb-2 text-left flex items-center justify-between">
          <span className="text-[10px] sm:text-[10.5px] font-serif font-bold tracking-[0.22em] uppercase text-stone-800 dark:text-zinc-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#c9a96a]" />
            <span>
              {isBundle ? `${activeProduct.name} Notes Pyramid` : "Olfactory Architecture"}
            </span>
          </span>
          {activeProduct.concentration && (
            <span className="text-[9.5px] text-stone-500 dark:text-zinc-400 font-medium">
              35% Oil Extrait
            </span>
          )}
        </div>

        {/* ========================================================
            5. The 3 Notes Architecture Cards (Top, Heart, Base)
           ======================================================== */}
        <div className="space-y-1.5 text-left">
          {/* Top Notes */}
          <div className="bg-[#fbf9f5] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#c9a96a]">
              <Wind className="w-3.5 h-3.5" />
              <span>Top Notes</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-zinc-300 font-medium mt-0.5 leading-snug">
              {currentNotes.top.join(", ")}
            </p>
          </div>

          {/* Heart Notes */}
          <div className="bg-[#fbf9f5] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#c9a96a]">
              <Heart className="w-3.5 h-3.5 fill-[#8c530b]/20" />
              <span>Heart Notes</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-zinc-300 font-medium mt-0.5 leading-snug">
              {currentNotes.heart.join(", ")}
            </p>
          </div>

          {/* Base Notes */}
          <div className="bg-[#fbf9f5] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#c9a96a]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Base Notes</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-zinc-300 font-medium mt-0.5 leading-snug">
              {currentNotes.base.join(", ")}
            </p>
          </div>
        </div>

        {/* ========================================================
            6. Longevity & Sillage Row
           ======================================================== */}
        <div className="flex items-center justify-between text-xs py-2 border-t border-stone-100 dark:border-zinc-800/80 mt-3 text-left">
          <span className="text-stone-500 dark:text-zinc-400 font-normal">
            Longevity &amp; Sillage:
          </span>
          <span className="font-bold text-stone-900 dark:text-white">
            {activeProduct.projection || (isBundle ? "Double Extrait Longevity (14+ Hours)" : "14+ Hours Radiant Sillage")}
          </span>
        </div>

        {/* ========================================================
            7. Action Button: Add to Shopping Bag
           ======================================================== */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 mt-2.5 cursor-pointer ${
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
              <span>{isBundle ? "Add Bundle to Shopping Bag" : "Add to Shopping Bag"}</span>
            </>
          )}
        </button>

        {/* ========================================================
            8. View Full Product Details Link
           ======================================================== */}
        <div className="text-center mt-2.5">
          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="text-[11px] font-medium text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            {isBundle
              ? "View Complete Bundle Story & Presentation Box Details \u2192"
              : "View Complete Fragrance Story & Reviews \u2192"}
          </Link>
        </div>
      </div>
    </div>
  );
}
