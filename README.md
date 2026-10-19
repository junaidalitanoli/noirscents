# Noir Scents — Artisanal Pakistani Perfumery Storefront

A modern luxury e-commerce storefront for **Noir Scents**, engineered to match the layout, structure, and design architecture of high-end perfume storefronts (Shopify Dawn archetype as seen on `buyfunoon.com`).

- **Brand Name**: Noir Scents
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
| `noir-box.jpg` | **1024 &times; 1024 px** | 1 : 1 (Square) | All Product Cards, Galleries, Cart, Checkout, Social Preview | Universal Noir Scents Luxury Packaging Photo |
| `hero-banner.svg` | **1920 &times; 800 px** | 2.4 : 1 (16:9) | Home Page Hero Banner | High-impact hero collection banner |
| `promo-banner.svg` | **1440 &times; 600 px** | 2.4 : 1 | Promotional Sections | Limited Reserve & Bundle Promotion |
| `logo.svg` | **300 &times; 80 px** | ~4 : 1 | Header Navigation & Footer | Simple Noir Scents text logo |
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

## 🌟 Architecture & Reference Match Breakdown

The storefront architecture matches the Shopify Dawn theme layout:

1. **Header & Announcement Bar**:
   - Announcement bar sticky at top with free delivery threshold.
   - Header with Montserrat typography, simple &ldquo;Noir Scents&rdquo; text logo, clean uppercase nav links with hover underline, search modal, account portal link, and live cart badge.
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

## 🔑 Demo Admin Credentials

- **URL**: [`/admin`](http://localhost:3000/admin)
- **Password**: `admin123`

---

## ⚙️ Environment Variables (.env.local)

```env
# Resend API Key from https://resend.com
RESEND_API_KEY=re_your_api_key_here

# Receiving email address for order notifications
MY_RECEIVING_EMAIL=noirscents01@gmail.com
```

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
