import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidPakistaniPhone, formatPrice } from "@/lib/formatters";
import { Order } from "@/types";

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

    // Format Date & Time in Asia/Karachi timezone
    const karachiDate = new Date(order.createdAt || Date.now()).toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const apiKey = process.env.RESEND_API_KEY;
    const receivingEmail = process.env.MY_RECEIVING_EMAIL || "noirscents01@gmail.com";

    // Build items HTML list
    const itemsHtml = order.items
      .map(
        (it) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 8px; font-weight: 600; color: #111827;">${it.product.name}</td>
          <td style="padding: 12px 8px; color: #4b5563;">${it.size.ml}ml</td>
          <td style="padding: 12px 8px; text-align: center; color: #111827;">${it.quantity}</td>
          <td style="padding: 12px 8px; text-align: right; color: #4b5563;">${formatPrice(it.size.price)}</td>
          <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #111827;">${formatPrice(it.size.price * it.quantity)}</td>
        </tr>
      `
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order #${order.id} - Noir Scents</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #1f2937;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background-color: #09090b; padding: 24px; text-align: center; border-bottom: 3px solid #d4af37;">
              <h1 style="color: #d4af37; font-size: 24px; margin: 0; letter-spacing: 2px;">NOIR SCENTS</h1>
              <p style="color: #9ca3af; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 3px;">Artisanal Luxury Perfumes</p>
            </div>

            <div style="padding: 24px;">
              <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #854d0e;">
                  ✨ New Customer Order Received #${order.id}
                </p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #713f12;">
                  Ordered at: <strong>${karachiDate} (PKT)</strong>
                </p>
              </div>

              <!-- Customer Info -->
              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin-top: 0;">
                Customer &amp; Shipping Details
              </h3>
              <table style="width: 100%; font-size: 13px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 4px 0; color: #6b7280; width: 35%;">Customer Name:</td>
                  <td style="padding: 4px 0; font-weight: 600; color: #111827;">${order.customer.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #6b7280;">Phone / WhatsApp:</td>
                  <td style="padding: 4px 0; font-weight: 600; color: #111827;">
                    <a href="https://wa.me/${order.customer.phone.replace(/[^0-9]/g, "")}" style="color: #059669; text-decoration: none;">
                      ${order.customer.phone} (Open WhatsApp)
                    </a>
                  </td>
                </tr>
                ${
                  order.customer.email
                    ? `<tr>
                        <td style="padding: 4px 0; color: #6b7280;">Email:</td>
                        <td style="padding: 4px 0; color: #111827;">${order.customer.email}</td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 4px 0; color: #6b7280;">City:</td>
                  <td style="padding: 4px 0; font-weight: 600; color: #111827;">${order.customer.city}, Pakistan</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #6b7280; vertical-align: top;">Address:</td>
                  <td style="padding: 4px 0; color: #111827; line-height: 1.4;">${order.customer.address}</td>
                </tr>
                ${
                  order.customer.notes
                    ? `<tr>
                        <td style="padding: 4px 0; color: #6b7280; vertical-align: top;">Notes:</td>
                        <td style="padding: 4px 0; color: #4b5563; font-style: italic;">"${order.customer.notes}"</td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 4px 0; color: #6b7280;">Payment Method:</td>
                  <td style="padding: 4px 0; font-weight: bold; color: #059669;">Cash On Delivery (COD)</td>
                </tr>
              </table>

              <!-- Items Table -->
              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
                Ordered Fragrances
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #f3f4f6; text-align: left; font-size: 11px; text-transform: uppercase; color: #4b5563;">
                    <th style="padding: 8px;">Perfume</th>
                    <th style="padding: 8px;">Size</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px; text-align: right;">Price</th>
                    <th style="padding: 8px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Totals -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <table style="width: 100%; font-size: 13px;">
                  <tr>
                    <td style="padding: 4px 0; color: #6b7280;">Subtotal:</td>
                    <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #111827;">${formatPrice(order.subtotal)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #6b7280;">Shipping (Nationwide):</td>
                    <td style="padding: 4px 0; text-align: right; color: #111827;">
                      ${order.shippingFee === 0 ? '<strong style="color: #059669;">FREE</strong>' : formatPrice(order.shippingFee)}
                    </td>
                  </tr>
                  <tr style="border-top: 1px solid #d1d5db;">
                    <td style="padding: 8px 0 0 0; font-size: 15px; font-weight: bold; color: #111827;">Grand Total (Collect on Delivery):</td>
                    <td style="padding: 8px 0 0 0; text-align: right; font-size: 17px; font-weight: bold; color: #92400e;">${formatPrice(order.total)}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 24px 0 0 0;">
                Noir Scents &bull; Dispatched via TCS / Leopards Courier &bull; Cash On Delivery
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Attempt to send email via Resend
    if (!apiKey || apiKey === "your_resend_api_key_here") {
      console.warn(
        `[Noir Scents Server] RESEND_API_KEY is not configured in .env.local. Simulated email send for order #${order.id} to ${receivingEmail}.`
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Order email notification simulated (RESEND_API_KEY placeholder).",
        orderId: order.id,
      });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Noir Scents Orders <onboarding@resend.dev>",
      to: [receivingEmail],
      subject: `New Order #${order.id} - Noir Scents`,
      html: emailHtml,
    });

    if (error) {
      console.error(`[Noir Scents Server] Resend API error for order #${order.id}:`, error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          orderId: order.id,
        },
        { status: 200 } // Still status 200 with success: false so order is saved
      );
    }

    console.log(`[Noir Scents Server] Order email sent successfully for #${order.id}:`, data);
    return NextResponse.json({
      success: true,
      data,
      orderId: order.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("[Noir Scents Server] Uncaught error in /api/send-order:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
