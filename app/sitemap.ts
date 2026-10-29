import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/data";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
    },
    {
      url: `${SITE_URL}/collections/all`,
    },
    {
      url: `${SITE_URL}/collections/men`,
    },
    {
      url: `${SITE_URL}/collections/women`,
    },
    {
      url: `${SITE_URL}/collections/testers`,
    },
    {
      url: `${SITE_URL}/collections/deals`,
    },
    {
      url: `${SITE_URL}/pages/about`,
    },
    {
      url: `${SITE_URL}/pages/contact`,
    },
    {
      url: `${SITE_URL}/policies/shipping`,
    },
    {
      url: `${SITE_URL}/policies/returns`,
    },
    {
      url: `${SITE_URL}/policies/privacy`,
    },
    {
      url: `${SITE_URL}/policies/terms`,
    },
  ];

  // Dynamic product routes generated strictly from actual catalog data
  const products = getAllProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    ...(product.createdAt ? { lastModified: new Date(product.createdAt) } : {}),
  }));

  return [...staticRoutes, ...productRoutes];
}
