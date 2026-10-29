"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Filter, X } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const SCENT_FAMILIES = ["All Families", "Woody", "Amber", "Spicy", "Fresh", "Floral", "Oud"];
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rs. 3,500", min: 0, max: 3500 },
  { label: "Rs. 3,500 – Rs. 5,000", min: 3500, max: 5000 },
  { label: "Above Rs. 5,000", min: 5000, max: Infinity },
];

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [selectedFamily, setSelectedFamily] = useState<string>("All Families");
  const [selectedPriceIdx, setSelectedPriceIdx] = useState<number>(0);

  // Filter products by client-side state
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Scent family filter
      if (selectedFamily !== "All Families") {
        const familyLower = selectedFamily.toLowerCase();
        const matchesAccord = product.accords?.some((a) => a.toLowerCase().includes(familyLower));
        const matchesNote =
          product.notes.top.some((n) => n.toLowerCase().includes(familyLower)) ||
          product.notes.heart.some((n) => n.toLowerCase().includes(familyLower)) ||
          product.notes.base.some((n) => n.toLowerCase().includes(familyLower));
        const matchesDescription = product.description.toLowerCase().includes(familyLower);

        if (!matchesAccord && !matchesNote && !matchesDescription) {
          return false;
        }
      }

      // Price filter
      const activeRange = PRICE_RANGES[selectedPriceIdx];
      const primaryPrice = product.sizes[0]?.price ?? 0;
      if (primaryPrice < activeRange.min || primaryPrice > activeRange.max) {
        return false;
      }

      return true;
    });
  }, [products, selectedFamily, selectedPriceIdx]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      case "price-desc":
        return list.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
      case "newest":
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "featured":
      default:
        return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const hasActiveFilters = selectedFamily !== "All Families" || selectedPriceIdx !== 0;

  const handleResetFilters = () => {
    setSelectedFamily("All Families");
    setSelectedPriceIdx(0);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header bar with titles and sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/8 dark:border-white/10">
        <div>
          {title && (
            <h2 className="text-xl sm:text-2xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>}
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1 block">
            Showing {sortedProducts.length} of {products.length} {products.length === 1 ? "creation" : "creations"}
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label
            htmlFor="sort-select"
            className="text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-1"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "newest")
            }
            className="text-xs bg-white dark:bg-[#16161c] border border-zinc-300 dark:border-zinc-700 py-1.5 px-3 font-medium text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:border-black dark:focus:border-[#d4af37] transition-colors rounded-xs"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Date: New to Old</option>
          </select>
        </div>
      </div>

      {/* Client-Side Filter Pills (Clean, no URL params generated) */}
      <div className="bg-[#fafafa] dark:bg-[#121216] border border-black/6 dark:border-zinc-800 p-4 rounded-xl space-y-3.5 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            <Filter className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
            <span>Refine Fragrances</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Scent Family Pills */}
        <div>
          <span className="text-[10.5px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
            Scent Family:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SCENT_FAMILIES.map((family) => {
              const isSelected = selectedFamily === family;
              return (
                <button
                  key={family}
                  type="button"
                  onClick={() => setSelectedFamily(family)}
                  className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer font-medium border ${
                    isSelected
                      ? "bg-[#121212] text-white border-black dark:bg-[#d4af37] dark:text-[#09090b] dark:border-[#d4af37] shadow-2xs font-semibold"
                      : "bg-white dark:bg-[#181820] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range Pills */}
        <div>
          <span className="text-[10.5px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
            Price Range:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRICE_RANGES.map((range, idx) => {
              const isSelected = selectedPriceIdx === idx;
              return (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => setSelectedPriceIdx(idx)}
                  className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer font-medium border ${
                    isSelected
                      ? "bg-[#121212] text-white border-black dark:bg-[#d4af37] dark:text-[#09090b] dark:border-[#d4af37] shadow-2xs font-semibold"
                      : "bg-white dark:bg-[#181820] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">No fragrances match the selected filters.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-3 text-xs font-semibold text-[#b48325] dark:text-[#d4af37] underline underline-offset-4 cursor-pointer"
          >
            Clear filters and view all fragrances
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
