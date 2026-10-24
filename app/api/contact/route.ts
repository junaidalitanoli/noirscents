import { NextResponse } from "next/server";
import { getResendClient, getSenderEmail, getStoreNotificationEmail } from "@/lib/email/resend";
import { generateContactNotificationEmail } from "@/lib/email/templates";
import { isValidPakistaniPhone } from "@/lib/formatters";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || !isValidPakistaniPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid Pakistani contact number (03XX-XXXXXXX)." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const resend = getResendClient();
    const fromEmail = getSenderEmail();
    const storeEmail = getStoreNotificationEmail();

    if (!resend) {
      console.warn("[ContactAPI] RESEND_API_KEY is not configured. Simulating contact inquiry email send.");
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Your message has been received (simulation mode).",
      });
    }

    const template = generateContactNotificationEmail({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      subject: subject ? subject.trim() : undefined,
      message: message.trim(),
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
