import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { getResendClient } from "@/lib/email/resend";
import {
  saveInboundEmail,
  isEventProcessed,
  markEventProcessed,
  InboundEmailRecord,
} from "@/lib/email/inboxStorage";

export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "Resend Inbound Webhook Listener",
    endpoint: "/api/resend/webhook",
    eventsSupported: ["email.received", "email.delivered", "email.bounced"],
  });
}

export async function POST(req: Request) {
  try {
    const rawPayload = await req.text();

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    // Idempotency: Check if this delivery ID was already handled
    if (svixId && isEventProcessed(svixId)) {
      console.log(`[ResendWebhook] Duplicate webhook event skipped: ${svixId}`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Webhook Signature Verification
    if (webhookSecret && webhookSecret.trim().length > 0) {
      if (!svixId || !svixTimestamp || !svixSignature) {
        console.warn("[ResendWebhook] Missing svix signature headers");
        return NextResponse.json(
          { error: "Missing required svix signature headers" },
          { status: 400 }
        );
      }

      try {
        const wh = new Webhook(webhookSecret.trim());
        wh.verify(rawPayload, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Invalid signature";
        console.error("[ResendWebhook] Signature verification failed:", msg);
        return NextResponse.json(
          { error: "Webhook signature verification failed" },
          { status: 401 }
        );
      }
    } else {
      // In production, reject unverified calls if secret is expected
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "[ResendWebhook] RESEND_WEBHOOK_SECRET is not configured in Netlify environment variables. Webhook processed with signature check bypassed."
        );
      } else {
        console.log("[ResendWebhook] Development mode: RESEND_WEBHOOK_SECRET unconfigured, skipping signature verification.");
      }
    }

    // Parse JSON payload
    let event: {
      type?: string;
      created_at?: string;
      data?: {
        id?: string;
        email_id?: string;
        from?: string;
        to?: string[];
        subject?: string;
        created_at?: string;
        [key: string]: unknown;
      };
    };

    try {
      event = JSON.parse(rawPayload);
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
    }

    const eventType = event.type || "unknown";
    const eventData = event.data || {};

    if (svixId) {
      markEventProcessed(svixId);
    }

    console.log(`[ResendWebhook] Received event: ${eventType}`, {
      emailId: eventData.email_id || eventData.id,
      from: eventData.from,
      subject: eventData.subject,
    });

    // -------------------------------------------------------------------------
    // Handle: email.received (Inbound Email Receiving)
    // -------------------------------------------------------------------------
    if (eventType === "email.received") {
      const emailId = eventData.email_id || eventData.id || `rec_${Date.now()}`;
      const fromAddr = typeof eventData.from === "string" ? eventData.from : "unknown@sender.com";
      const toAddrs = Array.isArray(eventData.to) ? eventData.to : ["concierge@noirscents.com"];
      const subject = typeof eventData.subject === "string" ? eventData.subject : "No Subject";
      const receivedAt = eventData.created_at || event.created_at || new Date().toISOString();

      let textBody: string | undefined;
      let htmlBody: string | undefined;

      // Attempt to retrieve full email body using Resend Receiving API
      const resend = getResendClient();
      if (resend && eventData.email_id) {
        try {
          const receivingResponse = await resend.emails.receiving.get(eventData.email_id);
          if (receivingResponse.data) {
            const emailDetails = receivingResponse.data as {
              text?: string;
              html?: string;
              subject?: string;
            };
            textBody = emailDetails.text;
            htmlBody = emailDetails.html;
            console.log(`[ResendWebhook] Successfully fetched email body for ${eventData.email_id}`);
          }
        } catch (fetchErr) {
          console.warn(`[ResendWebhook] Note: Could not fetch receiving body via API (${fetchErr}), saving webhook metadata.`);
        }
      }

      const emailRecord: InboundEmailRecord = {
        id: svixId || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        emailId,
        from: fromAddr,
        to: toAddrs,
        subject,
        receivedAt,
        text: textBody,
        html: htmlBody,
        snippet: textBody ? textBody.substring(0, 160) : subject,
      };

      saveInboundEmail(emailRecord);

      return NextResponse.json({
        success: true,
        event: "email.received",
        emailId,
        stored: true,
      });
    }

    // -------------------------------------------------------------------------
    // Handle other standard outbound events (delivered, bounced, opened)
    // -------------------------------------------------------------------------
    return NextResponse.json({
      success: true,
      event: eventType,
      handled: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error processing webhook";
    console.error("[ResendWebhook] Unexpected error:", message);
    return NextResponse.json(
      { error: "Internal webhook processing error" },
      { status: 500 }
    );
  }
}
