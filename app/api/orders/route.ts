import { NextResponse } from "next/server";
import { listOrders, updateOrderStatus, getOrderStorageStatus } from "@/lib/orders/orderStorage";
import { OrderStatus } from "@/types";

function verifyAdminAuth(req: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET || process.env.ADMIN_INBOX_SECRET;

  // Fail closed if admin secret is not configured
  if (!adminSecret || adminSecret.trim() === "" || adminSecret.includes("your_admin_secret_token_here")) {
    return false;
  }

  // Accept token ONLY via secure headers (reject URL query parameters)
  const headerToken = req.headers.get("x-admin-token") || req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!headerToken) {
    return false;
  }

  return headerToken.trim() === adminSecret.trim();
}

/**
 * GET /api/orders
 * Returns list of server-persisted orders for authenticated admin dashboard
 */
export async function GET(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized access. Valid admin authentication token required in x-admin-token or Authorization header.",
      },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit")) || 100, 200);

    const orders = await listOrders(limit);
    const storageStatus = getOrderStorageStatus();

    return NextResponse.json({
      success: true,
      orders,
      storageStatus,
      totalCount: orders.length,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Orders API] Error fetching orders:", msg);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve orders." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders
 * Updates an order status (Pending -> Shipped -> Delivered)
 */
export async function PATCH(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid orderId is required." },
        { status: 400 }
      );
    }

    const validStatuses: OrderStatus[] = ["Pending", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(orderId.trim(), status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Order #${orderId} not found or could not be updated.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      status,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `Error updating order: ${msg}` },
      { status: 500 }
    );
  }
}
