import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductsByCategory } from "@/lib/data";
import { Category } from "@/types";
import { DEFAULT_PRODUCT_IMAGE, SITE_IMAGES } from "@/lib/images";
import ProductGrid from "@/components/product/ProductGrid";
import CollectionHeroBanner from "@/components/collection/CollectionHeroBanner";
import CollectionComingSoon from "@/components/collection/CollectionComingSoon";

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
    image: string;
  }
> = {
  all: {
    title: "The Complete Extrait de Parfum Collection | Noir Scent",
    description:
      "Explore our entire portfolio of 13 handcrafted artisanal Extrait de Parfum creations with all-day sillage and nationwide Cash on Delivery in Pakistan.",
    image: DEFAULT_PRODUCT_IMAGE,
  },
  men: {
    title: "Men's Extrait Perfumes in Pakistan | Noir Scent",
    description:
      "Shop 8 signature masculine extrait perfumes in Pakistan. Handcrafted woody, smoky oud, and fresh notes with all-day sillage and nationwide Cash on Delivery.",
    image: SITE_IMAGES.categories.men.src,
  },
  women: {
    title: "Women's Extrait Perfumes in Pakistan | Noir Scent",
    description:
      "Discover 5 enchanting floral, pear, and amber extrait perfumes for women in Pakistan. 35% pure oil concentration with nationwide Cash on Delivery.",
    image: SITE_IMAGES.categories.women.src,
  },
  testers: {
    title: "Perfume Discovery Sets & Testers in Pakistan | Noir Scent",
    description:
      "Sample luxury perfumes with our discovery flights and travel atomizers in Pakistan. Experience signature artisanal extraits before acquiring a full bottle.",
    image: SITE_IMAGES.categories.testers.src,
  },
  deals: {
    title: "Perfume Bundles & Offers in Pakistan | Noir Scent",
    description:
      "Curated fragrance duos, couple pairings, and limited-run reserve sets at exceptional value. Free delivery across Pakistan on orders of Rs. 3,000 and above.",
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

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      {/* 1. Luminous Luxury Collection Hero Banner with Flacon Showcase */}
      <CollectionHeroBanner category={category} count={products.length} />

      {/* 2. Content: Product Grid OR Haute Parfumerie Coming Soon Notice */}
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <CollectionComingSoon category={category} />
      )}
    </div>
  );
}
