/**
 * Central registry for site-wide banners, category tiles, and brand imagery.
 * Replacing an image only requires dropping in a file into /public/images with the same filename.
 */
export const DEFAULT_PRODUCT_IMAGE = "/images/noir-black-flacon.jpg";

export const SITE_IMAGES = {
  logo: {
    src: "/images/logo.svg",
    alt: "Noir Scent Logo",
    width: 300,
    height: 80,
  },
  heroBanner: {
    src: "/images/noir-light-hero.jpg",
    alt: "Noir Scent Luxury Extraits de Parfum Showcase",
    width: 1920,
    height: 1080,
  },
  heroBanners: {
    signature: {
      src: "/images/noir-light-hero.jpg",
      alt: "Noir Scent Luxury Extraits de Parfum Showcase",
      width: 1920,
      height: 1080,
    },
    aqua: {
      src: "/images/noir-hero-aqua.jpg",
      alt: "Desert Majesty Saffron & Desert Cedarwood Extrait",
      width: 1920,
      height: 1080,
    },
    rose: {
      src: "/images/noir-hero-rose.jpg",
      alt: "Loyal Heart Golden Amber & Floral Extraits",
      width: 1920,
      height: 1080,
    },
    bundles: {
      src: "/images/noir-hero-bundles.jpg",
      alt: "Curated Luxury Perfume Sets & Discovery Flights",
      width: 1920,
      height: 1080,
    },
  },
  promoBanner: {
    src: "/images/noir-hero-banner.jpg",
    alt: "Noir Scent Limited Edition Reserve",
    width: 1920,
    height: 1080,
  },
  categories: {
    men: {
      src: "/images/noir-black-flacon.jpg",
      alt: "Men's Black Edition Luxury Fragrances - Noir Scent",
      width: 1024,
      height: 1024,
    },
    women: {
      src: "/images/noir-gold-floral.jpg",
      alt: "Women's Gold Edition Artisanal Perfumes - Noir Scent",
      width: 1024,
      height: 1024,
    },
    deals: {
      src: "/images/noir-bundles.jpg",
      alt: "Curated Bundles & Exclusive Deals - Noir Scent",
      width: 1024,
      height: 1024,
    },
    testers: {
      src: "/images/noir-testers.jpg",
      alt: "Discovery Flights & Travel Testers - Noir Scent",
      width: 1024,
      height: 1024,
    },
  },
} as const;

