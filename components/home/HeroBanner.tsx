"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Droplet } from "lucide-react";

export default function HeroBanner() {
  const [activeFlacon, setActiveFlacon] = useState<"black" | "gold">("black");

  const flacons = {
    black: {
      id: "black",
      name: "Desert Majesty",
      edition: "Obsidian Black Edition • For Men",
      concentration: "35% Extrait de Parfum",
      volume: "50ml Flacon",
      notes: "Saffron • Amber • Desert Cedarwood",
      image: "/images/noir-black-flacon.jpg",
      alt: "Noir Scent Desert Majesty 50ml Obsidian Black Extrait Flacon",
      link: "/products/desert-majesty",
      badge: "Men's Flagship",
    },
    gold: {
      id: "gold",
      name: "Loyal Heart",
      edition: "Luminous Gold Edition • For Women",
      concentration: "35% Extrait de Parfum",
      volume: "50ml Flacon",
      notes: "Williams Pear • Jasmine • Amber Nectar",
      image: "/images/noir-gold-flacon.jpg",
      alt: "Noir Scent Loyal Heart 50ml Luminous Gold Extrait Flacon",
      link: "/products/loyal-heart",
      badge: "Women's Flagship",
    },
  };

  const current = flacons[activeFlacon];

  return (
    <section className="relative w-full bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      {/* Cinematic Golden Amber Glow Behind the Product */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 70% 50%, rgba(201, 169, 106, 0.22) 0%, rgba(8, 8, 10, 0) 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle 50% at 20% 30%, rgba(201, 169, 106, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 1. PRODUCT STAGE (Highlighted First on Mobile, Dominant 7-cols on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-center">
            {/* Flacon Switcher Pills */}
            <div className="flex items-center gap-2 mb-4 bg-black/60 p-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-lg">
              <button
                type="button"
                onClick={() => setActiveFlacon("black")}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeFlacon === "black"
                    ? "bg-[#c9a96a] text-[#09090b] shadow-md shadow-[#c9a96a]/20 scale-102"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                <span>Men&apos;s Obsidian</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFlacon("gold")}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeFlacon === "gold"
                    ? "bg-[#c9a96a] text-[#09090b] shadow-md shadow-[#c9a96a]/20 scale-102"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#f5e7b2] shrink-0" />
                <span>Women&apos;s Gold</span>
              </button>
            </div>

            {/* THE HERO PRODUCT SHOWCASE CONTAINER */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-[#101014] border-2 border-[#c9a96a]/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(201,169,106,0.15)] group">
              {/* Product Bottle Image */}
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 650px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette to ground the bottle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

              {/* Floating Top Specification Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#c9a96a]/40 text-[#f5e7b2] text-[10.5px] font-bold uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3 h-3 text-[#c9a96a]" />
                  <span>{current.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-semibold uppercase tracking-wider">
                  <Droplet className="w-3 h-3 text-[#c9a96a]" />
                  <span>35% Pure Extrait</span>
                </span>
              </div>

              {/* Floating Bottom Flacon Card with Direct Action */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0a0a0d]/90 backdrop-blur-md rounded-2xl border border-white/20 text-xs flex items-center justify-between shadow-xl">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white tracking-wide">
                    {current.name}
                  </h3>
                  <p className="text-[11px] text-[#c9a96a] font-medium mt-0.5">
                    {current.edition}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Notes: {current.notes}
                  </p>
                </div>
                <Link
                  href={current.link}
                  className="px-4 py-2.5 bg-[#c9a96a] hover:bg-[#dfbe7c] text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 ml-3 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Micro-Specs under the bottle */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-md sm:max-w-lg lg:max-w-xl mt-3 text-[11px] text-zinc-400 font-medium text-center">
              <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[#c9a96a] block font-bold text-xs">50 ML</span>
                <span>Artisanal Flacon</span>
              </div>
              <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[#c9a96a] block font-bold text-xs">35% OIL</span>
                <span>All-Day Sillage</span>
              </div>
              <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[#c9a96a] block font-bold text-xs">COD</span>
                <span>Nationwide TCS</span>
              </div>
            </div>
          </div>

          {/* 2. EDITORIAL COPY (Refined, Supporting the Flacon) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141a] border border-[#c9a96a]/40 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f5e7b2] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a96a]" />
              <span>Haute Parfumerie &bull; Extrait de Parfum</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.1]">
              Scents That Command{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ffe8b3] via-[#c9a96a] to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-md font-light leading-relaxed">
              Handcrafted in small batches with an extraordinary 35% pure oil concentration. Formulated to project with distinguished authority and endure throughout Pakistan&apos;s climate.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#c9a96a] hover:bg-[#dfbe7c] text-[#09090b] text-xs font-bold uppercase tracking-[0.16em] transition-all rounded-lg shadow-lg shadow-[#c9a96a]/20 active:scale-95 cursor-pointer text-center"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/20 hover:border-[#c9a96a] text-white hover:text-[#f5e7b2] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-white/10 transition-all rounded-lg cursor-pointer text-center"
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
