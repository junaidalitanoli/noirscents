"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cartStore";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

interface MobileStickyBarProps {
  product: Product;
}

export default function MobileStickyBar({ product }: MobileStickyBarProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCartStore();

  const primarySize = product.sizes[0];
  const primaryImage = product.images?.[0] || DEFAULT_PRODUCT_IMAGE;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled down 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInstantBuy = () => {
    addItem(product, primarySize, 1);
    router.push("/checkout");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0c0c0f]/95 backdrop-blur-md border-t border-black/10 dark:border-white/10 p-3 sm:hidden shadow-lg animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0 overflow-hidden">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="truncate">
            <h4 className="text-xs font-bold text-zinc-950 dark:text-zinc-100 truncate font-serif">
              {product.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-extrabold text-zinc-950 dark:text-[#f5e7b2] font-mono">
                {formatPrice(primarySize.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleInstantBuy}
          id="mobile-sticky-order-cod-btn"
          className="px-4 py-2.5 bg-[#121212] hover:bg-black dark:bg-[#d4af37] dark:hover:bg-[#e5c158] text-white dark:text-[#09090b] text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Zap className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059] dark:text-[#09090b] dark:fill-[#09090b]" />
          <span>Order COD</span>
        </button>
      </div>
    </div>
  );
}
