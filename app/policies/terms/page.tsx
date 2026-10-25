import type { Metadata } from "next";
import { FileText, ShieldCheck, Banknote } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and conditions for ordering from ${BRAND_NAME} in Pakistan. Details on Cash on Delivery orders, courier dispatch, and scent exchanges.`,
  alternates: {
    canonical: "/policies/terms",
  },
  openGraph: {
    title: "Terms and Conditions",
    description: `Terms and conditions for ordering from ${BRAND_NAME} in Pakistan. Details on Cash on Delivery orders, courier dispatch, and scent exchanges.`,
    url: "/policies/terms",
    siteName: "Noir Scent",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scent Terms and Conditions",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions",
    description: `Terms and conditions for ordering from ${BRAND_NAME} in Pakistan. Details on Cash on Delivery orders, courier dispatch, and scent exchanges.`,
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
      <Breadcrumbs items={[{ label: "Terms and Conditions" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Store Terms
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Standard customer policies and terms of service for Cash on Delivery orders across Pakistan.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <Banknote className="w-5 h-5 text-[#d4af37] mb-2" />
            <h2 className="font-bold text-zinc-900 text-sm">Cash on Delivery</h2>
            <p className="text-zinc-500 mt-1">
              Payment is collected in cash (PKR) by the courier upon physical doorstep delivery.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] mb-2" />
            <h2 className="font-bold text-zinc-900 text-sm">{STORE_CONFIG.returnWindowDays}-Day Exchange</h2>
            <p className="text-zinc-500 mt-1">
              Full bottles can be exchanged within {STORE_CONFIG.returnWindowDays} calendar days if the scent notes do not suit your preference.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <FileText className="w-5 h-5 text-[#d4af37] mb-2" />
            <h2 className="font-bold text-zinc-900 text-sm">Transparent Pricing</h2>
            <p className="text-zinc-500 mt-1">
              All prices are listed in Pakistani Rupees (PKR) inclusive of applicable taxes.
            </p>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 space-y-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              1. Ordering &amp; Order Verification
            </h2>
            <p>
              By placing an order on {BRAND_NAME}, you agree to provide accurate recipient contact details, a complete physical delivery address, and an active Pakistani phone number. Once submitted, our team may verify the order via SMS, WhatsApp, or phone call prior to courier dispatch.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              2. Cash on Delivery (COD) Payment
            </h2>
            <p>
              All customer transactions on this store operate under Cash on Delivery (COD) within Pakistan. You are required to pay the exact invoice amount printed on the courier consignment note directly to the delivery rider in Pakistani Rupees.
            </p>
            <p>
              Orders of Rs. {STORE_CONFIG.freeDeliveryThreshold.toLocaleString()} and above qualify for free express shipping. Orders below this threshold carry a standard shipping fee of Rs. {STORE_CONFIG.standardShippingFee.toLocaleString()}.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              3. Delivery &amp; Transit Times
            </h2>
            <p>
              Parcels are dispatched within 24 hours of confirmation through registered courier networks ({STORE_CONFIG.couriers}). Standard transit time is {STORE_CONFIG.deliveryTime} for urban centers including Karachi, Lahore, Rawalpindi, and Islamabad. Regional areas and remote destinations may require 3–5 working days.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              4. {STORE_CONFIG.returnWindowDays}-Day Scent Swap Guarantee
            </h2>
            <p>
              We want every patron to be thoroughly pleased with their purchase. If you purchase a full-size flacon and find the notes do not match your taste, you may initiate a fragrance swap within {STORE_CONFIG.returnWindowDays} calendar days of delivery, provided the flacon is at least 90% full and in original packaging.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              5. Customer Support &amp; Concierge
            </h2>
            <p>
              For inquiries regarding product formulation, order status, or scent recommendations, contact our concierge on WhatsApp at {STORE_CONFIG.whatsappDisplay} or via email at {STORE_CONFIG.contactEmail} ({STORE_CONFIG.businessHours}).
            </p>
          </div>

          <div className="space-y-3 border-t border-zinc-200 pt-6">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              6. Authentic Artisanal Guarantee
            </h2>
            <p className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs sm:text-sm text-zinc-600">
              All Noir Scent flacons and discovery sets are original artisanal fragrance compositions handcrafted and packaged with high-grade perfume oils and botanical carriers. Every order dispatched via Cash on Delivery is backed by our customer concierge support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
