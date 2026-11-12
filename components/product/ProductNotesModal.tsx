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

  // Active notes and bottle to display (if bundle, switch between individual flacons; otherwise use product)
  const activeProduct = isBundle && matchedBundleProducts.length > 0
    ? matchedBundleProducts[activeBundleIndex] || product
    : product;

  const currentNotes = activeProduct.notes || product.notes;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > selectedSize.price);

  // Active showcase image
  const displayImage = isBundle && matchedBundleProducts[activeBundleIndex]?.images?.[0]
    ? matchedBundleProducts[activeBundleIndex].images[0]
    : primaryImage;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl bg-white dark:bg-[#121216] rounded-3xl shadow-2xl border border-stone-200/90 dark:border-white/15 p-5 sm:p-7 my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-stone-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            1. TOP PRODUCT SHOWCASE & DETAILS HEADER
            - Generous, complete bottle display (NO negative top clipping)
            - Large high-res flacon artwork with 100% visibility
           ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-5 border-b border-stone-200/80 dark:border-white/10">
          {/* A. Large Complete Product / Bottle Showcase Card */}
          <div className="relative w-36 sm:w-44 md:w-48 aspect-[3/4] rounded-2xl bg-gradient-to-b from-[#fbf8f3] via-white to-stone-100 dark:from-[#1c1c24] dark:via-[#16161d] dark:to-[#0f0f13] p-3 sm:p-3.5 border-2 border-amber-300/80 dark:border-amber-500/50 shadow-xl flex items-center justify-center shrink-0">
            <div className="relative w-full h-full">
              <Image
                src={displayImage}
                alt={`${activeProduct.name} Extrait Flacon`}
                fill
                priority
                sizes="(max-width: 640px) 160px, 220px"
                className="object-contain drop-shadow-md"
              />
            </div>
            {/* Subtle luxury ambient glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* B. Product Details, Badge & Actions */}
          <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-between min-h-[160px]">
            <div>
              {/* Top Row: Badge + Close Dialog Button */}
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#fbf4e6] dark:bg-amber-950/80 text-[#8c530b] dark:text-[#f5e7b2] border border-amber-300/80 dark:border-amber-700/60 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-0.5 rounded-md inline-block">
                  {product.badge || (isBundle ? "EXCLUSIVE BUNDLE DUO • 5% OFF" : "GOLD EDITION • EXTRAIT")}
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product Title */}
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-stone-950 dark:text-white mt-2 leading-tight">
                {displayNameWithoutParens.toUpperCase()}
              </h2>

              {/* Subtitle / Scent Profile */}
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 mt-1 font-medium leading-snug">
                {activeProduct.subtitle || product.subtitle || `${product.notes.top[0]} & ${product.notes.base[0]}`}
              </p>

              {/* Price & Savings */}
              <div className="flex items-baseline justify-center sm:justify-start gap-2.5 mt-2.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#8c530b] dark:text-[#d4af37] font-mono">
                  {formatPrice(selectedSize.price)}
                </span>
                {hasDiscount && product.compareAtPrice && (
                  <span className="text-xs sm:text-sm text-stone-400 dark:text-zinc-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-[10.5px] text-stone-600 dark:text-zinc-300 font-medium bg-stone-100 dark:bg-white/10 border border-stone-200 dark:border-white/10 px-2 py-0.5 rounded-md">
                  {isBundle ? `${matchedBundleProducts.length || 2}x 50ml Duo` : "50ml Pure Extrait"}
                </span>
              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-[11px]">
              <span className="inline-flex items-center gap-1 bg-amber-500/10 dark:bg-amber-400/10 text-[#8c530b] dark:text-amber-300 border border-amber-300/60 dark:border-amber-400/25 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>35% Pure Oil Extrait</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-zinc-200 border border-stone-200 dark:border-white/15 px-2.5 py-0.5 rounded-full font-medium">
                <span>14+ Hours Sillage</span>
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MULTI-PRODUCT SWITCHER FOR BUNDLES (Individual Flacons)
           ======================================================== */}
        {isBundle && matchedBundleProducts.length > 0 && (
          <div className="mt-4 mb-3 p-3 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-400/10 dark:via-white/5 dark:to-transparent border border-amber-300/70 dark:border-amber-500/30 rounded-2xl text-left">
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8c530b] dark:text-[#d4af37] flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Select Included Flacon to View Notes &amp; Photo:</span>
              </span>
              <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300/50 dark:border-amber-700/50">
                {product.sizeLabel || `${matchedBundleProducts.length}x 50ml`}
              </span>
            </div>

            {/* Interactive Tab Switcher for each perfume in the bundle */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {matchedBundleProducts.map((perfume, idx) => {
                const isSelected = activeBundleIndex === idx;
                return (
                  <button
                    key={perfume.id}
                    type="button"
                    onClick={() => setActiveBundleIndex(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-[#1f1f28] border-amber-400 dark:border-amber-400 shadow-md ring-2 ring-amber-400/30"
                        : "bg-white/70 dark:bg-white/5 border-stone-200 dark:border-white/15 hover:bg-white dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isSelected ? "bg-amber-500" : "bg-stone-300 dark:bg-zinc-600"
                        }`}
                      />
                      <p className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-white truncate">
                        {perfume.name}
                      </p>
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-zinc-400 pl-3.5 mt-0.5 truncate">
                      50ml Artisanal Extrait
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Bottle Impression Profile (If Available) */}
        {isBundle && activeProduct.inspiration && (
          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#fbf9f5] dark:bg-[#181820] border border-amber-200/80 dark:border-white/15 rounded-xl my-2.5 text-left">
            <Compass className="w-4 h-4 text-[#8c530b] dark:text-[#d4af37] shrink-0" />
            <p className="text-xs text-stone-700 dark:text-zinc-200 font-medium leading-snug">
              <span className="font-bold text-[#8c530b] dark:text-[#d4af37] uppercase text-[10px] tracking-wider">
                {activeProduct.name} Impression:
              </span>{" "}
              {activeProduct.inspiration}
            </p>
          </div>
        )}

        {/* ========================================================
            3. SECTION TITLE: OLFACTORY ARCHITECTURE
           ======================================================== */}
        <div className="mt-4 mb-2.5 text-left flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-serif font-bold tracking-[0.22em] uppercase text-stone-900 dark:text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#8c530b] dark:text-[#d4af37]" />
            <span>
              {isBundle ? `${activeProduct.name} Scent Architecture` : "Olfactory Architecture"}
            </span>
          </span>
          <span className="text-[10px] font-semibold text-stone-500 dark:text-zinc-400">
            35% Oil Extrait
          </span>
        </div>

        {/* ========================================================
            4. THE 3 NOTES ARCHITECTURE CARDS (Top, Heart, Base)
           ======================================================== */}
        <div className="space-y-2 text-left">
          {/* Top Notes */}
          <div className="bg-[#fcfaf6] dark:bg-[#181820] border border-stone-200/90 dark:border-white/15 rounded-xl p-3 sm:p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#d4af37]">
              <Wind className="w-3.5 h-3.5" />
              <span>Top Notes</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-200 font-medium mt-1 leading-snug">
              {currentNotes.top.join(", ")}
            </p>
          </div>

          {/* Heart Notes */}
          <div className="bg-[#fcfaf6] dark:bg-[#181820] border border-stone-200/90 dark:border-white/15 rounded-xl p-3 sm:p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#d4af37]">
              <Heart className="w-3.5 h-3.5 fill-[#8c530b]/20 dark:fill-[#d4af37]/20" />
              <span>Heart Notes</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-200 font-medium mt-1 leading-snug">
              {currentNotes.heart.join(", ")}
            </p>
          </div>

          {/* Base Notes */}
          <div className="bg-[#fcfaf6] dark:bg-[#181820] border border-stone-200/90 dark:border-white/15 rounded-xl p-3 sm:p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-bold tracking-widest uppercase text-[#8c530b] dark:text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Base Notes</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-200 font-medium mt-1 leading-snug">
              {currentNotes.base.join(", ")}
            </p>
          </div>
        </div>

        {/* ========================================================
            5. LONGEVITY & SILLAGE ROW
           ======================================================== */}
        <div className="flex items-center justify-between text-xs sm:text-sm py-2.5 border-t border-stone-200 dark:border-zinc-800/80 mt-4 text-left">
          <span className="text-stone-600 dark:text-zinc-400 font-normal">
            Longevity &amp; Sillage:
          </span>
          <span className="font-bold text-stone-900 dark:text-[#f5e7b2]">
            {activeProduct.projection || (isBundle ? "Dual Extrait Endurance (14+ Hours)" : "14+ Hours Radiant Sillage")}
          </span>
        </div>

        {/* ========================================================
            6. PRIMARY ACTION: ADD TO SHOPPING BAG
            High-contrast in both light and dark themes
           ======================================================== */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-3.5 px-5 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 mt-3 cursor-pointer border ${
            isAdded
              ? "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600"
              : "bg-[#121212] hover:bg-black dark:bg-[#d4af37] dark:hover:bg-[#e2c158] text-white dark:text-[#09090b] border-black dark:border-amber-300/70"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Shopping Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-amber-400 dark:text-[#09090b]" />
              <span>{isBundle ? "Add Bundle to Shopping Bag" : "Add to Shopping Bag"}</span>
            </>
          )}
        </button>

        {/* ========================================================
            7. VIEW FULL PRODUCT DETAILS LINK
           ======================================================== */}
        <div className="text-center mt-3">
          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="text-xs font-semibold text-stone-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#d4af37] underline underline-offset-4 transition-colors"
          >
            {isBundle
              ? "View Complete Bundle Story & Presentation Details \u2192"
              : "View Complete Fragrance Story & Customer Reviews \u2192"}
          </Link>
        </div>
      </div>
    </div>
  );
}
