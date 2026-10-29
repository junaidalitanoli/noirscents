# 🚀 Noir Scent — Production Launch Checklist

This guide provides the exact step-by-step procedure for transitioning **Noir Scent** (`noirscents.vercel.app`) to the live production domain **`https://www.noirscent.com`**.

---

## 1. Vercel Domain Setup & 301 Redirect

1. **Open Vercel Project Dashboard**:
   - Go to **Project Settings > Domains**.
2. **Add Domains**:
   - Add `www.noirscent.com` (Target canonical host).
   - Add `noirscent.com` (Apex domain).
3. **Configure 301 Permanent Redirect**:
   - Set `www.noirscent.com` as the **Primary Domain**.
   - Configure `noirscent.com` to **Redirect to `www.noirscent.com`** with **Status Code: 301 Permanent Redirect**.
4. **Update DNS Records at Domain Registrar** (Namecheap, GoDaddy, Cloudflare, etc.):
   - `CNAME` record: Host `www` &rarr; Value `cname.vercel-dns.com`
   - `A` record: Host `@` &rarr; Value `76.76.21.21` (or registrar ALIAS/ANAME according to Vercel's prompt)
5. **Update Production Environment Variable in Vercel**:
   - Go to **Project Settings > Environment Variables**.
   - Set:
     ```env
     NEXT_PUBLIC_SITE_URL=https://www.noirscent.com
     ```
   - Redeploy the application.

---

## 2. Resend Domain Verification (SPF, DKIM, DMARC)

To send official customer order confirmations from `orders@noirscent.com`:

1. **Add Domain in Resend**:
   - Go to [Resend Dashboard > Domains](https://resend.com/domains) and click **Add Domain**.
   - Enter `noirscent.com` (or subdomain `mail.noirscent.com`).
2. **Add DNS Records to Your Domain Registrar**:
   - **DKIM** (`TXT` or `CNAME` provided by Resend for cryptographic signature verification).
   - **SPF** (`TXT` record authorizing Resend servers: `v=spf1 include:amazonses.com ~all`).
   - **DMARC** (`TXT` record under `_dmarc.noirscent.com`: `v=DMARC1; p=none; rua=mailto:dmarc-reports@noirscent.com`).
3. **Verify DNS Status**:
   - Wait 5–15 minutes until Resend shows the status as **Verified** (green checkmark).
4. **Configure Vercel Environment Variables**:
   ```env
   RESEND_FROM_EMAIL="Noir Scent <orders@noirscent.com>"
   MY_RECEIVING_EMAIL="noirscents01@gmail.com" # (Replace with hello@noirscent.com once mailbox exists)
   ```

---

## 3. What Automatically Changes When `NEXT_PUBLIC_SITE_URL` Is Switched

Switching `NEXT_PUBLIC_SITE_URL=https://www.noirscent.com` is the **single toggle** that unlocks production:

| Component | Pre-Launch State (`*.vercel.app`) | Live Production State (`https://www.noirscent.com`) |
| :--- | :--- | :--- |
| **`robots.txt`** | `Disallow: /` (blocks all search engines)<br>No sitemap line | `Allow: /`<br>Disallows `/admin`, `/checkout`, `/search`<br>`Sitemap: https://www.noirscent.com/sitemap.xml` |
| **Root `<meta name="robots">`** | `index: false, follow: false` (noindex) | `index: true, follow: true` (indexed nationwide) |
| **Canonicals (`alternates.canonical`)** | Relative against Vercel URL | Resolved against `https://www.noirscent.com` |
| **OpenGraph & Twitter Cards** | Resolved against Vercel preview URL | Fully qualified `https://www.noirscent.com/products/...` |
| **Dynamic Sitemap (`/sitemap.xml`)** | Kept unreferenced | Public index of all products, collections & policy routes |
| **Schema.org Structured Data** | Local preview IDs | Authoritative `@id`, `url`, and shipping details for Google Rich Results |

---

## 4. Day 1 Verification Checklist (After Going Live)

Immediately after domain switch and DNS propagation:

- [ ] **Apex 301 Redirect**: Visit `http://noirscent.com` and `https://noirscent.com` in an incognito window. Verify both return HTTP 301 and redirect to `https://www.noirscent.com`.
- [ ] **Robots.txt Check**: Visit `https://www.noirscent.com/robots.txt`. Verify:
  - `User-Agent: *`
  - `Allow: /`
  - `Sitemap: https://www.noirscent.com/sitemap.xml`
- [ ] **Sitemap Check**: Visit `https://www.noirscent.com/sitemap.xml`. Verify XML contains valid entries for all 13 products and collection routes.
- [ ] **Google Rich Results Test**: Test a product URL (e.g. `https://www.noirscent.com/products/desert-majesty`) in [Google Rich Results Test](https://search.google.com/test/rich-results). Confirm Product schema, Offer, and Merchant Listing are valid without errors.
- [ ] **Google Search Console**:
  - Add property `https://www.noirscent.com`.
  - Submit sitemap `https://www.noirscent.com/sitemap.xml`.
- [ ] **Live Test COD Order**:
  - Open a product, select variant, click **Order with Cash on Delivery**.
  - Submit a test order with a real test phone number and delivery city (e.g. Karachi).
  - Verify:
    1. Order success page loads with Order ID `NS-XXXXXXXX`.
    2. Confirmation email arrives in customer mailbox from `orders@noirscent.com`.
    3. Admin alert email arrives in `MY_RECEIVING_EMAIL`.
    4. WhatsApp quick confirmation link opens WhatsApp with pre-filled order ID and item details.
- [ ] **Order Tracking**:
  - Visit `/account`. Enter the test order ID.
  - Verify that status ("Pending", items, delivery city, total COD amount) displays correctly.

