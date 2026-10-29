# Noir Scent — Artisanal Pakistani Perfumery Storefront

A modern luxury e-commerce storefront for **Noir Scent**, engineered to match the layout, structure, and design architecture of high-end perfume storefronts (Shopify Dawn archetype as seen on `buyfunoon.com`).

- **Brand Name**: Noir Scent
- **Tagline**: *Artisanal Luxury Scents Crafted for Pakistan*
- **Store Email**: `noirscents01@gmail.com`
- **WhatsApp Concierge**: `+92 332 2224331` (`923322224331`)

---

## 📸 Image Replacement Guide & Specifications

All images in the project are neutral vector placeholders (soft grey background with a minimalist perfume bottle silhouette) at the exact aspect ratios used in the store layout. **No AI-generated images remain in the project.**

All banner and category image paths are organized in [`lib/images.ts`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/lib/images.ts), and product photos are referenced in [`lib/data.ts`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/lib/data.ts). To replace any image, simply drop your photo into [`public/images/`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/public/images) with the matching filename (or update the filename in `lib/data.ts` / `lib/images.ts`).

### Image Asset Table

All product photos currently default to `/images/noir-box.jpg` (the black and gold "NOIR SCENT" Extrait de Parfum box packaging photo). You can replace this global placeholder or drop in individual photos per fragrance at any time.

| Filename | Recommended Resolution | Aspect Ratio | Where It Appears | Description / Usage |
| :--- | :--- | :--- | :--- | :--- |
| `noir-box.jpg` | **1024 &times; 1024 px** | 1 : 1 (Square) | All Product Cards, Galleries, Cart, Checkout, Social Preview | Universal Noir Scent Luxury Packaging Photo |
| `hero-banner.svg` | **1920 &times; 800 px** | 2.4 : 1 (16:9) | Home Page Hero Banner | High-impact hero collection banner |
| `promo-banner.svg` | **1440 &times; 600 px** | 2.4 : 1 | Promotional Sections | Limited Reserve & Bundle Promotion |
| `logo.svg` | **300 &times; 80 px** | ~4 : 1 | Header Navigation & Footer | Simple Noir Scent text logo |
| `category-men.svg` | **600 &times; 800 px** | 3 : 4 (Portrait) | Home &ldquo;Shop By Category&rdquo; | Men's Fragrances Category Tile |
| `category-women.svg` | **600 &times; 800 px** | 3 : 4 (Portrait) | Home &ldquo;Shop By Category&rdquo; | Women's Fragrances Category Tile |
| `category-deals.svg` | **600 &times; 800 px** | 3 : 4 (Portrait) | Home &ldquo;Shop By Category&rdquo; | Bundles & Deals Category Tile |
| `category-testers.svg` | **600 &times; 800 px** | 3 : 4 (Portrait) | Home &ldquo;Shop By Category&rdquo; | Discovery Sets & Testers Tile |

> [!TIP]
> **Adding Individual Product Photos Later**:
> 1. Drop your new photo into `/public/images/` (e.g. `urban-legend.jpg`).
> 2. In [`lib/data.ts`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/lib/data.ts), update that product's `images: ["/images/urban-legend.jpg"]`.
> 3. If a product has only 1 image or repeated identical images, the detail page automatically displays it as a single hero shot and hides the redundant thumbnail strip. If multiple distinct images are provided, it automatically shows the interactive thumbnail strip!

---

## 📦 Product Catalog Management (Single Source of Truth)

All products across the store (Home, Collections, Product Detail Pages, &ldquo;You may also like&rdquo;, Search, and Sitemap) are powered by **ONE single file**: [`lib/data.ts`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/lib/data.ts).

### How to Add a Product:
1. Open [`lib/data.ts`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/lib/data.ts).
2. Append or insert a new product object into `INITIAL_PRODUCTS` using the full example below.
3. Drop corresponding photos into `public/images/`.
4. Run `npm run verify:routes` to test that the slug resolves and prerenders without error.

