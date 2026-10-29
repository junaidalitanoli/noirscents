import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Noir Scent" },
  description:
    "Review customer data protection and privacy standards at Noir Scent. We operate exclusively on Cash on Delivery with zero card data collection in Pakistan.",
  alternates: {
    canonical: "/policies/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Noir Scent",
    description:
      "Review customer data protection and privacy standards at Noir Scent. We operate exclusively on Cash on Delivery with zero card data collection in Pakistan.",
    url: "/policies/privacy",
    siteName: "Noir Scent",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scent Privacy Policy",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Noir Scent",
    description:
      "Review customer data protection and privacy standards at Noir Scent. We operate exclusively on Cash on Delivery with zero card data collection in Pakistan.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function PrivacyPolicyPage() {
  const showDisclaimer = STORE_CONFIG.showProjectDisclaimer;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Data Security
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Your privacy is sacred. Learn how we safeguard customer information across Pakistan.
          </p>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 space-y-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              1. Information We Collect
            </h2>
            <p>
              When placing an order with {BRAND_NAME}, we collect only necessary fulfillment information: your name, recipient mobile phone number, delivery address, destination city, and optional email address.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              2. Zero Financial Card Data Storage
            </h2>
            <p>
              Because our store operates exclusively on a <strong>Cash on Delivery (COD)</strong> fulfillment model across Pakistan, we do NOT ask for or store credit cards, debit card PINs, or bank account details. You pay in cash directly upon physical package handover.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              3. Courier Data Sharing
            </h2>
            <p>
              Your name, phone number, and street address are shared strictly with our registered courier partners ({STORE_CONFIG.couriers}) for the sole purpose of transporting and completing doorstep handover. We do not sell or rent customer data to third-party marketing companies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              4. Data Processing &amp; Transactional Notifications
            </h2>
            <p>
              Your shopping cart and recent order numbers are retained locally on your device using browser local storage for seamless navigation and offline order tracking. When an order is placed, order details and contact information are transmitted securely via encrypted HTTPS to our server API endpoints solely to record your order and dispatch transactional email notifications to store management and to your email address (via our transactional email provider, Resend). Contact form submissions are similarly transmitted over HTTPS exclusively to answer customer inquiries.
            </p>
          </div>

          {showDisclaimer && (
            <div className="space-y-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              <h2 className="font-heading text-base font-bold text-zinc-950">
                5. Demonstration &amp; Prototype Notice
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                This digital storefront was conceptualized as an advanced academic showcase and prototype for an artisanal Pakistani perfume brand. While full end-to-end checkout, courier calculations, and transactional notifications are operational, live financial card transactions are disabled, and payment is conducted via Cash on Delivery upon physical parcel delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
