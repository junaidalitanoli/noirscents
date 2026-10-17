"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/store/useHydrated";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CheckoutPage() {
  const isHydrated = useHydrated();
  const { items, getSubtotal } = useCartStore();

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Breadcrumbs
          items={[
            { label: "Bag", href: "/" },
            { label: "Express Checkout" },
          ]}
        />
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Secure Cash On Delivery
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Express Checkout
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Loading your checkout session...
          </p>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-zinc-950">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-zinc-500 mt-2 mb-6">
          You need to add at least one fragrance to your bag before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-800 transition-colors shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Fragrances
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <Breadcrumbs
        items={[
          { label: "Bag", href: "/" },
          { label: "Express Checkout" },
        ]}
      />

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
          Secure Cash On Delivery
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
          Express Checkout
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Please confirm your Pakistani delivery address. No upfront payment required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 sticky top-28">
          <OrderSummary items={items} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
