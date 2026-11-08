/**
 * Central site configuration for Noir Scent.
 * Single source of truth for domain, brand naming, contact details, policies, and flags.
 *
 * CONFIG RULES:
 * - FINAL_DOMAIN = https://www.noirscent.pk (canonical host is www; non-www 301 redirects to www).
 * - Site URL is read strictly from NEXT_PUBLIC_SITE_URL.
 * - PRE-LAUNCH PROTECTION: While NEXT_PUBLIC_SITE_URL !== https://www.noirscent.pk:
 *     * app/robots.ts returns Disallow: / for all user agents (omits sitemap line)
 *     * Root layout metadata sets robots: { index: false, follow: false }
 *   When NEXT_PUBLIC_SITE_URL equals https://www.noirscent.pk, full indexing & sitemap are active.
 */

export const FINAL_DOMAIN = "https://www.noirscent.pk";

// Read site URL from single env var, normalizing trailing slashes.
// If unset, defaults to FINAL_DOMAIN.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || FINAL_DOMAIN;
export const SITE_URL: string = rawSiteUrl.replace(/\/+$/, "");

// Pre-launch protection check
export const IS_PRODUCTION_DOMAIN = SITE_URL === FINAL_DOMAIN;

export const SITE_CONFIG = {
  // Brand name (singular everywhere)
  brandName: "Noir Scent",
  legalName: "Noir Scent Pakistan",
  tagline: "Artisanal Extrait Perfumes in Pakistan",

  // URLs & Domains
  siteUrl: SITE_URL,
  finalDomain: FINAL_DOMAIN,
  isProductionDomain: IS_PRODUCTION_DOMAIN,

  // Flag for demo/academic disclaimer (default false)
  isDemo: process.env.NEXT_PUBLIC_IS_DEMO === "true",

  // Contact info
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "noirscent.pk@gmail.com",
  phone: "+92 330 3344667",
  whatsappNumber: "923303344667",
  whatsappDisplay: "+92 330 3344667",
  businessHours: "Monday to Saturday: 10 AM – 8 PM PKT",

  // Shipping & Policy Thresholds
  freeDeliveryThreshold: 3000,
  deliveryFee: 250,
  reverseCourierFee: 200,
  returnWindowDays: 7,
  deliveryTime: "2–4 business days",
  couriers: "TCS / Leopards Courier",

  // Social handles
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/noirscent.pk?obrf=MXRpaXpqNm4zeXZkNg==",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/profile.php?id=61595873946277&mibextid=rS40aB7S9Ucbxw6v",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://vt.tiktok.com/ZSgwrMmRL/",
  },
} as const;

/**
 * Returns an absolute URL based on the active SITE_URL
 */
export function getAbsoluteUrl(path: string = ""): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

