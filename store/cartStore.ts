"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductSize } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean; // Not persisted
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  setDrawerOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      _hasHydrated: false,

      setHasHydrated: (hasHydrated: boolean) => {
        set({ _hasHydrated: hasHydrated });
      },

      addItem: (product: Product, size: ProductSize, quantity = 1) => {
        const itemId = `${product.id}-${size.ml}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + quantity,
          };
          set({ items: updatedItems, isOpen: true });
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            product,
            size,
            quantity,
          };
          set({ items: [...currentItems, newItem], isOpen: true });
        }
      },

      incrementItem: (itemId: string) => {
        const updated = get().items.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        set({ items: updated });
      },

      decrementItem: (itemId: string) => {
        const current = get().items;
        const target = current.find((item) => item.id === itemId);
        if (!target) return;

        if (target.quantity <= 1) {
          // Remove if decrementing 1
          set({ items: current.filter((item) => item.id !== itemId) });
        } else {
          const updated = current.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({ items: updated });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setDrawerOpen: (open: boolean) => {
        set({ isOpen: open });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.size.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "noir-scents-cart-storage",
      // Exclude `isOpen` and `_hasHydrated` from persistence
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
