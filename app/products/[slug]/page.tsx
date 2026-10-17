import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Star } from "lucide-react";
import { getProductBySlug, INITIAL_PRODUCTS, getProductsByCategory } from "@/lib/data";
import { BRAND_NAME } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
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

  return {
    title: `${product.name} Extrait de Parfum | ${BRAND_NAME}`,
    description: `${product.description} Buy online with Cash on Delivery in Pakistan from ${BRAND_NAME}.`,
    openGraph: {
      title: `${product.name} | ${BRAND_NAME}`,
      description: product.description,
      url: `https://noir-scents.pk/products/${product.slug}`,
      images: [
        {
          url: primaryImage,
          width: 1024,
          height: 1024,
          alt: `${product.name} - Noir Scents Eau de Parfum`,
        },
      ],
    },
    alternates: {
      canonical: `https://noir-scents.pk/products/${product.slug}`,
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

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://noir-scents.pk/products/${product.slug}/#product`,
        name: product.name,
        description: product.description,
        image: `https://noir-scents.pk${product.images?.[0] || DEFAULT_PRODUCT_IMAGE}`,
        brand: {
          "@type": "Brand",
          name: BRAND_NAME,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "PKR",
          price: product.sizes[0].price,
          availability: "https://schema.org/InStock",
          url: `https://noir-scents.pk/products/${product.slug}`,
          seller: {
            "@type": "Organization",
            name: BRAND_NAME,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "87",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://noir-scents.pk",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.category,
            item: `https://noir-scents.pk/collections/${product.category}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `https://noir-scents.pk/products/${product.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: product.category.toUpperCase(), href: `/collections/${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Showcase Section (2-Column Dawn Archetype) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mt-6 items-start">
        {/* Left: Sticky Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500 font-semibold mb-1">
              Noir Scents
            </p>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#121212]">
              {product.name}
            </h1>

            {/* Rating Stars & Reviews */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-zinc-900">4.9 / 5.0</span>
              <span className="text-zinc-500">(87 customer reviews)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Client Buy Box Component */}
          <ProductDetailClient product={product} />

          {/* Pakistan Delivery Banner */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 text-xs space-y-1.5 text-zinc-600">
            <div className="flex items-center gap-2 font-semibold text-zinc-900">
              <Truck className="w-4 h-4 text-[#121212]" />
              Express Delivery Across Pakistan
            </div>
            <p>
              Orders are dispatched via TCS / Leopards Courier in 24 hours. Expected delivery is 2–4 business days with Cash on Delivery nationwide.
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
