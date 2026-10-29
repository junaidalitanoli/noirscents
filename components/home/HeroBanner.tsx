"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Droplet } from "lucide-react";

export default function HeroBanner() {
  const [activeFlacon, setActiveFlacon] = useState<"black" | "gold">("black");

  const flacons = {
    black: {
      name: "Obsidian Black Flacon",
      sub: "50ml Extrait de Parfum • For Men",
      image: "/images/noir-black-flacon.jpg",
      alt: "Noir Scent Obsidian Black 50ml Extrait de Parfum Bottle",
      badge: "Men's Black Reserve",
      link: "/products/desert-majesty",
    },
    gold: {
      name: "Luminous Gold Flacon",
      sub: "50ml Extrait de Parfum • For Women",
      image: "/images/noir-gold-flacon.jpg",
      alt: "Noir Scent Luminous Gold 50ml Extrait de Parfum Bottle",
      badge: "Women's Gold Crystal",
      link: "/products/loyal-heart",
    },
  };

  const current = flacons[activeFlacon];

  return (
    <section className="relative w-full bg-[#0a0a0d] text-white border-b border-white/10 overflow-hidden">
      {/* Warm Golden Ambient Glow Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 75% 45%, rgba(201, 169, 106, 0.18) 0%, rgba(10, 10, 13, 0) 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle 40% at 20% 25%, rgba(201, 169, 106, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181820] border border-[#c9a96a]/40 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f5e7b2] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a96a]" />
              <span>Haute Parfumerie &bull; Artisanal Extrait</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Crafted For{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ffe8b3] via-[#c9a96a] to-[#d4af37]">
                Extraordinary
              </span>{" "}
              People.
            </h1>

            <p className="font-serif text-base sm:text-xl text-[#e5d6ba] tracking-wide">
              Scents That Command Respect &bull; Formulated For Pakistan&apos;s Climate
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-light leading-relaxed">
              Handcrafted in small batches with a 35% pure fragrance oil concentration. Rich, enduring extraits that evolve gracefully on warm skin without evaporating in intense heat.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Droplet className="w-3.5 h-3.5 text-[#c9a96a]" />
                <span>35% Pure Oil Extrait</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9a96a]" />
                <span>Cash on Delivery Nationwide</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a96a] hover:bg-[#dfbe7c] text-[#0a0a0d] text-xs font-bold uppercase tracking-[0.18em] transition-all rounded-xs shadow-lg shadow-[#c9a96a]/20 active:scale-95 cursor-pointer"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 hover:border-[#c9a96a] text-white hover:text-[#f5e7b2] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-white/5 transition-all rounded-xs cursor-pointer"
              >
                Explore All Fragrances
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase Flacon */}
          <div className="lg:col-span-5 relative">
            {/* Flacon Switcher Tabs (Black vs Gold) */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setActiveFlacon("black")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFlacon === "black"
                    ? "bg-[#181820] text-[#f5e7b2] border-[#c9a96a] shadow-xs"
                    : "bg-black/40 text-zinc-400 border-white/10 hover:text-white"
                }`}
              >
                ✦ Men&apos;s Obsidian
              </button>
              <button
                type="button"
                onClick={() => setActiveFlacon("gold")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFlacon === "gold"
                    ? "bg-[#181820] text-[#f5e7b2] border-[#c9a96a] shadow-xs"
                    : "bg-black/40 text-zinc-400 border-white/10 hover:text-white"
                }`}
              >
                ✦ Women&apos;s Gold
              </button>
            </div>

            {/* Main Showcase Flacon Frame with 100% visible centered bottle */}
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-[#121216] border border-[#c9a96a]/30 shadow-2xl shadow-black/80 group">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Bottom Product Card with Link */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 bg-[#0a0a0d]/90 backdrop-blur-md rounded-xl border border-white/15 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
                    {current.name}
                  </p>
                  <p className="text-[10.5px] text-[#c9a96a] font-medium mt-0.5">
                    {current.sub}
                  </p>
                </div>
                <Link
                  href={current.link}
                  className="px-3.5 py-1.5 bg-[#c9a96a] hover:bg-[#dfbe7c] text-[#0a0a0d] text-[10.5px] font-bold uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
