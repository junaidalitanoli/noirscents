import { MetadataRoute } from "next";
import { SITE_URL, IS_PRODUCTION_DOMAIN } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  // PRE-LAUNCH PROTECTION:
  // While NEXT_PUBLIC_SITE_URL is not exactly https://www.noirscent.com:
  // Return Disallow: / for all user agents and omit the sitemap line.
  if (!IS_PRODUCTION_DOMAIN) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // PRODUCTION MODE:
  // Full indexing allowed, internal/checkout/search & filtered URLs disallowed, dynamic sitemap linked.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/checkout",
          "/order-success",
          "/order-success/",
          "/account",
          "/search",
          "/*?*sort=*",
          "/*?*price=*",
          "/*?*filter=*",
          "/*?*scent=*",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
