"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const sortedProducts = useMemo(() => {
    const list = [...products];
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
  }, [products, sortBy]);

  return (
    <div className="w-full">
      {/* Header bar with controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/8">
        <div>
          {title && <h2 className="text-xl sm:text-2xl font-semibold uppercase tracking-tight text-[#121212]">{title}</h2>}
          {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
          <span className="text-xs text-zinc-500 font-medium mt-1 block">
            {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs uppercase tracking-wider font-semibold text-zinc-600 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "newest")
            }
            className="text-xs bg-white border border-zinc-300 py-1.5 px-3 font-medium text-zinc-800 focus:outline-hidden focus:border-black"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Date: New to Old</option>
          </select>
        </div>
      </div>

      {/* Grid: 2 columns on mobile (390px), 3 on tablet (768px), 4 on desktop (1440px) */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 border border-zinc-200">
          <p className="text-zinc-600 text-sm font-medium">No perfumes found in this selection.</p>
          <p className="text-zinc-400 text-xs mt-1">Please try searching with other categories or keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {sortedProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} priority={idx < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
