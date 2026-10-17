import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductsByCategory } from "@/lib/data";
import { CATEGORIES, BRAND_NAME } from "@/lib/constants";
import { Category } from "@/types";
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

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) {
    return {
      title: "Collection Not Found",
    };
  }

  if (category === "all") {
    return {
      title: `All Products | ${BRAND_NAME}`,
      description: `Explore all handcrafted luxury Extraits de Parfum by ${BRAND_NAME}. High projection perfumes in Pakistan.`,
    };
  }

  const cat = CATEGORIES.find((c) => c.slug === category);

  return {
    title: `${cat?.label || category} Collection | ${BRAND_NAME}`,
    description: `${cat?.description || "Shop luxury fragrances"} with Cash on Delivery in Pakistan from ${BRAND_NAME}.`,
    openGraph: {
      title: `${cat?.label || category} Fragrances | ${BRAND_NAME}`,
      description: cat?.description,
      url: `https://noir-scents.pk/collections/${category}`,
    },
    alternates: {
      canonical: `https://noir-scents.pk/collections/${category}`,
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

  const title = isAll ? "All Products" : `${catMeta?.label || category} Collection`;
  const description = isAll
    ? "Explore our entire catalogue of handcrafted Extraits de Parfum, discovery sample flights, and exclusive value bundles."
    : catMeta?.description || "";

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/all" },
          { label: isAll ? "All Products" : catMeta?.label || category },
        ]}
      />

      {/* Dawn-style Collection Banner */}
      <div className="py-6 sm:py-8 mb-6 border-b border-black/8">
        <h1 className="text-2xl sm:text-4xl font-semibold uppercase tracking-tight text-[#121212]">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-2xl font-light">
            {description}
          </p>
        )}
      </div>

      {/* Product Grid with Breakpoint Column Rules */}
      <ProductGrid products={products} />
    </div>
  );
}
