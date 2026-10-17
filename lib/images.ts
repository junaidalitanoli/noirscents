/**
 * Central registry for site-wide banners, category tiles, and brand imagery.
 * Replacing an image only requires dropping in a file into /public/images with the same filename.
 */
export const DEFAULT_PRODUCT_IMAGE = "/images/noir-box.jpg";

export const SITE_IMAGES = {
  logo: {
    src: "/images/logo.svg",
    alt: "Noir Scents Logo",
    width: 300,
    height: 80,
  },
  heroBanner: {
    src: "/images/noir-box.jpg",
    alt: "Noir Scents 50 ML Eau de Parfum Luxury Packaging Box",
    width: 1024,
    height: 1024,
  },
  promoBanner: {
    src: "/images/noir-box.jpg",
    alt: "Noir Scents Limited Edition Reserve",
    width: 1024,
    height: 1024,
  },
  categories: {
    men: {
      src: "/images/noir-box.jpg",
      alt: "Men's Luxury Fragrances - Noir Scents",
      width: 1024,
      height: 1024,
    },
    women: {
      src: "/images/noir-box.jpg",
      alt: "Women's Artisanal Perfumes - Noir Scents",
      width: 1024,
      height: 1024,
    },
    deals: {
      src: "/images/noir-box.jpg",
      alt: "Curated Bundles & Exclusive Deals - Noir Scents",
      width: 1024,
      height: 1024,
    },
    testers: {
      src: "/images/noir-box.jpg",
      alt: "Discovery Flights & Travel Testers - Noir Scents",
      width: 1024,
      height: 1024,
    },
  },
} as const;
