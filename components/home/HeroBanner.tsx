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
      accentDot: "bg-amber-400",
      themeBg: "from-[#fbf5ec] via-[#f5e7d2] to-[#ebd4b4] dark:from-[#09090c] dark:via-[#0e0e13] dark:to-[#14131a]",
      themeBorder: "border-[#d8bf94] dark:border-white/10",
      glowColor1: "rgba(224, 155, 45, 0.42)",
      glowColor2: "rgba(180, 110, 20, 0.28)",
      activeTabClass: "bg-[#8c530b] text-white shadow-md shadow-amber-900/20",
      eyebrowBadge: "bg-amber-500/20 text-[#7a4805] border-2 border-amber-500/40 dark:bg-zinc-800 dark:text-[#f5e7b2] dark:border-zinc-700",
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
      accentDot: "bg-pink-400",
      themeBg: "from-[#fff0ec] via-[#fde0d7] to-[#f7c8ba] dark:from-[#110a0f] dark:via-[#170e15] dark:to-[#1c121b]",
      themeBorder: "border-[#f1b7a9] dark:border-white/10",
      glowColor1: "rgba(240, 110, 145, 0.42)",
      glowColor2: "rgba(235, 160, 175, 0.30)",
      activeTabClass: "bg-[#be185d] text-white shadow-md shadow-pink-900/20",
      eyebrowBadge: "bg-rose-500/20 text-rose-900 border-2 border-rose-400/60 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800/40",
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
      accentDot: "bg-amber-400",
      themeBg: "from-[#fbf3e5] via-[#f4e2c6] to-[#e8caa2] dark:from-[#0f0c08] dark:via-[#17120a] dark:to-[#1f180d]",
      themeBorder: "border-[#dcb888] dark:border-white/10",
      glowColor1: "rgba(235, 145, 30, 0.45)",
      glowColor2: "rgba(205, 115, 15, 0.32)",
      activeTabClass: "bg-[#b45309] text-white shadow-md shadow-amber-950/20",
      eyebrowBadge: "bg-amber-500/20 text-[#7a4805] border-2 border-amber-500/40 dark:bg-amber-950/40 dark:text-[#f5e7b2] dark:border-amber-700/40",
    },
  };

  const current = flacons[activeFlacon];

  return (
    <section
      className={`relative w-full bg-gradient-to-br ${current.themeBg} text-stone-900 dark:text-white border-b-2 ${current.themeBorder} overflow-hidden transition-all duration-700`}
    >
      {/* Saturated Ambient Atmospheric Lighting (Shifts with Selected Fragrance) */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-90 dark:opacity-30"
        style={{
          background: `radial-gradient(ellipse 65% 65% at 75% 45%, ${current.glowColor1} 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-70 dark:opacity-20"
        style={{
          background: `radial-gradient(circle 50% at 20% 30%, ${current.glowColor2} 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 1. PRODUCT STAGE (Prominent Centerpiece, 7-Cols Desktop, 1st on Mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-center">
            {/* Colorful Flacon Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-white/90 dark:bg-black/70 p-1.5 rounded-full border-2 border-[#d4af37]/40 dark:border-white/15 backdrop-blur-md shadow-md">
              <button
                type="button"
                onClick={() => setActiveFlacon("black")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "black"
                    ? flacons.black.activeTabClass
                    : "text-stone-700 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${flacons.black.accentDot} shrink-0`} />
                <span>Men&apos;s Obsidian</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFlacon("floral")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "floral"
                    ? flacons.floral.activeTabClass
                    : "text-stone-700 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${flacons.floral.accentDot} shrink-0`} />
                <span>Women&apos;s Peony</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFlacon("amber")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "amber"
                    ? flacons.amber.activeTabClass
                    : "text-stone-700 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${flacons.amber.accentDot} shrink-0`} />
                <span>Royal Amber</span>
              </button>
            </div>

            {/* THE HERO PRODUCT PEDESTAL CONTAINER (High-Jewelry Dual Bezel) */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl p-2 sm:p-2.5 rounded-[32px] bg-white/80 dark:bg-white/5 backdrop-blur-md border-2 border-[#d4af37]/60 shadow-[0_25px_60px_-10px_rgba(180,131,37,0.30)] group">
              <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[24px] overflow-hidden bg-white dark:bg-[#121216]">
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
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md border-2 border-[#c5a059]/60 text-[#7a4805] dark:text-[#f5e7b2] text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                    <span>{current.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md border border-stone-300 dark:border-white/20 text-stone-900 dark:text-white text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
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
                    <p className="text-[11px] text-[#8c530b] dark:text-[#c9a96a] font-bold mt-0.5">
                      {current.edition}
                    </p>
                    <p className="text-[10px] text-stone-600 dark:text-zinc-400 mt-0.5 font-medium">
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
            </div>

            {/* Quick Micro-Specs under the bottle */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-md sm:max-w-lg lg:max-w-xl mt-3.5 text-[11px] text-stone-700 dark:text-zinc-300 font-medium text-center">
              <div className="p-2.5 bg-white/85 dark:bg-white/5 border border-[#d8bf94]/70 dark:border-white/10 rounded-xl shadow-xs">
                <span className="text-[#8c530b] dark:text-[#c9a96a] block font-bold text-xs">50 ML</span>
                <span>Artisanal Flacon</span>
              </div>
              <div className="p-2.5 bg-white/85 dark:bg-white/5 border border-[#d8bf94]/70 dark:border-white/10 rounded-xl shadow-xs">
                <span className="text-[#8c530b] dark:text-[#c9a96a] block font-bold text-xs">35% OIL</span>
                <span>All-Day Sillage</span>
              </div>
              <div className="p-2.5 bg-white/85 dark:bg-white/5 border border-[#d8bf94]/70 dark:border-white/10 rounded-xl shadow-xs">
                <span className="text-[#8c530b] dark:text-[#c9a96a] block font-bold text-xs">COD</span>
                <span>Nationwide TCS</span>
              </div>
            </div>
          </div>

          {/* 2. EDITORIAL COPY (Refined, High Contrast, Luxury Tone) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6 text-left">
            {/* Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] shadow-xs ${current.eyebrowBadge}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b48325] dark:text-[#c9a96a]" />
              <span>Haute Parfumerie &bull; Extrait de Parfum</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a140e] dark:text-white leading-[1.1]">
              Scents That Command{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7a4805] via-[#b47a16] to-[#5a3404] dark:from-[#ffe8b3] dark:via-[#c9a96a] dark:to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-300 max-w-md font-normal leading-relaxed">
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/90 dark:bg-white/5 border-2 border-stone-300 dark:border-white/20 hover:border-[#b48325] text-stone-900 hover:text-stone-950 dark:text-white dark:hover:text-[#f5e7b2] text-xs font-bold uppercase tracking-[0.16em] hover:bg-white transition-all rounded-lg cursor-pointer text-center shadow-xs"
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
