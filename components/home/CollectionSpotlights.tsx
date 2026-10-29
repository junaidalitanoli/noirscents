import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Flower2 } from "lucide-react";
import { SITE_IMAGES } from "@/lib/images";

export default function CollectionSpotlights() {
  return (
    <section className="py-12 sm:py-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
      {/* 1. Men's Obsidian Black Collection Spotlight */}
      <div className="bg-[#fcfaf7] dark:bg-[#111116] border border-stone-200/90 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/70 dark:bg-zinc-800 text-stone-900 dark:text-zinc-200 text-[10.5px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#b48325] dark:text-[#d4af37]" />
              <span>Obsidian Black Collection &bull; For Men</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 dark:text-zinc-100">
              Command Respect With Desert Majesty.
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 font-light leading-relaxed">
              Sun-warmed saffron threads, smoky golden amber, and dry Virginia cedarwood. Formulated for all-day authoritative projection under subcontinental executive schedules.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products/desert-majesty"
                className="px-6 py-3 bg-stone-950 dark:bg-[#d4af37] text-white dark:text-[#09090b] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-black dark:hover:bg-[#e5c378] transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Desert Majesty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/men"
                className="px-6 py-3 bg-white dark:bg-[#16161c] border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Men&apos;s Collection
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-md">
              <Image
                src={SITE_IMAGES.heroBanners.aqua.src}
                alt="Noir Scent Men's Black Collection Extraits"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Women's Radiant Gold Collection Spotlight */}
      <div className="bg-[#fdfbf7] dark:bg-[#131215] border border-amber-200/70 dark:border-amber-900/40 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-amber-50 dark:bg-zinc-900 border border-amber-200/80 dark:border-zinc-800 shadow-md">
              <Image
                src={SITE_IMAGES.heroBanners.rose.src}
                alt="Noir Scent Women's Gold Collection Extraits"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-[10.5px] font-bold uppercase tracking-widest">
              <Flower2 className="w-3 h-3 text-[#b48325] dark:text-[#d4af37]" />
              <span>Radiant Gold Collection &bull; For Women</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100">
              Liquid Golden Seduction In Loyal Heart.
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Dewy Williams pear nectar, night-blooming white jasmine sambac, and rich Baltic amber nectar. A queenly feminine trail that melts into warm skin and fabric.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products/loyal-heart"
                className="px-6 py-3 bg-[#121212] dark:bg-[#d4af37] text-white dark:text-[#09090b] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-black dark:hover:bg-[#e5c378] transition-colors inline-flex items-center gap-2"
              >
                <span>Discover Loyal Heart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/women"
                className="px-6 py-3 bg-white dark:bg-[#16161c] border border-amber-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-amber-50/50 dark:hover:bg-zinc-800 transition-colors"
              >
                Women&apos;s Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

