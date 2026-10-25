"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderStatus, Product } from "@/types";

interface OrderState {
  orders: Order[];
  customProducts: Product[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

// Initial orders start empty; live orders are populated upon placement
const SEED_ORDERS: Order[] = [];

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: SEED_ORDERS,
      customProducts: [],

      addOrder: (order: Order) => {
        set({ orders: [order, ...get().orders] });
      },

      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        const updated = get().orders.map((o) =>
          o.id === orderId ? { ...o, status } : o
        );
        set({ orders: updated });
      },

      addProduct: (product: Product) => {
        set({ customProducts: [product, ...get().customProducts] });
      },

      deleteProduct: (productId: string) => {
        set({
          customProducts: get().customProducts.filter((p) => p.id !== productId),
        });
      },

      getOrderById: (orderId: string) => {
        return get().orders.find(
          (o) => o.id.toLowerCase() === orderId.toLowerCase()
        );
      },
    }),
    {
      name: "noir-scents-order-storage",
    }
  )
);
