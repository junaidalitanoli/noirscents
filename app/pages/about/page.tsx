import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Story & Artisanal Heritage",
  description:
    "Discover the story of Noir Scents, handcrafted in Pakistan to deliver enduring, non-alcoholic Extrait de Parfum with 25–30% oil concentration.",
  alternates: {
    canonical: "/pages/about",
  },
  openGraph: {
    title: "Our Story & Artisanal Heritage",
    description:
      "Discover the story of Noir Scents, handcrafted in Pakistan to deliver enduring, non-alcoholic Extrait de Parfum with 25–30% oil concentration.",
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
    title: "Our Story & Artisanal Heritage",
    description:
      "Discover the story of Noir Scents, handcrafted in Pakistan to deliver enduring, non-alcoholic Extrait de Parfum with 25–30% oil concentration.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function AboutPage() {
  const showDisclaimer = STORE_CONFIG.showProjectDisclaimer;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          {showDisclaimer && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-[#b48325] font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> University Project Prototype &bull; Pakistani Perfumery
            </div>
          )}
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-zinc-950">
            The Story of {BRAND_NAME}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed font-light">
            Crafting enduring, non-alcoholic luxury fragrances tailored specifically for the Pakistani climate and cultural heritage.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="prose prose-zinc max-w-none text-zinc-700 space-y-6 leading-relaxed text-sm sm:text-base">
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-zinc-950">
              Why We Founded Noir Scents
            </h2>
            <p>
              In Pakistan, fragrance has never been a mere cosmetic; it is an intimate expression of hospitality, spirituality, and poetic tradition. For centuries, the bustling lanes of Shah Alami in Old Lahore and the historic perfume distillers of Sindh cultivated delicate roses, vetivers, and earthy attars.
            </p>
            <p>
              However, modern imported European perfumes often fail when tested against Pakistan&apos;s intense summer heat and humidity, fading away into a faint skin scent within an hour or two.
            </p>
            <p>
              {BRAND_NAME} was conceptualized to revive Pakistan&apos;s artisanal perfume heritage with concentrated oil formulations ({STORE_CONFIG.concentrationText} {STORE_CONFIG.perfumeType}) and a seamless Cash on Delivery experience nationwide.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-base text-zinc-900">100% Non-Alcoholic</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Formulated strictly without denatured ethanol, making our fragrances safe for daily prayers and gentle on sensitive skin.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-base text-zinc-900">{STORE_CONFIG.longevityText} Longevity</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Utilizing natural resinous fixatives like agarwood, ambergris accords, and musk to ensure enduring all-day projection.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-base text-zinc-900">Transparent COD</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Doorstep Cash On Delivery available nationwide from Karachi to Gilgit with a {STORE_CONFIG.returnWindowDays}-day scent exchange policy.
              </p>
            </div>
          </div>

          {showDisclaimer && (
            <div className="border-t border-zinc-200 pt-8 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-zinc-950">
                Project Acknowledgment &amp; Disclaimer
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <strong>Notice:</strong> This website is an educational demonstration developed as a university term project. All perfume names, formulations, descriptions, and vector graphics have been created as original assets. No real financial card transactions are processed; all orders run through a simulated Cash on Delivery flow.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href="/collections/testers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-950 text-[#fef08a] rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg"
          >
            Explore The Grand Discovery Set <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
