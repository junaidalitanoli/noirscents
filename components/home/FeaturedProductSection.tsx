"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Check, Sparkles, ChevronDown } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface FeaturedProductSectionProps {
  product: Product;
}

export default function FeaturedProductSection({ product }: FeaturedProductSectionProps) {
  const router = useRouter();
  const { addItem, openCart } = useCartStore();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const uniqueImages = Array.from(new Set((product.images || []).filter(Boolean)));
  const displayImages = uniqueImages.length > 0 ? uniqueImages : [DEFAULT_PRODUCT_IMAGE];
  const hasMultipleImages = displayImages.length > 1;
  const currentImage = displayImages[selectedImageIndex] || displayImages[0] || DEFAULT_PRODUCT_IMAGE;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > selectedSize.price;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setIsAdded(true);
    openCart();
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, quantity);
    router.push("/checkout");
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-black/8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Product Image Gallery (1:1 ratio) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-[#f4f4f5] overflow-hidden border border-black/6">
              <Image
                src={currentImage}
                alt={`${product.name} - Noir Scents Eau de Parfum`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-300"
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-[#cc0000] text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Sale
                </span>
              )}
            </div>

            {/* Thumbnail selector (hidden when images are identical) */}
            {hasMultipleImages && (
              <div className="flex items-center gap-3">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 bg-[#f4f4f5] border transition-all ${
                      selectedImageIndex === idx
                        ? "border-black ring-1 ring-black"
                        : "border-zinc-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Noir Scents Eau de Parfum thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Buy Box Column */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500 font-semibold mb-1">
                Noir Scents
              </p>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#121212]">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-zinc-700">4.9 / 5.0</span>
                <span className="text-zinc-400 text-xs">(128 customer reviews)</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#121212]">
                {formatPrice(selectedSize.price)} PKR
              </span>
              {hasDiscount && (
                <span className="text-base sm:text-lg text-zinc-400 line-through">
                  {formatPrice(product.compareAtPrice!)} PKR
                </span>
              )}
              {hasDiscount && (
                <span className="text-xs font-semibold text-[#cc0000] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  Save {Math.round(((product.compareAtPrice! - selectedSize.price) / product.compareAtPrice!) * 100)}%
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Size Variant Selector */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                Size: <span className="font-semibold text-zinc-900">{selectedSize.ml}ml Flacon (Eau de Parfum)</span>
              </label>
              <div className="flex items-center gap-3">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size.ml}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedSizeIndex === idx
                        ? "border-black bg-black text-white"
                        : "border-zinc-300 bg-white text-zinc-800 hover:border-black"
                    }`}
                  >
                    {size.ml}ml Flacon &bull; {formatPrice(size.price)} PKR
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                Quantity
              </label>
              <div className="flex items-center w-36 border border-zinc-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="flex-1 text-center font-semibold text-sm text-zinc-900">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Trust Bullet Points (Matches BuyFunoon Jamal feature) */}
            <div className="py-2 space-y-1.5 text-xs text-zinc-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>14 days Easy Return Policy</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Accurate Scent Profile &amp; High Projection</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>25% to 30% Pure Extrait Concentration</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-[#121212] hover:bg-black text-white active:scale-[0.99]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>Add to cart &bull; {formatPrice(selectedSize.price * quantity)} PKR</>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 text-black border border-zinc-300 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                Buy It Now (Cash on Delivery)
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-zinc-200 pt-4 space-y-2">
              <div className="border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setOpenNotes(!openNotes)}
                  className="w-full px-4 py-3 bg-zinc-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-900"
                >
                  <span>Fragrance Notes &amp; Pyramid</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openNotes ? "rotate-180" : ""}`} />
                </button>
                {openNotes && (
                  <div className="p-4 bg-white text-xs space-y-2 text-zinc-600 border-t border-zinc-100">
                    <p><strong>Top Notes:</strong> {product.notes.top.join(", ")}</p>
                    <p><strong>Heart Notes:</strong> {product.notes.heart.join(", ")}</p>
                    <p><strong>Base Notes:</strong> {product.notes.base.join(", ")}</p>
                  </div>
                )}
              </div>

              <div className="border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setOpenShipping(!openShipping)}
                  className="w-full px-4 py-3 bg-zinc-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-900"
                >
                  <span>Shipping &amp; Delivery across Pakistan</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openShipping ? "rotate-180" : ""}`} />
                </button>
                {openShipping && (
                  <div className="p-4 bg-white text-xs space-y-1.5 text-zinc-600 border-t border-zinc-100">
                    <p>Free delivery on all orders over Rs. 4,999.</p>
                    <p>Dispatched via TCS / Leopards Courier in 24 hours. Delivery takes 2–4 business days with Cash on Delivery nationwide.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
