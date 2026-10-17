/**
 * Formats a number to Pakistani Rupee currency string, e.g. "Rs. 4,500"
 */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return `Rs. ${formatted}`;
}

/**
 * Validates a Pakistani mobile number.
 * Accepts formats: 03001234567, 0300-1234567, 0300 1234567, +923001234567
 */
export function isValidPakistaniPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  // Matches 03XXXXXXXXX (11 digits) or +923XXXXXXXXX (13 chars) or 923XXXXXXXXX (12 digits)
  return /^((\+92)?|0)3[0-9]{9}$/.test(cleaned);
}

/**
 * Standardizes a phone number for display/storage
 */
export function formatPakistaniPhone(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, "");
  if (cleaned.startsWith("+92")) {
    return "0" + cleaned.slice(3);
  }
  if (cleaned.startsWith("92") && cleaned.length === 12) {
    return "0" + cleaned.slice(2);
  }
  return cleaned;
}
