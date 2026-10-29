import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Flower2 } from "lucide-react";

export default function CollectionSpotlights() {
  return (
    <section className="py-12 sm:py-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
      {/* 1. Men's Obsidian Black Collection Spotlight */}
      <div className="bg-gradient-to-br from-[#faf7f0] via-[#f5ece0] to-[#fbf8f2] dark:from-[#131217] dark:via-[#100f14] dark:to-[#0c0c10] border border-[#e2d5c3] dark:border-white/10 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-sm transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 dark:bg-zinc-800 border border-amber-300/80 dark:border-zinc-700 text-[#8c6314] dark:text-[#f5e7b2] text-[10.5px] font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
              <span>Obsidian Black Collection &bull; For Men</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 dark:text-zinc-100 leading-tight">
              Command Respect With Desert Majesty.
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 font-light leading-relaxed">
              Sun-warmed saffron threads, smoky golden amber, and dry Virginia cedarwood. Handcrafted in 35% pure oil concentration for all-day authoritative projection under Pakistan&apos;s climate.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products/desert-majesty"
                className="px-6 py-3 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Desert Majesty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/men"
                className="px-6 py-3 bg-white/90 dark:bg-[#16161c] border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-2xs"
              >
                Men&apos;s Collection
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-[#e2d5c3] dark:border-zinc-800 shadow-md group">
              <Image
                src="/images/noir-black-flacon.jpg"
                alt="Noir Scent Men's Black Collection 50ml Extraits"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Women's Radiant Gold Collection Spotlight */}
      <div className="bg-gradient-to-br from-[#fff7f5] via-[#fdf0ed] to-[#faf3ee] dark:from-[#191216] dark:via-[#140e13] dark:to-[#0f0c10] border border-[#f3d7ce] dark:border-rose-900/40 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-sm transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-[#f3d7ce] dark:border-zinc-800 shadow-md group">
              <Image
                src="/images/noir-gold-floral.jpg"
                alt="Noir Scent Loyal Heart Crystal Floral 50ml Extrait with Pink Peonies"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/90 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/40 text-rose-800 dark:text-rose-200 text-[10.5px] font-bold uppercase tracking-widest shadow-2xs">
              <Flower2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Radiant Floral Collection &bull; For Women</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 dark:text-zinc-100 leading-tight">
              Liquid Golden Seduction In Loyal Heart.
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 font-light leading-relaxed">
              Dewy Williams pear nectar, blooming pink peonies, and rich Baltic amber nectar. A queenly feminine trail that melts into warm skin and fabric with unforgettable sillage.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products/loyal-heart"
                className="px-6 py-3 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Discover Loyal Heart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/women"
                className="px-6 py-3 bg-white/90 dark:bg-[#16161c] border border-rose-200 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-rose-50/50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
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
