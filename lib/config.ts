export const SITE_CONFIG = {
  name: "Noir Scents",
  legalName: "Noir Scents Pakistan",
  tagline: "Artisanal Luxury Scents Crafted for Pakistan",
  url: "https://noir-scents.pk",
  email: "noirscents01@gmail.com",
  whatsappNumber: "923322224331",
  whatsappDisplay: "+92 332 2224331",
  freeShippingThreshold: 3000,
  standardShippingFee: 250,
  adminPassword: "admin123",
  businessHours: "Monday to Saturday: 10 AM – 8 PM PKT",
} as const;

export const DEFAULT_WHATSAPP_MESSAGE = "Assalam o Alaikum, I have a question about Noir Scents.";

export function getWhatsAppProductMessage(productName: string, productUrl: string): string {
  return `Assalam o Alaikum, I have a question about Noir Scents regarding ${productName}: ${productUrl}`;
}
