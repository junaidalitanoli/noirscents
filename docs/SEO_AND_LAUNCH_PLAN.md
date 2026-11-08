# Noir Scent — Launch & Competitor SEO Master Blueprint
**Target Live Date:** Monday (Product Updates & Live Domain `www.noirscent.pk`)  
**Domain:** `https://www.noirscent.pk`  
**Brand Identity:** Pakistani Luxury Artisanal Extrait de Parfum (35% Oil Concentration)  
**Primary Competitors:** Scent'n Stories, J. (Junaid Jamshed), Saeed Ghani, Funoon Fragrances, Bahaar Scents

---

## 📌 1. Monday Milestone Checklist (User & Agent Actions)
- [ ] **Product Catalog Update:**
  - Receive finalized product names and corresponding notes from user.
  - Upload high-resolution luxury product photographs (named with SEO-friendly file names).
  - Update `lib/data.ts` with correct names, notes, accords, prices, and images.
- [ ] **Domain Switch to `www.noirscent.pk`:**
  - Update `FINAL_DOMAIN` in `lib/site-config.ts` from `.com` to `https://www.noirscent.pk`.
  - Update `NEXT_PUBLIC_SITE_URL=https://www.noirscent.pk` in Vercel environment variables.
  - Verify `app/robots.ts` switches from pre-launch protection (`Disallow: /`) to full indexing (`Allow: /`).
  - Verify `app/sitemap.ts` generates all 22+ product routes under `https://www.noirscent.pk`.
- [ ] **Verification & Re-deployment:**
  - Run `npm run verify:routes`.
  - Run `npx vercel deploy --prod --yes` to bind the custom domain.

---

## 🎯 2. Competitor SEO & Keyword Stealing Strategy

### A. The 5 Competitors in Pakistan:
1. **Scent'n Stories (`scentsnstories.pk`):**
   - *Target terms:* `best perfumes in pakistan`, `long lasting perfumes pakistan`, `creed aventus impression`, `affordable extrait perfume`.
   - *Weakness:* Focused on lower-ticket dupes; Noir Scent wins on 35% luxury extrait purity and heavy prestige packaging.
2. **J. / Junaid Jamshed (`junaidjamshed.com`):**
   - *Target terms:* `best oud perfume pakistan`, `pakistan wedding fragrance`, `attar for men`.
   - *Weakness:* Less transparent about maceration and actual oil concentration percentages.
3. **Saeed Ghani (`saeedghani.pk`):**
   - *Target terms:* `pure attar karachi`, `non alcoholic fragrance oil`.
4. **Funoon Fragrances (`buyfunoon.com`):**
   - *Target terms:* `extrait de parfum brands pakistan`, `strong projection perfume`.
5. **Bahaar Scents (`bahaarscentiments.com`):**
   - *Target terms:* `perfume gift boxes pakistan`, `romantic women fragrance gift set`.

### B. High-Intent Keyword Clusters for Noir Scent:
1. **Commercial Purchase Keywords:**
   - `"best long lasting perfumes for men in pakistan"`
   - `"extrait de parfum brands pakistan"`
   - `"luxury perfume gift set with ribbon pakistan"`
   - `"cash on delivery perfumes karachi lahore islamabad"`
2. **Note-Specific High-Conversion Searches:**
   - Saffron & Amber: `"desert saffron ambergris perfume"` (*Desert Majesty*)
   - Frankincense & Smoke: `"regal frankincense cedarwood perfume"` (*Sultan*)
   - Peony & Rose: `"dewy peony lychee perfume for women"` (*Blush*)
   - Gourmet Decadence: `"salted caramel bourbon vanilla extrait"` (*Sweet Temptation*)
   - Cambodian Oud: `"aged cambodian oud perfume pakistan"` (*Raees / Gentleman*)
3. **Comparison / Discovery Listicles (Content SEO):**
   - Article: *"Top 7 Long-Lasting Perfume Houses in Pakistan (2026 Connoisseur Guide)"*
   - Article: *"Extrait de Parfum vs EDP: Why Fragrances Fade in Pakistan's Climate"*

---

## 🔗 3. Backlink Outreach Roadmap
1. **Pakistani Lifestyle & Tech Portals:**
   - Pitch listicle features to writers at *Mavaro.pk*, *MangoBaaz*, *Parhlo*, and *ProPakistani*.
2. **Pakistani Fragrance Community (PFC):**
   - PR seeding to prominent Pakistani YouTube & TikTok fragrance reviewers (e.g. *Fragrance Addicts PK*, *Scent Reviews PK*).
   - In exchange, obtain high-authority contextual backlinks in video descriptions and blog write-ups.
3. **Local Citations:**
   - Setup Google Business Profile (Karachi / Lahore) for instant local map rankings.
   - Pakistani business directories (PakBiz, BusinessList.pk).

---

## 📈 4. Technical SEO Foundation (Pre-Built in Codebase)
- **JSON-LD Schema Markup:** `@type: Product`, priceCurrency `PKR`, availability `InStock`, rating `4.9/5.0`, review counts.
- **Open Graph / WhatsApp Cards:** High-res image cards generate automatically whenever any product/bundle link is shared on WhatsApp or social media.
- **Performance:** Turbopack SSR/SSG rendering in Next.js 16 with zero layout shift (CLS 0, LCP < 1.2s).

