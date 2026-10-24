# Resend Email Integration Guide: Sending & Receiving for Noir Scents

This document details the complete Resend outbound sending and inbound receiving architecture for the **Noir Scents** e-commerce store (Next.js App Router hosted on Netlify).

---

## 1. Architecture Overview

```
                      OUTBOUND SENDING
                      -----------------
  Customer Checkout  ───>  /api/send-order  ───>  sendOrderEmails()
  Customer Contact   ───>  /api/contact     ───>  sendContactEmail()
                                                        │
                                                        ▼
                                                  Resend REST API
                                                        │
                                       ┌────────────────┴────────────────┐
                                       ▼                                 ▼
                             Store Admin Notification       Customer Order Confirmation
                            (MY_RECEIVING_EMAIL)           (order.customer.email)

                      INBOUND RECEIVING
                      -----------------
  Customer Email Reply  ───>  Resend Inbound MX / Receiving
                                      │
                                      ▼ (HTTP POST with Svix signature)
                          /api/resend/webhook
                                      │
                                      ├── 1. Signature Verification (svix)
                                      ├── 2. Idempotency Check (svix-id)
                                      ├── 3. Resend Receiving API (fetch body)
                                      └── 4. Persistent Storage (inbound-emails.json)
                                                        │
                                                        ▼
                                              Admin Dashboard Inbox
                                              (/api/inbox -> /admin)
```

---

## 2. Environment Variables Checklist

Configure these variables securely in your environment. **Never commit real API keys or webhook secrets to GitHub or frontend code.**

### Local Development (`.env.local`)
```ini
# Resend API Key (Create at https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Verified Sender Email (use onboarding sender for testing, or your custom domain once verified)
RESEND_FROM_EMAIL="Noir Scents <onboarding@resend.dev>"

# Store Concierge Notification Email (receives order alerts and customer inquiries)
MY_RECEIVING_EMAIL=noirscents01@gmail.com

# Webhook Signing Secret (generated in Resend Dashboard under Webhooks)
RESEND_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Production Deployment (Netlify Dashboard)
1. Go to **Netlify Dashboard** -> **Site configuration** -> **Environment variables**.
2. Add the following variables:
   - `RESEND_API_KEY` = your live Resend API key (`re_...`)
   - `RESEND_FROM_EMAIL` = `Noir Scents <orders@yourdomain.com>` (or `onboarding@resend.dev` during testing)
   - `MY_RECEIVING_EMAIL` = `noirscents01@gmail.com`
   - `RESEND_WEBHOOK_SECRET` = your live Resend Webhook signing secret (`whsec_...`)
3. Trigger a redeploy on Netlify to apply the new environment variables to serverless functions.

---

## 3. Outbound Email Sending

### Features Implemented:
1. **Store Manager Order Alert**:
   - Sent instantly upon customer checkout.
   - Includes full customer shipping address, Pakistani phone number with direct WhatsApp deep-link (`https://wa.me/...`), itemized fragrance breakdown, subtotal, shipping fee, and Cash On Delivery (COD) total in PKR.
2. **Customer Order Confirmation**:
   - Dispatched to `order.customer.email` if an email address was provided at checkout.
   - Features responsive haute parfumerie luxury styling with gold accents and brand banner.
   - Includes a full Plain-Text fallback for email clients with images disabled.
   - Highlights the **7-Day Scent Guarantee** and concierge contact details.
3. **Contact Concierge Inquiry**:
   - Dispatched to the store manager when a customer submits an inquiry on `/pages/contact`.
   - Real-time client submission with loading states and error handling.
4. **Duplicate-Send Guard (Idempotency)**:
   - Built-in 15-minute deduplication window per order ID to prevent duplicate customer emails on accidental double-clicks or browser retries.
5. **Graceful Simulation Mode**:
   - If `RESEND_API_KEY` is not yet configured or contains a placeholder, the system logs a clean warning and continues order processing without crashing checkout.

---

## 4. Inbound Email Receiving & Webhooks

### 1. Webhook Endpoint
- **URL**: `https://noirscents.netlify.app/api/resend/webhook`
- **Method**: `POST`
- **Health Check**: `GET https://noirscents.netlify.app/api/resend/webhook` (returns status `200 OK`)

### 2. Supported Events
- `email.received`: Triggered whenever an inbound email arrives at your domain.
- `email.delivered`: Outbound delivery confirmed.
- `email.bounced`: Outbound delivery failed.

