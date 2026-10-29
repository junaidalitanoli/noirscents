import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductsByCategory } from "@/lib/data";
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
    title: "All Artisanal Extrait Perfumes in Pakistan | Noir Scent",
    description:
      "Explore our entire catalogue of handcrafted artisanal Extrait de Parfum, sample sets, and bundles with Cash on Delivery in Pakistan.",
    intro:
      "Explore our full catalogue of handcrafted artisanal extraits. Each fragrance is formulated as a concentrated Extrait de Parfum engineered for enduring sillage across Pakistan. Enjoy convenient nationwide Cash on Delivery with free delivery on orders of Rs. 3,000 and above.",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  men: {
    title: "Men's Extrait Perfumes in Pakistan | Noir Scent",
    description:
      "Shop long-lasting masculine extrait perfumes in Pakistan. Handcrafted woody, spicy, and smoky notes with all-day sillage and nationwide Cash on Delivery.",
    intro:
      "Designed for the charismatic modern man, our men's collection features bold woody accords, smoldering ouds, and revitalizing fresh notes. Formulated to triumph over Pakistan's climate, these extraits project with distinguished authority and enduring presence. Order with seamless Cash on Delivery across Karachi, Lahore, Islamabad, and nationwide.",
    image: SITE_IMAGES.categories.men.src,
  },
  women: {
    title: "Women's Extrait Perfumes in Pakistan | Noir Scent",
    description:
      "Discover enchanting floral, amber, and gourmand extrait perfumes for women in Pakistan. High fragrance oil concentration with graceful projection.",
    intro:
      "Envelop yourself in velvet floral bouquets, warm Madagascar ambers, and decadent gourmand trails crafted exclusively for women. Each artisanal extrait melts into the skin for graceful, enduring projection. Dispatched nationwide with 2–4 business days delivery and a 7-day scent exchange guarantee.",
    image: SITE_IMAGES.categories.women.src,
  },
  testers: {
    title: "Perfume Discovery Sets & Testers in Pakistan | Noir Scent",
    description:
      "Sample luxury perfumes with our discovery sets and travel testers in Pakistan. Experience signature artisanal extraits before choosing a full bottle.",
    intro:
      "Uncertain which fragrance best complements your skin chemistry? Our discovery sets and travel spray atomizers let you experience our most celebrated extraits at home before choosing a full bottle. Each sample flight features concentrated extrait formulations and includes complimentary smelling strips.",
    image: SITE_IMAGES.categories.testers.src,
  },
  deals: {
    title: "Perfume Bundles & Offers in Pakistan | Noir Scent",
    description:
      "Curated fragrance bundles, duo packs, and clearance specials at exceptional value. Free delivery across Pakistan on orders of Rs. 3,000 and above.",
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
      title: { absolute: "Collection Not Found | Noir Scent" },
    };
  }

  const meta = COLLECTION_METADATA[category] || COLLECTION_METADATA.all;

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: `/collections/${category}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/collections/${category}`,
      siteName: "Noir Scent",
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: meta.title,
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
  const products = isAll
    ? getAllProducts()
    : getProductsByCategory(category as Category);

  const meta = COLLECTION_METADATA[category] || COLLECTION_METADATA.all;
  const breadcrumbLabel =
    category === "men"
      ? "Men"
      : category === "women"
      ? "Women"
      : category === "testers"
      ? "Testers"
      : category === "deals"
      ? "Bundles & Offers"
      : "All Fragrances";

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

      {/* Collection Banner with 2-3 sentence intro */}
      <div className="py-6 sm:py-8 mb-6 border-b border-black/8 dark:border-white/10 space-y-3">
        <h1 className="text-2xl sm:text-4xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl font-light leading-relaxed">
          {meta.intro}
        </p>
      </div>

      {/* Product Grid with Breakpoint Column Rules */}
      <ProductGrid products={products} />
    </div>
  );
}
