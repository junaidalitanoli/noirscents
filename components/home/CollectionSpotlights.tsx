import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Flower2 } from "lucide-react";

export default function CollectionSpotlights() {
  return (
    <section className="py-8 sm:py-12 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 sm:space-y-12">
      {/* 1. Men's Obsidian Black Collection Spotlight */}
      <div className="bg-gradient-to-br from-[#f8f1e2] via-[#eddcc2] to-[#e1caa4] dark:from-[#131217] dark:via-[#100f14] dark:to-[#0c0c10] border-2 border-[#c59a3f]/60 dark:border-white/10 rounded-3xl p-5 sm:p-8 lg:p-10 overflow-hidden shadow-md transition-colors relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#7a4805] border border-amber-500/40 dark:bg-zinc-800 dark:text-[#f5e7b2] text-[10.5px] font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#d4af37]" />
              <span>Obsidian Black &bull; Men&apos;s Collection</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#1a140e] dark:text-zinc-100 leading-tight">
              Command Respect With Desert Majesty &amp; Sultan.
            </h2>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-300 font-normal leading-relaxed max-w-xl">
              Sun-warmed saffron, smoked Omani frankincense, rich amber, and aged cedarwood. Handcrafted in 35% pure oil concentration for all-day authoritative projection under Pakistan&apos;s climate.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <Link
                href="/products/desert-majesty"
                className="px-5 py-2.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Desert Majesty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/men"
                className="px-5 py-2.5 bg-white/90 dark:bg-[#16161c] border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-colors shadow-2xs"
              >
                All 9 Men&apos;s Extraits
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border-2 border-[#c59a3f]/60 shadow-lg group">
              <Image
                src="/images/noir-black-flacon.jpg"
                alt="Noir Scent Men's Black Collection 50ml Extraits"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Women's Radiant Gold Collection Spotlight */}
      <div className="bg-gradient-to-br from-[#fef0ed] via-[#fbe0d8] to-[#f6cabb] dark:from-[#191216] dark:via-[#140e13] dark:to-[#0f0c10] border-2 border-[#e89a8c]/80 dark:border-rose-900/40 rounded-3xl p-5 sm:p-8 lg:p-10 overflow-hidden shadow-md transition-colors relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border-2 border-[#e89a8c]/80 shadow-lg group">
              <Image
                src="/images/noir-gold-floral.jpg"
                alt="Noir Scent Loyal Heart Crystal Floral 50ml Extrait with Pink Peonies"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-900 border border-rose-400/60 dark:bg-rose-950/60 dark:text-rose-200 text-[10.5px] font-bold uppercase tracking-widest shadow-2xs">
              <Flower2 className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
              <span>Radiant Floral &bull; Women&apos;s Collection</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#1a140e] dark:text-zinc-100 leading-tight">
              Liquid Golden Seduction In Loyal Heart.
            </h2>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-300 font-normal leading-relaxed max-w-xl">
              Dewy Williams pear nectar, blooming pink peonies, and rich Baltic amber nectar. A queenly feminine trail that melts into warm skin with memorable sillage.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <Link
                href="/products/loyal-heart"
                className="px-5 py-2.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Discover Loyal Heart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/collections/women"
                className="px-5 py-2.5 bg-white/90 dark:bg-[#16161c] border border-rose-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-rose-50/50 transition-colors shadow-2xs"
              >
                All 5 Women&apos;s Extraits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
