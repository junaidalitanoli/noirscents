import { NextResponse } from "next/server";
import { getInboundEmails } from "@/lib/email/inboxStorage";

export async function GET(req: Request) {
  try {
    // 1. Fail closed if admin secret is not configured on the server
    const adminSecret = process.env.ADMIN_SECRET || process.env.ADMIN_INBOX_SECRET;
    if (!adminSecret || adminSecret.trim().length === 0) {
      console.error(
        "[InboxAPI] Server configuration error: ADMIN_SECRET is not set. Access fails closed."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Admin authentication is not configured on server. Access fails closed.",
        },
        { status: 401 }
      );
    }

    // 2. Reject credentials in URL query parameters; accept ONLY via secure headers
    const authHeader =
      req.headers.get("x-admin-token") ||
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    if (!authHeader || authHeader.trim() !== adminSecret.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Valid admin credentials required in secure request header.",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const emails = getInboundEmails(limit);

    return NextResponse.json({
      success: true,
      count: emails.length,
      emails,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error reading inbox";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

