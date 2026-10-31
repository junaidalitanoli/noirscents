import Image from "next/image";
import { Sparkles, Flower2, Gift, Droplets, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface CollectionHeroBannerProps {
  category: string;
  count: number;
}

export default function CollectionHeroBanner({
  category,
  count,
}: CollectionHeroBannerProps) {
  const configs: Record<
    string,
    {
      eyebrow: string;
      title: string;
      tagline: string;
      image: string;
      alt: string;
      badgeClass: string;
      icon: typeof Sparkles;
      bgGradient: string;
      borderClass: string;
      glowColor: string;
      pills: { label: string; highlight?: boolean }[];
      breadcrumbLabel: string;
    }
  > = {
    men: {
      eyebrow: `Obsidian Black Edition • For Men`,
      title: "Men's Haute Extrait Collection",
      tagline:
        "Bold woody accords, smoldering ouds, and crisp spices formulated with 35% pure oil concentration for authoritative all-day projection under Pakistan's climate.",
      image: "/images/noir-black-flacon.jpg",
      alt: "Noir Scent Men's Obsidian Black 50ml Extrait Flacon on Slate Stone",
      badgeClass:
        "bg-amber-500/20 text-[#7a4805] border-2 border-amber-500/40 dark:bg-zinc-800 dark:text-[#f5e7b2] dark:border-zinc-700",
      icon: Sparkles,
      bgGradient:
        "bg-gradient-to-br from-[#f8f1e2] via-[#eddcc2] to-[#e1caa4] dark:from-[#131217] dark:via-[#100f14] dark:to-[#0c0c10]",
      borderClass: "border-2 border-[#c59a3f]/60 dark:border-white/10",
      glowColor: "rgba(217, 148, 44, 0.45)",
      pills: [
        { label: `${count} Signature Extraits`, highlight: true },
        { label: "35% Pure Oil Sillage" },
        { label: "Smoky Oud & Woods" },
        { label: "Nationwide TCS COD" },
      ],
      breadcrumbLabel: "Men",
    },
    women: {
      eyebrow: `Radiant Crystal Edition • For Women`,
      title: "Women's Haute Extrait Collection",
      tagline:
        "Enchanting velvet floral bouquets, dewy Williams pear, and warm Madagascar ambers crafted for a queenly feminine trail that melts into warm skin and fabric.",
      image: "/images/noir-gold-floral.jpg",
      alt: "Noir Scent Loyal Heart Crystal Floral 50ml Extrait with Pink Peonies",
      badgeClass:
        "bg-rose-500/20 text-rose-900 border-2 border-rose-400/60 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800/40",
      icon: Flower2,
      bgGradient:
        "bg-gradient-to-br from-[#fef0ed] via-[#fbe0d8] to-[#f6cabb] dark:from-[#191216] dark:via-[#140e13] dark:to-[#0f0c10]",
      borderClass: "border-2 border-[#e89a8c]/80 dark:border-rose-900/40",
      glowColor: "rgba(235, 120, 140, 0.45)",
      pills: [
        { label: `${count} Luminous Extraits`, highlight: true },
        { label: "35% Pure Oil Strength" },
        { label: "Pink Peony & Jasmine" },
        { label: "7-Day Scent Swap" },
      ],
      breadcrumbLabel: "Women",
    },
    deals: {
      eyebrow: "Curated Reserve Pairs & Gift Sets",
      title: "Artisanal Fragrance Bundles & Sets",
      tagline:
        "Curated multi-bottle duos, couple pairings, and limited-run promotional sets hand-packaged in rigid gift boxes with complimentary nationwide shipping.",
      image: "/images/noir-hero-bundles.jpg",
      alt: "Noir Scent Luxury Fragrance Gift Boxes with Satin Ribbon",
      badgeClass:
        "bg-amber-500/20 text-[#7a4805] border-2 border-amber-500/40 dark:bg-amber-950/40 dark:text-[#f5e7b2] dark:border-amber-700/40",
      icon: Gift,
      bgGradient:
        "bg-gradient-to-br from-[#fbf3e5] via-[#f3dfc2] to-[#e8caa0] dark:from-[#16141a] dark:via-[#110f14] dark:to-[#0c0b0f]",
      borderClass: "border-2 border-[#dcb888]/80 dark:border-white/10",
      glowColor: "rgba(225, 145, 30, 0.45)",
      pills: [
        { label: "Complimentary Delivery", highlight: true },
        { label: "Rigid Presentation Box" },
        { label: "Custom Duo Pairing" },
        { label: "7-Day Scent Swap" },
      ],
      breadcrumbLabel: "Bundles & Offers",
    },
    testers: {
      eyebrow: "Artisanal Sample Flights • 5ml Spray Atomizers",
      title: "Discovery Flights & Travel Testers",
      tagline:
        "Experience our most celebrated extraits at home before acquiring a full 50ml flacon. High-pressure spray atomizers with complimentary scent testing strips.",
      image: "/images/noir-testers.jpg",
      alt: "Noir Scent Discovery Sample Vials and Presentation Box",
      badgeClass:
        "bg-stone-300/60 text-stone-900 border-2 border-stone-400/60 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
      icon: Droplets,
      bgGradient:
        "bg-gradient-to-br from-[#f6f2ea] via-[#ece5d8] to-[#ded4c3] dark:from-[#141418] dark:via-[#0f0f13] dark:to-[#0a0a0d]",
      borderClass: "border-2 border-[#c5beaf]/80 dark:border-white/10",
      glowColor: "rgba(195, 175, 145, 0.45)",
      pills: [
        { label: "Precision 5ml Atomizers", highlight: true },
        { label: "35% Oil Extrait Strength" },
        { label: "Testing Strips Included" },
        { label: "Doorstep Cash on Delivery" },
      ],
      breadcrumbLabel: "Testers",
    },
    all: {
      eyebrow: "Haute Parfumerie • Full Artisanal Catalog",
      title: "The Complete Extrait de Parfum Collection",
      tagline:
        "Discover our complete portfolio of 13 artisanal extraits handcrafted with rare perfume essences, 45-day maceration, and enduring all-day projection.",
      image: "/images/royal-amber-bottle.jpg",
      alt: "Noir Scent Royal Amber Faceted Crystal 50ml Extrait Flacon",
      badgeClass:
        "bg-amber-500/20 text-[#7a4805] border-2 border-amber-500/40 dark:bg-amber-950/40 dark:text-[#f5e7b2] dark:border-amber-700/40",
      icon: Sparkles,
      bgGradient:
        "bg-gradient-to-br from-[#faf2e4] via-[#f2e1c4] to-[#e6cca3] dark:from-[#131318] dark:via-[#0e0e12] dark:to-[#09090b]",
      borderClass: "border-2 border-[#d4af37]/70 dark:border-white/10",
      glowColor: "rgba(225, 160, 45, 0.45)",
      pills: [
        { label: "13 Masterpiece Extraits", highlight: true },
        { label: "8 Men & 5 Women Editions" },
        { label: "Free Shipping Over Rs. 3,000" },
        { label: "7-Day Scent Swap" },
      ],
      breadcrumbLabel: "All Fragrances",
    },
  };

  const current = configs[category] || configs.all;
  const Icon = current.icon;

  return (
    <div className="space-y-4 mb-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: current.breadcrumbLabel }]} />

      {/* Saturated Luxury Hero Card */}
      <div
        className={`relative rounded-3xl ${current.bgGradient} ${current.borderClass} p-6 sm:p-8 lg:p-10 overflow-hidden shadow-md transition-colors`}
      >
        {/* Rich Ambient Radiance */}
        <div
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-20"
          style={{ background: current.glowColor }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Editorial Information & Specs */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            {/* Eyebrow Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-xs ${current.badgeClass}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{current.eyebrow}</span>
            </div>

            {/* Exactly ONE H1 for the page */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a140e] dark:text-zinc-100 leading-tight">
              {current.title}
            </h1>

            {/* Editorial Description */}
            <p className="text-xs sm:text-sm text-stone-800 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl">
              {current.tagline}
            </p>

            {/* Micro Feature Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              {current.pills.map((pill) => (
                <span
                  key={pill.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide border shadow-2xs ${
                    pill.highlight
                      ? "bg-[#121212] text-white border-black dark:bg-[#c9a96a] dark:text-[#09090b] dark:border-[#c9a96a]"
                      : "bg-white/90 dark:bg-white/5 border-stone-300 dark:border-white/10 text-stone-800 dark:text-zinc-300"
                  }`}
                >
                  <CheckCircle2
                    className={`w-3 h-3 ${
                      pill.highlight
                        ? "text-[#c9a96a] dark:text-[#09090b]"
                        : "text-[#8c530b] dark:text-[#c9a96a]"
                    }`}
                  />
                  <span>{pill.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Authentic Perfume Flacon Pedestal */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] sm:max-w-xs aspect-square rounded-[22px] overflow-hidden bg-white dark:bg-zinc-900 border-2 border-[#c5a059]/60 shadow-lg group">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="mt-2 text-stone-700 dark:text-zinc-300 text-[11px] font-semibold flex items-center gap-2">
              <span>50ml Artisanal Flacon</span>
              <span>&bull;</span>
              <span className="text-[#8c530b] dark:text-[#f5e7b2]">35% Pure Extrait</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
