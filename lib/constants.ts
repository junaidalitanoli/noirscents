import { SITE_CONFIG } from "./config";

export const BRAND_NAME = SITE_CONFIG.name;
export const BRAND_TAGLINE = SITE_CONFIG.tagline;
export const FREE_SHIPPING_THRESHOLD = SITE_CONFIG.freeShippingThreshold;
export const STANDARD_SHIPPING_FEE = SITE_CONFIG.standardShippingFee;
export const ADMIN_DEMO_PASSWORD = SITE_CONFIG.adminPassword;

export const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Abbottabad",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Mirpur (AJK)",
  "Mardan",
  "Larkana",
  "Sheikhupura",
  "Jhang",
  "Rahim Yar Khan",
  "Kasur",
  "Muzaffarabad",
  "Wah Cantt",
  "Dera Ghazi Khan",
  "Gujrat",
] as const;

export const CATEGORIES = [
  { slug: "men", label: "Men", description: "Bold, charismatic, and masculine scents designed for endurance." },
  { slug: "women", label: "Women", description: "Enchanting, floral, amber, and gourmand blends with alluring trails." },
  { slug: "testers", label: "Testers", description: "Discovery sets and sample vials to test our artisanal creations." },
  { slug: "deals", label: "Crazy Deals", description: "Limited-edition bundled offers, duo packs, and clearance specials." },
] as const;
