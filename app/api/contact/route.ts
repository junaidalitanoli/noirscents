import { NextResponse } from "next/server";
import { getResendClient, getSenderEmail, getStoreNotificationEmail } from "@/lib/email/resend";
import { generateContactNotificationEmail } from "@/lib/email/templates";
import { isValidPakistaniPhone } from "@/lib/formatters";
import { checkRateLimit, getClientIp } from "@/lib/email/rateLimiter";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // Rate Limiting: Max 5 inquiries per 10 minutes per IP
    const rateCheck = checkRateLimit(`contact_${ip}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait before submitting another inquiry." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSec || 60),
          },
        }
      );
    }

    const body = await req.json();

    // Honeypot bot protection: if hidden field is filled, silently discard
    if (body.website || body.hp_company) {
      console.log(`[ContactAPI] Bot detected via honeypot from IP ${ip}`);
      return NextResponse.json({
        success: true,
        messageId: "hp_discarded",
        message: "Your message has been received.",
      });
    }

    const { name, phone, email, subject, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !isValidPakistaniPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid Pakistani contact number (03XX-XXXXXXX)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    // Sanitize length
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedPhone = phone.trim().slice(0, 20);
    const sanitizedEmail = email && typeof email === "string" ? email.trim().slice(0, 100) : undefined;
    const sanitizedSubject = subject && typeof subject === "string" ? subject.trim().slice(0, 150) : undefined;
    const sanitizedMessage = message.trim().slice(0, 4000);

    const resend = getResendClient();
    const fromEmail = getSenderEmail();
    const storeEmail = getStoreNotificationEmail();

    if (!resend) {
      console.error("[ContactAPI] Server configuration error: RESEND_API_KEY is not set.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is currently unconfigured. Please contact our concierge directly on WhatsApp (+92 332 2224331).",
        },
        { status: 503 }
      );
    }

    const template = generateContactNotificationEmail({
      name: sanitizedName,
      phone: sanitizedPhone,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [storeEmail],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error("[ContactAPI] Resend API error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    console.log("[ContactAPI] Inquiry sent successfully:", data?.id);
    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[ContactAPI] Uncaught error:", msg);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
