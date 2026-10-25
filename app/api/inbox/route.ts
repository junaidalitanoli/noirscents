import { NextResponse } from "next/server";
import { getInboundEmails } from "@/lib/email/inboxStorage";
import { verifyAdminAuth } from "@/lib/admin/auth";

export async function GET(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.authorized) {
      return auth.response!;
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

