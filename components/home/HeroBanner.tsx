"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function HeroBanner() {
  const [activeFlacon, setActiveFlacon] = useState<"black" | "floral" | "amber">("black");

  const flacons = {
    black: {
      id: "black",
      name: "Desert Majesty",
      edition: "Obsidian Black • For Men",
      notes: "Saffron • Smoky Amber • Desert Cedarwood",
      image: "/images/noir-black-flacon.jpg",
      alt: "Noir Scent Desert Majesty 50ml Obsidian Black Extrait Flacon",
      link: "/products/desert-majesty",
      badge: "Men's Flagship",
      price: "Rs. 3,450",
      accentDot: "bg-amber-400",
      themeBg: "from-[#fbf5ec] via-[#f5e7d2] to-[#ebd4b4] dark:from-[#09090c] dark:via-[#0e0e13] dark:to-[#14131a]",
      themeBorder: "border-[#d8bf94] dark:border-white/10",
      activeTabClass: "bg-[#8c530b] text-white shadow-md shadow-amber-900/20",
    },
    floral: {
      id: "floral",
      name: "Loyal Heart",
      edition: "Crystal Edition • For Women",
      notes: "Williams Pear • Night Jasmine • Pink Peony",
      image: "/images/noir-gold-floral.jpg",
      alt: "Noir Scent Loyal Heart 50ml Luminous Crystal Floral Extrait Flacon",
      link: "/products/loyal-heart",
      badge: "Women's Flagship",
      price: "Rs. 3,250",
      accentDot: "bg-pink-400",
      themeBg: "from-[#fff0ec] via-[#fde0d7] to-[#f7c8ba] dark:from-[#110a0f] dark:via-[#170e15] dark:to-[#1c121b]",
      themeBorder: "border-[#f1b7a9] dark:border-white/10",
      activeTabClass: "bg-[#be185d] text-white shadow-md shadow-pink-900/20",
    },
    amber: {
      id: "amber",
      name: "Raaz Reserve",
      edition: "Royal Amber Crystal • Unisex",
      notes: "Cognac Amber • Madagascar Vanilla • Sandalwood",
      image: "/images/royal-amber-bottle.jpg",
      alt: "Noir Scent Royal Amber 50ml Faceted Crystal Extrait Bottle",
      link: "/products/raaz",
      badge: "Connoisseur's Choice",
      price: "Rs. 3,650",
      accentDot: "bg-amber-400",
      themeBg: "from-[#fbf3e5] via-[#f4e2c6] to-[#e8caa2] dark:from-[#0f0c08] dark:via-[#17120a] dark:to-[#1f180d]",
      themeBorder: "border-[#dcb888] dark:border-white/10",
      activeTabClass: "bg-[#b45309] text-white shadow-md shadow-amber-950/20",
    },
  };

  const current = flacons[activeFlacon];

  return (
    <section
      className={`relative w-full bg-gradient-to-br ${current.themeBg} text-stone-900 dark:text-white border-b-2 ${current.themeBorder} overflow-hidden transition-all duration-500`}
    >
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* 1. EDITORIAL COLUMN (Left on desktop, 2nd on mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-4 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-[#7a4805] dark:text-[#f5e7b2] border border-amber-500/30 text-[10.5px] font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#8c530b] dark:text-[#c9a96a]" />
              <span>35% Pure Oil Extrait de Parfum</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a140e] dark:text-white leading-[1.15]">
              Scents That Command{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7a4805] via-[#b47a16] to-[#5a3404] dark:from-[#ffe8b3] dark:via-[#c9a96a] dark:to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
              Handcrafted artisanal extraits engineered for enduring sillage across Pakistan. Zero alcohol burn, 45-day atelier maceration, and nationwide Cash on Delivery.
            </p>

            {/* CTAs */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <a
                href="#all-products"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>Shop Fragrances</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/collections/men"
                className="inline-flex items-center px-5 py-3 bg-white/90 dark:bg-white/5 border border-stone-300 dark:border-white/20 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-2xs"
              >
                Men&apos;s Line
              </Link>
              <Link
                href="/collections/women"
                className="inline-flex items-center px-5 py-3 bg-white/90 dark:bg-white/5 border border-stone-300 dark:border-white/20 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-2xs"
              >
                Women&apos;s Line
              </Link>
            </div>

            {/* Trust Mini Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] text-stone-600 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#c9a96a]" />
                Free Shipping over Rs. 3,000
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#c9a96a]" />
                7-Day Scent Swap Guarantee
              </span>
            </div>
          </div>

          {/* 2. PRODUCT STAGE (Clean, 100% Unobstructed Bottle Showcase) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center">
            {/* Interactive Flacon Switcher Pills */}
            <div className="flex items-center justify-center gap-1.5 mb-3 bg-white/95 dark:bg-black/75 p-1 rounded-full border border-stone-300 dark:border-white/15 backdrop-blur-md shadow-xs">
              <button
                type="button"
                onClick={() => setActiveFlacon("black")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "black"
                    ? flacons.black.activeTabClass
                    : "text-stone-700 dark:text-zinc-300 hover:text-black"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${flacons.black.accentDot} shrink-0`} />
                <span>Men&apos;s Obsidian</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFlacon("floral")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "floral"
                    ? flacons.floral.activeTabClass
                    : "text-stone-700 dark:text-zinc-300 hover:text-black"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${flacons.floral.accentDot} shrink-0`} />
                <span>Women&apos;s Peony</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFlacon("amber")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFlacon === "amber"
                    ? flacons.amber.activeTabClass
                    : "text-stone-700 dark:text-zinc-300 hover:text-black"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${flacons.amber.accentDot} shrink-0`} />
                <span>Royal Amber</span>
              </button>
            </div>

            {/* THE BOTTLE DISPLAY — Clean, No Overlapping Box Covering The Picture */}
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm aspect-square rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border-2 border-[#d4af37]/60 shadow-xl group">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Discreet Floating Badge on Top Left */}
              <div className="absolute top-2.5 left-2.5 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[#f5e7b2] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-[#c9a96a]" />
                  <span>{current.badge}</span>
                </span>
              </div>

              {/* Discreet Floating Price on Top Right */}
              <div className="absolute top-2.5 right-2.5 pointer-events-none">
                <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-stone-900 text-[10px] font-bold tracking-wider shadow-sm">
                  {current.price}
                </span>
              </div>
            </div>

            {/* Product Meta Link Placed CLEANLY BELOW The Bottle (Never Overlapping It) */}
            <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm mt-2.5 flex items-center justify-between text-xs px-1">
              <div>
                <p className="font-serif font-medium text-stone-950 dark:text-white text-sm">
                  {current.name}
                </p>
                <p className="text-[11px] text-stone-600 dark:text-zinc-400 font-normal">
                  {current.edition}
                </p>
              </div>

              <Link
                href={current.link}
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8c530b] dark:text-[#c9a96a] hover:underline"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
