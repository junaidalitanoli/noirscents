import { SITE_URL } from "./site";
import { STORE_CONFIG } from "./store-config";

export const SITE_CONFIG = {
  name: STORE_CONFIG.name,
  legalName: STORE_CONFIG.legalName,
  tagline: STORE_CONFIG.tagline,
  url: SITE_URL,
  email: STORE_CONFIG.contactEmail,
  whatsappNumber: STORE_CONFIG.whatsappNumber,
  whatsappDisplay: STORE_CONFIG.whatsappDisplay,
  freeShippingThreshold: STORE_CONFIG.freeDeliveryThreshold,
  standardShippingFee: STORE_CONFIG.standardShippingFee,
  returnWindowDays: STORE_CONFIG.returnWindowDays,
  businessHours: STORE_CONFIG.businessHours,
} as const;

export const DEFAULT_WHATSAPP_MESSAGE = "Assalam o Alaikum, I have a question about Noir Scent.";

export function getWhatsAppProductMessage(productName: string, productUrl: string): string {
  return `Assalam o Alaikum, I have a question about Noir Scent regarding ${productName}: ${productUrl}`;
}
