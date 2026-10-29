import { SITE_CONFIG } from "./site-config";

/**
 * Single source of truth for store configuration, policies, and brand standards.
 * Reads from central lib/site-config.ts.
 */
export const STORE_CONFIG = {
  name: SITE_CONFIG.brandName,
  legalName: SITE_CONFIG.legalName,
  tagline: SITE_CONFIG.tagline,
  freeDeliveryThreshold: SITE_CONFIG.freeDeliveryThreshold,
  standardShippingFee: SITE_CONFIG.deliveryFee,
  reverseCourierFee: SITE_CONFIG.reverseCourierFee,
  returnWindowDays: SITE_CONFIG.returnWindowDays,
  longevityText: "All-Day Sillage",
  concentrationText: "artisanal Extrait de Parfum",
  perfumeType: "Extrait de Parfum",
  deliveryTime: SITE_CONFIG.deliveryTime,
  couriers: SITE_CONFIG.couriers,
  contactEmail: SITE_CONFIG.contactEmail,
  phone: SITE_CONFIG.phone,
  whatsappNumber: SITE_CONFIG.whatsappNumber,
  whatsappDisplay: SITE_CONFIG.whatsappDisplay,
  businessHours: SITE_CONFIG.businessHours,
  instagramUrl: SITE_CONFIG.socials.instagram,
  facebookUrl: SITE_CONFIG.socials.facebook,
  tiktokUrl: SITE_CONFIG.socials.tiktok,
  showProjectDisclaimer: SITE_CONFIG.isDemo,
  cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"] as const,
  faqs: [
    {
      question: "Do you offer Cash on Delivery across Pakistan?",
      answer:
        "Yes, Cash on Delivery (COD) is available nationwide for all orders across Karachi, Lahore, Islamabad, and 250+ cities and towns.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are packed and dispatched within 24 hours. Estimated delivery time is 2–4 business days via registered couriers (TCS / Leopards Courier).",
    },
    {
      question: "How long do Noir Scent fragrances last?",
      answer:
        "Our creations are formulated as concentrated Extrait de Parfum using premium perfume oils, engineered for enduring all-day sillage tailored for Pakistan's climate.",
    },
    {
      question: "What concentration are your perfumes?",
      answer:
        "Our creations are formulated as high-concentration Extrait de Parfum using premium fragrance oils and fine perfumer's craft. This ensures optimal diffusion, noble projection, and enduring longevity tailored for Pakistan's climate.",
    },
    {
      question: "What is your return & exchange policy?",
      answer:
        "We offer a 7-day scent exchange policy. If the fragrance notes do not suit you, reach out to our WhatsApp concierge within 7 days of delivery to arrange an exchange (nominal reverse courier fee applies for standard preference swaps; damaged items replaced free).",
    },
    {
      question: "How do I qualify for free shipping?",
      answer:
        `Free express delivery is automatically applied to all orders of Rs. ${SITE_CONFIG.freeDeliveryThreshold.toLocaleString()} and above. Orders below this threshold have a standard delivery fee of Rs. ${SITE_CONFIG.deliveryFee}.`,
    },
  ],
} as const;
