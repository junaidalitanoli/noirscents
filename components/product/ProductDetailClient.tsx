"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, Minus, Sparkles, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";
import { STORE_CONFIG } from "@/lib/store-config";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const totalPrice = selectedSize.price * quantity;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > selectedSize.price);
  const sizeLabel = product.sizeLabel || `${selectedSize.ml}ml`;

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
    <div className="space-y-5">
      {/* Price Display */}
      <div className="flex items-baseline gap-3 pt-2">
        <span className="text-2xl sm:text-3xl font-bold text-[#121212]">
          {formatPrice(selectedSize.price)}
        </span>
        {hasDiscount && product.compareAtPrice && (
          <span className="text-base text-zinc-400 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
        {hasDiscount && product.compareAtPrice && (
          <span className="text-xs font-semibold text-[#cc0000] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Sale &bull; Save {Math.round(((product.compareAtPrice - selectedSize.price) / product.compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      <p className="text-xs text-zinc-500 font-light">
        Taxes included. Free express delivery across Pakistan on orders of {formatPrice(STORE_CONFIG.freeDeliveryThreshold)} and above.
      </p>

      {/* Size Selector */}
      <div className="space-y-2 pt-2 border-t border-black/8">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
          Format: <span className="font-semibold text-zinc-900">{sizeLabel} ({STORE_CONFIG.perfumeType})</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((size, idx) => {
            const isSelected = selectedSizeIndex === idx;
            return (
              <button
                key={size.ml}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-zinc-300 bg-white text-zinc-800 hover:border-black"
                }`}
              >
                {product.sizeLabel || `${size.ml}ml Flacon`} &bull; {formatPrice(size.price)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Stepper */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
          Quantity
        </label>
        <div className="flex items-center w-36 border border-zinc-300 bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="flex-1 text-center font-semibold text-sm text-zinc-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Value Highlights unified with store-config */}
      <div className="py-2 space-y-1.5 text-xs text-zinc-700">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{STORE_CONFIG.returnWindowDays}-Day Easy Scent Exchange Policy</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Accurate Scent Profile &amp; {STORE_CONFIG.longevityText} Longevity</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{STORE_CONFIG.concentrationText} ({STORE_CONFIG.perfumeType})</span>
        </div>
      </div>

      {/* Action Buttons */}
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
              <Check className="w-4 h-4 text-white" /> Added to Cart!
            </>
          ) : (
            <>Add to cart &bull; {formatPrice(totalPrice)}</>
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
    </div>
  );
}
