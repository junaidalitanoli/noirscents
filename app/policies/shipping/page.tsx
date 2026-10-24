import type { Metadata } from "next";
import { Truck, ShieldCheck, Clock } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";
import { formatPrice } from "@/lib/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `Nationwide Cash on Delivery shipping rules, rates, and transit times for ${BRAND_NAME} across Karachi, Lahore, Islamabad, and all of Pakistan.`,
  alternates: {
    canonical: "/policies/shipping",
  },
  openGraph: {
    title: "Shipping & Delivery Policy",
    description: `Nationwide Cash on Delivery shipping rules, rates, and transit times for ${BRAND_NAME} across Pakistan.`,
    url: "/policies/shipping",
    siteName: "Noir Scents",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scents Shipping & Delivery Policy",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Delivery Policy",
    description: `Nationwide Cash on Delivery shipping rules, rates, and transit times for ${BRAND_NAME} across Pakistan.`,
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
      <Breadcrumbs items={[{ label: "Shipping Policy" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Transparent Fulfillment
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Shipping &amp; Delivery Policy across Pakistan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Reliable doorstep fulfillment with Cash on Delivery nationwide.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <Truck className="w-5 h-5 text-[#d4af37] mb-2" />
            <h2 className="font-bold text-zinc-900 text-sm">Free Delivery</h2>
            <p className="text-zinc-500 mt-1">
              On all orders of {formatPrice(STORE_CONFIG.freeDeliveryThreshold)} and above. Flat {formatPrice(STORE_CONFIG.standardShippingFee)} under threshold.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <Clock className="w-5 h-5 text-[#d4af37] mb-2" />
            <h2 className="font-bold text-zinc-900 text-sm">{STORE_CONFIG.deliveryTime}</h2>
            <p className="text-zinc-500 mt-1">
              Major cities (Karachi, Lahore, Islamabad): 24–48 hours. Regional tehsils &amp; towns: 3–4 working days.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] mb-2" />
            <h2 className="font-bold text-zinc-900 text-sm">Cash On Delivery</h2>
            <p className="text-zinc-500 mt-1">
              Available across 250+ Pakistani cities, towns, and Cantonments.
            </p>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 space-y-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              1. Courier Partners &amp; Tracking
            </h2>
            <p>
              We dispatch all orders through registered Tier-1 courier networks including <strong>{STORE_CONFIG.couriers}</strong>. Upon dispatch, an official tracking link is generated and sent to your registered WhatsApp or mobile number.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              2. Cash on Delivery (COD) Guidelines
            </h2>
            <p>
              The courier delivery rider will collect the exact invoice amount indicated on the parcel manifest in Pakistani Rupees (PKR). Please keep exact cash ready to expedite the doorstep delivery process.
            </p>
            <p>
              Note: As per Pakistani courier standards, riders do not open sealed parcel packaging prior to receiving payment. However, all our parcels are covered under our <strong>{STORE_CONFIG.returnWindowDays}-Day Scent Exchange Policy</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              3. Packaging &amp; Bottle Safety
            </h2>
            <p>
              Every glass perfume bottle is housed inside an internal gold-embossed foam bed and cocooned in heavy shock-absorbing bubble wrap to withstand rough transit across long inter-city routes. If a bottle arrives cracked or leaking, photograph it immediately and send it to our WhatsApp helpline ({STORE_CONFIG.whatsappDisplay}) for a replacement dispatched within 24 hours at zero cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
