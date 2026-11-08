"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#fbf8f3] dark:bg-[#0a0a0d] text-stone-900 dark:text-white border-b border-stone-200/80 dark:border-white/10 transition-colors py-4 sm:py-6 lg:py-8">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            DESKTOP / TABLET HERO (md and up):
            Cinematic panoramic banner with text elegantly on left
            and full bottles + box completely unobstructed on right.
           ======================================================== */}
        <div className="hidden md:flex relative w-full rounded-3xl overflow-hidden border border-amber-300/60 dark:border-white/10 shadow-xl min-h-[420px] lg:min-h-[480px] max-h-[520px] items-center">
          {/* Panoramic Hero Photography - Enhanced Original HD Asset */}
          <Image
            src="/images/noir-hero-banner-v2.jpg"
            alt="Noir Scent Gentleman and Beast Flacons with Signature Packaging"
            fill
            priority
            quality={95}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-right lg:object-center"
          />

          {/* Soft Left Scrim for Crisp Punchline Contrast - stops before bottles begin at ~42% */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f3] via-[#fbf8f3]/85 to-transparent dark:from-[#0a0a0d] dark:via-[#0a0a0d]/85 dark:to-transparent w-[42%] max-w-[460px] pointer-events-none" />

          {/* Left Text & CTA */}
          <div className="relative z-10 max-w-md pl-8 lg:pl-12 py-10 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/20 rounded-full">
              <Sparkles className="w-3 h-3 text-[#8c530b] dark:text-[#c9a96a]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c530b] dark:text-[#c9a96a]">
                Artisanal Haute Parfumerie
              </span>
            </div>

            <h1 className="font-serif text-3xl lg:text-5xl font-medium tracking-tight text-[#1a140e] dark:text-white leading-[1.12]">
              Scents That Command{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7a4805] via-[#b47a16] to-[#5a3404] dark:from-[#ffe8b3] dark:via-[#c9a96a] dark:to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs lg:text-sm text-stone-600 dark:text-zinc-300 font-normal leading-relaxed max-w-sm">
              35% pure oil extrait formulation engineered for commanding all-day sillage across Pakistan.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#all-products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-widest rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>Shop Fragrances</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/collections/deals"
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-xs border border-stone-300 dark:border-white/15 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white dark:hover:bg-white/15 transition-all shadow-2xs"
              >
                <span>Bundles &amp; Offers</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE HERO (below md):
            Bottles are 100% visible at top with NO text overlay.
            Punchline & CTA sit cleanly underneath.
           ======================================================== */}
        <div className="md:hidden flex flex-col space-y-4">
          {/* 1. Full Unobstructed Product Banner */}
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-amber-300/60 dark:border-white/10 shadow-lg">
            <Image
              src="/images/noir-hero-banner-v2.jpg"
              alt="Noir Scent Gentleman and Beast Flacons with Signature Packaging"
              fill
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-center"
            />
          </div>

          {/* 2. Punchline & Fast Action Cleanly Below Image */}
          <div className="text-center px-2 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/20 rounded-full">
              <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#8c530b] dark:text-[#c9a96a]">
                Artisanal Haute Parfumerie
              </span>
            </div>

            <h1 className="font-serif text-2xl font-medium tracking-tight text-[#1a140e] dark:text-white leading-tight">
              Scents That Command{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7a4805] via-[#b47a16] to-[#5a3404] dark:from-[#ffe8b3] dark:via-[#c9a96a] dark:to-[#d4af37]">
                Respect.
              </span>
            </h1>

            <p className="text-xs text-stone-600 dark:text-zinc-300 font-normal leading-relaxed max-w-xs mx-auto">
              35% pure oil extrait formulation engineered for commanding all-day sillage across Pakistan.
            </p>

            <div className="pt-1 flex items-center justify-center gap-2.5">
              <a
                href="#all-products"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all"
              >
                <span>Shop Fragrances</span>
                <ArrowRight className="w-3 h-3" />
              </a>

              <Link
                href="/collections/deals"
                className="inline-flex items-center gap-1 px-4 py-2.5 bg-white dark:bg-white/5 border border-stone-300 dark:border-white/15 text-stone-900 dark:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-stone-50 dark:hover:bg-white/10 transition-all shadow-2xs"
              >
                <span>Bundles</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
