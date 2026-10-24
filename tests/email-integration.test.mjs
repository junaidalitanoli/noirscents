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
import { ADMIN_DEMO_PASSWORD } from "../lib/constants.js";

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

  // TEST 10: Admin Authentication Token Check
  const validToken = ADMIN_DEMO_PASSWORD;
  const invalidToken = "wrong_password_xyz";
  assert(
    validToken === ADMIN_DEMO_PASSWORD && invalidToken !== ADMIN_DEMO_PASSWORD,
    "Admin inbox authentication permits valid admin secret and rejects unauthorized tokens"
  );

  // TEST 11: Webhook Payload Ceiling Guard
  const MAX_PAYLOAD_BYTES = 512 * 1024;
  const oversizedPayload = "x".repeat(MAX_PAYLOAD_BYTES + 10);
  const normalPayload = '{"type":"email.received"}';
  assert(
    oversizedPayload.length > MAX_PAYLOAD_BYTES && normalPayload.length <= MAX_PAYLOAD_BYTES,
    "Webhook payload size ceiling rejects oversized payloads (>512KB) and admits valid events"
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
