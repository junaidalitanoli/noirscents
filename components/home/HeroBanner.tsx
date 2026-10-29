"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Droplet } from "lucide-react";

export default function HeroBanner() {
  const [activeFlacon, setActiveFlacon] = useState<"black" | "floral" | "amber">("black");

  const flacons = {
    black: {
      id: "black",
      name: "Desert Majesty",
      edition: "Obsidian Black Edition • For Men",
      concentration: "35% Extrait de Parfum",
      volume: "50ml Flacon",
      notes: "Saffron • Smoky Amber • Desert Cedarwood",
      image: "/images/noir-black-flacon.jpg",
      alt: "Noir Scent Desert Majesty 50ml Obsidian Black Extrait Flacon",
      link: "/products/desert-majesty",
      badge: "Men's Flagship",
      accentPill: "bg-amber-500",
    },
    floral: {
      id: "floral",
      name: "Loyal Heart",
      edition: "Luminous Crystal Edition • For Women",
      concentration: "35% Extrait de Parfum",
      volume: "50ml Flacon",
      notes: "Williams Pear • Night Jasmine • Pink Peony",
      image: "/images/noir-gold-floral.jpg",
      alt: "Noir Scent Loyal Heart 50ml Luminous Crystal Floral Extrait Flacon",
      link: "/products/loyal-heart",
      badge: "Women's Flagship",
      accentPill: "bg-rose-400",
    },
    amber: {
      id: "amber",
      name: "Raaz Reserve",
      edition: "Royal Amber Crystal • Unisex",
      concentration: "35% Extrait de Parfum",
      volume: "50ml Flacon",
      notes: "Cognac Amber • Madagascar Vanilla • Sandalwood",
      image: "/images/royal-amber-bottle.jpg",
      alt: "Noir Scent Royal Amber 50ml Faceted Crystal Extrait Bottle",
      link: "/products/raaz",
      badge: "Connoisseur's Choice",
      accentPill: "bg-amber-600",
    },
  };

  const current = flacons[activeFlacon];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#fdfcf9] via-[#f8f4ec] to-[#f1e7d6] dark:from-[#09090b] dark:via-[#0e0e12] dark:to-[#131318] text-stone-900 dark:text-white border-b border-[#eae1d3] dark:border-white/10 overflow-hidden transition-colors">
      {/* Soft Colorful Ambient Glow (Light Golden Sunlight + Subtle Rose Amber) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 75% 45%, rgba(240, 210, 150, 0.35) 0%, rgba(248, 244, 236, 0) 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle 45% at 15% 25%, rgba(244, 204, 180, 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 1. PRODUCT STAGE (Highlighted First on Mobile, Dominant 7-cols on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-center">
            {/* Colorful Flacon Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-white/80 dark:bg-black/60 p-1.5 rounded-full border border-stone-200/90 dark:border-white/15 backdrop-blur-md shadow-sm">
              <button
                type="button"
                onClick={() => setActiveFlacon("black")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "black"
                    ? "bg-[#8c5e12] text-white dark:bg-[#c9a96a] dark:text-[#09090b] shadow-sm"
                    : "text-stone-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>Men&apos;s Obsidian</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFlacon("floral")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "floral"
                    ? "bg-[#be185d] text-white dark:bg-[#f472b6] dark:text-[#09090b] shadow-sm"
                    : "text-stone-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-pink-300 shrink-0" />
                <span>Women&apos;s Peony</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFlacon("amber")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "amber"
                    ? "bg-[#b45309] text-white dark:bg-[#fbbf24] dark:text-[#09090b] shadow-sm"
                    : "text-stone-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-300 shrink-0" />
                <span>Royal Amber</span>
              </button>
            </div>

            {/* THE HERO PRODUCT SHOWCASE CONTAINER */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-white dark:bg-[#121216] border-2 border-[#c5a059]/40 shadow-[0_25px_60px_-15px_rgba(180,131,37,0.18)] dark:shadow-2xl group">
              {/* Product Bottle Image */}
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 650px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette at bottom for card readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Specification Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md border border-[#c5a059]/40 text-[#8c6314] dark:text-[#f5e7b2] text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                  <span>{current.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md border border-stone-200 dark:border-white/20 text-stone-800 dark:text-white text-[10.5px] font-semibold uppercase tracking-wider shadow-sm">
                  <Droplet className="w-3 h-3 text-[#c5a059]" />
                  <span>35% Pure Extrait</span>
                </span>
              </div>

              {/* Floating Bottom Flacon Card with Direct Action */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-[#0a0a0d]/90 backdrop-blur-md rounded-2xl border border-stone-200/90 dark:border-white/20 text-xs flex items-center justify-between shadow-xl">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-stone-950 dark:text-white tracking-wide">
                    {current.name}
                  </h3>
                  <p className="text-[11px] text-[#9b6f1e] dark:text-[#c9a96a] font-semibold mt-0.5">
                    {current.edition}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400 mt-0.5">
                    Notes: {current.notes}
                  </p>
                </div>
                <Link
                  href={current.link}
                  className="px-4 py-2.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 ml-3 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Micro-Specs under the bottle */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-md sm:max-w-lg lg:max-w-xl mt-3 text-[11px] text-stone-600 dark:text-zinc-400 font-medium text-center">
              <div className="p-2.5 bg-white/70 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl shadow-2xs">
                <span className="text-[#9b6f1e] dark:text-[#c9a96a] block font-bold text-xs">50 ML</span>
                <span>Artisanal Flacon</span>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl shadow-2xs">
                <span className="text-[#9b6f1e] dark:text-[#c9a96a] block font-bold text-xs">35% OIL</span>
                <span>All-Day Sillage</span>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 rounded-xl shadow-2xs">
                <span className="text-[#9b6f1e] dark:text-[#c9a96a] block font-bold text-xs">COD</span>
                <span>Nationwide TCS</span>
              </div>
            </div>
          </div>

          {/* 2. EDITORIAL COPY (Refined, Crisp, High-Contrast) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 dark:bg-[#14141a] border border-amber-300/80 dark:border-[#c9a96a]/40 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8c6314] dark:text-[#f5e7b2] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#b48325] dark:text-[#c9a96a]" />
              <span>Haute Parfumerie &bull; Extrait de Parfum</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-950 dark:text-white leading-[1.1]">
              Scents That Command{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#8c5e12] via-[#b48325] to-[#7d5612] dark:from-[#ffe8b3] dark:via-[#c9a96a] dark:to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 max-w-md font-light leading-relaxed">
              Handcrafted in small batches with an extraordinary 35% pure oil concentration. Formulated to project with distinguished authority and endure throughout Pakistan&apos;s climate.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-[0.16em] transition-all rounded-lg shadow-md active:scale-95 cursor-pointer text-center"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 dark:bg-white/5 border border-stone-300 dark:border-white/20 hover:border-[#b48325] text-stone-900 hover:text-stone-950 dark:text-white dark:hover:text-[#f5e7b2] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-white transition-all rounded-lg cursor-pointer text-center shadow-2xs"
              >
                All 13 Fragrances
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
