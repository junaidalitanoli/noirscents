import { MetadataRoute } from "next";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { CATEGORIES } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Core static pages (omitting lastModified and changeFrequency/priority)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
    },
    {
      url: `${SITE_URL}/collections/all`,
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

  // Collection category routes
  const collectionRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/collections/${cat.slug}`,
  }));

  // Individual product routes (real per-item createdAt date only)
  const productRoutes: MetadataRoute.Sitemap = INITIAL_PRODUCTS.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    ...(product.createdAt ? { lastModified: new Date(product.createdAt) } : {}),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
