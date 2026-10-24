import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/orders/orderStorage";

interface RouteParams {
  params: Promise<{
    orderId: string;
  }>;
}

/**
 * GET /api/order/[orderId]
 * Public order confirmation lookup endpoint.
 * Allows OrderSuccess page to verify genuine server-persisted order state
 * and prevents fabricated phantom orders via local storage manipulation.
 * Sanitizes sensitive customer PII to prevent data leaks.
 */
export async function GET(req: Request, context: RouteParams) {
  try {
    const { orderId } = await context.params;

    if (!orderId || typeof orderId !== "string" || orderId.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Order ID is required." },
        { status: 400 }
      );
    }

    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: `Order #${orderId} not found.` },
        { status: 404 }
      );
    }

    // Mask phone number for privacy (e.g. 0300****67)
    const rawPhone = order.customer.phone || "";
    const maskedPhone = rawPhone.length > 6
      ? `${rawPhone.slice(0, 4)}****${rawPhone.slice(-2)}`
      : rawPhone;

    // Return sanitized order data
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        customer: {
          fullName: order.customer.fullName,
          phone: maskedPhone,
          city: order.customer.city,
          address: order.customer.address,
          notes: order.customer.notes,
        },
        items: order.items,
        subtotal: order.subtotal,
        shippingFee: order.shippingFee,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Order Lookup API] Error retrieving order:", msg);
    return NextResponse.json(
      { success: false, error: "Server error retrieving order details." },
      { status: 500 }
    );
  }
}
