import { Order, OrderStatus } from "@/types";
import { formatPrice } from "@/lib/formatters";

/**
 * Utility to escape untrusted HTML content
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Format timestamp in Asia/Karachi (PKT)
 */
export function formatKarachiDateTime(dateString?: string): string {
  return new Date(dateString || Date.now()).toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
    timeStyle: "medium",
  });
}

// ============================================================================
// 1. STORE ADMIN ORDER NOTIFICATION (HTML + TEXT)
// ============================================================================

export function generateOrderAdminEmail(order: Order): {
  subject: string;
  html: string;
  text: string;
} {
  const karachiTime = formatKarachiDateTime(order.createdAt);
  const cleanPhone = order.customer.phone.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}`;

  const itemsHtml = order.items
    .map(
      (it) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; font-weight: 600; color: #111827;">${escapeHtml(it.product.name)}</td>
        <td style="padding: 12px 8px; color: #4b5563;">${it.size.ml}ml</td>
        <td style="padding: 12px 8px; text-align: center; color: #111827;">${it.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; color: #4b5563;">${formatPrice(it.size.price)}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #111827;">${formatPrice(it.size.price * it.quantity)}</td>
      </tr>
    `
    )
    .join("");

  const itemsText = order.items
    .map(
      (it) =>
        `- ${it.product.name} (${it.size.ml}ml) x ${it.quantity} = ${formatPrice(it.size.price * it.quantity)}`
    )
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Order #${escapeHtml(order.id)} - Noir Scent</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #1f2937;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #09090b; padding: 24px; text-align: center; border-bottom: 3px solid #c59a3f;">
            <h1 style="color: #c59a3f; font-size: 24px; margin: 0; letter-spacing: 3px; font-weight: bold;">NOIR SCENT</h1>
            <p style="color: #a1a1aa; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Store Management Notification</p>
          </div>

          <div style="padding: 24px;">
            <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #854d0e;">
                ✨ New Customer Order Received #${escapeHtml(order.id)}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #713f12;">
                Placed at: <strong>${karachiTime} (PKT)</strong>
              </p>
            </div>

            <!-- Customer Details -->
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin-top: 0;">
              Customer &amp; Shipping Details
            </h3>
            <table style="width: 100%; font-size: 13px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 4px 0; color: #6b7280; width: 35%;">Customer Name:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #111827;">${escapeHtml(order.customer.fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Phone / WhatsApp:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #111827;">
                  <a href="${waUrl}" style="color: #059669; text-decoration: none; font-weight: bold;">
                    ${escapeHtml(order.customer.phone)} (Click to Chat)
                  </a>
                </td>
              </tr>
              ${
                order.customer.email
                  ? `<tr>
                      <td style="padding: 4px 0; color: #6b7280;">Email:</td>
                      <td style="padding: 4px 0; color: #111827;"><a href="mailto:${escapeHtml(order.customer.email)}" style="color: #2563eb;">${escapeHtml(order.customer.email)}</a></td>
                    </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">City:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #111827;">${escapeHtml(order.customer.city)}, Pakistan</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280; vertical-align: top;">Street Address:</td>
                <td style="padding: 4px 0; color: #111827; line-height: 1.4;">${escapeHtml(order.customer.address)}</td>
              </tr>
              ${
                order.customer.notes
                  ? `<tr>
                      <td style="padding: 4px 0; color: #6b7280; vertical-align: top;">Customer Notes:</td>
                      <td style="padding: 4px 0; color: #4b5563; font-style: italic;">"${escapeHtml(order.customer.notes)}"</td>
                    </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Payment Method:</td>
                <td style="padding: 4px 0; font-weight: bold; color: #059669;">Cash On Delivery (COD)</td>
              </tr>
            </table>

            <!-- Items Table -->
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
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

            <!-- Order Financials -->
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
              Noir Scent &bull; Automated notification via Resend &bull; Cash On Delivery
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
NOIR SCENT - NEW ORDER RECEIVED #${order.id}
Placed: ${karachiTime} (PKT)

CUSTOMER & SHIPPING:
Name: ${order.customer.fullName}
Phone: ${order.customer.phone} (WhatsApp: ${waUrl})
${order.customer.email ? `Email: ${order.customer.email}\n` : ""}City: ${order.customer.city}, Pakistan
Address: ${order.customer.address}
${order.customer.notes ? `Notes: "${order.customer.notes}"\n` : ""}Payment: Cash On Delivery (COD)

ORDERED ITEMS:
${itemsText}

FINANCIALS:
Subtotal: ${formatPrice(order.subtotal)}
Shipping: ${order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}
Total To Collect: ${formatPrice(order.total)}
  `.trim();

  return {
    subject: `[New Order] #${order.id} - ${order.customer.fullName} (${order.customer.city})`,
    html,
    text,
  };
}

