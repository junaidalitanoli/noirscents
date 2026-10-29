import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { getProductBySlug, getProductsByCategory, getAllProducts } from "@/lib/data";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { getAbsoluteUrl } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
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
  const gender = product.category === "women" ? "Women" : product.category === "men" ? "Men" : "Men & Women";
  const pageTitle = `${product.name} Extrait de Parfum for ${gender} – 50ml | Noir Scent`;
  const pageDescription = `Buy ${product.name} Extrait de Parfum for ${gender} (50ml) in Pakistan. Handcrafted luxury fragrance with all-day sillage and nationwide Cash on Delivery.`;

  return {
    title: { absolute: pageTitle },
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

  // Schema.org JSON-LD
  const productImages =
    product.images && product.images.length > 0
      ? product.images.map((img) => getAbsoluteUrl(img))
      : [getAbsoluteUrl(DEFAULT_PRODUCT_IMAGE)];

  const isFreeDelivery = product.sizes[0].price >= STORE_CONFIG.freeDeliveryThreshold;

  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImages,
    brand: {
      "@type": "Brand",
      name: "Noir Scent",
    },
    sku: product.slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.sizes[0].price,
      availability:
        (product.stock === undefined || product.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: getAbsoluteUrl(`/products/${product.slug}`),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Noir Scent",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: isFreeDelivery ? 0 : STORE_CONFIG.standardShippingFee,
          currency: "PKR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PK",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "PK",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: STORE_CONFIG.returnWindowDays,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-12 sm:space-y-16">
      {/* Product JSON-LD */}
      <JsonLd data={productJsonLd} />

      {/* Top Navigation: Breadcrumbs + Batch Cert Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-black/6 dark:border-white/10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: categoryLabel, href: `/collections/${product.category}` },
            { label: product.name },
          ]}
        />
        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059] dark:text-[#d4af37]" />
          <span>{product.macerationDays ? `${product.macerationDays}-Day Macerated • ` : ""}Small Batch</span>
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#b48325] dark:text-[#d4af37] font-bold">
                Noir Scent Atelier &bull; {categoryLabel}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400 font-medium">
                {product.concentration || STORE_CONFIG.perfumeType}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-[#121212] dark:text-[#f4f4f5]">
              {product.name}
            </h1>

            {/* Subtitle / Olfactory Characteristic (Scents 'n Stories style) */}
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                {product.subtitle}
              </p>
            )}


          </div>

          {/* Quick Teaser / Summary (1-2 sentences) */}
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light border-y border-black/8 dark:border-white/10 py-3">
            <p>
              {product.shortDescription ||
                (product.description.includes(". ")
                  ? product.description.split(". ").slice(0, 2).join(". ") + "."
                  : product.description)}
            </p>
          </div>

          {/* Client Purchase & Size Box Component */}
          <ProductDetailClient product={product} />
        </div>
      </div>

      {/* 2. SECTION: Olfactory Accords & Performance Matrix (Scents 'n Stories Catch 22 style) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
          <h2 className="text-base sm:text-xl font-serif font-medium uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
            Fragrance Specs &amp; Performance
          </h2>
        </div>
        <ProductPerformanceMatrix product={product} />
      </section>

      {/* 3. SECTION: 3-Tier Olfactory Architecture (Notes Pyramid) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black dark:bg-[#d4af37]" />
          <h2 className="text-base sm:text-xl font-serif font-medium uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
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
        <section className="pt-10 border-t border-black/8 dark:border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-medium uppercase tracking-tight text-[#121212] dark:text-[#f4f4f5]">
                You May Also Like
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                Handcrafted extraits sharing similar olfactory accords in {categoryLabel}.
              </p>
            </div>
            <Link
              href={`/collections/${product.category}`}
              className="text-xs font-semibold text-black dark:text-[#d4af37] hover:text-[#c5a059] dark:hover:text-[#f5e7b2] flex items-center gap-1 transition-colors uppercase tracking-wider"
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
