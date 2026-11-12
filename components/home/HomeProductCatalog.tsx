"use client";

import { useState, useMemo } from "react";
import { Sparkles, Flame, User, Heart, Gift } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";

interface HomeProductCatalogProps {
  products: Product[];
}

type FilterTab = "all" | "bestsellers" | "men" | "women" | "deals";

export default function HomeProductCatalog({ products }: HomeProductCatalogProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const menCount = useMemo(() => products.filter((p) => p.category === "men").length, [products]);
  const womenCount = useMemo(() => products.filter((p) => p.category === "women").length, [products]);
  const dealsCount = useMemo(() => products.filter((p) => p.category === "deals").length, [products]);
  const bestSellerCount = useMemo(() => products.filter((p) => p.isBestSeller).length, [products]);

  const displayedProducts = useMemo(() => {
    switch (activeTab) {
      case "men":
        return products.filter((p) => p.category === "men");
      case "women":
        return products.filter((p) => p.category === "women");
      case "deals":
        return products.filter((p) => p.category === "deals");
      case "bestsellers":
        return products.filter((p) => p.isBestSeller);
      default:
        return products;
    }
  }, [products, activeTab]);

  return (
    <section id="all-products" className="py-8 sm:py-12 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Header & Interactive Filter Tabs (Scent 'n Stories Style) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-stone-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8c530b] dark:text-[#c9a96a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Catalog &bull; 35% Pure Extraits</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-[#1a140e] dark:text-white font-serif mt-0.5">
            Artisanal Perfume Creations
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "all"
                ? "bg-[#121212] text-white border-black dark:bg-[#d4af37] dark:text-[#09090b] dark:border-amber-300 shadow-sm"
                : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-700 dark:bg-[#1a1a24] dark:border-white/20 dark:text-zinc-200 dark:hover:bg-[#252532] dark:hover:border-amber-400/50 shadow-2xs"
            }`}
          >
            <span>All ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bestsellers")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "bestsellers"
                ? "bg-[#8c530b] text-white border-[#8c530b] dark:bg-[#d4af37] dark:text-[#09090b] dark:border-amber-300 shadow-sm"
                : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-700 dark:bg-[#1a1a24] dark:border-white/20 dark:text-zinc-200 dark:hover:bg-[#252532] dark:hover:border-amber-400/50 shadow-2xs"
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Best Sellers ({bestSellerCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("men")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "men"
                ? "bg-[#121212] text-white border-black dark:bg-[#d4af37] dark:text-[#09090b] dark:border-amber-300 shadow-sm"
                : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-700 dark:bg-[#1a1a24] dark:border-white/20 dark:text-zinc-200 dark:hover:bg-[#252532] dark:hover:border-amber-400/50 shadow-2xs"
            }`}
          >
            <User className="w-3 h-3" />
            <span>Men ({menCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("women")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "women"
                ? "bg-[#be185d] text-white border-[#be185d] dark:bg-[#f472b6] dark:text-[#09090b] dark:border-pink-300 shadow-sm"
                : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-700 dark:bg-[#1a1a24] dark:border-white/20 dark:text-zinc-200 dark:hover:bg-[#252532] dark:hover:border-amber-400/50 shadow-2xs"
            }`}
          >
            <Heart className="w-3 h-3 text-pink-400" />
            <span>Women ({womenCount})</span>
          </button>

          {dealsCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("deals")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === "deals"
                  ? "bg-[#8c530b] text-white border-[#8c530b] dark:bg-[#d4af37] dark:text-[#09090b] dark:border-amber-300 shadow-sm"
                  : "bg-amber-100/70 hover:bg-amber-200/80 border-amber-300/70 text-[#8c530b] dark:bg-[#261f12] dark:border-amber-500/40 dark:text-amber-300 dark:hover:bg-[#322714] dark:hover:border-amber-400 shadow-2xs"
              }`}
            >
              <Gift className="w-3 h-3 text-amber-500" />
              <span>Bundles &amp; Offers ({dealsCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
