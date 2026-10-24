import { STORE_CONFIG } from "./store-config";

export const BRAND_NAME = STORE_CONFIG.name;
export const BRAND_TAGLINE = STORE_CONFIG.tagline;
export const FREE_SHIPPING_THRESHOLD = STORE_CONFIG.freeDeliveryThreshold;
export const STANDARD_SHIPPING_FEE = STORE_CONFIG.standardShippingFee;
export const ADMIN_DEMO_PASSWORD = "admin123";

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
  {
    slug: "men",
    label: "Men",
    description: "Bold, charismatic, and masculine extrait perfumes designed for 8–12+ hours endurance in Pakistan.",
  },
  {
    slug: "women",
    label: "Women",
    description: "Enchanting, floral, amber, and gourmand extrait blends with alluring trails and graceful sillage.",
  },
  {
    slug: "testers",
    label: "Testers",
    description: "Discovery sets and sample vials to test our artisanal creations before selecting your signature bottle.",
  },
  {
    slug: "deals",
    label: "Perfume Bundles & Deals",
    description: "Curated multi-bottle bundles, duo pairings, and special promotional offers at exceptional value.",
  },
] as const;
