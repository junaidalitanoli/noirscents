import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/orders/orderStorage";
import { checkRateLimit, getClientIp } from "@/lib/email/rateLimiter";

const ORDER_ID_REGEX = /^NS-\d{4,12}$/;

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
 * Sanitizes sensitive customer PII (masks phone, removes address and notes) to prevent data leaks.
 */
export async function GET(req: Request, context: RouteParams) {
  try {
    // 1. Rate limiting (30 requests / 10 min per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`order_lookup_${ip}`, 30, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many order lookup requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSec || 60),
          },
        }
      );
    }

    // 2. Validate orderId format strictly against /^NS-\d{4,12}$/
    const { orderId } = await context.params;

    if (!orderId || typeof orderId !== "string" || !ORDER_ID_REGEX.test(orderId.trim())) {
      return NextResponse.json(
        { success: false, error: "Invalid order ID format." },
        { status: 400 }
      );
    }

    const order = await getOrderById(orderId.trim());

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

    // Return sanitized order data (address & notes omitted for privacy)
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        customer: {
          fullName: order.customer.fullName,
          phone: maskedPhone,
          city: order.customer.city,
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
