"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
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
  const { addItem, openCart } = useCartStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const totalPrice = selectedSize.price * quantity;

  // Comparison pricing: compareAtPrice scaled appropriately if larger bottle selected
  const baseCompareAt = product.compareAtPrice || Math.round(product.sizes[0].price * 1.7);
  const activeCompareAt =
    selectedSize.ml === 100
      ? Math.round(baseCompareAt * 1.75)
      : baseCompareAt;

  const hasDiscount = Boolean(activeCompareAt && activeCompareAt > selectedSize.price);
  const savingsAmount = hasDiscount ? activeCompareAt - selectedSize.price : 0;
  const savingsPercent = hasDiscount
    ? Math.round((savingsAmount / activeCompareAt) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setIsAdded(true);
    openCart();
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNowCOD = () => {
    addItem(product, selectedSize, quantity);
    router.push("/checkout");
  };

  // Build WhatsApp quick order URL
  const whatsappText = encodeURIComponent(
    `Hello Noir Scents! I want to order "${product.name}" (${selectedSize.ml}ml - ${formatPrice(selectedSize.price * quantity)}, Qty: ${quantity}) via Cash on Delivery. Please confirm my order.`
  );
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappText}`;

  return (
    <div className="space-y-6 pt-2">
      {/* Live Viewing & Small-Batch Ticker (Scents 'n Stories urgency & trust) */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#fbf9f4] border border-[#e8dfcf] text-xs">
        <div className="flex items-center gap-1.5 text-zinc-800 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>In Stock — Handcrafted Small Batch</span>
        </div>
        <div className="flex items-center gap-1 text-[#b48325] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>🔥 High Demand — Selling Fast</span>
        </div>
      </div>

      {/* Main Price & Savings Display */}
      <div className="space-y-1.5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
            {formatPrice(selectedSize.price)}
          </span>
          {hasDiscount && (
            <span className="text-lg text-zinc-400 line-through">
              {formatPrice(activeCompareAt)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Save {formatPrice(savingsAmount)} ({savingsPercent}% OFF)
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 font-light">
          Doorstep Cash on Delivery (COD) available across 250+ Pakistani cities.
        </p>
      </div>

      {/* Size / Bottle Format Selector (Scents 'n Stories style option cards) */}
      <div className="space-y-2.5 pt-2 border-t border-black/8">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
            Select Flacon Size / Format:
          </label>
          <span className="text-xs text-zinc-500">
            {selectedSize.ml}ml {product.sizeLabel || "Flacon"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.sizes.map((size, idx) => {
            const isSelected = selectedSizeIndex === idx;
            const is100ml = size.ml === 100;
            const sizeTitle =
              product.sizeLabel === "Discovery Set" || product.sizeLabel === "Bundle"
                ? `${product.sizeLabel} (${size.ml}ml)`
                : is100ml
                ? `100ml Executive Flacon`
                : `50ml Artisanal Flacon`;

            return (
              <button
                key={size.ml}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                className={`p-3.5 border text-left transition-all relative rounded-xs flex flex-col justify-between ${
                  isSelected
                    ? "border-black bg-[#121212] text-white shadow-xs"
                    : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50/50"
                }`}
              >
                {is100ml && (
                  <span
                    className={`absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#c5a059] text-black"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}
                  >
                    Best Value • Save 45%
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between font-semibold text-xs mb-1">
                    <span>{sizeTitle}</span>
                    <span className="font-mono">{formatPrice(size.price)}</span>
                  </div>
                  <p
                    className={`text-[11px] font-light ${
                      isSelected ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {is100ml
                      ? "Double volume for connoisseurs"
                      : "Standard full bottle presentation"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Stepper & Subtotal */}
      <div className="flex items-center justify-between pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">
          Quantity:
        </label>
        <div className="flex items-center border border-zinc-300 bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center font-bold text-xs text-zinc-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Action CTA Buttons (Conversion powerhouse) */}
      <div className="space-y-3 pt-3">
        {/* Primary CTA: ORDER WITH CASH ON DELIVERY */}
        <button
          type="button"
          onClick={handleBuyNowCOD}
          id="product-buy-now-cod-btn"
          className="w-full py-4 px-6 bg-[#121212] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] shadow-md border border-black group"
        >
          <Zap className="w-4 h-4 text-[#c5a059] fill-[#c5a059] group-hover:scale-110 transition-transform" />
          <span>Order with Cash on Delivery &bull; {formatPrice(totalPrice)}</span>
        </button>

        {/* Secondary CTA: ADD TO BAG */}
        <button
          type="button"
          onClick={handleAddToCart}
          id="product-add-to-cart-btn"
          className={`w-full py-3.5 px-6 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
            isAdded
              ? "bg-emerald-700 text-white border-emerald-700"
              : "bg-white hover:bg-zinc-50 text-zinc-900 border-zinc-300 active:scale-[0.99]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <span>Add to Shopping Bag</span>
          )}
        </button>

        {/* WhatsApp Quick Order CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="product-whatsapp-order-btn"
          className="w-full py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#25D366]/30 transition-all rounded-xs"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
          <span>Quick Order on WhatsApp</span>
        </a>
      </div>

      {/* 4 Instant Confidence Badges (Scents 'n Stories style buying security) */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/8 text-xs text-zinc-700">
        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 border border-zinc-200/70">
          <Truck className="w-4 h-4 text-[#c5a059] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 text-[11px]">Doorstep COD</p>
            <p className="text-[10px] text-zinc-500">Pay when delivered</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 border border-zinc-200/70">
          <RotateCcw className="w-4 h-4 text-[#c5a059] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 text-[11px]">7-Day Scent Swap</p>
            <p className="text-[10px] text-zinc-500">Hassle-free exchange</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 border border-zinc-200/70">
          <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 text-[11px]">35% Extrait Oil</p>
            <p className="text-[10px] text-zinc-500">12+ hours sillage</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/70 border border-zinc-200/70">
          <Gift className="w-4 h-4 text-[#c5a059] shrink-0" />
          <div>
            <p className="font-semibold text-zinc-900 text-[11px]">Discovery Samples</p>
            <p className="text-[10px] text-zinc-500">Free with full bottles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
