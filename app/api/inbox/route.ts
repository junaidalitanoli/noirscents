import { NextResponse } from "next/server";
import { getInboundEmails } from "@/lib/email/inboxStorage";

export async function GET(req: Request) {
  try {
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
