"use client";

import React, { useState } from "react";
import { X, ShoppingBag, ShieldCheck, Truck, Sparkles, Check, ArrowRight } from "lucide-react";
import { Product } from "../lib/products";
import { STORE_CONFIG, getDirectWhatsAppUrl } from "../lib/config";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppInstant = () => {
    const message =
      `*🌟 INQUIRY / DIRECT ORDER - HOUSE OF SAHARÉ*\n` +
      `----------------------------------------\n` +
      `*Product:* ${product.title}\n` +
      `*Volume:* ${product.volume}\n` +
      `*Price:* ${product.formattedPrice}\n` +
      `*Quantity:* ${quantity}\n` +
      `----------------------------------------\n` +
      `*Delivery:* Free Delivery across Pakistan 🇵🇰\n` +
      `*Gift:* Free 3ml Tester Included\n` +
      `----------------------------------------\n` +
      `Hello! I want to confirm my order for ${product.title}. Please provide delivery details.`;

    const targetUrl = getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, message);

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fade">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 z-10 flex flex-col md:flex-row my-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 bg-neutral-100 relative min-h-[300px] md:min-h-[460px] flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-3 left-3 bg-neutral-950/90 text-white text-[10px] tracking-[0.2em] uppercase font-medium px-2.5 py-1 rounded">
            {product.genderLabel}
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-neutral-800 text-[11px] px-3 py-1.5 rounded border border-neutral-200/80 flex items-center justify-between">
            <span className="font-semibold">{product.concentration}</span>
            <span>{product.volume}</span>
          </div>
        </div>

        {/* Right: Details & Olfactory Notes */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500 mb-1">
              House of Saharé &bull; Niche Extrait
            </div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-neutral-950 font-serif">
              {product.title}
            </h2>
            <p className="text-sm font-semibold text-neutral-500 italic mt-0.5">
              {product.tagline}
            </p>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xl font-bold text-neutral-950">
                {product.formattedPrice}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Free Delivery Included
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-neutral-600">
              {product.description}
            </p>

            {/* Scent Pyramid Notes */}
            <div className="mt-5 pt-4 border-t border-neutral-100 space-y-2.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-900 block">
                Olfactory Notes Pyramid
              </span>

              <div className="text-xs grid grid-cols-1 gap-1.5 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                <div>
                  <strong className="text-neutral-900 font-medium">Top Notes: </strong>
                  <span className="text-neutral-600">{product.topNotes.join(" • ")}</span>
                </div>
                <div>
                  <strong className="text-neutral-900 font-medium">Heart Notes: </strong>
                  <span className="text-neutral-600">{product.heartNotes.join(" • ")}</span>
                </div>
                <div>
                  <strong className="text-neutral-900 font-medium">Base Notes: </strong>
                  <span className="text-neutral-600">{product.baseNotes.join(" • ")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>Longevity: <strong className="text-neutral-800">{product.longevity}</strong></span>
                <span>Sillage: <strong className="text-neutral-800">{product.projection}</strong></span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 text-xs font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-semibold text-neutral-900 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 text-xs font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white rounded py-2.5 px-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppInstant}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white rounded py-2 px-4 text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Instant Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
