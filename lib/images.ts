/**
 * Central registry for site-wide banners, category tiles, and brand imagery.
 * Replacing an image only requires dropping in a file into /public/images with the same filename.
 */
export const DEFAULT_PRODUCT_IMAGE = "/images/urban-legend-bottle.jpg";

export const SITE_IMAGES = {
  logo: {
    src: "/images/logo.svg",
    alt: "Noir Scents Logo",
    width: 300,
    height: 80,
  },
  heroBanner: {
    src: "/images/noir-hero-banner.jpg",
    alt: "Noir Scents Luxury Extraits de Parfum Showcase",
    width: 1920,
    height: 1080,
  },
  promoBanner: {
    src: "/images/noir-hero-banner.jpg",
    alt: "Noir Scents Limited Edition Reserve",
    width: 1920,
    height: 1080,
  },
  categories: {
    men: {
      src: "/images/urban-legend-bottle.jpg",
      alt: "Men's Luxury Fragrances - Noir Scents",
      width: 1024,
      height: 1024,
    },
    women: {
      src: "/images/noir-women.jpg",
      alt: "Women's Artisanal Perfumes - Noir Scents",
      width: 1024,
      height: 1024,
    },
    deals: {
      src: "/images/noir-bundles.jpg",
      alt: "Curated Bundles & Exclusive Deals - Noir Scents",
      width: 1024,
      height: 1024,
    },
    testers: {
      src: "/images/noir-testers.jpg",
      alt: "Discovery Flights & Travel Testers - Noir Scents",
      width: 1024,
      height: 1024,
    },
  },
} as const;

