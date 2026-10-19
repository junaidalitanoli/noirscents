import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductsByCategory } from "@/lib/data";
import { CATEGORIES } from "@/lib/constants";
import { Category } from "@/types";
import { DEFAULT_PRODUCT_IMAGE, SITE_IMAGES } from "@/lib/images";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface CollectionPageProps {
  params: Promise<{
    category: string;
  }>;
}

const VALID_CATEGORIES = ["all", "men", "women", "testers", "deals"];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}

const COLLECTION_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    intro: string;
    image: string;
  }
> = {
  all: {
    title: "All Handcrafted Extrait Perfumes",
    description:
      "Explore our entire catalogue of handcrafted non-alcoholic Extrait de Parfum, sample sets, and bundles with Cash on Delivery in Pakistan.",
    intro:
      "Explore our full catalogue of handcrafted artisanal extraits. Each fragrance is formulated with 35% oil concentration and 100% non-alcoholic bases for 8–12+ hours of endurance across Pakistan. Enjoy convenient nationwide Cash on Delivery with free delivery on orders above Rs. 3,000.",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  men: {
    title: "Men's Perfumes in Pakistan",
    description:
      "Shop long-lasting masculine extrait perfumes in Pakistan. Bold woody, spicy, and fresh notes crafted for 8–12+ hours sillage.",
    intro:
      "Designed for the charismatic modern man, our men's collection features bold woody accords, smoldering ouds, and revitalizing fresh notes. Formulated to triumph over Pakistan's climate, these extraits project with distinguished authority for 8–12+ hours. Order with seamless Cash on Delivery across Karachi, Lahore, Islamabad, and nationwide.",
    image: SITE_IMAGES.categories.men.src,
  },
  women: {
    title: "Women's Perfumes in Pakistan",
    description:
      "Discover enchanting floral, amber, and gourmand extrait perfumes for women in Pakistan. 100% non-alcoholic with graceful projection.",
    intro:
      "Envelop yourself in velvet floral bouquets, warm Madagascar ambers, and decadent gourmand trails crafted exclusively for women. Each non-alcoholic extrait melts into the skin for 8–12+ hours of graceful, sophisticated projection. Dispatched nationwide with 2–4 business days delivery and a 7-day scent exchange guarantee.",
    image: SITE_IMAGES.categories.women.src,
  },
  testers: {
    title: "Perfume Discovery Sets & Testers",
    description:
      "Sample luxury perfumes with our discovery sets and travel testers. Find your signature extrait fragrance before ordering full bottles.",
    intro:
      "Uncertain which fragrance best complements your skin chemistry? Our discovery sets and travel spray atomizers let you experience our most celebrated extraits at home before choosing a full bottle. Each sample flight features genuine 35% oil concentration and includes complimentary smelling strips.",
    image: SITE_IMAGES.categories.testers.src,
  },
  deals: {
    title: "Perfume Bundles & Deals in Pakistan",
    description:
      "Curated fragrance bundles, duo packs, and clearance specials at exceptional value. Free delivery across Pakistan over Rs. 3,000.",
    intro:
      "Maximize your fragrance value with our curated multi-bottle duos, couple pairings, and limited-run promotional sets. Whether refreshing your seasonal rotation or gifting someone special, our bundles deliver exceptional artisanal quality at unmatched savings. Dispatched nationwide with Cash on Delivery.",
    image: SITE_IMAGES.categories.deals.src,
  },
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) {
    return {
      title: "Collection Not Found",
    };
  }

  const meta = COLLECTION_METADATA[category] || COLLECTION_METADATA.all;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/collections/${category}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/collections/${category}`,
      siteName: "Noir Scents",
      images: [
        {
          url: meta.image,
          width: 1024,
          height: 1024,
          alt: `${meta.title} by Noir Scents`,
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const isAll = category === "all";
  const catMeta = CATEGORIES.find((c) => c.slug === category);
  const products = isAll
    ? getAllProducts()
    : getProductsByCategory(category as Category);

  const meta = COLLECTION_METADATA[category] || COLLECTION_METADATA.all;
  const label = isAll ? "All Products" : catMeta?.label || category;

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <Breadcrumbs items={[{ label }]} />

      {/* Collection Banner with 2-3 sentence intro */}
      <div className="py-6 sm:py-8 mb-6 border-b border-black/8 space-y-3">
        <h1 className="text-2xl sm:text-4xl font-semibold uppercase tracking-tight text-[#121212]">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-3xl font-light leading-relaxed">
          {meta.intro}
        </p>
      </div>

      {/* Product Grid with Breakpoint Column Rules */}
      <ProductGrid products={products} />
    </div>
  );
}
