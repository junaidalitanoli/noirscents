import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, Headphones, Award, Star, Sparkles } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { BRAND_NAME } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/images";
import ProductCard from "@/components/product/ProductCard";
import FeaturedProductSection from "@/components/home/FeaturedProductSection";

export default function HomePage() {
  // Products categorized for Dawn layout sections
  const clearanceProducts = INITIAL_PRODUCTS.filter(
    (p) => p.compareAtPrice && p.compareAtPrice > p.sizes[0].price
  ).slice(0, 4);

  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const bundleProducts = INITIAL_PRODUCTS.filter(
    (p) => p.category === "deals" || p.category === "testers"
  ).slice(0, 4);

  // Spotlight featured product (matches BuyFunoon's Jamal section)
  const featuredProduct =
    INITIAL_PRODUCTS.find((p) => p.slug === "urban-legend") || INITIAL_PRODUCTS[0];

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

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://noir-scents.pk/#organization",
        name: BRAND_NAME,
        url: "https://noir-scents.pk",
        logo: "https://noir-scents.pk/images/logo.svg",
        description:
          "Pakistan's premier artisanal perfume brand. Handcrafted Extraits de Parfum with 8-12+ hours projection.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "PK",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://noir-scents.pk/#website",
        url: "https://noir-scents.pk",
        name: BRAND_NAME,
        publisher: {
          "@id": "https://noir-scents.pk/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://noir-scents.pk/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white">
      {/* JSON-LD Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO BANNER: Full-width Cinematic Luxury Showcase (Unobstructed Crystal Clear Bottles + International Punchline) */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        {/* Full-bleed background campaign image with razor-sharp clarity */}
        <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
          <Image
            src={SITE_IMAGES.heroBanner.src}
            alt={SITE_IMAGES.heroBanner.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-right md:object-center brightness-[1.04] contrast-[1.02]"
          />

          {/* Left-side cinematic vignette so typography is effortlessly legible while bottles remain 100% clear & bright on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:w-[65%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 pointer-events-none lg:hidden" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Left-aligned Luxury Content Column (Bottles on the right remain completely unobstructed) */}
          <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="max-w-[620px] space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/70 border border-[#c5a059]/60 text-[#f5e7b2] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Haute Parfumerie &bull; 35% Pure French Extrait</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1.05] text-white">
                  Scents That <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-[#c5a059]">
                    Command Respect.
                  </span>
                </h1>
                <p className="text-sm sm:text-lg font-semibold tracking-[0.14em] text-amber-200/95 uppercase">
                  14+ Hours Beast Mode Sillage &bull; Engineered For Pakistan
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light max-w-lg">
                Crafted with ultra-concentrated French fragrance oils engineered specifically to outlast Pakistan&apos;s heat and humidity. Sillage so captivating, it turns heads and commands every room you enter.
              </p>

              {/* Action Buttons matching BuyFunoon / International Luxury Standard */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#best-sellers"
                  className="px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all text-center shadow-xl hover:scale-[1.02]"
                >
                  Shop Best Sellers
                </a>
                <a
                  href="#clearance-sale"
                  className="px-8 py-3.5 bg-black/60 border border-white/80 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all text-center backdrop-blur-xs"
                >
                  Clearance Sale Deals
                </a>
              </div>

              {/* Pakistani Market Trust & Buying Assurances */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>✅ <strong>Free Express Delivery</strong> on orders over Rs. 3,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>💵 <strong>Cash on Delivery (COD)</strong> Nationwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <span>⏳ <strong>14+ Hours Lasting</strong> Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>🔄 <strong>7-Day Scent Guarantee</strong> &amp; Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: Clearance Sale (Matches BuyFunoon section #1) */}
      <section id="clearance-sale" className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-black/8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
              Clearance Sale
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Limited-time discounted signature bottles. High projection with special savings.
            </p>
          </div>
          <Link
            href="/collections/deals"
            className="text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4 flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 columns on desktop, 3 on tablet, 2 on mobile (Matches BuyFunoon Dawn layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {clearanceProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. SECTION: Featured Product Spotlight (Matches BuyFunoon Jamal featured-product section) */}
      <FeaturedProductSection product={featuredProduct} />

      {/* 4. SECTION: Best Sellers (Matches BuyFunoon section #2) */}
      <section id="best-sellers" className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-black/8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
              Best Sellers
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Our most sought-after signature extraits loved across Karachi, Lahore, and Islamabad.
            </p>
          </div>
          <Link
            href="/collections/men"
            className="text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4 flex items-center gap-1"
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

      {/* 5. SECTION: Bundles (Matches BuyFunoon section #3) */}
      <section id="bundles" className="py-12 sm:py-16 bg-[#fafafa] border-y border-black/8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-black/8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
                Bundles
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Curated twin pairings and multi-bottle sets providing unbeatable value.
              </p>
            </div>
            <Link
              href="/collections/deals"
              className="text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4 flex items-center gap-1"
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

      {/* 6. SECTION: Shop By Category (Matches BuyFunoon collection-list) */}
      <section className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
            Shop By Category
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Explore curated olfactory collections formulated for men, women, and discovery flights.
          </p>
        </div>

        {/* 4 category tiles with 1:1 aspect ratio */}
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

              {/* Title banner at bottom */}
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

      {/* 7. SECTION: Trust Badges (Matches BuyFunoon Dawn feature-type1 exact 3 items) */}
      <section className="py-12 sm:py-16 bg-[#f8f8f8] border-t border-black/8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Box 1: Money-Back Guarantee */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center mb-3 shadow-xs">
                <RotateCcw className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
                Money-Back Guarantee
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                We return the money within 15 days
              </p>
            </div>

            {/* Box 2: 24/7 Customer Support */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center mb-3 shadow-xs">
                <Headphones className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
                24/7 Customer Support
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                Our Support Team is Ready For You 7 days a week
              </p>
            </div>

            {/* Box 3: Promising Quality */}
            <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
              <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center mb-3 shadow-xs">
                <Award className="w-6 h-6 text-[#121212]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
                Promising Quality
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                All our products assure the utmost quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: Customer Reviews */}
      <section className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-black/8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#121212]">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-amber-500 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-zinc-800 ml-1">
              4.97 out of 5.0 based on 800+ verified customer reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex text-amber-500 mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;Urban Legend projection is truly beast mode level! Lasted through an entire wedding evening in Karachi heat. Very high quality extrait.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-zinc-900">Muhammad Bilal</div>
                <div className="text-zinc-400">Karachi &bull; Verified Buyer</div>
              </div>
              <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex text-amber-500 mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;Ordered Aqua Mist and Royal Amber. Arrived in 2 days via TCS COD. The flacons look sleek and the scent lasts all day at university.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-zinc-900">Ayesha Khan</div>
                <div className="text-zinc-400">Lahore &bull; Verified Buyer</div>
              </div>
              <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          </div>

          <div className="bg-white p-6 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex text-amber-500 mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;The discovery tester pack is the best way to choose. Ended up ordering Ghalib 50ml. Support on WhatsApp assisted me within minutes.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-zinc-900">Hamza Tariq</div>
                <div className="text-zinc-400">Islamabad &bull; Verified Buyer</div>
              </div>
              <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}