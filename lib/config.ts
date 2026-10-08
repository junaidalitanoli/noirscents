/**
 * NOIR SCENTS Store Configuration
 * 
 * Replace 'whatsappNumber' with your actual business WhatsApp number.
 * Format: Country code followed by your number without '+' or spaces.
 * Example for Pakistan: "923322224331" or "923001234567"
 */
export const STORE_CONFIG = {
  storeName: "NOIR SCENTS",
  tagline: "Handcrafted Luxury Fragrances",
  whatsappNumber: "923322224331", // <-- Set your WhatsApp number here
  ownerEmail: "junaidalitanoli23@gmail.com", // <-- Order notification recipient email
  supportEmail: "orders@noirscents.com",
  freeDeliveryThreshold: 5000,
  currency: "PKR",
};

/**
 * Generates direct WhatsApp checkout URL tailored for mobile and desktop
 * to skip landing pages and open chat directly.
 */
export function getDirectWhatsAppUrl(phone: string, text: string): string {
  // Strip all non-numeric characters (spaces, +, dashes)
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedText = encodeURIComponent(text);

  // Check if user is on mobile
  if (typeof window !== "undefined") {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // Direct mobile intent - opens native WhatsApp app immediately
      return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
    }
  }

  // Desktop default - opens directly in WhatsApp Web with prefilled message
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
