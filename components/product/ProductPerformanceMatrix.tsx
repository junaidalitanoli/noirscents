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
    <div className="space-y-8 bg-white border border-black/8 p-6 sm:p-8">
      {/* Main Accords Bar (Scents 'n Stories signature accord pills) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121212]">
              Main Accords &amp; Scent Aura
            </h3>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
            Olfactory Profile
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {accords.map((accord, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f7f5f0] border border-[#e8dfcf] text-zinc-900 shadow-2xs hover:bg-[#efe7d6] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mr-2" />
              {accord}
            </span>
          ))}
        </div>
      </div>

      {/* Major Ingredients %-wise (Scents 'n Stories signature element) */}
      {product.majorIngredients && product.majorIngredients.length > 0 && (
        <div className="pt-6 border-t border-black/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#c5a059]" />
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121212]">
                Major Ingredients (% Concentration Formulation)
              </h3>
            </div>
            <span className="text-[11px] text-zinc-500 font-light hidden sm:inline">
              Pure Artisanal Extracts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {product.majorIngredients.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-200/80 text-xs"
              >
                <span className="font-medium text-zinc-800 truncate pr-2">
                  {item.name}
                </span>
                <span className="font-bold text-[#c5a059] shrink-0 font-mono">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6-Cell Luxury Performance & Characteristic Grid */}
      <div className="pt-6 border-t border-black/8">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121212] mb-4">
          Performance &amp; Wearability Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Concentration */}
          <div className="p-4 bg-[#fafafa] border border-black/6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                Concentration
              </p>
              <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                {concentration}
              </p>
              <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                Superior depth &amp; diffusion
              </p>
            </div>
          </div>

          {/* 2. Longevity */}
          <div className="p-4 bg-[#fafafa] border border-black/6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Lasting Power
                </p>
                <span className="text-[11px] font-bold text-zinc-900">
                  12+ Hours
                </span>
              </div>
              <div className="flex gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < longevityScore ? "bg-[#c5a059]" : "bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-zinc-500 font-light mt-1">
                Clings to skin &amp; fabric all day
              </p>
            </div>
          </div>

          {/* 3. Sillage & Projection */}
          <div className="p-4 bg-[#fafafa] border border-black/6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
              <Wind className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                Sillage &amp; Projection
              </p>
              <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                {product.projection || "Strong & Radiant"}
              </p>
              <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                Commanding aromatic scent trail
              </p>
            </div>
          </div>

          {/* 4. Gender / Silhouette */}
          <div className="p-4 bg-[#fafafa] border border-black/6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                Gender Silhouette
              </p>
              <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                {gender}
              </p>
              <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                {occasion}
              </p>
            </div>
          </div>

          {/* 5. Best Season */}
          <div className="p-4 bg-[#fafafa] border border-black/6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                Recommended Season
              </p>
              <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                {season}
              </p>
              <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                Optimized for Pakistani climate
              </p>
            </div>
          </div>

          {/* 6. Maturation / Super Maceration */}
          <div className="p-4 bg-[#fbf9f4] border border-[#e8dfcf] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100/70 border border-amber-300/80 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#b48325]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#996515] font-bold">
                Super Macerated
              </p>
              <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                {macerationDays}-Day Vault Maturation
              </p>
              <p className="text-[11px] text-zinc-600 font-light mt-0.5">
                Aged in dark chambers for smooth sillage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
