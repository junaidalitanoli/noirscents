import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Concierge & Customer Care",
  description:
    "Get in touch with Noir Scent for fragrance consultations, order tracking, and nationwide delivery support. Fast assistance via WhatsApp and email.",
  alternates: {
    canonical: "/pages/contact",
  },
  openGraph: {
    title: "Contact Concierge & Customer Care",
    description:
      "Get in touch with Noir Scent for fragrance consultations, order tracking, and nationwide delivery support. Fast assistance via WhatsApp and email.",
    url: "/pages/contact",
    siteName: "Noir Scent",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scent Customer Care Concierge",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Concierge & Customer Care",
    description:
      "Get in touch with Noir Scent for fragrance consultations, order tracking, and nationwide delivery support. Fast assistance via WhatsApp and email.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
          Direct Customer Care
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950">
          Get in Touch with {BRAND_NAME}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Have questions regarding fragrance notes, order delivery, or bulk wedding orders? Our concierge team is here to assist.
        </p>
      </div>

      <ContactFormClient />
    </div>
  );
}
