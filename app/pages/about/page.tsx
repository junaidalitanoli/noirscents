import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Compass, Droplet } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Heritage & Artisanal Philosophy | Noir Scents",
  description:
    "Discover the story of Noir Scents: artisanal, alcohol-free Extrait de Parfum handcrafted to deliver enduring luxury and prayer-safe sillage across Pakistan.",
  alternates: {
    canonical: "/pages/about",
  },
  openGraph: {
    title: "Our Heritage & Artisanal Philosophy | Noir Scents",
    description:
      "Discover the story of Noir Scents: artisanal, alcohol-free Extrait de Parfum handcrafted to deliver enduring luxury and prayer-safe sillage across Pakistan.",
    url: "/pages/about",
    siteName: "Noir Scents",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scents Artisanal Heritage Story",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Heritage & Artisanal Philosophy | Noir Scents",
    description:
      "Discover the story of Noir Scents: artisanal, alcohol-free Extrait de Parfum handcrafted to deliver enduring luxury and prayer-safe sillage across Pakistan.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full space-y-16">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs text-[#9b6f1e] font-bold uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Artisanal Haute Parfumerie &bull; Pakistan
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight leading-tight">
          The Art of Enduring Fragrance.
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 font-light leading-relaxed">
          Born out of a deep reverence for heritage perfumery and modern luxury. We craft rich, alcohol-free Extrait de Parfum formulations that bloom with your body heat and command presence.
        </p>
      </div>

      {/* Founder's Letter / Brand Story */}
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-semibold block">
            A Message From Our Atelier
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-white">
            &ldquo;In our land, scent is not an accessory — it is an embrace, an aura, and an intimate memory.&rdquo;
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            <p>
              When we founded <strong className="text-[#fef08a] font-medium">{BRAND_NAME}</strong>, we observed a shared frustration among fragrance lovers across Pakistan. Imported luxury perfumes were exorbitant and quickly evaporated in our intense summer heat, while local synthetic alternatives lacked refinement, evolution, and depth.
            </p>
            <p>
              We resolved to build an artisanal fragrance house from the ground up: one that marries the timeless richness of oriental perfumery — warm agarwood, sun-drenched Taif roses, earthy saffron, and radiant amber — with contemporary olfactory artistry.
            </p>
            <p>
              Every flacon is formulated without harsh denatured ethyl alcohol. By blending pure, potent perfume oils with nourishing botanical carriers, our fragrances sit close to the skin, project with subtle nobility, and evolve gracefully across hours rather than minutes.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
            <div>
              <span className="block font-heading font-bold text-white text-base sm:text-lg">
                The Master Perfumers &amp; Founders
              </span>
              <span className="text-xs text-zinc-400">Noir Scents Artisanal Studio &bull; Karachi &amp; Lahore</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-mono text-xs font-bold">
              NS
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Core Pillars */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Our Uncompromising Standards</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950">
            Why Discerning Clients Choose Noir Scents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#b48325] flex items-center justify-center">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-zinc-950">
              Artisanal Extrait de Parfum Base
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Formulated with generous oil concentrations and non-drying carriers. Unlike typical commercial sprays composed of 80% alcohol, our fragrances do not dissipate rapidly; they anchor to skin fibers and project an intimate, all-day sillage.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-zinc-950">
              Prayer-Safe &amp; Skin-Gentle
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Crafted without harsh denatured ethyl alcohol, making our perfumes completely prayer-safe and halal for daily devotional use, Friday prayers, and formal gatherings without causing stinging, dryness, or skin irritation.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-zinc-950">
              Ethically Sourced Precious Botanicals
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We hand-select raw ingredients from sustainable distilleries around the world: sparkling Italian bergamot, sensual Damascene roses, smoky Assam and Cambodian oud accords, and earthy Indonesian patchouli.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-zinc-950">
              Cash on Delivery &amp; 7-Day Scent Exchange
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We stand firmly behind our craft. Enjoy transparent Cash on Delivery courier service to your doorstep anywhere in Pakistan, backed by our dedicated 7-day bottle exchange guarantee if a scent doesn&apos;t suit your personal chemistry.
            </p>
          </div>
        </div>
      </div>

      {/* Scent Ritual & Application Guide */}
      <div className="bg-[#faf8f5] border border-amber-200/60 rounded-3xl p-8 sm:p-12 text-zinc-800 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9b6f1e]">The Scent Ritual</span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">
            How to Experience Pure Extrait
          </h3>
          <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
            Because our perfumes are oil-rich Extraits rather than light aerosol mists, a little goes a long way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#b48325]">01. Pulse Points</span>
            <h4 className="font-bold text-sm text-zinc-900">Apply Warmth</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Spray directly onto pulse points — inside wrists, base of the throat, and behind earlobes where arterial warmth radiates the notes.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#b48325]">02. Let It Breathe</span>
            <h4 className="font-bold text-sm text-zinc-900">Never Rub Wrists</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Friction crushes top notes like bergamot and pink pepper. Allow the oil droplets to sink naturally into the skin for authentic note evolution.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#b48325]">03. Fabric Touch</span>
            <h4 className="font-bold text-sm text-zinc-900">Clothing Whispers</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              A light mist on collars, cuffs, or shawls creates a gentle halo that preserves the delicate base notes for days.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Call to Action */}
      <div className="text-center pt-4 pb-6 space-y-5">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-950">
          Ready to Discover Your Signature Scent?
        </h3>
        <p className="text-sm text-zinc-600 max-w-md mx-auto">
          Explore our collection of bestselling flacons or begin with our Grand Discovery Flight to sample our artisanal compositions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections/all"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 text-[#fef08a] rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-md"
          >
            Explore All Fragrances <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </Link>
          <Link
            href="/collections/testers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 border border-zinc-300 rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all"
          >
            Order Discovery Flights
          </Link>
        </div>
      </div>
    </div>
  );
}
