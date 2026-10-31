"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#fbf8f3] dark:bg-[#0a0a0d] text-stone-900 dark:text-white border-b border-stone-200/80 dark:border-white/10 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          {/* 1. PUNCHLINE & FAST ACTION */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 order-2 md:order-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8c530b] dark:text-[#c9a96a]">
              Artisanal Haute Parfumerie
            </span>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a140e] dark:text-white leading-[1.12]">
              Scents That Command{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7a4805] via-[#b47a16] to-[#5a3404] dark:from-[#ffe8b3] dark:via-[#c9a96a] dark:to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-stone-600 dark:text-zinc-300 max-w-md font-normal leading-relaxed">
              35% pure oil extrait formulation engineered for commanding all-day sillage across Pakistan.
            </p>

            {/* Single Clear CTA to browse products */}
            <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
              <a
                href="#all-products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-widest rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>Shop Fragrances</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/products/desert-majesty"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 bg-white dark:bg-white/5 border border-stone-300 dark:border-white/15 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-stone-50 dark:hover:bg-white/10 transition-all shadow-2xs"
              >
                <span>Desert Majesty</span>
              </Link>
            </div>
          </div>

          {/* 2. PRODUCT SHOWCASE — 100% Unobstructed Flacon */}
          <div className="flex flex-col items-center justify-center order-1 md:order-2">
            <Link
              href="/products/desert-majesty"
              className="group relative block w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] aspect-square rounded-2xl overflow-hidden bg-white dark:bg-[#141418] border-2 border-amber-300/80 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/images/noir-black-flacon.jpg"
                alt="Noir Scent Desert Majesty 50ml Extrait de Parfum Flacon"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </Link>

            {/* Product Label Cleanly Below Image */}
            <div className="mt-3 text-center">
              <p className="font-serif font-medium text-sm sm:text-base text-stone-950 dark:text-white">
                Desert Majesty &bull; <span className="text-stone-500 dark:text-stone-400 font-sans text-xs">50ml Pure Extrait</span>
              </p>
              <p className="text-[11px] font-bold text-[#8c530b] dark:text-[#c9a96a] mt-0.5">
                Rs. 3,450 &bull; Cash on Delivery
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