// ============================================================================
// 2. CUSTOMER ORDER CONFIRMATION (HTML + TEXT)
// ============================================================================

export function generateOrderCustomerEmail(order: Order): {
  subject: string;
  html: string;
  text: string;
} {
  const karachiTime = formatKarachiDateTime(order.createdAt);

  const itemsHtml = order.items
    .map(
      (it) => `
      <tr style="border-bottom: 1px solid #f0ede6;">
        <td style="padding: 12px 6px; font-weight: 600; color: #1c1917;">${escapeHtml(it.product.name)}</td>
        <td style="padding: 12px 6px; color: #78716c;">${it.size.ml}ml Extrait</td>
        <td style="padding: 12px 6px; text-align: center; color: #1c1917;">${it.quantity}</td>
        <td style="padding: 12px 6px; text-align: right; font-weight: bold; color: #1c1917;">${formatPrice(it.size.price * it.quantity)}</td>
      </tr>
    `
    )
    .join("");

  const itemsText = order.items
    .map(
      (it) =>
        `- ${it.product.name} (${it.size.ml}ml) x ${it.quantity} = ${formatPrice(it.size.price * it.quantity)}`
    )
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation #${escapeHtml(order.id)} - Noir Scent</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #faf8f5; margin: 0; padding: 24px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e7e2d8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Luxury Header -->
          <div style="background-color: #121212; padding: 32px 24px; text-align: center; border-bottom: 3px solid #c59a3f;">
            <h1 style="color: #c59a3f; font-size: 26px; margin: 0; letter-spacing: 4px; font-weight: bold;">NOIR SCENT</h1>
            <p style="color: #d4d4d8; font-size: 11px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2.5px;">Haute Parfumerie &bull; Pure Artisan Extraits</p>
          </div>

          <div style="padding: 28px 24px;">
            <h2 style="font-size: 18px; color: #1c1917; margin: 0 0 10px 0;">
              Thank you for your order, ${escapeHtml(order.customer.fullName.split(" ")[0])}!
            </h2>
            <p style="font-size: 13px; color: #57534e; line-height: 1.6; margin: 0 0 20px 0;">
              We have safely received your order <strong>#${escapeHtml(order.id)}</strong>. Our artisan perfumers are preparing your handcrafted flacons for doorstep delivery across Pakistan.
            </p>

            <!-- Delivery Summary Box -->
            <div style="background-color: #fbf9f5; border: 1px solid #eae3d2; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #9b6f1e;">
                📦 Courier Shipping Summary
              </p>
              <table style="width: 100%; font-size: 13px;">
                <tr>
                  <td style="padding: 3px 0; color: #78716c; width: 35%;">Order ID:</td>
                  <td style="padding: 3px 0; font-weight: bold; color: #1c1917;">#${escapeHtml(order.id)}</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #78716c;">Date:</td>
                  <td style="padding: 3px 0; color: #1c1917;">${karachiTime} (PKT)</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #78716c;">Delivery To:</td>
                  <td style="padding: 3px 0; color: #1c1917;">${escapeHtml(order.customer.address)}, ${escapeHtml(order.customer.city)}</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #78716c;">Contact Phone:</td>
                  <td style="padding: 3px 0; color: #1c1917;">${escapeHtml(order.customer.phone)}</td>
                </tr>
                ${
                  order.customer.notes
                    ? `<tr>
                        <td style="padding: 3px 0; color: #78716c; vertical-align: top;">Delivery Notes:</td>
                        <td style="padding: 3px 0; color: #57534e; font-style: italic;">"${escapeHtml(order.customer.notes)}"</td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 3px 0; color: #78716c;">Payment:</td>
                  <td style="padding: 3px 0; font-weight: bold; color: #047857;">Cash on Delivery (Pay to courier rider)</td>
                </tr>
              </table>
            </div>

            <!-- Items -->
            <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; border-bottom: 1px solid #e7e2d8; padding-bottom: 6px; margin: 0 0 8px 0;">
              Your Selected Fragrances
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Total -->
            <div style="background-color: #f5f2eb; border: 1px solid #e2dbce; border-radius: 8px; padding: 14px; margin-bottom: 24px;">
              <table style="width: 100%; font-size: 13px;">
                <tr>
                  <td style="padding: 3px 0; color: #78716c;">Subtotal:</td>
                  <td style="padding: 3px 0; text-align: right; color: #1c1917;">${formatPrice(order.subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0; color: #78716c;">Courier Shipping:</td>
                  <td style="padding: 3px 0; text-align: right; color: #1c1917;">
                    ${order.shippingFee === 0 ? '<strong style="color: #047857;">FREE</strong>' : formatPrice(order.shippingFee)}
                  </td>
                </tr>
                <tr style="border-top: 1px solid #d6cfc0;">
                  <td style="padding: 8px 0 0 0; font-size: 15px; font-weight: bold; color: #1c1917;">Total Payable on Arrival:</td>
                  <td style="padding: 8px 0 0 0; text-align: right; font-size: 16px; font-weight: bold; color: #9b6f1e;">${formatPrice(order.total)}</td>
                </tr>
              </table>
            </div>

            <!-- Customer Perks -->
            <div style="border-left: 3px solid #c59a3f; padding-left: 12px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; color: #44403c; line-height: 1.5;">
                <strong>7-Day Scent Guarantee:</strong> If the fragrance does not perfectly harmonize with your skin chemistry, message our WhatsApp concierge at <strong>+92 332 2224331</strong> for a swift exchange.
              </p>
            </div>

            <p style="font-size: 12px; color: #a8a29e; text-align: center; margin: 28px 0 0 0;">
              Noir Scent &bull; Karachi &bull; Lahore &bull; Islamabad &bull; Nationwide TCS Delivery
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
NOIR SCENT - ORDER CONFIRMATION #${order.id}

Thank you, ${order.customer.fullName.split(" ")[0]}!
We have received your order #${order.id} placed at ${karachiTime} (PKT).

DELIVERY INFORMATION:
Recipient: ${order.customer.fullName}
Address: ${order.customer.address}, ${order.customer.city}
Phone: ${order.customer.phone}
${order.customer.notes ? `Delivery Notes: "${order.customer.notes}"\n` : ""}Payment: Cash on Delivery (Pay rider upon arrival)

ITEMS:
${itemsText}

TOTAL:
Subtotal: ${formatPrice(order.subtotal)}
Shipping: ${order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}
Total To Pay: ${formatPrice(order.total)}

7-Day Scent Guarantee:
If the notes do not match your skin chemistry, WhatsApp us at +92 332 2224331 for an exchange.
  `.trim();

  return {
    subject: `Order Confirmed #${order.id} - Noir Scent`,
    html,
    text,
  };
}

// ============================================================================
// 3. ORDER STATUS UPDATE NOTIFICATION (HTML + TEXT)
// ============================================================================

export function generateOrderStatusEmail(
  order: Order,
  newStatus: OrderStatus,
  trackingNumber?: string
): {
  subject: string;
  html: string;
  text: string;
} {
  const statusDescriptions: Record<OrderStatus, string> = {
    Pending: "Your order is being reviewed by our fragrance concierge team.",
    Shipped: "Your flacons have been hand-packaged and handed over to our courier partner for delivery.",
    Delivered: "Your order has been safely delivered to your doorstep. Enjoy your signature extrait!",
  };

  const description = statusDescriptions[newStatus] || `Your order status is now ${newStatus}.`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order #${escapeHtml(order.id)} Status: ${escapeHtml(newStatus)}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #faf8f5; margin: 0; padding: 24px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e7e2d8; overflow: hidden;">
          <div style="background-color: #121212; padding: 28px 24px; text-align: center; border-bottom: 3px solid #c59a3f;">
            <h1 style="color: #c59a3f; font-size: 24px; margin: 0; letter-spacing: 3px;">NOIR SCENT</h1>
            <p style="color: #d4d4d8; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Order Status Update</p>
          </div>
          <div style="padding: 24px;">
            <h2 style="font-size: 18px; margin: 0 0 12px 0;">Order #${escapeHtml(order.id)}: ${escapeHtml(newStatus)}</h2>
            <p style="font-size: 13px; color: #57534e; line-height: 1.6; margin: 0 0 20px 0;">
              ${description}
            </p>
            ${
              trackingNumber
                ? `<div style="background-color: #fbf9f5; border: 1px solid #eae3d2; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 12px; color: #78716c;">Courier Tracking Number:</p>
                    <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #1c1917; font-family: monospace;">${escapeHtml(trackingNumber)}</p>
                  </div>`
                : ""
            }
            <p style="font-size: 12px; color: #78716c;">
              Need help with your delivery? Contact our WhatsApp concierge at <a href="https://wa.me/923322224331" style="color: #047857; font-weight: bold;">+92 332 2224331</a>.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
NOIR SCENT - ORDER STATUS UPDATE: #${order.id}

Status: ${newStatus}
${description}
${trackingNumber ? `Tracking Number: ${trackingNumber}\n` : ""}
Need help? Contact WhatsApp: +92 332 2224331
  `.trim();

  return {
    subject: `Order #${order.id} Update: ${newStatus} - Noir Scent`,
    html,
    text,
  };
}

