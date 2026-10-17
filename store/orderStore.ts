"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderStatus, Product } from "@/types";
import { INITIAL_PRODUCTS } from "@/lib/data";

interface OrderState {
  orders: Order[];
  customProducts: Product[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

// Sample orders to provide immediate demo value in the admin dashboard
const SEED_ORDERS: Order[] = [
  {
    id: "NS-89210",
    customer: {
      fullName: "Hamza Tariq",
      phone: "03014567890",
      email: "hamza.tariq@gmail.com",
      address: "House 42, Block C, Phase 5, DHA",
      city: "Lahore",
      notes: "Please call before delivery",
    },
    items: [
      {
        id: "fn-001-100",
        productId: "fn-001",
        product: INITIAL_PRODUCTS[0],
        size: { ml: 100, price: 4500 },
        quantity: 1,
      },
    ],
    subtotal: 4500,
    shippingFee: 0,
    total: 4500,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    createdAt: "2025-02-20T14:22:00Z",
  },
  {
    id: "NS-89211",
    customer: {
      fullName: "Ayesha Malik",
      phone: "03218765432",
      email: "ayesha.malik@outlook.com",
      address: "Apartment 4B, Creek Vista, Clifton",
      city: "Karachi",
      notes: "Deliver between 2 PM to 6 PM",
    },
    items: [
      {
        id: "fn-008-50",
        productId: "fn-008",
        product: INITIAL_PRODUCTS[7],
        size: { ml: 50, price: 2950 },
        quantity: 1,
      },
    ],
    subtotal: 2950,
    shippingFee: 250,
    total: 3200,
    status: "Shipped",
    paymentMethod: "Cash on Delivery",
    createdAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "NS-89212",
    customer: {
      fullName: "Zainab Raza",
      phone: "03335551234",
      email: "zainab.raza@gmail.com",
      address: "House 18, Street 14, Sector F-7/2",
      city: "Islamabad",
    },
    items: [
      {
        id: "fn-014-50",
        productId: "fn-014",
        product: INITIAL_PRODUCTS[13],
        size: { ml: 50, price: 4999 },
        quantity: 1,
      },
    ],
    subtotal: 4999,
    shippingFee: 0,
    total: 4999,
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    createdAt: "2025-02-24T16:40:00Z",
  },
];

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
