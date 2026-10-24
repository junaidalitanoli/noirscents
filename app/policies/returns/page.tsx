import type { Metadata } from "next";
import { RefreshCw } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { formatPrice } from "@/lib/formatters";

export const metadata: Metadata = {
  title: "Returns & Exchanges Policy",
  description: `${STORE_CONFIG.returnWindowDays}-Day hassle-free fragrance exchange policy at ${BRAND_NAME} across Pakistan. Zero-risk doorstep bottle swaps.`,
  alternates: {
    canonical: "/policies/returns",
  },
  openGraph: {
    title: "Returns & Exchanges Policy",
    description: `${STORE_CONFIG.returnWindowDays}-Day hassle-free fragrance exchange policy at ${BRAND_NAME} across Pakistan.`,
    url: "/policies/returns",
    siteName: "Noir Scents",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scents Returns & Exchanges Policy",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Returns & Exchanges Policy",
    description: `${STORE_CONFIG.returnWindowDays}-Day hassle-free fragrance exchange policy at ${BRAND_NAME} across Pakistan.`,
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
      <Breadcrumbs items={[{ label: "Returns & Exchanges" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Customer Satisfaction
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Returns &amp; {STORE_CONFIG.returnWindowDays}-Day Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            We want you to fall in love with your scent. Our zero-risk guarantee protects your purchase.
          </p>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <RefreshCw className="w-4 h-4 text-amber-700" />
            {STORE_CONFIG.returnWindowDays}-Day Hassle-Free Scent Swap
          </div>
          <p className="leading-relaxed">
            If you purchased a full bottle and discover the notes do not match your skin chemistry, simply notify our WhatsApp concierge ({STORE_CONFIG.whatsappDisplay}) within {STORE_CONFIG.returnWindowDays} calendar days of delivery.
          </p>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 space-y-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              1. Eligible Conditions for Exchange
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>The bottle must have at least 90% liquid remaining (tested 2-3 sprays max).</li>
              <li>Original decorative box, outer sleeve, and protective cap must be intact.</li>
              <li>Request submitted within {STORE_CONFIG.returnWindowDays} days from parcel delivery date.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              2. How the Exchange Works
            </h2>
            <p>
              1. Message our WhatsApp support ({STORE_CONFIG.whatsappDisplay}) with your Order ID (e.g. <code>FN-89210</code>) and mention which fragrance you wish to swap to.
            </p>
            <p>
              2. Pack the bottle securely in its original packaging.
            </p>
            <p>
              3. Our courier will deliver the replacement bottle and collect the returned flacon right at your doorstep. A nominal reverse courier charge of {formatPrice(STORE_CONFIG.reverseCourierFee)} is applicable for standard scent swaps.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              3. Damaged or Faulty Flacons
            </h2>
            <p>
              In the unlikely event of transit damage or atomizer malfunction, we will dispatch an immediate replacement free of charge with zero return shipping fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
