import { NextResponse } from "next/server";
import { isValidPakistaniPhone } from "@/lib/formatters";
import { Order, CartItem } from "@/types";
import { sendOrderEmails } from "@/lib/email/orderService";
import { checkRateLimit, getClientIp } from "@/lib/email/rateLimiter";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/lib/constants";
import { saveOrder, updateOrderEmailStatus } from "@/lib/orders/orderStorage";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // Rate Limiting: Max 10 order email dispatches per 10 minutes per IP
    const rateCheck = checkRateLimit(`order_${ip}`, 10, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many order requests. Please wait a few minutes." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSec || 60),
          },
        }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload. Unable to parse request body." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || !("order" in body) || !body.order || typeof body.order !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. An 'order' object is required." },
        { status: 400 }
      );
    }

    const payload = body as { order: Order; idempotencyKey?: string };
    const order = payload.order;
    const idempotencyKey = typeof payload.idempotencyKey === "string" ? payload.idempotencyKey.trim().slice(0, 100) : undefined;

    if (!order.customer || typeof order.customer !== "object") {
      return NextResponse.json(
        { error: "Invalid order payload. Customer details are required." },
        { status: 400 }
      );
    }

    const { fullName, phone, address, city } = order.customer;

    // Validate server-side inputs
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 3) {
      return NextResponse.json(
        { error: "Recipient name must be at least 3 characters." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !isValidPakistaniPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid Pakistani phone format. Must be 03XX-XXXXXXX or 03XXXXXXXXX." },
        { status: 400 }
      );
    }

    if (!address || typeof address !== "string" || address.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a complete street delivery address (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (!city || typeof city !== "string" || city.trim().length < 2) {
      return NextResponse.json(
        { error: "Delivery city is required." },
        { status: 400 }
      );
    }

    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one fragrance item." },
        { status: 400 }
      );
    }

    // Server-side item, catalog matching, price recalculation, and quantity verification
    let serverSubtotal = 0;
    const validatedItems: CartItem[] = [];

    for (const item of order.items) {
      if (!item || typeof item !== "object" || !item.product || typeof item.product !== "object" || !item.size || typeof item.size !== "object") {
        return NextResponse.json(
          { error: "Invalid item structure in order." },
          { status: 400 }
        );
      }

      // Quantity must be a whole integer between 1 and 50 (rejects fractional, negative, zero, and huge numbers)
      const rawQty = item.quantity;
      if (typeof rawQty !== "number" || !Number.isInteger(rawQty) || rawQty < 1 || rawQty > 50) {
        return NextResponse.json(
          { error: `Invalid quantity for item "${item.product?.name || "fragrance"}". Quantity must be a whole integer between 1 and 50.` },
          { status: 400 }
        );
      }
      const quantity = rawQty;

      // Match strictly against canonical catalog to prevent client price tampering or fake product IDs
      const productId = typeof item.product.id === "string" ? item.product.id.trim() : "";
      const productSlug = typeof item.product.slug === "string" ? item.product.slug.trim().toLowerCase() : "";

      const catalogProduct = INITIAL_PRODUCTS.find(
        (p) => (productId && p.id === productId) || (productSlug && p.slug.toLowerCase() === productSlug)
      );

      if (!catalogProduct) {
        return NextResponse.json(
          { error: `Invalid product "${item.product?.name || productId || productSlug || "unknown"}". Product not found in catalog.` },
          { status: 400 }
        );
      }

      // Match size variant from canonical catalog
      const sizeMl = Number(item.size?.ml);
      const matchedSize = catalogProduct.sizes.find(
        (s) => s.ml === sizeMl
      );

      if (!matchedSize) {
        return NextResponse.json(
          { error: `Invalid size variant (${item.size?.ml}ml) for product "${catalogProduct.name}".` },
          { status: 400 }
        );
      }

      // Authoritative unit price from trusted server catalog
      const unitPrice = matchedSize.price;
      if (unitPrice <= 0) {
        return NextResponse.json(
          { error: `Invalid catalog price for item "${catalogProduct.name}".` },
          { status: 400 }
        );
      }

      serverSubtotal += unitPrice * quantity;

      validatedItems.push({
        ...item,
        product: {
          ...item.product,
          id: catalogProduct.id,
          slug: catalogProduct.slug,
          name: catalogProduct.name,
        },
        size: {
          ml: matchedSize.ml,
          price: unitPrice,
        },
        quantity,
      });
    }

    // Authoritative server calculation for shipping fee & total
    const serverShippingFee = serverSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const serverTotal = serverSubtotal + serverShippingFee;

    // Stable server order ID generation
    const serverOrderId = (order.id && /^NS-\d{4,8}$/.test(order.id.trim()))
      ? order.id.trim()
      : `NS-${Date.now().toString().slice(-5)}${Math.floor(1000 + Math.random() * 9000)}`;

    const verifiedOrder: Order = {
      id: serverOrderId,
      customer: {
        fullName: fullName.trim().slice(0, 100),
        phone: phone.trim().slice(0, 20),
        email: order.customer.email && typeof order.customer.email === "string"
          ? order.customer.email.trim().slice(0, 100)
          : undefined,
        address: address.trim().slice(0, 250),
        city: city.trim().slice(0, 50),
      },
      items: validatedItems,
      subtotal: serverSubtotal,
      shippingFee: serverShippingFee,
      total: serverTotal,
      status: "Pending",
      paymentMethod: "Cash on Delivery",
      createdAt: order.createdAt || new Date().toISOString(),
      emailStatus: "pending",
      idempotencyKey,
    };

    // 1. STEP 1: Persist order durably in server-side storage FIRST
    const storageResult = await saveOrder(verifiedOrder, { idempotencyKey });

    if (!storageResult.success) {
      console.error("[Noir Scent Server] Order persistence failed:", storageResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to persist order to storage. Your order was not saved. Please try again or contact WhatsApp support.",
        },
        { status: 500 }
      );
    }

    // If order was already processed via idempotency, return saved order without duplicate dispatch
    if (storageResult.isDuplicate) {
      return NextResponse.json({
        success: true,
        isDuplicate: true,
        orderId: storageResult.order.id,
        subtotal: storageResult.order.subtotal,
        shippingFee: storageResult.order.shippingFee,
        total: storageResult.order.total,
        message: "Order already confirmed.",
      });
    }

    // 2. STEP 2: Downstream Email Dispatch (Admin + Customer)
    let emailStatus: "sent" | "failed" | "unconfigured" = "unconfigured";
    let emailError: string | undefined;

    try {
      const emailResult = await sendOrderEmails(verifiedOrder);
      if (emailResult.success) {
        emailStatus = "sent";
      } else {
        emailStatus = emailResult.simulated ? "unconfigured" : "failed";
        emailError = emailResult.error;
      }
    } catch (dispatchErr) {
      emailStatus = "failed";
      emailError = dispatchErr instanceof Error ? dispatchErr.message : String(dispatchErr);
      console.error("[Noir Scent Server] Downstream email dispatch exception:", emailError);
    }

    // Update stored order record with email status
    await updateOrderEmailStatus(verifiedOrder.id, emailStatus, emailError);

    // 3. STEP 3: Return authoritative response
    // Order is durably saved regardless of downstream email outcome
    return NextResponse.json({
      success: true,
      orderId: verifiedOrder.id,
      subtotal: verifiedOrder.subtotal,
      shippingFee: verifiedOrder.shippingFee,
      total: verifiedOrder.total,
      storageProvider: storageResult.storageProvider,
      emailStatus,
      emailError,
      notificationSent: emailStatus === "sent",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("[Noir Scent Server] Error in /api/send-order:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
