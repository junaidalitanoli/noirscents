import { Resend } from "resend";

/**
 * Server-side Resend Client Configuration
 *
 * Securely accesses RESEND_API_KEY from environment variables on the server.
 * Never exposed to the browser.
 */

// Fallback sender email: Resend free tier onboarding sender
export const DEFAULT_FROM_EMAIL = "Noir Scents <onboarding@resend.dev>";

// Primary store concierge notification recipient
export const DEFAULT_STORE_RECEIVER = "noirscents01@gmail.com";

export function getResendApiKey(): string | undefined {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.trim() === "" || key.includes("your_resend_api_key_here")) {
    return undefined;
  }
  return key.trim();
}

export function getSenderEmail(): string {
  const from = process.env.RESEND_FROM_EMAIL;
  if (from && from.trim().length > 0) {
    return from.trim();
  }
  return DEFAULT_FROM_EMAIL;
}

export function getStoreNotificationEmail(): string {
  const receiver = process.env.MY_RECEIVING_EMAIL;
  if (receiver && receiver.trim().length > 0) {
    return receiver.trim();
  }
  return DEFAULT_STORE_RECEIVER;
}

export function isResendConfigured(): boolean {
  return Boolean(getResendApiKey());
}

let cachedResend: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return null;
  }
  if (!cachedResend) {
    cachedResend = new Resend(apiKey);
  }
  return cachedResend;
}