// ============================================================================
// 4. CONTACT FORM INQUIRY NOTIFICATION (HTML + TEXT)
// ============================================================================

export function generateContactNotificationEmail(data: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}): {
  subject: string;
  html: string;
  text: string;
} {
  const karachiTime = formatKarachiDateTime();
  const cleanPhone = data.phone.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Customer Inquiry</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #1f2937;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
          <div style="background-color: #09090b; padding: 24px; text-align: center; border-bottom: 3px solid #c59a3f;">
            <h1 style="color: #c59a3f; font-size: 22px; margin: 0; letter-spacing: 2px;">NOIR SCENT</h1>
            <p style="color: #a1a1aa; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase;">Concierge Customer Inquiry</p>
          </div>
          <div style="padding: 24px;">
            <h2 style="font-size: 16px; margin: 0 0 16px 0; color: #111827;">New Message from ${escapeHtml(data.name)}</h2>
            <table style="width: 100%; font-size: 13px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 4px 0; color: #6b7280; width: 30%;">Sender Name:</td>
                <td style="padding: 4px 0; font-weight: bold; color: #111827;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Phone / WhatsApp:</td>
                <td style="padding: 4px 0;">
                  <a href="${waUrl}" style="color: #059669; font-weight: bold; text-decoration: none;">
                    ${escapeHtml(data.phone)} (Open in WhatsApp)
                  </a>
                </td>
              </tr>
              ${
                data.email
                  ? `<tr>
                      <td style="padding: 4px 0; color: #6b7280;">Email:</td>
                      <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a></td>
                    </tr>`
                  : ""
              }
              ${
                data.subject
                  ? `<tr>
                      <td style="padding: 4px 0; color: #6b7280;">Subject:</td>
                      <td style="padding: 4px 0; font-weight: 600; color: #111827;">${escapeHtml(data.subject)}</td>
                    </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Received At:</td>
                <td style="padding: 4px 0; color: #6b7280;">${karachiTime}</td>
              </tr>
            </table>

            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #4b5563;">Message Content:</p>
              <p style="margin: 0; font-size: 13px; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
NOIR SCENT - CUSTOMER INQUIRY
From: ${data.name}
Phone: ${data.phone} (WhatsApp: ${waUrl})
${data.email ? `Email: ${data.email}\n` : ""}${data.subject ? `Subject: ${data.subject}\n` : ""}Received: ${karachiTime}

Message:
${data.message}
  `.trim();

  return {
    subject: `[Customer Inquiry] ${data.subject || `Message from ${data.name}`}`,
    html,
    text,
  };
}
