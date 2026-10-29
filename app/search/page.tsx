import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { searchProducts, INITIAL_PRODUCTS } from "@/lib/data";
import { BRAND_NAME } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const pageTitle = query ? `Search: "${query}"` : "Search Fragrances";
  const pageDescription = query
    ? `Discover handcrafted artisanal perfumes matching "${query}" at ${BRAND_NAME} with Cash on Delivery across Pakistan.`
    : `Search our catalogue of handcrafted artisanal Extrait de Parfum creations in Pakistan from ${BRAND_NAME}.`;
  const canonicalUrl = query ? `/search?q=${encodeURIComponent(query)}` : "/search";

  return {
    title: pageTitle,
    description: pageDescription,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: "/search",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "Noir Scent",
      images: [
        {
          url: DEFAULT_PRODUCT_IMAGE,
          width: 1024,
          height: 1024,
          alt: "Noir Scent Search Directory",
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [DEFAULT_PRODUCT_IMAGE],
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const results = query ? searchProducts(query) : [];
  const recommended = INITIAL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <Breadcrumbs
        items={[
          { label: "Search" },
          { label: query ? `"${query}"` : "All Fragrances" },
        ]}
      />

      <div className="mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xs font-bold uppercase tracking-wider text-[#b48325] dark:text-[#d4af37]">
          Perfume Search Directory
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-zinc-950 dark:text-[#f4f4f5] mt-1">
          {query ? (
            <>
              Search Results for <span className="text-amber-900 dark:text-[#f5e7b2]">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Browse Fragrances"
          )}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {query
            ? `Found ${results.length} fragrance match${results.length === 1 ? "" : "es"}.`
            : "Type a perfume name, note, or scent profile in the search bar above."}
        </p>
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="space-y-12">
          <div className="bg-zinc-50 dark:bg-[#111115] rounded-2xl border border-zinc-200 dark:border-white/10 p-8 sm:p-12 text-center max-w-xl mx-auto transition-colors">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-[#d4af37] mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-xl font-medium text-zinc-900 dark:text-zinc-100">
              No direct scent match found
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Try searching for common accords like &ldquo;Oud&rdquo;, &ldquo;Rose&rdquo;, &ldquo;Amber&rdquo;, or &ldquo;Bergamot&rdquo;, or explore our curated collections below.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Oud", "Rose", "Amber", "Citrus", "Vanilla", "Leather"].map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-white dark:bg-[#181820] border border-zinc-300 dark:border-zinc-700 rounded-full text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-[#d4af37] dark:hover:border-[#d4af37] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <h2 className="font-serif text-xl font-medium text-zinc-950 dark:text-[#f4f4f5]">
                Recommended Best Sellers
              </h2>
            </div>
            <ProductGrid products={recommended} />
          </div>
        </div>
      )}
    </div>
  );
}
