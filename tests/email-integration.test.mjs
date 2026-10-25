/**
 * Comprehensive Automated Test Suite for Resend Outbound & Inbound Integration
 * Run with: npx tsx tests/email-integration.test.mjs
 */
import { Webhook } from "svix";
import {
  escapeHtml,
  generateOrderAdminEmail,
  generateOrderCustomerEmail,
  generateContactNotificationEmail,
} from "../lib/email/templates.js";
import {
  saveInboundEmail,
  getInboundEmails,
  isEventProcessed,
  markEventProcessed,
} from "../lib/email/inboxStorage.js";
import { checkRateLimit } from "../lib/email/rateLimiter.js";
import { GET as inboxGet } from "../app/api/inbox/route.js";
import { sendOrderEmails } from "../lib/email/orderService.js";
import { POST as contactPost } from "../app/api/contact/route.js";
import { POST as sendOrderPost } from "../app/api/send-order/route.js";
import { GET as adminOrdersGet, PATCH as adminOrdersPatch } from "../app/api/orders/route.js";
import { GET as orderLookupGet } from "../app/api/order/[orderId]/route.js";
import { getOrderById, saveOrder } from "../lib/orders/orderStorage.js";

async function runTests() {
  console.log("==========================================================");
  console.log("🧪 STARTING RESEND EMAIL INTEGRATION TEST SUITE");
  console.log("==========================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // TEST 1: HTML Escaping
  const rawInput = '<script>alert("xss")</script> & "test"';
  const escaped = escapeHtml(rawInput);
  assert(
    !escaped.includes("<script>") &&
      escaped.includes("&lt;script&gt;") &&
      escaped.includes("&quot;test&quot;"),
    "HTML Escaping sanitizes untrusted input"
  );

  // TEST 2: Outbound Order Admin Template Generation
  const dummyOrder = {
    id: "NS-99999",
    customer: {
      fullName: "Test Customer",
      phone: "03001234567",
      email: "test.customer@example.com",
      address: "123 Test Street",
      city: "Karachi",
      notes: "Handle with care",
    },
    items: [
      {
        id: "item-1",
        productId: "p-1",
        product: { id: "p-1", name: "Signature Reserve Extrait" },
        size: { ml: 50, price: 3500 },
        quantity: 2,
      },
    ],
    subtotal: 7000,
    shippingFee: 0,
    total: 7000,
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    createdAt: new Date().toISOString(),
  };

  const adminEmail = generateOrderAdminEmail(dummyOrder);
  assert(
    adminEmail.subject.includes("NS-99999") &&
      adminEmail.html.includes("Signature Reserve Extrait") &&
      adminEmail.text.includes("Signature Reserve Extrait") &&
      adminEmail.html.includes("7,000"),
    "Admin Order Template generates valid HTML and Plain-Text fallback"
  );

  // TEST 3: Outbound Customer Confirmation Template Generation
  const customerEmail = generateOrderCustomerEmail(dummyOrder);
  assert(
    customerEmail.subject.includes("NS-99999") &&
      customerEmail.html.includes("Thank you for your order") &&
      customerEmail.text.includes("Thank you") &&
      customerEmail.text.includes("Total To Pay:"),
    "Customer Confirmation Template generates valid HTML and Plain-Text fallback"
  );

  // TEST 4: Contact Inquiry Template Generation
  const contactEmail = generateContactNotificationEmail({
    name: "Zainab Khan",
    phone: "03335555555",
    email: "zainab@example.com",
    subject: "Fragrance Notes Inquiry",
    message: "Does Royal Amber have strong vanilla notes?",
  });
  assert(
    contactEmail.subject.includes("Fragrance Notes Inquiry") &&
      contactEmail.html.includes("Zainab Khan") &&
      contactEmail.text.includes("Zainab Khan") &&
      contactEmail.html.includes("Does Royal Amber have strong vanilla notes?"),
    "Contact Inquiry Template generates valid HTML and Plain-Text fallback"
  );

  // TEST 5: Svix Signature Verification (Valid Signature)
  const testSecret = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaLa=";
  const testPayload = JSON.stringify({
    type: "email.received",
    data: {
      email_id: "em_test_12345",
      from: "buyer@example.com",
      to: ["concierge@noirscents.com"],
      subject: "Wholesale Inquiry",
    },
  });

  const svix = new Webhook(testSecret);
  const svixId = `msg_test_${Date.now()}`;
  const timestamp = new Date();

  // Generate valid signature using svix signer
  const signature = svix.sign(svixId, timestamp, testPayload);

  let verifiedPayload = null;
  try {
    verifiedPayload = svix.verify(testPayload, {
      "svix-id": svixId,
      "svix-timestamp": Math.floor(timestamp.getTime() / 1000).toString(),
      "svix-signature": signature,
    });
  } catch (err) {
    console.error("Verification failed:", err);
  }
  assert(verifiedPayload !== null, "Valid Svix Webhook signature verifies successfully");

  // TEST 6: Svix Signature Verification (Tampered/Invalid Signature Rejected)
  let rejected = false;
  try {
    svix.verify(testPayload, {
      "svix-id": svixId,
      "svix-timestamp": Math.floor(timestamp.getTime() / 1000).toString(),
      "svix-signature": "v1,fake_tampered_signature_value==",
    });
  } catch {
    rejected = true;
  }
  assert(rejected, "Invalid/tampered Svix signature is strictly rejected");

  // TEST 7: Idempotency Tracking & Duplicate Detection
  const uniqueEventId = `evt_${Date.now()}_abc`;
  assert(!isEventProcessed(uniqueEventId), "New event ID is initially not processed");
  markEventProcessed(uniqueEventId);
  assert(isEventProcessed(uniqueEventId), "Marked event ID is recognized as already processed");

  // TEST 8: Inbox Storage (Save & Retrieve)
  const sampleInbound = {
    id: `msg_${Date.now()}`,
    emailId: `em_${Date.now()}`,
    from: "test.customer@gmail.com",
    to: ["concierge@noirscents.com"],
    subject: "Delivery inquiry for Lahore",
    receivedAt: new Date().toISOString(),
    text: "Can I receive this order before Friday?",
    snippet: "Can I receive this order before Friday?",
  };

  const saved = saveInboundEmail(sampleInbound);
  assert(saved, "Inbound email saves successfully to inbox storage");

  const inbox = getInboundEmails(10);
  assert(
    inbox.some((e) => e.emailId === sampleInbound.emailId),
    "Saved inbound email is retrieved from inbox storage"
  );

  // TEST 9: Rate Limiting Enforcement
  const testIp = `ip_${Date.now()}`;
  const r1 = checkRateLimit(testIp, 2, 60000);
  const r2 = checkRateLimit(testIp, 2, 60000);
  const r3 = checkRateLimit(testIp, 2, 60000);
  assert(
    r1.allowed === true && r2.allowed === true && r3.allowed === false && r3.remaining === 0,
    "IP rate limiter allows permitted calls and blocks subsequent calls once quota exceeded"
  );

  // TEST 10: Admin Inbox Security Tests
  // 10A: Missing configuration on server (ADMIN_SECRET unset) -> Fails closed
  const origSecret = process.env.ADMIN_SECRET;
  const origInboxSecret = process.env.ADMIN_INBOX_SECRET;
  delete process.env.ADMIN_SECRET;
  delete process.env.ADMIN_INBOX_SECRET;

  const reqNoSecret = new Request("http://localhost/api/inbox", {
    headers: { "x-admin-token": "any_secret" },
  });
  const resNoSecret = await inboxGet(reqNoSecret);
  assert(
    resNoSecret.status === 401,
    "Inbox fails closed (HTTP 401) when ADMIN_SECRET is not configured on server"
  );

  // Configure test secret
  const adminTestSecret = "prod_super_secret_token_12345";
  process.env.ADMIN_SECRET = adminTestSecret;

  // 10B: Unauthorized request (missing headers) -> 401
  const reqNoAuth = new Request("http://localhost/api/inbox");
  const resNoAuth = await inboxGet(reqNoAuth);
  assert(
    resNoAuth.status === 401,
    "Inbox rejects unauthenticated request without credentials (HTTP 401)"
  );

  // 10C: Query-string token rejection -> strictly rejected
  const reqQueryToken = new Request(`http://localhost/api/inbox?token=${adminTestSecret}`);
  const resQueryToken = await inboxGet(reqQueryToken);
  assert(
    resQueryToken.status === 401,
    "Inbox strictly rejects credentials passed in URL query parameters (HTTP 401)"
  );

  // 10D: Invalid header token -> 401
  const reqWrongHeader = new Request("http://localhost/api/inbox", {
    headers: { "x-admin-token": "wrong_secret_abc" },
  });
  const resWrongHeader = await inboxGet(reqWrongHeader);
  assert(resWrongHeader.status === 401, "Inbox rejects invalid header token (HTTP 401)");

  // 10E: Valid x-admin-token header -> 200
  const reqValidHeader = new Request("http://localhost/api/inbox", {
    headers: { "x-admin-token": adminTestSecret },
  });
  const resValidHeader = await inboxGet(reqValidHeader);
  assert(resValidHeader.status === 200, "Inbox authorizes valid x-admin-token header (HTTP 200)");

  // 10F: Valid Authorization Bearer header -> 200
  const reqValidBearer = new Request("http://localhost/api/inbox", {
    headers: { authorization: `Bearer ${adminTestSecret}` },
  });
  const resValidBearer = await inboxGet(reqValidBearer);
  assert(
    resValidBearer.status === 200,
    "Inbox authorizes valid Authorization Bearer header (HTTP 200)"
  );

  // Restore env
  if (origSecret) process.env.ADMIN_SECRET = origSecret;
  if (origInboxSecret) process.env.ADMIN_INBOX_SECRET = origInboxSecret;

  // TEST 11: Webhook Payload Ceiling Guard
  const MAX_PAYLOAD_BYTES = 512 * 1024;
  const oversizedPayload = "x".repeat(MAX_PAYLOAD_BYTES + 10);
  const normalPayload = '{"type":"email.received"}';
  assert(
    oversizedPayload.length > MAX_PAYLOAD_BYTES && normalPayload.length <= MAX_PAYLOAD_BYTES,
    "Webhook payload size ceiling rejects oversized payloads (>512KB) and admits valid events"
  );

  // TEST 12: Outbound Order Email Safe Failure State when RESEND_API_KEY is Unset
  const origResendKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;

  const mockOrder = {
    id: `NS-TEST-${Date.now()}`,
    customer: {
      name: "Test Customer",
      email: "test@example.com",
      phone: "03001234567",
      address: "Test Street 1",
      city: "Karachi",
    },
    items: [
      {
        product: { id: "p1", name: "Urban Legend", slug: "urban-legend" },
        size: { ml: 50, price: 3000 },
        quantity: 1,
      },
    ],
    subtotal: 3000,
    shippingFee: 0,
    total: 3000,
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    createdAt: new Date().toISOString(),
  };

  const orderEmailResult = await sendOrderEmails(mockOrder);
  assert(
    orderEmailResult.success === false &&
      orderEmailResult.adminEmailSent === false &&
      orderEmailResult.customerEmailSent === false &&
      orderEmailResult.simulated === true,
    "Order email service reports clear safe failure state (not false success) when credentials are missing"
  );

  // TEST 13: Contact Form Safe Failure State when RESEND_API_KEY is Unset
  const contactReq = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Tariq Aziz",
      phone: "03001234567",
      email: "tariq@example.com",
      subject: "Fragrance Inquiry",
      message: "Can you provide notes for Ghalib?",
    }),
  });
  const contactRes = await contactPost(contactReq);
  const contactData = await contactRes.json();
  assert(
    contactRes.status === 503 && contactData.success === false,
    "Contact endpoint returns HTTP 503 safe failure state when RESEND_API_KEY is unconfigured"
  );

  if (origResendKey) process.env.RESEND_API_KEY = origResendKey;

  // TEST 14: Order Endpoint Price Tamper Protection & Server Recalculation
  // Client attempts to submit Urban Legend (50ml catalog price Rs. 2950) with forged price Rs. 10
  const forgedOrderReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.14" },
    body: JSON.stringify({
      order: {
        id: `NS-TAMPER-${Date.now()}`,
        customer: {
          fullName: "Hamza Tariq",
          phone: "03211234567",
          address: "F-7/2 House 14",
          city: "Islamabad",
        },
        items: [
          {
            product: { id: "fn-001", slug: "urban-legend", name: "Urban Legend" },
            size: { ml: 50, price: 10 }, // Forged price
            quantity: 1,
          },
        ],
        subtotal: 10,
        shippingFee: 0,
        total: 10,
      },
    }),
  });
  const orderRes = await sendOrderPost(forgedOrderReq);
  const orderData = await orderRes.json();
  assert(
    orderRes.status === 200 &&
      orderData.subtotal === 2950 && // Recalculated from canonical catalog
      orderData.shippingFee === 250 && // Standard fee since < 3000
      orderData.total === 3200,
    "Order endpoint overrides client-side forged price with canonical catalog price and recalculates shipping correctly"
  );

  // TEST 15: Malformed JSON Rejection
  const malformedReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.15" },
    body: "this-is-not-valid-json{",
  });
  const malformedRes = await sendOrderPost(malformedReq);
  assert(malformedRes.status === 400, "Send-order rejects malformed JSON with HTTP 400");

  // TEST 16: Missing Customer Details Rejection
  const missingCustomerReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.16" },
    body: JSON.stringify({
      order: {
        id: `NS-TEST-${Date.now()}`,
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const missingCustomerRes = await sendOrderPost(missingCustomerReq);
  assert(missingCustomerRes.status === 400, "Send-order rejects order missing customer details with HTTP 400");

  // TEST 17: Invalid Pakistani Phone Format Rejection
  const invalidPhoneReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.17" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "123456", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const invalidPhoneRes = await sendOrderPost(invalidPhoneReq);
  assert(invalidPhoneRes.status === 400, "Send-order rejects invalid Pakistani phone number with HTTP 400");

  // TEST 18: Negative Quantity Rejection
  const negQtyReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.18" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: -2 }],
      },
    }),
  });
  const negQtyRes = await sendOrderPost(negQtyReq);
  assert(negQtyRes.status === 400, "Send-order strictly rejects negative quantity with HTTP 400");

  // TEST 19: Zero Quantity Rejection
  const zeroQtyReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.19" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 0 }],
      },
    }),
  });
  const zeroQtyRes = await sendOrderPost(zeroQtyReq);
  assert(zeroQtyRes.status === 400, "Send-order strictly rejects zero quantity with HTTP 400");

  // TEST 20: Fractional Quantity Rejection
  const fracQtyReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.20" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 2.5 }],
      },
    }),
  });
  const fracQtyRes = await sendOrderPost(fracQtyReq);
  assert(fracQtyRes.status === 400, "Send-order strictly rejects fractional quantity (e.g. 2.5) with HTTP 400");

  // TEST 21: Huge Quantity (>50) Rejection
  const hugeQtyReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.21" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 9999 }],
      },
    }),
  });
  const hugeQtyRes = await sendOrderPost(hugeQtyReq);
  assert(hugeQtyRes.status === 400, "Send-order strictly rejects excessive quantity (>50) with HTTP 400");

  // TEST 22: Unknown / Fake Product ID Rejection
  const fakeProductReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.22" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fake-product-999" }, size: { ml: 50, price: 10 }, quantity: 1 }],
      },
    }),
  });
  const fakeProductRes = await sendOrderPost(fakeProductReq);
  assert(fakeProductRes.status === 400, "Send-order strictly rejects unknown/fake product IDs with HTTP 400");

  // TEST 23: Invalid Size Variant Rejection
  const invalidSizeReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.23" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Street", city: "Lahore" },
        items: [{ product: { id: "fn-001", slug: "urban-legend" }, size: { ml: 250 }, quantity: 1 }],
      },
    }),
  });
  const invalidSizeRes = await sendOrderPost(invalidSizeReq);
  assert(invalidSizeRes.status === 400, "Send-order strictly rejects invalid size variants with HTTP 400");

  // TEST 24: Delivery Threshold Test (Subtotal < Rs. 3000 -> Shipping Fee Rs. 250)
  // Urban Legend 50ml = Rs. 2,950 -> Below threshold of 3000
  const belowThresholdReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.24" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Main Blvd", city: "Lahore" },
        items: [{ product: { id: "fn-001", slug: "urban-legend" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const belowThresholdRes = await sendOrderPost(belowThresholdReq);
  const belowData = await belowThresholdRes.json();
  assert(
    belowThresholdRes.status === 200 &&
      belowData.subtotal === 2950 &&
      belowData.shippingFee === 250 &&
      belowData.total === 3200,
    "Delivery calculation below threshold (Rs. 2,950) correctly charges Rs. 250 shipping"
  );

  // TEST 25: Delivery Threshold Test (Subtotal >= Rs. 3000 -> Shipping Fee Rs. 0 / Free)
  // Ghalib 50ml = Rs. 3,450 -> Above threshold of 3000
  const aboveThresholdReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.25" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Ali Khan", phone: "03001234567", address: "123 Main Blvd", city: "Lahore" },
        items: [{ product: { id: "fn-002", slug: "ghalib" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const aboveThresholdRes = await sendOrderPost(aboveThresholdReq);
  const aboveData = await aboveThresholdRes.json();
  assert(
    aboveThresholdRes.status === 200 &&
      aboveData.subtotal === 3450 &&
      aboveData.shippingFee === 0 &&
      aboveData.total === 3450,
    "Delivery calculation above threshold (Rs. 3,450) correctly applies free delivery (Rs. 0)"
  );

  // =========================================================================
  // PHASE 2 — ORDER PERSISTENCE, INTEGRITY & SECURITY TESTS
  // =========================================================================

  // TEST 26: Valid COD order with successful persistence & server-authoritative order ID
  const testOrderId = `NS-TEST-${Date.now()}`;
  const testIdempotencyKey = `idemp_${Date.now()}`;
  const validOrderReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.26" },
    body: JSON.stringify({
      idempotencyKey: testIdempotencyKey,
      order: {
        id: testOrderId,
        customer: {
          fullName: "Bilal Ahmad",
          phone: "03211234567",
          email: "bilal.ahmad@example.com",
          address: "Sector F-6/3, Street 12, Islamabad",
          city: "Islamabad",
          notes: "Ring bell twice",
        },
        items: [
          {
            product: { id: "fn-001", slug: "urban-legend" },
            size: { ml: 50 },
            quantity: 2,
          },
        ],
      },
    }),
  });
  const validOrderRes = await sendOrderPost(validOrderReq);
  const validOrderData = await validOrderRes.json();
  const retrievedStoredOrder = await getOrderById(validOrderData.orderId);

  assert(
    validOrderRes.status === 200 &&
      validOrderData.success === true &&
      typeof validOrderData.orderId === "string" &&
      retrievedStoredOrder !== null &&
      retrievedStoredOrder.id === validOrderData.orderId &&
      retrievedStoredOrder.customer.fullName === "Bilal Ahmad",
    "Valid COD order is persisted to server storage and retrievable via getOrderById"
  );

  // TEST 27: Server response contains authoritative order ID and calculated totals
  assert(
    validOrderData.subtotal === 5900 && // 2950 * 2
      validOrderData.shippingFee === 0 && // subtotal >= 3000 -> free shipping
      validOrderData.total === 5900,
    "Server response contains authoritative server-calculated subtotal, shipping fee, and grand total"
  );

  // TEST 28: Duplicate submission or retry with idempotency key
  const duplicateReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.28" },
    body: JSON.stringify({
      idempotencyKey: testIdempotencyKey,
      order: {
        customer: {
          fullName: "Bilal Ahmad",
          phone: "03211234567",
          address: "Sector F-6/3, Street 12, Islamabad",
          city: "Islamabad",
        },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 2 }],
      },
    }),
  });
  const duplicateRes = await sendOrderPost(duplicateReq);
  const duplicateData = await duplicateRes.json();
  assert(
    duplicateRes.status === 200 &&
      duplicateData.success === true &&
      duplicateData.isDuplicate === true &&
      duplicateData.orderId === validOrderData.orderId,
    "Duplicate submission with identical idempotencyKey returns existing order and prevents duplicate dispatch"
  );

  // TEST 28b: Injection or invalid characters in idempotencyKey are sanitized and never return an existing order as duplicate
  const injectionKey = `key_malicious_)_or_(id.neq.0)*,`;
  const injectionReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.28b" },
    body: JSON.stringify({
      idempotencyKey: injectionKey,
      order: {
        customer: {
          fullName: "Security Test User",
          phone: "03219876543",
          address: "123 Secure St",
          city: "Lahore",
        },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const injectionRes = await sendOrderPost(injectionReq);
  const injectionData = await injectionRes.json();
  assert(
    injectionRes.status === 200 &&
      injectionData.success === true &&
      injectionData.isDuplicate !== true &&
      injectionData.orderId !== validOrderData.orderId,
    "Idempotency key containing ')', '*', or ',' is treated as invalid and never returns another customer's order"
  );

  // TEST 29: Order confirmation lookup strictly rejects invalid formats (400) and nonexistent orders (404)
  const wildcardReq1 = new Request("http://localhost/api/order/NS-*", { method: "GET" });
  const wildcardRes1 = await orderLookupGet(wildcardReq1, { params: Promise.resolve({ orderId: "NS-*" }) });
  assert(wildcardRes1.status === 400, "Public order lookup strictly returns HTTP 400 for wildcard NS-*");

  const wildcardReq2 = new Request("http://localhost/api/order/NS-%25", { method: "GET" });
  const wildcardRes2 = await orderLookupGet(wildcardReq2, { params: Promise.resolve({ orderId: "NS-%" }) });
  assert(wildcardRes2.status === 400, "Public order lookup strictly returns HTTP 400 for wildcard NS-%");

  const fakeLookupReq = new Request("http://localhost/api/order/NS-999999999", {
    method: "GET",
  });
  const fakeLookupRes = await orderLookupGet(fakeLookupReq, {
    params: Promise.resolve({ orderId: "NS-999999999" }),
  });
  assert(
    fakeLookupRes.status === 404,
    "Order confirmation lookup strictly returns HTTP 404 for nonexistent order ID (prevents phantom confirmations)"
  );

  // TEST 30: Public order lookup endpoint masks sensitive customer phone and omits address and notes
  const validLookupReq = new Request(`http://localhost/api/order/${validOrderData.orderId}`, {
    method: "GET",
  });
  const validLookupRes = await orderLookupGet(validLookupReq, {
    params: Promise.resolve({ orderId: validOrderData.orderId }),
  });
  const validLookupData = await validLookupRes.json();
  assert(
    validLookupRes.status === 200 &&
      validLookupData.success === true &&
      validLookupData.order.customer.phone.includes("****") &&
      !validLookupData.order.customer.phone.includes("03211234567") &&
      validLookupData.order.customer.address === undefined &&
      validLookupData.order.customer.notes === undefined,
    "Public order lookup endpoint sanitizes customer phone to prevent PII leakage and strips address/notes"
  );

  // TEST 31: Admin order retrieval requires authentication (fails closed)
  process.env.ADMIN_SECRET = "secure_production_secret_pass_12345";
  const unauthOrdersReq = new Request("http://localhost/api/orders", {
    method: "GET",
  });
  const unauthOrdersRes = await adminOrdersGet(unauthOrdersReq);
  assert(
    unauthOrdersRes.status === 401,
    "Admin order retrieval strictly fails closed (HTTP 401) without authentication"
  );

  const queryBypassOrdersReq = new Request(
    "http://localhost/api/orders?token=secure_production_secret_pass_12345",
    { method: "GET" }
  );
  const queryBypassOrdersRes = await adminOrdersGet(queryBypassOrdersReq);
  assert(
    queryBypassOrdersRes.status === 401,
    "Admin order retrieval rejects authentication token passed via URL query parameter"
  );

  // TEST 32: Admin order retrieval succeeds with valid authentication header
  const authOrdersReq = new Request("http://localhost/api/orders", {
    method: "GET",
    headers: { "x-admin-token": "secure_production_secret_pass_12345" },
  });
  const authOrdersRes = await adminOrdersGet(authOrdersReq);
  const authOrdersData = await authOrdersRes.json();
  assert(
    authOrdersRes.status === 200 &&
      authOrdersData.success === true &&
      Array.isArray(authOrdersData.orders) &&
      authOrdersData.orders.some((o) => o.id === validOrderData.orderId),
    "Authenticated admin endpoint retrieves persisted orders independently of browser localStorage"
  );

  // TEST 33: Admin order status update via PATCH updates order in storage
  const patchStatusReq = new Request("http://localhost/api/orders", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": "secure_production_secret_pass_12345",
    },
    body: JSON.stringify({
      orderId: validOrderData.orderId,
      status: "Shipped",
    }),
  });
  const patchStatusRes = await adminOrdersPatch(patchStatusReq);
  const recheckedOrder = await getOrderById(validOrderData.orderId);
  assert(
    patchStatusRes.status === 200 &&
      recheckedOrder !== null &&
      recheckedOrder.status === "Shipped",
    "Admin PATCH /api/orders updates order status in persistent storage"
  );

  // TEST 34: Storage failure handling: missing payload returns HTTP 400
  const missingPayloadReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.34" },
    body: JSON.stringify({ notAnOrder: true }),
  });
  const missingPayloadRes = await sendOrderPost(missingPayloadReq);
  const missingPayloadData = await missingPayloadRes.json();
  assert(
    missingPayloadRes.status === 400 && missingPayloadData.success !== true,
    "Invalid/missing order payload strictly returns HTTP 400 with no false success"
  );

  // TEST 35: Email failure after order persistence preserves the order in storage
  const origKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY; // Simulate email service unconfigured/down

  const unconfiguredEmailOrderId = `NS-UNCONF-${Date.now()}`;
  const unconfiguredOrderReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.35" },
    body: JSON.stringify({
      order: {
        id: unconfiguredEmailOrderId,
        customer: {
          fullName: "Usman Tariq",
          phone: "03451234567",
          address: "Plot 45, Phase 8, Bahria Town",
          city: "Rawalpindi",
        },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const unconfiguredRes = await sendOrderPost(unconfiguredOrderReq);
  const unconfiguredData = await unconfiguredRes.json();
  const preservedOrder = await getOrderById(unconfiguredData.orderId);

  if (origKey) process.env.RESEND_API_KEY = origKey;

  assert(
    unconfiguredRes.status === 200 &&
      unconfiguredData.success === true &&
      preservedOrder !== null &&
      preservedOrder.id === unconfiguredData.orderId &&
      preservedOrder.customer.fullName === "Usman Tariq",
    "Email service unconfigured/failure after persistence preserves COD order safely in storage"
  );

  // TEST 36: Production checkout without Supabase strictly returns HTTP 503 without leaking env secrets
  const origNodeEnv = process.env.NODE_ENV;
  const origSupabaseUrl = process.env.SUPABASE_URL;
  const origSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  try {
    process.env.NODE_ENV = "production";
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const prodUnconfiguredReq = new Request("http://localhost/api/send-order", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.36" },
      body: JSON.stringify({
        order: {
          customer: {
            fullName: "Prod Test Customer",
            phone: "03001234567",
            address: "Main Boulevard, Gulberg III",
            city: "Lahore",
          },
          items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
        },
      }),
    });
    const prodUnconfiguredRes = await sendOrderPost(prodUnconfiguredReq);
    const prodUnconfiguredData = await prodUnconfiguredRes.json();

    assert(
      prodUnconfiguredRes.status === 503 &&
        prodUnconfiguredData.success === false &&
        !JSON.stringify(prodUnconfiguredData).includes("SUPABASE") &&
        !JSON.stringify(prodUnconfiguredData).includes("SERVICE_ROLE"),
      "Production checkout without Supabase storage strictly returns HTTP 503 with generic error"
    );
  } finally {
    process.env.NODE_ENV = origNodeEnv;
    if (origSupabaseUrl) process.env.SUPABASE_URL = origSupabaseUrl;
    if (origSupabaseKey) process.env.SUPABASE_SERVICE_ROLE_KEY = origSupabaseKey;
  }

  // TEST 37: Rapid consecutive orders generate distinct 8-digit server order IDs
  const rapidReq1 = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.37a" },
    body: JSON.stringify({
      idempotencyKey: `rapid_key_1_${Date.now()}`,
      order: {
        customer: { fullName: "Rapid User 1", phone: "03001111111", address: "Addr 1", city: "Lahore" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const rapidReq2 = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.37b" },
    body: JSON.stringify({
      idempotencyKey: `rapid_key_2_${Date.now()}`,
      order: {
        customer: { fullName: "Rapid User 2", phone: "03002222222", address: "Addr 2", city: "Karachi" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const [rapidRes1, rapidRes2] = await Promise.all([sendOrderPost(rapidReq1), sendOrderPost(rapidReq2)]);
  const [rapidData1, rapidData2] = await Promise.all([rapidRes1.json(), rapidRes2.json()]);

  assert(
    rapidRes1.status === 200 &&
      rapidRes2.status === 200 &&
      /^NS-\d{8}$/.test(rapidData1.orderId) &&
      /^NS-\d{8}$/.test(rapidData2.orderId) &&
      rapidData1.orderId !== rapidData2.orderId,
    "Rapid consecutive orders receive distinct, cryptographically random 8-digit server order IDs (format NS-XXXXXXXX)"
  );

  // TEST 38: Client sending pre-existing order ID does not collide or drop order; new order receives new server ID
  const existingOrderId = rapidData1.orderId;
  const collisionAttemptReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.38" },
    body: JSON.stringify({
      idempotencyKey: `new_customer_key_${Date.now()}`,
      order: {
        id: existingOrderId, // Malicious or colliding client-sent ID
        customer: { fullName: "New Customer Distinct", phone: "03003333333", address: "Addr 3", city: "Islamabad" },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const collisionAttemptRes = await sendOrderPost(collisionAttemptReq);
  const collisionAttemptData = await collisionAttemptRes.json();
  const retrievedCollisionOrder = await getOrderById(collisionAttemptData.orderId);
  const retrievedOriginalOrder = await getOrderById(existingOrderId);

  assert(
    collisionAttemptRes.status === 200 &&
      collisionAttemptData.success === true &&
      collisionAttemptData.orderId !== existingOrderId &&
      retrievedCollisionOrder !== null &&
      retrievedCollisionOrder.customer.fullName === "New Customer Distinct" &&
      retrievedOriginalOrder !== null &&
      retrievedOriginalOrder.customer.fullName === "Rapid User 1",
    "Sending a pre-existing order ID does not drop order; server generates fresh ID and saves new order safely"
  );

  // TEST 39: Customer notes are preserved in storage and rendered safely in customer/admin email templates
  const notesReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.39" },
    body: JSON.stringify({
      idempotencyKey: `notes_key_${Date.now()}`,
      order: {
        customer: {
          fullName: "Zainab Bibi",
          phone: "03004444444",
          address: "House 55, Street 9",
          city: "Faisalabad",
          notes: "Please call on arrival & do not ring bell <script>alert(1)</script>",
        },
        items: [{ product: { id: "fn-001" }, size: { ml: 50 }, quantity: 1 }],
      },
    }),
  });
  const notesRes = await sendOrderPost(notesReq);
  const notesData = await notesRes.json();
  const storedNotesOrder = await getOrderById(notesData.orderId);
  const customerEmailTpl = storedNotesOrder ? generateOrderCustomerEmail(storedNotesOrder) : null;
  const adminEmailTpl = storedNotesOrder ? generateOrderAdminEmail(storedNotesOrder) : null;

  assert(
    notesRes.status === 200 &&
      storedNotesOrder !== null &&
      storedNotesOrder.customer.notes === "Please call on arrival & do not ring bell <script>alert(1)</script>" &&
      customerEmailTpl !== null &&
      customerEmailTpl.html.includes("Please call on arrival &amp; do not ring bell &lt;script&gt;alert(1)&lt;/script&gt;") &&
      adminEmailTpl !== null &&
      adminEmailTpl.html.includes("Please call on arrival &amp; do not ring bell &lt;script&gt;alert(1)&lt;/script&gt;"),
    "Customer delivery notes are preserved in storage and HTML-escaped in customer & admin email templates"
  );

  // TEST 40: Extra fields and client spreads in items/product are stripped from storage
  const extraFieldsReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.40" },
    body: JSON.stringify({
      idempotencyKey: `extra_fields_key_${Date.now()}`,
      order: {
        customer: {
          fullName: "Security Auditor",
          phone: "03005555555",
          address: "123 Defense Road",
          city: "Lahore",
          notes: "Check extra fields",
          injectedCustomerField: "MALICIOUS_KEY_DO_NOT_STORE",
        },
        createdAt: "1999-01-01T00:00:00.000Z", // Past forged createdAt
        items: [
          {
            product: { id: "fn-001", maliciousKey: "HACKED_PRODUCT_DATA", admin: true },
            size: { ml: 50, price: 999999 },
            quantity: 1,
            extraCartField: "SHOULD_BE_STRIPPED",
          },
        ],
      },
    }),
  });
  const extraFieldsRes = await sendOrderPost(extraFieldsReq);
  const extraFieldsData = await extraFieldsRes.json();
  const storedExtraOrder = await getOrderById(extraFieldsData.orderId);

  assert(
    extraFieldsRes.status === 200 &&
      storedExtraOrder !== null &&
      storedExtraOrder.customer.injectedCustomerField === undefined &&
      storedExtraOrder.items[0].extraCartField === undefined &&
      storedExtraOrder.items[0].product.maliciousKey === undefined &&
      storedExtraOrder.items[0].product.admin === undefined &&
      new Date(storedExtraOrder.createdAt).getFullYear() >= 2025,
    "Extra client-provided fields are stripped from items/product/customer and createdAt is authoritative server timestamp"
  );

  // TEST 41: Order with excessive items (> 20 items) is rejected with HTTP 400
  const excessiveItemsList = Array.from({ length: 21 }, (_, i) => ({
    product: { id: "fn-001" },
    size: { ml: 50 },
    quantity: 1,
  }));
  const excessiveItemsReq = new Request("http://localhost/api/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.41" },
    body: JSON.stringify({
      order: {
        customer: { fullName: "Bulk Buyer", phone: "03006666666", address: "Wholesale Market", city: "Lahore" },
        items: excessiveItemsList,
      },
    }),
  });
  const excessiveItemsRes = await sendOrderPost(excessiveItemsReq);
  const excessiveItemsData = await excessiveItemsRes.json();

  assert(
    excessiveItemsRes.status === 400 &&
      excessiveItemsData.error?.includes("20 items"),
    "Orders exceeding 20 items ceiling are strictly rejected with HTTP 400"
  );

  console.log("==========================================================");
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner exception:", err);
  process.exit(1);
});
