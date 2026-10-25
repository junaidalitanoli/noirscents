import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { getProductBySlug, getProductsByCategory, getAllProducts } from "@/lib/data";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { getAbsoluteUrl } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ImageGallery from "@/components/product/ImageGallery";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import ProductPerformanceMatrix from "@/components/product/ProductPerformanceMatrix";
import NotesPyramid from "@/components/product/NotesPyramid";
import ProductStoryAndApplication from "@/components/product/ProductStoryAndApplication";
import ProductReviewsSection from "@/components/product/ProductReviewsSection";
import MobileStickyBar from "@/components/product/MobileStickyBar";
import ProductCard from "@/components/product/ProductCard";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all known products
 */
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Generate metadata dynamically for each product
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const primaryImage = product.images?.[0] || DEFAULT_PRODUCT_IMAGE;
  const pageTitle = `${product.name} Extrait de Parfum | Noir Scent Pakistan`;
  const pageDescription = product.subtitle
    ? `${product.name} — ${product.subtitle}. Handcrafted artisanal Extrait de Parfum with 12+ hours sillage. Cash on Delivery across Pakistan.`
    : `Experience ${product.name} Extrait de Parfum in Pakistan. Artisanal luxury perfume with ${STORE_CONFIG.longevityText} longevity and Cash on Delivery nationwide.`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/products/${product.slug}`,
      siteName: "Noir Scent",
      images: [
        {
          url: primaryImage,
          width: 1024,
          height: 1024,
          alt: `${product.name} Extrait de Parfum bottle by Noir Scent`,
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category, excluding current product
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Category display label
  const categoryLabel =
    product.category === "men"
      ? "Men"
      : product.category === "women"
      ? "Women"
      : product.category === "deals"
      ? "Deals & Bundles"
      : "Testers";

  const ratingVal = product.rating || 4.9;
  const reviewCountVal = product.reviewCount || 148;

  // Schema.org JSON-LD
  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: getAbsoluteUrl(product.images?.[0] || DEFAULT_PRODUCT_IMAGE),
    brand: {
      "@type": "Brand",
      name: "Noir Scent",
    },
    sku: product.slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.sizes[0].price,
      availability: "https://schema.org/InStock",
      url: getAbsoluteUrl(`/products/${product.slug}`),
      seller: {
        "@type": "Organization",
        name: "Noir Scent",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingVal.toString(),
      reviewCount: reviewCountVal.toString(),
    },
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-12 sm:space-y-16">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Top Navigation: Breadcrumbs + Batch Cert Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-black/6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: categoryLabel, href: `/collections/${product.category}` },
            { label: product.name },
          ]}
        />
        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-600">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Batch #NS-2025 &bull; 45-Day Macerated &bull; Small Batch</span>
        </div>
      </div>

      {/* Main Hero Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Sticky Image Gallery with Zoom & Badges */}
        <div className="lg:col-span-7">
          <ImageGallery
            images={product.images}
            productName={product.name}
            badge={product.badge}
          />
        </div>

        {/* Right: Info & Purchase Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Collection & Category Sub-header */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#b48325] font-bold">
                Noir Scent Atelier &bull; {categoryLabel}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.14em] text-zinc-500 font-medium">
                {product.concentration || STORE_CONFIG.perfumeType}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121212]">
              {product.name}
            </h1>

            {/* Subtitle / Olfactory Characteristic (Scents 'n Stories style) */}
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
                {product.subtitle}
              </p>
            )}

            {/* Rating Stars & Customer Count */}
            <div className="flex items-center gap-2.5 mt-2.5 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-zinc-900 font-mono">
                {ratingVal} / 5.0
              </span>
              <span className="text-zinc-500 font-light">
                ({reviewCountVal} verified customer reviews in Pakistan)
              </span>
            </div>
          </div>

          {/* Quick Teaser / Summary */}
          <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light border-y border-black/8 py-3">
            <p className="line-clamp-3 hover:line-clamp-none transition-all">
              {product.description}
            </p>
          </div>

          {/* Client Purchase & Size Box Component */}
          <ProductDetailClient product={product} />
        </div>
      </div>

      {/* 2. SECTION: Olfactory Accords & Performance Matrix (Scents 'n Stories Catch 22 style) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
          <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider text-[#121212]">
            Fragrance Specs &amp; Performance
          </h2>
        </div>
        <ProductPerformanceMatrix product={product} />
      </section>

      {/* 3. SECTION: 3-Tier Olfactory Architecture (Notes Pyramid) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black" />
          <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider text-[#121212]">
            Fragrance Notes Breakdown
          </h2>
        </div>
        <NotesPyramid notes={product.notes} macerationDays={product.macerationDays} />
      </section>

      {/* 4. SECTION: The Story, Application Guide & FAQs */}
      <section className="space-y-4">
        <ProductStoryAndApplication product={product} />
      </section>

      {/* 5. SECTION: Customer Reviews & Ratings */}
      <section className="space-y-4">
        <ProductReviewsSection product={product} />
      </section>

      {/* 6. SECTION: Related Fragrances ("You May Also Like") */}
      {related.length > 0 && (
        <section className="pt-10 border-t border-black/8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#121212]">
                You May Also Like
              </h2>
              <p className="text-xs text-zinc-500 font-light mt-0.5">
                Handcrafted extraits sharing similar olfactory accords in {categoryLabel}.
              </p>
            </div>
            <Link
              href={`/collections/${product.category}`}
              className="text-xs font-semibold text-black hover:text-[#c5a059] flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Floating Sticky Checkout Bar */}
      <MobileStickyBar product={product} />
    </div>
  );
}
