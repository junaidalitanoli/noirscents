import { NextResponse } from "next/server";
import { getInboundEmails } from "@/lib/email/inboxStorage";
import { ADMIN_DEMO_PASSWORD } from "@/lib/constants";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // Security: Authenticate admin access
    const adminSecret = process.env.ADMIN_SECRET || ADMIN_DEMO_PASSWORD;
    const authHeader =
      req.headers.get("x-admin-token") ||
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    const queryToken = searchParams.get("token");

    const token = authHeader || queryToken;

    if (!token || token !== adminSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

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

