import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, RotateCcw, Headphones, Sparkles, Truck, Banknote, ShieldCheck } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { STORE_CONFIG } from "@/lib/store-config";
import ProductCard from "@/components/product/ProductCard";
import HeroBanner from "@/components/home/HeroBanner";
import HomeProductCatalog from "@/components/home/HomeProductCatalog";
import CollectionSpotlights from "@/components/home/CollectionSpotlights";

export const metadata: Metadata = {
  title: {
    absolute: "Noir Scent | Artisanal Extrait Perfumes in Pakistan",
  },
  description:
    "Discover handcrafted, artisanal Extrait de Parfum with enduring all-day sillage. Premium fragrance creations with nationwide Cash on Delivery in Pakistan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Noir Scent | Artisanal Extrait Perfumes in Pakistan",
    description:
      "Discover handcrafted, artisanal Extrait de Parfum with enduring all-day sillage. Premium fragrance creations with nationwide Cash on Delivery in Pakistan.",
    url: "/",
    siteName: "Noir Scent",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scent Artisanal Perfumes Showcase",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noir Scent | Artisanal Extrait Perfumes in Pakistan",
    description:
      "Discover handcrafted, artisanal Extrait de Parfum with enduring all-day sillage. Premium fragrance creations with nationwide Cash on Delivery in Pakistan.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function HomePage() {
  // Bundles & Sets: exclusively from deals / bundles
  const bundleProducts = INITIAL_PRODUCTS.filter((p) => p.category === "deals").slice(0, 4);

  return (
    <div className="flex flex-col bg-white dark:bg-[#09090b] text-[#121212] dark:text-[#f4f4f5] transition-colors duration-200">
      {/* 1. COMPACT HERO: Exactly ONE H1, Unobstructed Flacon Showcase & Fast CTAs */}
      <HeroBanner />

      {/* 2. VALUE PROPOSITION BAR (Haute Parfumerie Atelier Bar) */}
      <div className="bg-gradient-to-r from-[#faf2e4] via-[#f4e6d0] to-[#faf2e4] dark:bg-[#0d0d12] text-stone-900 dark:text-stone-200 border-y-2 border-[#d4af37]/40 py-3.5 px-3 sm:px-6 transition-colors shadow-2xs">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <div className="flex items-center gap-2 p-1 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-amber-400/25 border border-amber-500/50 dark:bg-amber-950/40 dark:border-amber-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#c9a96a]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-[#1a140e] dark:text-white uppercase tracking-wider">Free TCS Shipping</p>
                <p className="text-[9px] sm:text-[10.5px] text-stone-700 dark:text-stone-400 font-medium">Orders of Rs. {STORE_CONFIG.freeDeliveryThreshold.toLocaleString()} &amp; above</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-emerald-400/25 border border-emerald-500/50 dark:bg-emerald-950/40 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                <Banknote className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-[#1a140e] dark:text-white uppercase tracking-wider">Cash on Delivery</p>
                <p className="text-[9px] sm:text-[10.5px] text-stone-700 dark:text-stone-400 font-medium">Nationwide Doorstep Pay</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-amber-400/25 border border-amber-500/50 dark:bg-amber-950/40 dark:border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#8c530b] dark:text-[#c9a96a]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-[#1a140e] dark:text-white uppercase tracking-wider">All-Day Longevity</p>
                <p className="text-[9px] sm:text-[10.5px] text-stone-700 dark:text-stone-400 font-medium">35% Pure Extrait Oil</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-blue-400/25 border border-blue-500/50 dark:bg-blue-950/40 dark:border-blue-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-[#1a140e] dark:text-white uppercase tracking-wider">{STORE_CONFIG.returnWindowDays}-Day Guarantee</p>
                <p className="text-[9px] sm:text-[10.5px] text-stone-700 dark:text-stone-400 font-medium">Hassle-free Scent Swap</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRIMARY PRODUCT CATALOG (Scent 'n Stories Product-Oriented Layout with Instant Tabs) */}
      <HomeProductCatalog products={INITIAL_PRODUCTS} />

      {/* 4. SECTION: Bundles & Sets (if available) */}
      {bundleProducts.length > 0 && (
        <section id="bundles" className="py-8 sm:py-12 bg-[#faf7f2] dark:bg-[#0b0b0e] border-y border-stone-200 dark:border-white/10">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-stone-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-medium uppercase tracking-tight text-[#1a140e] dark:text-[#f4f4f5]">
                  Curated Bundles &amp; Sets
                </h2>
                <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 mt-0.5">
                  Twin pairings and multi-bottle sets providing exceptional value.
                </p>
              </div>
              <Link
                href="/collections/deals"
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#8c530b] dark:text-[#d4af37] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3 transition-colors"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {bundleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. EDITORIAL SPOTLIGHTS: Men's Obsidian & Women's Gold Masterpieces (Compact) */}
      <CollectionSpotlights />

      {/* 6. TRUST & ASSURANCE SECTION */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-[#faf8f4] via-[#f5ede0] to-[#f0e4cf] dark:bg-[#070709] border-t-2 border-[#d4af37]/30">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-300 dark:divide-zinc-800">
            {/* Box 1: Scent Swap */}
            <div className="flex flex-col items-center px-4 pt-4 md:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#121216] border border-amber-300/80 dark:border-white/10 flex items-center justify-center mb-2.5 shadow-xs text-[#8c530b] dark:text-[#d4af37] transition-colors">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1a140e] dark:text-[#f4f4f5]">
                {STORE_CONFIG.returnWindowDays}-Day Scent Swap
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed font-normal">
                Exchange your bottle within {STORE_CONFIG.returnWindowDays} days if the fragrance notes do not suit your taste.
              </p>
            </div>

            {/* Box 2: Customer Support */}
            <div className="flex flex-col items-center px-4 pt-4 md:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#121216] border border-amber-300/80 dark:border-white/10 flex items-center justify-center mb-2.5 shadow-xs text-[#8c530b] dark:text-[#d4af37] transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1a140e] dark:text-[#f4f4f5]">
                Concierge WhatsApp Support
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed font-normal">
                Direct assistance with note advice and orders ({STORE_CONFIG.businessHours}).
              </p>
            </div>

            {/* Box 3: 35% Extrait */}
            <div className="flex flex-col items-center px-4 pt-4 md:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#121216] border border-amber-300/80 dark:border-white/10 flex items-center justify-center mb-2.5 shadow-xs text-[#8c530b] dark:text-[#d4af37] transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1a140e] dark:text-[#f4f4f5]">
                35% Pure Extrait Concentration
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed font-normal">
                Formulated to project with distinguished authority and endure throughout Pakistan&apos;s climate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
