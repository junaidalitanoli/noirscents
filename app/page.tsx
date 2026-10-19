import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, Headphones, Award, Sparkles, Truck, Banknote, ShieldCheck, HelpCircle } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { SITE_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { STORE_CONFIG } from "@/lib/store-config";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: {
    absolute: "Noir Scents | Non-Alcoholic Extrait Perfumes in Pakistan",
  },
  description:
    "Discover handcrafted, non-alcoholic Extrait de Parfum with 8–12+ hours longevity. Premium artisanal scents with nationwide Cash on Delivery in Pakistan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Noir Scents | Non-Alcoholic Extrait Perfumes in Pakistan",
    description:
      "Discover handcrafted, non-alcoholic Extrait de Parfum with 8–12+ hours longevity. Premium artisanal scents with nationwide Cash on Delivery in Pakistan.",
    url: "/",
    siteName: "Noir Scents",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scents Artisanal Perfumes Showcase",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noir Scents | Non-Alcoholic Extrait Perfumes in Pakistan",
    description:
      "Discover handcrafted, non-alcoholic Extrait de Parfum with 8–12+ hours longevity. Premium artisanal scents with nationwide Cash on Delivery in Pakistan.",
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
    <div className="flex flex-col bg-white">
      {/* 1. HERO BANNER: Full-width Cinematic Luxury Showcase */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center">
          {/* Full-bleed background campaign image */}
          <Image
            src={SITE_IMAGES.heroBanner.src}
            alt={SITE_IMAGES.heroBanner.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] sm:object-right md:object-center brightness-[1.02] contrast-[1.02]"
          />

          {/* Left-side cinematic vignette */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/92 via-black/60 to-transparent w-[62%] pointer-events-none" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/30 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Luxury Content Column */}
          <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
            <div className="max-w-[580px] space-y-4 sm:space-y-6 text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#c5a059]/40 text-[#f5e7b2] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-[#c5a059]" />
                <span>Haute Parfumerie &bull; {STORE_CONFIG.concentrationText}</span>
              </div>

              {/* Main Headline & Supporting Tagline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.12] text-white">
                  Non-Alcoholic Extrait Perfumes in Pakistan
                </h1>
                <p className="text-sm sm:text-base font-semibold tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-[#c5a059] uppercase">
                  Scents That Command Respect
                </p>
                <p className="text-[11px] sm:text-xs font-medium tracking-[0.12em] text-zinc-300 uppercase">
                  {STORE_CONFIG.longevityText} Longevity &bull; Engineered For Pakistan
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#best-sellers"
                  className="flex-1 sm:flex-initial px-5 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-semibold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all text-center shadow-lg active:scale-95"
                >
                  Shop Best Sellers
                </a>
                <Link
                  href="/collections/deals"
                  className="flex-1 sm:flex-initial px-5 sm:px-8 py-3 sm:py-3.5 bg-black/60 border border-white/60 text-white font-semibold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center backdrop-blur-xs active:scale-95"
                >
                  Explore Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION BAR */}
      <div className="bg-[#0e0e0e] text-white border-b border-white/10 py-3.5 sm:py-4 px-4">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 text-center">
            <div className="flex items-center justify-center gap-2 py-1 px-1.5">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0" />
              <span className="text-[11px] sm:text-xs text-zinc-300 font-medium tracking-wide">
                <strong className="text-white font-semibold">Free Express Delivery</strong> &gt; Rs. {STORE_CONFIG.freeDeliveryThreshold.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-1 px-1.5">
              <Banknote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0" />
              <span className="text-[11px] sm:text-xs text-zinc-300 font-medium tracking-wide">
                <strong className="text-white font-semibold">Cash on Delivery</strong> Nationwide
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-1 px-1.5">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0" />
              <span className="text-[11px] sm:text-xs text-zinc-300 font-medium tracking-wide">
                <strong className="text-white font-semibold">{STORE_CONFIG.longevityText}</strong> Longevity
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-1 px-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0" />
              <span className="text-[11px] sm:text-xs text-zinc-300 font-medium tracking-wide">
                <strong className="text-white font-semibold">{STORE_CONFIG.returnWindowDays}-Day Scent Swap</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION: Best Sellers */}
      <section id="best-sellers" className="py-10 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-black/8">
          <div>
            <h2 className="text-xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
              Best Sellers
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
              Our most sought-after signature extraits loved across Karachi, Lahore, and Islamabad.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3"
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
      <section id="clearance-sale" className="py-10 sm:py-16 bg-[#fafafa]/60 border-t border-black/6">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-black/8">
            <div>
              <h2 className="text-xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
                Clearance Sale
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                Limited-time discounted signature bottles with exceptional savings.
              </p>
            </div>
            <Link
              href="/collections/deals"
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3"
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
      <section id="bundles" className="py-12 sm:py-16 bg-[#fafafa] border-y border-black/8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-black/8">
            <div>
              <h2 className="text-xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
                Bundles &amp; Sets
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                Curated twin pairings and multi-bottle sets providing unbeatable value.
              </p>
            </div>
            <Link
              href="/collections/deals"
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4 flex items-center gap-1 shrink-0 ml-3"
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
          <h2 className="text-xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
            Shop By Category
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
            Explore curated olfactory collections formulated for men, women, and discovery flights.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group block relative bg-[#f4f4f5] border border-black/8 overflow-hidden transition-all duration-300"
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

              <div className="p-4 bg-white border-t border-black/6 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] group-hover:underline underline-offset-4">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{cat.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. SECTION: Trust Badges */}
      <section className="py-12 sm:py-16 bg-[#f8f8f8] border-t border-black/8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Box 1: Scent Swap */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center mb-3 shadow-xs">
                <RotateCcw className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
                {STORE_CONFIG.returnWindowDays}-Day Scent Swap
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                Exchange your bottle within {STORE_CONFIG.returnWindowDays} days if the fragrance notes do not suit your taste.
              </p>
            </div>

            {/* Box 2: Customer Support */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center mb-3 shadow-xs">
                <Headphones className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
                Concierge Support
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                Our team is available on WhatsApp ({STORE_CONFIG.businessHours}).
              </p>
            </div>

            {/* Box 3: Promising Quality */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center mb-3 shadow-xs">
                <Award className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
                {STORE_CONFIG.concentrationText}
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                Handcrafted {STORE_CONFIG.perfumeType} providing {STORE_CONFIG.longevityText} endurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: Sample Customer Feedback (Honest cleanup) */}
      <section className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-black/8">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
            Sample Customer Feedback
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Real experiences shared by fragrance lovers across Karachi, Lahore, and Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
            <div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;Urban Legend projection is truly impressive! Lasted through an entire wedding evening in Karachi heat. Very high quality extrait.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-zinc-900">Muhammad Bilal</div>
                <div className="text-zinc-500">Karachi</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
            <div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;Ordered Aqua Mist and Royal Amber. Arrived in 2 days via TCS COD. The flacons look sleek and the scent lasts all day at university.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-zinc-900">Ayesha Khan</div>
                <div className="text-zinc-500">Lahore</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
            <div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;The discovery tester pack is the best way to choose. Ended up ordering Ghalib 50ml. Support on WhatsApp assisted me within minutes.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-zinc-900">Hamza Tariq</div>
                <div className="text-zinc-500">Islamabad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION: FAQ Section (Text only, pulled from store-config values) */}
      <section className="py-12 sm:py-16 bg-[#fafafa] border-t border-black/8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 text-xs font-semibold uppercase tracking-wider text-zinc-800 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Everything you need to know about our non-alcoholic extraits, Cash on Delivery, and delivery timelines.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORE_CONFIG.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 border border-black/8 space-y-2">
                <h3 className="font-semibold text-sm text-[#121212]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
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