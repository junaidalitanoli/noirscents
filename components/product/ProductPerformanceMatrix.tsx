import { Sparkles, Clock, Wind, User, Calendar, Award, Droplets } from "lucide-react";
import { Product } from "@/types";

interface ProductPerformanceMatrixProps {
  product: Product;
}

export default function ProductPerformanceMatrix({ product }: ProductPerformanceMatrixProps) {
  const accords = product.accords || [
    ...product.notes.top.slice(0, 2),
    ...product.notes.heart.slice(0, 2),
    ...product.notes.base.slice(0, 2),
  ];

  const concentration = product.concentration || "Extrait de Parfum (35% Fragrance Oil)";
  const longevityScore = product.longevity || 5;
  const macerationDays = product.macerationDays || 45;
  const gender = product.gender || (product.category === "men" ? "Men" : product.category === "women" ? "Women" : "Unisex");
  const season = product.season || "All Seasons in Pakistan";
  const occasion = product.occasion || "Formal Gatherings, Weddings & Daily Signature";

  return (
    <div className="space-y-8 bg-white dark:bg-[#111115] border border-black/8 dark:border-white/10 p-6 sm:p-8 transition-colors">
      {/* Main Accords Bar (Scents 'n Stories signature accord pills) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
              Main Accords &amp; Scent Aura
            </h3>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
            Olfactory Profile
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {accords.map((accord, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f7f5f0] dark:bg-[#181820] border border-[#e8dfcf] dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 shadow-2xs hover:bg-[#efe7d6] dark:hover:bg-[#22222c] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] dark:bg-[#d4af37] mr-2" />
              {accord}
            </span>
          ))}
        </div>
      </div>

      {/* Major Ingredients %-wise (Scents 'n Stories signature element) */}
      {product.majorIngredients && product.majorIngredients.length > 0 && (
        <div className="pt-6 border-t border-black/8 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
                Major Ingredients (% Concentration Formulation)
              </h3>
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light hidden sm:inline">
              Pure Artisanal Extracts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {product.majorIngredients.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-[#16161c] border border-zinc-200/80 dark:border-zinc-800 text-xs"
              >
                <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate pr-2">
                  {item.name}
                </span>
                <span className="font-bold text-[#c5a059] dark:text-[#d4af37] shrink-0 font-mono">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6-Cell Luxury Performance & Characteristic Grid */}
      <div className="pt-6 border-t border-black/8 dark:border-white/10">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5] mb-4">
          Performance &amp; Wearability Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Concentration */}
          <div className="p-4 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Concentration
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {concentration}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                Superior depth &amp; diffusion
              </p>
            </div>
          </div>

          {/* 2. Longevity */}
          <div className="p-4 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  Lasting Power
                </p>
                <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">
                  {product.longevityHours || "12+ Hours"}
                </span>
              </div>
              <div className="flex gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < longevityScore ? "bg-[#c5a059] dark:bg-[#d4af37]" : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-1">
                Clings to skin &amp; fabric all day
              </p>
            </div>
          </div>

          {/* 3. Sillage & Projection */}
          <div className="p-4 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
              <Wind className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Sillage &amp; Projection
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {product.projection || "Strong & Radiant"}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                Commanding aromatic scent trail
              </p>
            </div>
          </div>

          {/* 4. Gender / Silhouette */}
          <div className="p-4 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Gender Silhouette
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {gender}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                {occasion}
              </p>
            </div>
          </div>

          {/* 5. Best Season */}
          <div className="p-4 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Recommended Season
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {season}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                Optimized for Pakistani climate
              </p>
            </div>
          </div>

          {/* 6. Maturation / Super Maceration */}
          <div className="p-4 bg-[#fbf9f4] dark:bg-[#1a1714] border border-[#e8dfcf] dark:border-amber-700/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100/70 dark:bg-amber-950/70 border border-amber-300/80 dark:border-amber-600/60 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#b48325] dark:text-[#d4af37]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#996515] dark:text-[#f5e7b2] font-bold">
                Super Macerated
              </p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {macerationDays}-Day Vault Maturation
              </p>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-light mt-0.5">
                Aged in dark chambers for smooth sillage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