### How to Remove a Product:
1. Open [`lib/data.ts`](file:///c:/Users/Junaid%20Ali%20Tanoli/OneDrive/Desktop/noir-scents-store/lib/data.ts).
2. Remove the product object from `INITIAL_PRODUCTS`.
3. Run `npm run verify:routes` to verify the catalog consistency.

### Complete Product Entry Template:

```typescript
{
  id: "ns-014",
  slug: "velvet-sultan",
  name: "Velvet Sultan",
  category: "men", // "men" | "women" | "testers" | "deals"
  subtitle: "Smoked Taif Rose, Royal Cambodian Agarwood & Ambergris",
  inspiration: "Inspired by midnight courts and royal Arabian gardens under starry desert skies.",
  accords: ["Smoked Oud", "Taif Rose", "Baltic Amber", "Dark Patchouli", "Coriander"],
  gender: "Men", // "Men" | "Women" | "Unisex"
  season: "Fall & Winter Evenings",
  occasion: "Formal Receptions, Black-Tie Galas & Celebrations",
  concentration: "Extrait de Parfum (35% Fragrance Oil Concentration)",
  macerationDays: 45,
  description:
    "An authoritative and deeply hypnotic extrait that commands respect from the first encounter. Sun-drenched Taif rose absolute opens into aged royal Cambodian agarwood, grounded by dark mineral amber and earthy patchouli for an all-day majestic trail.",
  images: [
    "/images/noir-black-flacon.jpg",
    "/images/noir-black-oud.jpg"
  ],
  sizes: [
    { ml: 50, price: 3450 }
  ],
  compareAtPrice: 5800, // Optional: only set if offering an actual discount
  badge: "Best Seller", // Optional: "Best Seller" | "New Arrival" | custom string (shown only when set)
  notes: {
    top: ["Taif Rose Absolute", "Cardamom Seed", "Bergamot"],
    heart: ["Royal Cambodian Oud", "Smoked Birch", "Labdanum Resin"],
    base: ["Dark Mineral Amber", "Bourbon Vetiver", "Baltic Ambergris"]
  },
  majorIngredients: [
    { name: "Taif Rose Absolute", percentage: "15%" },
    { name: "Cambodian Agarwood Resinoid", percentage: "14%" },
    { name: "Baltic Ambergris Accord", percentage: "8%" },
    { name: "Bourbon Vetiver Root Oil", percentage: "6%" }
  ],
  longevity: 5, // 1 to 5 scale (5 = All-Day Sillage)
  projection: "Majestic & Commanding (All-Day Sillage)",
  isBestSeller: true,
  isNewArrival: false,
  createdAt: "2025-03-01T10:00:00Z"
}
```

---

## 🌟 Architecture & Reference Match Breakdown

The storefront architecture matches the Shopify Dawn theme layout:

1. **Header & Announcement Bar**:
   - Announcement bar sticky at top with free delivery threshold.
   - Header with Montserrat typography, simple &ldquo;Noir Scent&rdquo; text logo, clean uppercase nav links with hover underline, search modal, account portal link, and live cart badge.
   - Mobile hamburger drawer with slide-in navigation.
2. **Hero Banner (`image-banner`)**:
   - Full-width hero banner with `next/image` (`priority` loaded), text overlay with luxury subtitle, bold heading, and dual CTA buttons.
3. **Product Card Design**:
   - Vertical portrait 3:4 aspect ratio (`aspect-[3/4]`), soft grey `#f4f4f5` background.
   - Smooth hover flip to secondary angle image (`product.images[1]`).
   - Pill-shaped Sale & Best Seller badges.
   - 5-star customer rating display.
   - Size badge (50ml Extrait de Parfum).
   - Direct &ldquo;Add to cart&rdquo; button opening the cart drawer.
4. **Grid Breakpoints**:
   - **Desktop (1440px)**: 4 columns
   - **Tablet (768px)**: 3 columns
   - **Mobile (390px)**: 2 columns
5. **Product Detail Page**:
   - Sticky thumbnail slider gallery on desktop; swipeable gallery on mobile.
   - Right-side buy box with star ratings, price with compare-at strikethrough, size selector pills, quantity stepper, trust checkmarks, &ldquo;Add to cart&rdquo;, and instant &ldquo;Buy It Now&rdquo;.
   - Olfactory pyramid breakdown (Top, Heart, Base notes).
   - Related fragrances grid.
6. **Cart Drawer**:
   - 420px max-width slide-in from right.
   - Free shipping progress bar.
   - Item rows with quantity increment/decrement stepper, line item price, and remove button.
   - Direct checkout button.
7. **Footer**:
   - 4-column layout: Contacts, About, Quick links, Policies.
   - Social media links, payment methods, and copyright.

---

## 🔑 Admin Portal Authentication

- **URL**: [`/admin`](http://localhost:3000/admin)
- **Authentication**: Secured via `ADMIN_SECRET` environment variable configured in `.env.local` or Netlify dashboard. No default or hardcoded fallback credentials.

---

## ⚙️ Environment Variables (.env.local)

```env
# Resend API Key from https://resend.com
RESEND_API_KEY=re_your_api_key_here

# Receiving email address for order notifications
MY_RECEIVING_EMAIL=noirscents01@gmail.com
```

---

## 🌐 Domain Configuration & Vercel 301 www Redirect

The canonical production host is `https://www.noirscent.com` (with `www`).
All non-www traffic must 301 permanently redirect to `www`.

### How to configure on Vercel:
1. In your **Vercel Project Dashboard**, navigate to **Settings > Domains**.
2. Add both domains:
   - `www.noirscent.com`
   - `noirscent.com`
3. Set `www.noirscent.com` as the **Primary Domain**.
4. Vercel will automatically prompt: *"Redirect noirscent.com to www.noirscent.com"*. Select **Redirect to www.noirscent.com (Status Code: 301 Permanent Redirect)**.
5. In your DNS registrar (e.g. Namecheap, Cloudflare, GoDaddy):
   - Add a `CNAME` record for `www` pointing to `cname.vercel-dns.com`.
   - Add an `A` record for `@` pointing to `76.76.21.21` (or follow Vercel's DNS recommendations).
6. Set the production environment variable in Vercel:
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.noirscent.com
   ```
   Once set, redeploy the project. Pre-launch protection will immediately deactivate, enabling full search engine indexing and public sitemaps.

---

## 🔍 Testing Structured Data (Google Rich Results)

All structured data across the storefront uses standard Schema.org JSON-LD via the reusable `<JsonLd>` component:
- **Global**: `Organization` (with brand metadata and customer care WhatsApp contact point) and `WebSite` (with internal search action).
- **Navigation**: `BreadcrumbList` on collections, product detail pages, and policy pages.
- **Product Pages**: `Product` schema with name, description, high-resolution image array, SKU, brand, and complete `Offer` specification:
  - `priceCurrency`: `PKR`
  - `price`: dynamic from product data
  - `availability`: `InStock` or `OutOfStock` based on inventory
  - `itemCondition`: `https://schema.org/NewCondition`
  - `shippingDetails`: Free shipping above Rs. 3,000 threshold or Rs. 250 flat rate, 2–4 business days delivery across Pakistan (`PK`).
  - `hasMerchantReturnPolicy`: 7-day scent exchange policy (`PK`).
  - No fake reviews or aggregate ratings.

### How to test:
1. Open the **[Google Rich Results Test](https://search.google.com/test/rich-results)**.
2. Enter the URL of your deployed product page (or paste the rendered page HTML via *Code* tab).
3. Verify that **Product snippets**, **Merchant listings**, and **Breadcrumbs** are detected with 0 errors.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

To run linting and production build verification:
```bash
npm run lint
npm run build
```