### 3. Svix Signature Verification
- Resend signs all webhook requests using Svix.
- The webhook endpoint extracts headers (`svix-id`, `svix-timestamp`, `svix-signature`) and validates the raw request body against `RESEND_WEBHOOK_SECRET`.
- Tampered or unsigned requests are rejected immediately with HTTP `401 Unauthorized`.
- Duplicate deliveries sharing the same `svix-id` are acknowledged with `{ received: true, duplicate: true }` without redundant processing.

### 4. Inbound Email Fetching & Storage
- When `email.received` arrives, the endpoint fetches the full subject, text, HTML, and sender details using the Resend Receiving API (`resend.emails.receiving.get(email_id)`).
- Messages are persisted in `data/inbound-emails.json` with an in-memory cache for fast querying.
- The store admin can view all received customer emails in real time inside the **Admin Dashboard** (`/admin`) under the **"Received Emails"** tab.

---

## 5. Domain Verification (DNS Records)

To send emails from your own domain (e.g. `orders@yourdomain.com`) and receive inbound emails, configure the following DNS records in your domain registrar:

### A. Sending Verification (DKIM & SPF)
In **Resend Dashboard** -> **Domains** -> **Add Domain**:

| Record Type | Name / Host | Value | Priority / TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `resend._domainkey` | *Provided by Resend (DKIM public key)* | Auto / 3600 |
| **MX** | `send` (or `@`) | `feedback-smtp.resend.com` | Priority 10 |
| **TXT** | `send` (or `@`) | `v=spf1 include:amazonses.com ~all` | Auto / 3600 |

### B. Inbound Receiving (MX Records)
In **Resend Dashboard** -> **Emails** -> **Receiving**:

| Record Type | Name / Host | Value | Priority |
| :--- | :--- | :--- | :--- |
| **MX** | `@` (or subdomain e.g. `mail`) | `inbound.resend.com` | Priority 10 |

> [!IMPORTANT]
> If you already have existing MX records (e.g. Google Workspace, Microsoft 365, or Zoho), **do not overwrite them**. Instead, configure receiving on a subdomain like `concierge.yourdomain.com` with MX pointing to `inbound.resend.com`.

---

## 6. How to Configure Resend Webhook in Dashboard

1. Navigate to [https://resend.com/webhooks](https://resend.com/webhooks).
2. Click **Add Webhook**.
3. **Endpoint URL**: `https://noirscents.netlify.app/api/resend/webhook`
4. **Events to subscribe**: Check **`email.received`** (and optionally `email.delivered`, `email.bounced`).
5. Click **Create Webhook**.
6. Copy the **Signing Secret** (starts with `whsec_...`).
7. Paste this secret into your **Netlify Environment Variables** under `RESEND_WEBHOOK_SECRET`.

---

## 7. Testing Procedures

### Local Automated Test Suite
Run the automated test runner locally to verify template generation, HTML sanitization, Svix signatures, and idempotency:
```bash
npx tsx scratch/test_resend_integration.mjs
```
Expected output: `10 PASSED, 0 FAILED`.

### Live Inbound Webhook Health Check
Verify that your deployed Netlify webhook endpoint is active and listening:
```bash
curl -X GET https://noirscents.netlify.app/api/resend/webhook
```
Response:
```json
{
  "status": "active",
  "service": "Resend Inbound Webhook Listener",
  "endpoint": "/api/resend/webhook",
  "eventsSupported": ["email.received", "email.delivered", "email.bounced"]
}
```

### Live Test Outbound Email
1. Place a test order through the store checkout (`/checkout`) using a test customer email.
2. Check your receiving inbox (`noirscents01@gmail.com`) for the order notification.
3. Check the customer's email for the luxury order confirmation flacon letter.

---

## 8. Safe Credential Rotation

If you ever need to rotate your Resend API Key or Webhook Secret:
1. Generate a new API Key in Resend under **API Keys** -> **Create API Key**.
2. Update `RESEND_API_KEY` in Netlify Site Configuration.
3. Once the new key is deployed and verified, delete the old API key in Resend.
4. For webhooks: generate a new signing secret in Resend, update `RESEND_WEBHOOK_SECRET` in Netlify, and trigger a redeploy.

---

## 9. Disabling Inbound Processing

If you ever need to temporarily pause inbound processing without altering DNS:
1. In the **Resend Dashboard** -> **Webhooks**, toggle your webhook to **Inactive**.
2. Or in Netlify, remove `RESEND_WEBHOOK_SECRET`. The webhook will return safely without storing incoming messages.
