import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // Successfully received subscription
    console.log(`[Newsletter] New subscriber: ${email}`);
    return NextResponse.json({ success: true, message: "Thank you for subscribing to Noir Scent." });
  } catch {
    return NextResponse.json({ error: "Failed to process subscription." }, { status: 500 });
  }
}

