import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Truck, RotateCcw, Droplets, Star, HelpCircle } from "lucide-react";
import { getProductBySlug, INITIAL_PRODUCTS, getProductsByCategory } from "@/lib/data";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { getAbsoluteUrl } from "@/lib/site";
import { STORE_CONFIG } from "@/lib/store-config";
import ImageGallery from "@/components/product/ImageGallery";
import NotesPyramid from "@/components/product/NotesPyramid";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

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
  const pageTitle = `${product.name} Extrait de Parfum`;
  const pageDescription = `Experience ${product.name} Extrait de Parfum in Pakistan. Non-alcoholic luxury perfume with ${STORE_CONFIG.longevityText} longevity and Cash on Delivery nationwide.`;

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
      siteName: "Noir Scents",
      images: [
        {
          url: primaryImage,
          width: 1024,
          height: 1024,
          alt: `${product.name} 50ml Extrait de Parfum bottle by Noir Scents`,
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
  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: getAbsoluteUrl(product.images?.[0] || DEFAULT_PRODUCT_IMAGE),
    brand: {
      "@type": "Brand",
      name: "Noir Scents",
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
        name: "Noir Scents",
      },
    },
  };

  // Only include aggregateRating if real review data exists
  if (product.rating && product.reviewCount) {
    productJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
    };
  }

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: categoryLabel, href: `/collections/${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mt-6 items-start">
        {/* Left: Sticky Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500 font-semibold mb-1">
              Noir Scents &bull; {STORE_CONFIG.perfumeType}
            </p>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#121212]">
              {product.name}
            </h1>

            {/* Rating Stars: render only if honest review data exists */}
            {product.rating && product.reviewCount ? (
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-zinc-900">{product.rating} / 5.0</span>
                <span className="text-zinc-500">({product.reviewCount} customer reviews)</span>
              </div>
            ) : null}
          </div>

          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal space-y-3">
            <p>{product.description}</p>
          </div>

          {/* Client Buy Box Component */}
          <ProductDetailClient product={product} />

          {/* Pakistan Delivery Banner */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 text-xs space-y-1.5 text-zinc-600">
            <div className="flex items-center gap-2 font-semibold text-zinc-900">
              <Truck className="w-4 h-4 text-[#121212]" />
              Express Delivery Across Pakistan
            </div>
            <p>
              Dispatched via {STORE_CONFIG.couriers} within 24 hours. Expected delivery is {STORE_CONFIG.deliveryTime} with Cash on Delivery nationwide.
            </p>
          </div>
        </div>
      </div>

      {/* Fragrance Notes Breakdown Accordion / Section */}
      <div className="mt-14 sm:mt-20 pt-10 border-t border-black/8">
        <div className="max-w-3xl">
          <h2 className="text-lg sm:text-xl font-semibold uppercase tracking-wider text-[#121212] mb-4">
            Olfactory Profile &amp; Notes
          </h2>
          <NotesPyramid notes={product.notes} />
        </div>
      </div>

      {/* How to Wear It & Shipping/Returns Blocks */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* How to Wear It Block */}
        <div className="p-6 bg-[#fafafa] border border-black/8 space-y-3">
          <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm uppercase tracking-wider">
            <Droplets className="w-4 h-4 text-[#c5a059]" />
            <h3>How to Wear It</h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
            Due to our high {STORE_CONFIG.concentrationText}, apply 2–3 sprays directly onto warm pulse points: the base of the throat, inner wrists, and behind the ears. Since our formula is 100% non-alcoholic and oil-rich, spritzing collarbones or fabric also ensures a radiant {STORE_CONFIG.longevityText} scent trail throughout Pakistani summers and winter evenings.
          </p>
        </div>

        {/* Shipping & Returns Block */}
        <div className="p-6 bg-[#fafafa] border border-black/8 space-y-3">
          <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm uppercase tracking-wider">
            <RotateCcw className="w-4 h-4 text-[#c5a059]" />
            <h3>Shipping &amp; Returns</h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
            We deliver nationwide across Pakistan in {STORE_CONFIG.deliveryTime} with Cash on Delivery (COD). Free delivery is included on orders of Rs. {STORE_CONFIG.freeDeliveryThreshold.toLocaleString()} and above. Every full-bottle purchase is backed by our {STORE_CONFIG.returnWindowDays}-day easy scent swap policy if the fragrance does not match your taste.
          </p>
        </div>
      </div>

      {/* Product Specific FAQ Section */}
      <div className="mt-12 p-6 sm:p-8 bg-white border border-black/8 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-black/8">
          <HelpCircle className="w-4 h-4 text-[#c5a059]" />
          <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#121212]">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600">
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">Is Cash on Delivery available?</h4>
            <p className="font-light leading-relaxed">
              Yes, Cash on Delivery (COD) is supported across all cities and towns in Pakistan.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">How long will this bottle last?</h4>
            <p className="font-light leading-relaxed">
              Our concentrated Extrait de Parfum delivers {STORE_CONFIG.longevityText} of projection on skin and garments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">Is this scent non-alcoholic?</h4>
            <p className="font-light leading-relaxed">
              Yes, formulated with non-alcoholic perfume oil bases, making it suitable for daily prayer and non-drying on skin. We recommend a patch test before regular use if you have sensitive skin.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">What if I want to exchange it?</h4>
            <p className="font-light leading-relaxed">
              Notify our WhatsApp team within {STORE_CONFIG.returnWindowDays} days of receiving your order to arrange a smooth fragrance exchange.
            </p>
          </div>
        </div>
      </div>

      {/* Related Fragrances ("You May Also Like") */}
      {related.length > 0 && (
        <div className="mt-14 sm:mt-20 pt-10 border-t border-black/8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-black/8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold uppercase tracking-tight text-[#121212]">
                You May Also Like
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Handcrafted fragrances sharing similar olfactory characteristics.
              </p>
            </div>
            <Link
              href={`/collections/${product.category}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#121212] hover:underline underline-offset-4"
            >
              View collection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
