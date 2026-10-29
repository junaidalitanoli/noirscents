import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Flower2 } from "lucide-react";

export default function CollectionSpotlights() {
  return (
    <section className="py-12 sm:py-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
      {/* 1. Men's Obsidian Black Collection Spotlight */}
      <div className="bg-gradient-to-br from-[#f8f1e2] via-[#eddcc2] to-[#e1caa4] dark:from-[#131217] dark:via-[#100f14] dark:to-[#0c0c10] border-2 border-[#c59a3f]/60 dark:border-white/10 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-md transition-colors relative">
        {/* Subtle Ambient Radial Highlight */}
        <div
          className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 dark:opacity-20"
          style={{ background: "rgba(217, 148, 44, 0.45)" }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-[#7a4805] border-2 border-amber-500/40 dark:bg-zinc-800 dark:text-[#f5e7b2] dark:border-zinc-700 text-[10.5px] font-bold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#d4af37]" />
              <span>Obsidian Black Collection &bull; For Men</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a140e] dark:text-zinc-100 leading-tight">
              Command Respect With Desert Majesty.
            </h2>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-300 font-normal leading-relaxed">
              Sun-warmed saffron threads, smoky golden amber, and dry Virginia cedarwood. Handcrafted in 35% pure oil concentration for all-day authoritative projection under Pakistan&apos;s climate.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products/desert-majesty"
                className="px-6 py-3.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Desert Majesty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/men"
                className="px-6 py-3.5 bg-white/90 dark:bg-[#16161c] border-2 border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                Men&apos;s Collection (8 Extraits)
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/10] rounded-[24px] overflow-hidden bg-white dark:bg-zinc-900 p-2 border-2 border-[#c59a3f]/60 shadow-xl group">
              <div className="relative w-full h-full rounded-[18px] overflow-hidden">
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
      </div>

      {/* 2. Women's Radiant Gold Collection Spotlight */}
      <div className="bg-gradient-to-br from-[#fef0ed] via-[#fbe0d8] to-[#f6cabb] dark:from-[#191216] dark:via-[#140e13] dark:to-[#0f0c10] border-2 border-[#e89a8c]/80 dark:border-rose-900/40 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-md transition-colors relative">
        {/* Subtle Ambient Radial Highlight */}
        <div
          className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 dark:opacity-20"
          style={{ background: "rgba(235, 120, 140, 0.45)" }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/10] rounded-[24px] overflow-hidden bg-white dark:bg-zinc-900 p-2 border-2 border-[#e89a8c]/80 shadow-xl group">
              <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                <Image
                  src="/images/noir-gold-floral.jpg"
                  alt="Noir Scent Loyal Heart Crystal Floral 50ml Extrait with Pink Peonies"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-900 border-2 border-rose-400/60 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800/40 text-[10.5px] font-bold uppercase tracking-widest shadow-xs">
              <Flower2 className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
              <span>Radiant Floral Collection &bull; For Women</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a140e] dark:text-zinc-100 leading-tight">
              Liquid Golden Seduction In Loyal Heart.
            </h2>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-300 font-normal leading-relaxed">
              Dewy Williams pear nectar, blooming pink peonies, and rich Baltic amber nectar. A queenly feminine trail that melts into warm skin and fabric with unforgettable sillage.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products/loyal-heart"
                className="px-6 py-3.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Discover Loyal Heart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/women"
                className="px-6 py-3.5 bg-white/90 dark:bg-[#16161c] border-2 border-rose-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-rose-50/50 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                Women&apos;s Collection (5 Extraits)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
