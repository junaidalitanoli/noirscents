import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, Headphones, Award, Sparkles, Truck, Banknote, ShieldCheck, HelpCircle } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { SITE_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { STORE_CONFIG } from "@/lib/store-config";
import ProductCard from "@/components/product/ProductCard";
import HeroSlider from "@/components/home/HeroSlider";

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
  // Best sellers: our top 4 flagship extraits
  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  // Clearance sale: discounted signatures distinct from bestsellers
  const clearanceProducts = INITIAL_PRODUCTS.filter(
    (p) => p.compareAtPrice && p.compareAtPrice > p.sizes[0].price && !p.isBestSeller
  ).slice(0, 4);

  // Bundles & Sets: exclusively from the "deals" collection
  const bundleProducts = INITIAL_PRODUCTS.filter((p) => p.category === "deals").slice(0, 4);

  const categories = [
    {
      title: "Men",
      slug: "men",
      subtitle: "Bold & Woody Extraits",
      image: SITE_IMAGES.categories.men.src,
      alt: SITE_IMAGES.categories.men.alt,
    },
    {
      title: "Women",
      slug: "women",
      subtitle: "Velvet Florals & Sweet Ambers",
      image: SITE_IMAGES.categories.women.src,
      alt: SITE_IMAGES.categories.women.alt,
    },
    {
      title: "Bundles",
      slug: "deals",
      subtitle: "Exclusive Value Sets & Duos",
      image: SITE_IMAGES.categories.deals.src,
      alt: SITE_IMAGES.categories.deals.alt,
    },
    {
      title: "Testers",
      slug: "testers",
      subtitle: "Discovery Flights & Travel Atomizers",
      image: SITE_IMAGES.categories.testers.src,
      alt: SITE_IMAGES.categories.testers.alt,
    },
  ];

  return (
    <div className="flex flex-col bg-white dark:bg-[#09090b] text-[#121212] dark:text-[#f4f4f5] transition-colors duration-200">
      {/* 1. HERO CAROUSEL: 4 Distinct Luxury Light & Dark Themes & Auto-Rotating Banners */}
      <HeroSlider />

      {/* 2. VALUE PROPOSITION BAR (Light & Dark Haute Parfumerie Aesthetic) */}
      <div className="bg-[#faf8f5] dark:bg-[#0e0e12] text-stone-800 dark:text-stone-200 border-y border-[#eae4d9] dark:border-white/10 py-3.5 sm:py-4 px-3 sm:px-6 transition-colors">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
            <div className="flex items-center gap-2.5 p-1.5 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-amber-100/60 dark:bg-amber-950/40 border border-transparent dark:border-amber-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-semibold text-stone-950 dark:text-stone-100 uppercase tracking-wider">Free TCS Shipping</p>
                <p className="text-[9.5px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-medium">Orders of Rs. {STORE_CONFIG.freeDeliveryThreshold.toLocaleString()} &amp; above</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-amber-100/60 dark:bg-amber-950/40 border border-transparent dark:border-amber-500/20 flex items-center justify-center shrink-0">
                <Banknote className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-semibold text-stone-950 dark:text-stone-100 uppercase tracking-wider">Cash on Delivery</p>
                <p className="text-[9.5px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-medium">Nationwide Doorstep Pay</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-amber-100/60 dark:bg-amber-950/40 border border-transparent dark:border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-semibold text-stone-950 dark:text-stone-100 uppercase tracking-wider">{STORE_CONFIG.longevityText} Longevity</p>
                <p className="text-[9.5px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-medium">Pure Artisan Extrait</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:justify-center">
              <div className="w-7 h-7 rounded-full bg-amber-100/60 dark:bg-amber-950/40 border border-transparent dark:border-amber-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-semibold text-stone-950 dark:text-stone-100 uppercase tracking-wider">{STORE_CONFIG.returnWindowDays}-Day Guarantee</p>
                <p className="text-[9.5px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-medium">Hassle-free Scent Swap</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION: Best Sellers */}
      <section id="best-sellers" className="py-10 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-black/8 dark:border-white/10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5] font-serif">
              Best Sellers
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Our most sought-after signature extraits loved across Karachi, Lahore, and Islamabad.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#121212] dark:text-[#d4af37] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3 transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SECTION: Clearance Sale Deals */}
      <section id="clearance-sale" className="py-10 sm:py-16 bg-[#fafafa]/60 dark:bg-[#0c0c0f]/80 border-t border-black/6 dark:border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
                Clearance Sale
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Limited-time discounted signature bottles with exceptional savings.
              </p>
            </div>
            <Link
              href="/collections/deals"
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#121212] dark:text-[#d4af37] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {clearanceProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: Bundles & Sets (exclusively from deals collection) */}
      <section id="bundles" className="py-12 sm:py-16 bg-[#fafafa] dark:bg-[#0b0b0e] border-y border-black/8 dark:border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-black/8 dark:border-white/10">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
                Bundles &amp; Sets
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Curated twin pairings and multi-bottle sets providing unbeatable value.
              </p>
            </div>
            <Link
              href="/collections/deals"
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#121212] dark:text-[#d4af37] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3 transition-colors"
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

      {/* 6. SECTION: Shop By Category */}
      <section className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
            Shop By Category
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Explore curated olfactory collections formulated for men, women, and discovery flights.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group block relative bg-[#f4f4f5] dark:bg-[#121216] border border-black/8 dark:border-white/10 overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-[#d4af37]/40 shadow-xs"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-4 bg-white dark:bg-[#121216] border-t border-black/6 dark:border-white/10 flex items-center justify-between transition-colors">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5] group-hover:underline underline-offset-4">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{cat.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. SECTION: Trust Badges */}
      <section className="py-12 sm:py-16 bg-[#f8f8f8] dark:bg-[#070709] border-t border-black/8 dark:border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
            {/* Box 1: Scent Swap */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white dark:bg-[#121216] border border-black/10 dark:border-white/10 flex items-center justify-center mb-3 shadow-xs text-[#121212] dark:text-[#d4af37] transition-colors">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
                {STORE_CONFIG.returnWindowDays}-Day Scent Swap
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
                Exchange your bottle within {STORE_CONFIG.returnWindowDays} days if the fragrance notes do not suit your taste.
              </p>
            </div>

            {/* Box 2: Customer Support */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white dark:bg-[#121216] border border-black/10 dark:border-white/10 flex items-center justify-center mb-3 shadow-xs text-[#121212] dark:text-[#d4af37] transition-colors">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
                Concierge Support
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
                Our team is available on WhatsApp ({STORE_CONFIG.businessHours}).
              </p>
            </div>

            {/* Box 3: Promising Quality */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white dark:bg-[#121216] border border-black/10 dark:border-white/10 flex items-center justify-center mb-3 shadow-xs text-[#121212] dark:text-[#d4af37] transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
                {STORE_CONFIG.concentrationText}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
                Handcrafted {STORE_CONFIG.perfumeType} providing {STORE_CONFIG.longevityText} endurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: Brand Standards & Transparent Commitments */}
      <section className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-black/8 dark:border-white/10">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
            Artisanal Standards &amp; Commitments
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Our direct pledges to quality, formulation integrity, and reliable nationwide delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111115] p-6 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between shadow-xs transition-colors">
            <div>
              <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-700/40 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 uppercase tracking-wider mb-2">
                Extrait Concentration &amp; Longevity
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Handcrafted as artisanal Extrait de Parfum with high fragrance oil concentrations, formulated specifically to deliver enduring {STORE_CONFIG.longevityText} in Pakistan&apos;s climate.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">Pure Extrait Formulation</span>
              <span className="text-zinc-500 dark:text-zinc-400">Rich Oil Essence</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111115] p-6 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between shadow-xs transition-colors">
            <div>
              <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-700/40 flex items-center justify-center mb-3">
                <Truck className="w-4 h-4 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 uppercase tracking-wider mb-2">
                Nationwide Doorstep Pay
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Dispatched via TCS and Leopards Courier with Cash on Delivery across Karachi, Lahore, Islamabad, and 250+ cities. Complimentary shipping on orders of Rs. 3,000 and above.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">Doorstep COD</span>
              <span className="text-zinc-500 dark:text-zinc-400">2–4 Business Days</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111115] p-6 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between shadow-xs transition-colors">
            <div>
              <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-700/40 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4 text-[#b48325] dark:text-[#d4af37]" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 uppercase tracking-wider mb-2">
                7-Day Fragrance Swap Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Fragrance is deeply personal. If your selected scent profile does not resonate with you, exchange your bottle within 7 days by contacting our direct WhatsApp concierge.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">7-Day Guarantee</span>
              <span className="text-zinc-500 dark:text-zinc-400">Hassle-Free Swap</span>
            </div>
          </div>
        </div>

        {/* Transparency note */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Note: Verified customer reviews will be displayed as genuine post-launch orders are fulfilled.
          </p>
        </div>
      </section>

      {/* 9. SECTION: FAQ Section (Text only, pulled from store-config values) */}
      <section className="py-12 sm:py-16 bg-[#fafafa] dark:bg-[#0a0a0d] border-t border-black/8 dark:border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#16161b] border border-black/10 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-3 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#c5a059] dark:text-[#d4af37]" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Everything you need to know about our artisanal extraits, Cash on Delivery, and delivery timelines.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORE_CONFIG.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-[#121216] p-6 border border-black/8 dark:border-zinc-800/80 space-y-2 transition-colors">
                <h3 className="font-semibold text-sm text-[#121212] dark:text-[#f4f4f5]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}