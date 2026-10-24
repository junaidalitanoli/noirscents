import { Order, OrderStatus } from "@/types";
import { getResendClient, getSenderEmail, getStoreNotificationEmail } from "./resend";
import { generateOrderAdminEmail, generateOrderCustomerEmail, generateOrderStatusEmail } from "./templates";

// In-memory idempotency cache to prevent duplicate sends on retried checkout events
const processedOrders = new Map<string, number>();
const IDEMPOTENCY_WINDOW_MS = 1000 * 60 * 15; // 15 minutes

export interface OrderEmailResult {
  success: boolean;
  adminEmailSent: boolean;
  customerEmailSent: boolean;
  simulated?: boolean;
  adminMessageId?: string;
  customerMessageId?: string;
  error?: string;
}

/**
 * Dispatches order notification emails for a newly placed order
 * 1. Admin notification to store manager (MY_RECEIVING_EMAIL)
 * 2. Customer confirmation if email was provided
 */
export async function sendOrderEmails(order: Order): Promise<OrderEmailResult> {
  const now = Date.now();
  const lastProcessed = processedOrders.get(order.id);

  if (lastProcessed && now - lastProcessed < IDEMPOTENCY_WINDOW_MS) {
    console.log(`[OrderEmailService] Duplicate send prevented for order #${order.id}`);
    return {
      success: true,
      adminEmailSent: false,
      customerEmailSent: false,
      error: "Duplicate send prevented by idempotency guard.",
    };
  }

  // Mark order as processed
  processedOrders.set(order.id, now);

  // Clean up older entries in idempotency map
  if (processedOrders.size > 200) {
    for (const [id, timestamp] of processedOrders.entries()) {
      if (now - timestamp > IDEMPOTENCY_WINDOW_MS) {
        processedOrders.delete(id);
      }
    }
  }

  const resend = getResendClient();
  const fromEmail = getSenderEmail();
  const storeEmail = getStoreNotificationEmail();

  // If Resend is not yet configured, simulate gracefully
  if (!resend) {
    console.warn(
      `[OrderEmailService] RESEND_API_KEY is not configured. Simulating order dispatch for #${order.id}.`
    );
    return {
      success: true,
      simulated: true,
      adminEmailSent: true,
      customerEmailSent: Boolean(order.customer.email),
    };
  }

  let adminEmailSent = false;
  let customerEmailSent = false;
  let adminMessageId: string | undefined;
  let customerMessageId: string | undefined;
  let lastError: string | undefined;

  // 1. Send Admin Notification
  try {
    const adminTemplate = generateOrderAdminEmail(order);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [storeEmail],
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      text: adminTemplate.text,
    });

    if (error) {
      console.error(`[OrderEmailService] Admin email error for #${order.id}:`, error);
      lastError = error.message;
    } else {
      adminEmailSent = true;
      adminMessageId = data?.id;
      console.log(`[OrderEmailService] Admin email sent for #${order.id} (ID: ${data?.id})`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[OrderEmailService] Exception sending admin email for #${order.id}:`, msg);
    lastError = msg;
  }

  // 2. Send Customer Confirmation (if email provided)
  if (order.customer.email && order.customer.email.includes("@")) {
    try {
      const customerTemplate = generateOrderCustomerEmail(order);
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [order.customer.email.trim()],
        subject: customerTemplate.subject,
        html: customerTemplate.html,
        text: customerTemplate.text,
      });

      if (error) {
        console.error(`[OrderEmailService] Customer confirmation error for #${order.id}:`, error);
        if (!lastError) lastError = error.message;
      } else {
        customerEmailSent = true;
        customerMessageId = data?.id;
        console.log(`[OrderEmailService] Customer confirmation sent to ${order.customer.email} (ID: ${data?.id})`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[OrderEmailService] Exception sending customer email for #${order.id}:`, msg);
      if (!lastError) lastError = msg;
    }
  }

  return {
    success: adminEmailSent || customerEmailSent,
    adminEmailSent,
    customerEmailSent,
    adminMessageId,
    customerMessageId,
    error: lastError,
  };
}

/**
 * Dispatches an order status change update (e.g. Shipped / Delivered)
 */
export async function sendOrderStatusUpdate(
  order: Order,
  newStatus: OrderStatus,
  trackingNumber?: string
): Promise<boolean> {
  if (!order.customer.email || !order.customer.email.includes("@")) {
    return false;
  }

  const resend = getResendClient();
  if (!resend) {
    console.warn(`[OrderEmailService] RESEND_API_KEY missing. Status email simulated for #${order.id}.`);
    return true;
  }

  try {
    const fromEmail = getSenderEmail();
    const template = generateOrderStatusEmail(order, newStatus, trackingNumber);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [order.customer.email.trim()],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error(`[OrderEmailService] Status email error for #${order.id}:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[OrderEmailService] Exception sending status email for #${order.id}:`, err);
    return false;
  }
}
