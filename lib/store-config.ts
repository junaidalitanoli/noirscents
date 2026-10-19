/**
 * Single source of truth for store configuration, policies, and brand standards.
 */
export const STORE_CONFIG = {
  name: "Noir Scents",
  legalName: "Noir Scents Pakistan",
  tagline: "Artisanal Luxury Scents Crafted for Pakistan",
  freeDeliveryThreshold: 3000,
  standardShippingFee: 250,
  returnWindowDays: 7,
  longevityText: "8–12+ hours",
  concentrationText: "25–30% oil concentration",
  perfumeType: "Extrait de Parfum",
  deliveryTime: "2–4 business days",
  couriers: "TCS / Leopards Courier",
  contactEmail: "noirscents01@gmail.com",
  phone: "+92 332 2224331",
  whatsappNumber: "923322224331",
  whatsappDisplay: "+92 332 2224331",
  businessHours: "Monday to Saturday: 10 AM – 8 PM PKT",
  instagramUrl: (process.env.NEXT_PUBLIC_INSTAGRAM_URL || "").trim(),
  facebookUrl: (process.env.NEXT_PUBLIC_FACEBOOK_URL || "").trim(),
  showProjectDisclaimer: process.env.NEXT_PUBLIC_SHOW_PROJECT_DISCLAIMER !== "false",
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
      question: "How long do Noir Scents fragrances last?",
      answer:
        "Our creations are formulated as concentrated Extrait de Parfum with 25–30% oil concentration, providing 8–12+ hours of lingering endurance tailored for Pakistan's climate.",
    },
    {
      question: "Are your perfumes non-alcoholic?",
      answer:
        "Yes. All Noir Scents formulations are 100% non-alcoholic extrait creations, making them prayer-safe, skin-friendly, and non-drying.",
    },
    {
      question: "What is your return & exchange policy?",
      answer:
        "We offer a 7-day scent exchange policy. If the fragrance notes do not suit you, reach out to our WhatsApp concierge within 7 days of delivery to arrange an exchange.",
    },
    {
      question: "How do I qualify for free shipping?",
      answer:
        "Free express delivery is automatically applied to all orders of Rs. 3,000 and above. Orders below this threshold have a standard delivery fee of Rs. 250.",
    },
  ],
} as const;
