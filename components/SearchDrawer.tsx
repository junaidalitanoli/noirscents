"use client";

import React, { useState } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { Product, PRODUCTS } from "../lib/products";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchDrawer({
  isOpen,
  onClose,
  onSelectProduct,
}: SearchDrawerProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.topNotes.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
          p.heartNotes.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
          p.baseNotes.some((n) => n.toLowerCase().includes(query.toLowerCase()))
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm animate-fade pt-12 px-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-neutral-200 z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
          <Search size={20} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Search perfumes, scent notes (e.g. Oud, Vanilla, Bergamot)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm sm:text-base outline-none text-neutral-900 placeholder:text-neutral-400 bg-transparent font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-neutral-400 hover:text-neutral-700 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-3">
            {query.trim() ? `Search Results (${filtered.length})` : "Featured Fragrances"}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-neutral-500">
              <p className="text-sm font-medium">No fragrances match &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching for Talis, Hibiscaria, Gozoire, or notes like Vanilla or Oud.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="group flex items-center gap-3 p-2.5 rounded-lg border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50/70 cursor-pointer transition-all duration-200"
                >
                  <div className="w-16 h-20 bg-neutral-100 rounded overflow-hidden shrink-0 border border-neutral-200">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      {product.genderLabel}
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider truncate group-hover:text-neutral-600 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-xs font-bold text-neutral-950 mt-0.5">
                      {product.formattedPrice}
                    </p>
                    <span className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                      {product.topNotes.slice(0, 2).join(", ")}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all mr-1"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
