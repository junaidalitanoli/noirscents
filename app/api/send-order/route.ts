import { NextResponse } from "next/server";
import { isValidPakistaniPhone } from "@/lib/formatters";
import { Order } from "@/types";
import { sendOrderEmails } from "@/lib/email/orderService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order: Order = body.order;

    if (!order || !order.customer) {
      return NextResponse.json(
        { error: "Invalid order payload. Customer details are required." },
        { status: 400 }
      );
    }

    const { fullName, phone, address, city } = order.customer;

    // Validate server-side inputs
    if (!fullName || fullName.trim().length < 3) {
      return NextResponse.json(
        { error: "Recipient name must be at least 3 characters." },
        { status: 400 }
      );
    }

    if (!phone || !isValidPakistaniPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid Pakistani phone format. Must be 03XX-XXXXXXX or 03XXXXXXXXX." },
        { status: 400 }
      );
    }

    if (!address || address.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a complete street delivery address." },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        { error: "Delivery city is required." },
        { status: 400 }
      );
    }

    if (!order.items || order.items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one fragrance item." },
        { status: 400 }
      );
    }

    // Dispatch emails via Resend service (Admin + Customer)
    const emailResult = await sendOrderEmails(order);

    return NextResponse.json({
      orderId: order.id,
      ...emailResult,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("[Noir Scents Server] Error in /api/send-order:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
