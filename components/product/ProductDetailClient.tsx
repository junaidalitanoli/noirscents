"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Minus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
  MessageCircle,
  Gift,
} from "lucide-react";
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
  const [isNavigatingCOD, setIsNavigatingCOD] = useState(false);
  const { addItem, openCart } = useCartStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const totalPrice = selectedSize.price * quantity;

  // Comparison pricing: Only show compare-at price if it actually exists in data
  const baseCompareAt = product.compareAtPrice;
  const hasDiscount = Boolean(baseCompareAt && baseCompareAt > selectedSize.price);
  const savingsAmount = hasDiscount && baseCompareAt ? baseCompareAt - selectedSize.price : 0;
  const savingsPercent = hasDiscount && baseCompareAt
    ? Math.round((savingsAmount / baseCompareAt) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setIsAdded(true);
    openCart();
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNowCOD = () => {
    setIsNavigatingCOD(true);
    addItem(product, selectedSize, quantity);
    setTimeout(() => {
      router.push("/checkout");
    }, 280);
  };

  // Build WhatsApp quick order URL
  const whatsappText = encodeURIComponent(
    `Hello Noir Scent! I want to order "${product.name}" (${selectedSize.ml}ml - ${formatPrice(selectedSize.price * quantity)}, Qty: ${quantity}) via Cash on Delivery. Please confirm my order.`
  );
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappText}`;

  return (
    <div className="space-y-6 pt-2">
      {/* Stock & Badge Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#fbf9f4] dark:bg-[#15151a] border border-[#e8dfcf] dark:border-white/10 text-xs transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>In Stock — Handcrafted Extrait</span>
        </div>
        {product.badge && (
          <div className="flex items-center gap-1 text-[#b48325] dark:text-[#d4af37] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{product.badge}</span>
          </div>
        )}
      </div>

      {/* Main Price & Savings Display */}
      <div className="space-y-1.5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#121212] dark:text-[#f4f4f5] tracking-tight">
            {formatPrice(selectedSize.price)}
          </span>
          {hasDiscount && baseCompareAt && (
            <span className="text-lg text-zinc-400 dark:text-zinc-500 line-through">
              {formatPrice(baseCompareAt)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-amber-950/40 border border-red-200 dark:border-amber-700/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Save {formatPrice(savingsAmount)} ({savingsPercent}% OFF)
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
          Doorstep Cash on Delivery (COD) available across 250+ Pakistani cities.
        </p>
      </div>

      {/* Size / Bottle Format Selector (Variants supported dynamically) */}
      {product.sizes.length > 1 ? (
        <div className="space-y-2.5 pt-2 border-t border-black/8 dark:border-white/10">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Select Variant / Format:
            </label>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {selectedSize.label || `${selectedSize.ml}ml`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.sizes.map((size, idx) => {
              const isSelected = selectedSizeIndex === idx;
              const isOutOfStock = size.stock !== undefined && size.stock <= 0;
              const sizeTitle =
                size.label ||
                (size.ml === 5
                  ? "5ml Discovery Vial"
                  : size.ml === 10
                  ? "10ml Travel Spray"
                  : `${size.ml}ml Artisanal Flacon`);

              return (
                <button
                  key={`${size.ml}-${idx}`}
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`p-3.5 border text-left transition-all relative rounded-xl flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "border-black dark:border-[#d4af37] bg-[#121212] dark:bg-[#18181d] text-white shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121216] text-zinc-800 dark:text-zinc-200 hover:border-[#c5a059] dark:hover:border-[#d4af37] hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
                  } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div>
                    <div className="flex items-center justify-between font-semibold text-xs mb-1">
                      <span>{sizeTitle}</span>
                      <span className="font-mono">{formatPrice(size.price)}</span>
                    </div>
                    <p
                      className={`text-[11px] font-light ${
                        isSelected ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {isOutOfStock ? "Currently Sold Out" : "Pure Extrait de Parfum"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="pt-2 border-t border-black/8 dark:border-white/10 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-zinc-500 dark:text-zinc-400">
            Presentation:
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {product.sizeLabel || "50ml"} Artisanal Extrait Flacon
          </span>
        </div>
      )}

      {/* Quantity Stepper & Subtotal */}
      <div className="flex items-center justify-between pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Quantity:
        </label>
        <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#121216] rounded-xl overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center font-bold text-xs text-zinc-900 dark:text-zinc-100">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Action CTA Buttons (Clear single primary + WhatsApp secondary) */}
      <div className="space-y-3 pt-3">
        {/* Primary CTA: ORDER WITH CASH ON DELIVERY (Min 48px touch target) */}
        <button
          type="button"
          onClick={handleBuyNowCOD}
          disabled={isNavigatingCOD}
          id="product-buy-now-cod-btn"
          className={`w-full min-h-[48px] py-4 px-6 rounded-xl bg-[#121212] hover:bg-black dark:bg-[#d4af37] dark:hover:bg-[#e5c158] text-white dark:text-[#09090b] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.98] shadow-md border border-black dark:border-[#d4af37] cursor-pointer group ${
            isNavigatingCOD ? "opacity-90 scale-[0.99] ring-2 ring-[#d4af37]" : ""
          }`}
        >
          {isNavigatingCOD ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white dark:border-[#09090b] border-t-transparent rounded-full animate-spin" />
              <span>Securing Your Flacon...</span>
            </span>
          ) : (
            <>
              <Zap className="w-4 h-4 text-[#c5a059] fill-[#c5a059] dark:text-[#09090b] dark:fill-[#09090b] group-hover:scale-110 transition-transform" />
              <span>Order with Cash on Delivery &bull; {formatPrice(totalPrice)}</span>
            </>
          )}
        </button>

        {/* WhatsApp Secondary CTA (Min 44px touch target) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="product-whatsapp-order-btn"
          className="w-full min-h-[44px] py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#4ade80] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#25D366]/30 transition-all rounded-xl"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366] dark:text-[#4ade80] dark:fill-[#4ade80]" />
          <span>Order via WhatsApp Concierge</span>
        </a>

        {/* Subtle option to add to cart for multi-bottle buyers */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            id="product-add-to-cart-btn"
            className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-[#d4af37] underline underline-offset-4 cursor-pointer font-medium transition-colors"
          >
            {isAdded ? "✓ Added to Shopping Bag" : "+ Add to bag to combine with other scents"}
          </button>
        </div>
      </div>

      {/* 4 Instant Confidence Badges (Scents 'n Stories style buying security) */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/8 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 dark:bg-[#121216] border border-zinc-200/70 dark:border-zinc-800/80 transition-colors">
          <Truck className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-200 text-[11px]">Doorstep COD</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Pay when delivered</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 dark:bg-[#121216] border border-zinc-200/70 dark:border-zinc-800/80 transition-colors">
          <RotateCcw className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-200 text-[11px]">7-Day Scent Swap</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Hassle-free exchange</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 dark:bg-[#121216] border border-zinc-200/70 dark:border-zinc-800/80 transition-colors">
          <ShieldCheck className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-200 text-[11px]">35% Extrait Oil</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">12+ hours sillage</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 dark:bg-[#121216] border border-zinc-200/70 dark:border-zinc-800/80 transition-colors">
          <Gift className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-200 text-[11px]">Discovery Samples</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Free with full bottles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
