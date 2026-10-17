"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/store/useHydrated";

export default function CartBadge() {
  const isHydrated = useHydrated();
  const { getItemCount, setDrawerOpen } = useCartStore();

  const count = isHydrated ? getItemCount() : 0;

  return (
    <button
      type="button"
      onClick={() => setDrawerOpen(true)}
      className="relative p-2 text-zinc-900 hover:text-black transition-colors focus:outline-hidden"
      aria-label={`Open shopping cart containing ${count} items`}
    >
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute top-1 right-0.5 bg-[#121212] text-white font-bold text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-fade-in">
          {count}
        </span>
      )}
    </button>
  );
}
