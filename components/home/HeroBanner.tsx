import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/images";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#faf8f5] dark:bg-[#09090b] border-b border-black/8 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/40 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9b6f1e] dark:text-[#f5e7b2]">
              <Sparkles className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
              <span>Haute Parfumerie &bull; Artisanal Extrait</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950 dark:text-zinc-100 leading-[1.08]">
              Crafted For{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9b6f1e] via-[#c59a3f] to-[#7d5612] dark:from-[#f5e7b2] dark:via-[#d4af37] dark:to-[#b48325]">
                Extraordinary
              </span>{" "}
              People.
            </h1>

            <p className="font-serif text-base sm:text-xl text-zinc-700 dark:text-zinc-300 tracking-wide">
              Scents That Command Respect &bull; Formulated For Pakistan&apos;s Climate
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl font-light leading-relaxed">
              Handcrafted in small batches with generous fragrance oil concentrations. Rich, enduring extraits that evolve gracefully on warm skin without evaporating in intense heat.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#121212] dark:bg-[#d4af37] text-white dark:text-[#09090b] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black dark:hover:bg-[#e5c378] transition-all rounded-xs shadow-md"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white dark:bg-[#15151a] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all rounded-xs"
              >
                Explore All Fragrances
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase Flacon */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl">
              <Image
                src={SITE_IMAGES.heroBanners.signature.src}
                alt={SITE_IMAGES.heroBanners.signature.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 dark:bg-[#121216]/95 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100 uppercase tracking-wider text-[11px]">
                    Signature Reserve Flacon
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    50ml Handcrafted Extrait de Parfum
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#b48325] dark:text-[#d4af37] uppercase tracking-wider">
                  Pure Luxury
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

