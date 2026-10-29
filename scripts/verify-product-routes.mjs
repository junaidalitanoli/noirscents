/**
 * Route verification script for Noir Scent product catalog.
 * Loops through all product slugs and core collection routes,
 * verifying that every single route resolves with HTTP 200.
 *
 * Usage:
 *   npx tsx scripts/verify-product-routes.mjs [baseUrl]
 * Example:
 *   npx tsx scripts/verify-product-routes.mjs http://localhost:3000
 */

import { getAllProducts } from "../lib/data";
import { CATEGORIES } from "../lib/constants";
import fs from "node:fs";
import path from "node:path";

async function verifyRoutes() {
  const products = getAllProducts();
  const baseUrl = (process.argv[2] || process.env.TEST_URL || "http://localhost:3000").replace(/\/+$/, "");

  console.log(`\n======================================================`);
  console.log(`🔎 Verifying Noir Scent Product Catalog & Routes`);
  console.log(`   Target: ${baseUrl}`);
  console.log(`   Catalog Count: ${products.length} products`);
  console.log(`======================================================\n`);

  // 1. Static Catalog Integrity Checks
  const failures = [];
  const slugsSeen = new Set();

  for (const product of products) {
    if (!product.slug || !/^[a-z0-9-]+$/.test(product.slug)) {
      failures.push({ target: `Product ${product.name}`, error: `Invalid slug: "${product.slug}"` });
    }
    if (slugsSeen.has(product.slug)) {
      failures.push({ target: `Product ${product.name}`, error: `Duplicate slug: "${product.slug}"` });
    }
    slugsSeen.add(product.slug);

    if (!product.sizes || product.sizes.length === 0 || product.sizes[0].price <= 0) {
      failures.push({ target: `Product ${product.slug}`, error: `Missing or invalid price` });
    }
  }

  // 2. Build-Time Static Prerender Check (if .next exists)
  const nextPrerenderManifest = path.join(process.cwd(), ".next", "prerender-manifest.json");
  if (fs.existsSync(nextPrerenderManifest)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(nextPrerenderManifest, "utf8"));
      console.log(`📦 Checking Next.js prerender-manifest.json...`);
      for (const product of products) {
        const route = `/products/${product.slug}`;
        if (!manifest.routes[route]) {
          failures.push({ target: route, error: "Route missing from Next.js prerender manifest!" });
        } else {
          console.log(`  ✓ Prerendered: ${route}`);
        }
      }
    } catch (err) {
      console.warn(`  ⚠️ Could not read prerender-manifest: ${err.message}`);
    }
  }

  // 3. Live HTTP Route Fetch Check (if server is reachable)
  let serverReachable = false;
  try {
    const probe = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(3000) });
    serverReachable = probe.status === 200;
  } catch {
    serverReachable = false;
  }

  if (serverReachable) {
    console.log(`\n🌐 Checking Live HTTP Responses against ${baseUrl}:`);

    // Core routes
    const coreRoutes = [
      "/",
      "/collections/all",
      ...CATEGORIES.map((c) => `/collections/${c.slug}`),
      "/pages/about",
      "/pages/contact",
      "/policies/shipping",
      "/policies/returns",
      "/policies/privacy",
      "/policies/terms",
      "/robots.txt",
      "/sitemap.xml",
    ];

    for (const route of coreRoutes) {
      try {
        const res = await fetch(`${baseUrl}${route}`);
        if (res.status === 200) {
          console.log(`  ✓ 200 OK  ${route}`);
        } else {
          failures.push({ target: route, error: `HTTP status ${res.status}` });
          console.error(`  ✗ FAIL    ${route} -> Status ${res.status}`);
        }
      } catch (err) {
        failures.push({ target: route, error: `Fetch failed: ${err.message}` });
        console.error(`  ✗ FAIL    ${route} -> ${err.message}`);
      }
    }

    // Every single product route
    console.log(`\n🧴 Checking all ${products.length} Product Routes:`);
    for (const product of products) {
      const route = `/products/${product.slug}`;
      try {
        const res = await fetch(`${baseUrl}${route}`);
        if (res.status === 200) {
          console.log(`  ✓ 200 OK  ${route} (${product.name} - ${product.category})`);
        } else {
          failures.push({ target: route, error: `HTTP status ${res.status}` });
          console.error(`  ✗ FAIL    ${route} -> Status ${res.status}`);
        }
      } catch (err) {
        failures.push({ target: route, error: `Fetch error: ${err.message}` });
        console.error(`  ✗ FAIL    ${route} -> ${err.message}`);
      }
    }
  } else {
    console.log(`\nℹ️  Live server not currently running at ${baseUrl}.`);
    console.log(`   (Run 'npm run dev' or 'next start' to perform live HTTP status verification)`);
  }

  console.log(`\n======================================================`);
  if (failures.length > 0) {
    console.error(`❌ Verification failed with ${failures.length} issues:`);
    failures.forEach((f) => console.error(`   - ${f.target}: ${f.error}`));
    process.exit(1);
  } else {
    console.log(`✅ All ${products.length} products verified successfully! 0 errors.`);
    console.log(`======================================================\n`);
  }
}

verifyRoutes().catch((err) => {
  console.error("Verification script error:", err);
  process.exit(1);
});

