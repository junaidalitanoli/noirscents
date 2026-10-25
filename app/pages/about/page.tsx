import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Compass, Droplet } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Heritage & Artisanal Philosophy | Noir Scent",
  description:
    "Discover the story of Noir Scent: artisanal Extrait de Parfum handcrafted to deliver enduring luxury and sophisticated sillage across Pakistan.",
  alternates: {
    canonical: "/pages/about",
  },
  openGraph: {
    title: "Our Heritage & Artisanal Philosophy | Noir Scent",
    description:
      "Discover the story of Noir Scent: artisanal Extrait de Parfum handcrafted to deliver enduring luxury and sophisticated sillage across Pakistan.",
    url: "/pages/about",
    siteName: "Noir Scent",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scent Artisanal Heritage Story",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Heritage & Artisanal Philosophy | Noir Scent",
    description:
      "Discover the story of Noir Scent: artisanal Extrait de Parfum handcrafted to deliver enduring luxury and sophisticated sillage across Pakistan.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full space-y-16">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 text-xs text-[#9b6f1e] dark:text-[#f5e7b2] font-bold uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Artisanal Haute Parfumerie &bull; Pakistan
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-zinc-950 dark:text-white tracking-tight leading-tight">
          The Art of Enduring Fragrance.
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
          Born out of a deep reverence for heritage perfumery and modern luxury. We craft rich, high-concentration Extrait de Parfum formulations that bloom with your body heat and command presence.
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
              Every flacon is formulated as an artisanal, high-concentration Extrait de Parfum. By marrying high-grade perfume essences with master perfumer craftsmanship, our fragrances diffuse effortlessly, project with noble warmth, and evolve gracefully across hours rather than fading in minutes.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
            <div>
              <span className="block font-heading font-bold text-white text-base sm:text-lg">
                The Master Perfumers &amp; Founders
              </span>
              <span className="text-xs text-zinc-400">Noir Scent Artisanal Studio &bull; Karachi &amp; Lahore</span>
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
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Our Uncompromising Standards</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-950 dark:text-white">
            Why Discerning Clients Choose Noir Scent
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white dark:bg-[#111115] p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#b48325] dark:text-[#f5e7b2] flex items-center justify-center">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-zinc-950 dark:text-white">
              Artisanal Extrait de Parfum Formulation
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Formulated with generous fragrance oil concentrations engineered for the warm Pakistani climate. Our compositions ensure that vibrant top notes diffuse cleanly while deep base resins anchor to skin and fabrics for remarkable endurance.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111115] p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-zinc-950 dark:text-white">
              Radiant Sillage &amp; Smooth Diffusion
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Carefully balanced for exceptional projection and skin compatibility. The fragrance develops across complex aromatic layers—crisp openings, opulent floral or spicy hearts, and magnetic woods that linger pleasantly throughout your day.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111115] p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-zinc-950 dark:text-white">
              Ethically Sourced Precious Botanicals
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We hand-select raw ingredients from sustainable distilleries around the world: sparkling Italian bergamot, sensual Damascene roses, smoky Assam and Cambodian oud accords, and earthy Indonesian patchouli.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111115] p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-[#d4af37]/60 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-[#f5e7b2] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-zinc-950 dark:text-white">
              Cash on Delivery &amp; 7-Day Scent Exchange
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We stand firmly behind our craft. Enjoy transparent Cash on Delivery courier service to your doorstep anywhere in Pakistan, backed by our dedicated 7-day bottle exchange guarantee if a scent doesn&apos;t suit your personal chemistry.
            </p>
          </div>
        </div>
      </div>

      {/* Scent Ritual & Application Guide */}
      <div className="bg-[#faf8f5] dark:bg-[#111115] border border-amber-200/60 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 text-zinc-800 dark:text-zinc-200 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9b6f1e] dark:text-[#d4af37]">The Scent Ritual</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-zinc-950 dark:text-white mt-1">
            How to Experience Pure Extrait
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            Because our perfumes are oil-rich Extraits rather than light aerosol mists, a little goes a long way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#b48325] dark:text-[#f5e7b2]">01. Pulse Points</span>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Apply Warmth</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Spray directly onto pulse points — inside wrists, base of the throat, and behind earlobes where arterial warmth radiates the notes.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#b48325] dark:text-[#f5e7b2]">02. Let It Breathe</span>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Never Rub Wrists</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Friction crushes top notes like bergamot and pink pepper. Allow the oil droplets to sink naturally into the skin for authentic note evolution.
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#b48325] dark:text-[#f5e7b2]">03. Fabric Touch</span>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Clothing Whispers</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A light mist on collars, cuffs, or shawls creates a gentle halo that preserves the delicate base notes for days.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Call to Action */}
      <div className="text-center pt-4 pb-6 space-y-5">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 dark:text-white">
          Ready to Discover Your Signature Scent?
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Explore our collection of bestselling flacons or begin with our Grand Discovery Flight to sample our artisanal compositions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections/all"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 dark:bg-[#d4af37] text-[#fef08a] dark:text-zinc-950 rounded-xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-[#b59226] transition-all shadow-md"
          >
            Explore All Fragrances <ArrowRight className="w-4 h-4 text-[#d4af37] dark:text-zinc-950" />
          </Link>
          <Link
            href="/collections/testers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#111115] text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-[#18181d] transition-all"
          >
            Order Discovery Flights
          </Link>
        </div>
      </div>
    </div>
  );
}
