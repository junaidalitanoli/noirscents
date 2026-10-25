import { NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit, getClientIp } from "@/lib/email/rateLimiter";

export interface AdminAuthResult {
  authorized: boolean;
  response?: NextResponse;
}

/**
 * Timing-safe string comparison using crypto.timingSafeEqual.
 * Protects against timing side-channel attacks on secret tokens.
 */
function timingSafeCompare(candidate: string | null | undefined, secret: string): boolean {
  if (!candidate || typeof candidate !== "string") {
    return false;
  }
  const candidateBuf = Buffer.from(candidate.trim(), "utf-8");
  const secretBuf = Buffer.from(secret.trim(), "utf-8");

  if (candidateBuf.length !== secretBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidateBuf, secretBuf);
}

/**
 * Shared admin authentication verification helper for sensitive admin routes.
 *
 * Rules:
 * 1. Fails closed if ADMIN_SECRET is not configured, is shorter than 16 chars, or contains placeholder text.
 * 2. Accepts token ONLY via secure request headers (x-admin-token or Authorization: Bearer).
 * 3. Strictly rejects URL query parameter credentials.
 * 4. Compares tokens in constant time using crypto.timingSafeEqual.
 * 5. Rate limits failed attempts to 10 per 10 minutes per IP (returns HTTP 429).
 * 6. Never logs secrets or received tokens.
 */
export function verifyAdminAuth(req: Request): AdminAuthResult {
  const adminSecret = process.env.ADMIN_SECRET || process.env.ADMIN_INBOX_SECRET;

  // Fail closed if admin secret is not set, too short (< 16 chars), or is placeholder text
  if (
    !adminSecret ||
    typeof adminSecret !== "string" ||
    adminSecret.trim().length < 16 ||
    adminSecret.includes("your_admin_secret_token_here") ||
    adminSecret.includes("placeholder")
  ) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Admin authentication is not configured on server. Access fails closed.",
        },
        { status: 401 }
      ),
    };
  }

  const cleanSecret = adminSecret.trim();

  // Accept token ONLY via secure request headers (x-admin-token or Authorization Bearer)
  const headerToken =
    req.headers.get("x-admin-token") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  const isMatch = timingSafeCompare(headerToken, cleanSecret);

  if (isMatch) {
    return { authorized: true };
  }

  // Failed authentication attempt: rate limit per IP (10 failed attempts / 10 minutes)
  const ip = getClientIp(req);
  const rateCheck = checkRateLimit(`admin_auth_failed_${ip}`, 10, 10 * 60 * 1000);

  if (!rateCheck.allowed) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Too many failed admin authentication attempts. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSec || 60),
          },
        }
      ),
    };
  }

  return {
    authorized: false,
    response: NextResponse.json(
      {
        success: false,
        error: "Unauthorized access. Valid admin credentials required in secure request header.",
      },
      { status: 401 }
    ),
  };
}
