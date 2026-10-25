"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Truck,
  Phone,
  ArrowRight,
  Calendar,
  MapPin,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { useHydrated } from "@/store/useHydrated";
import { formatPrice } from "@/lib/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";
import { Order } from "@/types";

type PublicOrder = Omit<Order, "customer"> & {
  customer: {
    fullName: string;
    phone: string;
    city: string;
    email?: string;
    address?: string;
    notes?: string;
  };
};

interface OrderSuccessClientProps {
  orderId: string;
}

export default function OrderSuccessClient({ orderId }: OrderSuccessClientProps) {
  const isHydrated = useHydrated();
  const { getOrderById } = useOrderStore();

  const localOrder = isHydrated ? getOrderById(orderId) : undefined;
  const [serverOrder, setServerOrder] = useState<PublicOrder | null>(null);
  const [isServerLoading, setIsServerLoading] = useState(true);
  const [serverNotFound, setServerNotFound] = useState(false);

  useEffect(() => {
    if (!isHydrated || localOrder) return;

    let isCancelled = false;

    async function fetchServerOrder() {
      try {
        const res = await fetch(`/api/order/${encodeURIComponent(orderId)}`);
        const data = await res.json();
        if (isCancelled) return;

        if (res.ok && data.success && data.order) {
          setServerOrder(data.order);
        } else {
          setServerNotFound(true);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("[OrderSuccess] Error fetching server order:", err);
          setServerNotFound(true);
        }
      } finally {
        if (!isCancelled) setIsServerLoading(false);
      }
    }

    fetchServerOrder();

    return () => {
      isCancelled = true;
    };
  }, [isHydrated, orderId, localOrder]);

  const order = localOrder || serverOrder;
  const isLoading = !isHydrated || (!localOrder && isServerLoading);
  const notFound = isHydrated && !localOrder && serverNotFound;

  if (!isHydrated || isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-zinc-500">
        <div className="w-10 h-10 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium animate-pulse">Verifying order confirmation with server...</p>
      </div>
    );
  }

  // Prevent fabricated / phantom order confirmations
  if (notFound || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertCircle className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Order Verification Notice
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-950 mt-4 mb-2">
          Order #{orderId} Not Found
        </h1>
        <p className="text-sm text-zinc-600 max-w-md mx-auto mb-8 leading-relaxed">
          We could not find an active or verified order record matching this order ID. If you recently placed an order, please allow a moment or contact our concierge via WhatsApp for assistance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-950 text-white rounded-xl font-bold text-sm hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" /> Return to Boutique
          </Link>
          <a
            href="https://wa.me/923322224331?text=Hello%20Noir%20Scents%20support%2C%20I%20have%20an%20inquiry%20regarding%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" /> WhatsApp Concierge
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
      {/* Success Badge */}
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Confirmed &bull; Cash on Delivery
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950">
          Thank You — Your Order is Confirmed
        </h1>
        <p className="text-sm text-zinc-600 max-w-md mx-auto">
          We are truly grateful for your trust. Order <strong className="font-mono text-zinc-900">#{order.id}</strong> has been received and is being carefully prepared for dispatch.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-hidden space-y-6">
        {/* Header Info */}
        <div className="bg-zinc-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider block">
              Order Tracking ID
            </span>
            <span className="font-mono text-2xl font-bold text-white mt-1 block">
              {order.id}
            </span>
            <span className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Placed on {new Date(order.createdAt).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">
              Payment Due on Delivery
            </span>
            <span className="text-2xl font-extrabold text-[#fef08a] mt-1 block">
              {formatPrice(order.total)}
            </span>
            <span className="text-[11px] text-zinc-400 block">
              Cash On Delivery (No card required)
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Customer & Delivery Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50 p-5 rounded-xl border border-zinc-200/70 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-zinc-500 block">
                Recipient Information
              </span>
              <p className="text-sm font-bold text-zinc-900">{order.customer.fullName}</p>
              <p className="text-zinc-600 flex items-center gap-1 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" /> {order.customer.phone}
              </p>
              {order.customer.email && (
                <p className="text-zinc-500">{order.customer.email}</p>
              )}
            </div>

            <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-zinc-200 pt-3 sm:pt-0 sm:pl-6">
              <span className="font-bold uppercase tracking-wider text-zinc-500 block">
                Delivery Destination
              </span>
              <p className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {order.customer.city}, Pakistan
              </p>
              {localOrder?.customer?.address && (
                <p className="text-zinc-600 leading-relaxed">{localOrder.customer.address}</p>
              )}
              {localOrder?.customer?.notes && (
                <p className="text-zinc-500 italic mt-1">&ldquo;{localOrder.customer.notes}&rdquo;</p>
              )}
            </div>
          </div>

          {/* Ordered Items */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
              Ordered Fragrances ({order.items.length})
            </h3>
            <div className="divide-y divide-zinc-200">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-zinc-950 rounded-lg overflow-hidden shrink-0 border border-zinc-200">
                      <Image
                        src={item.product.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                        alt={`${item.product.name} Extrait de Parfum by Noir Scent`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">{item.product.name}</h4>
                      <span className="text-xs text-zinc-500">
                        {item.size.ml}ml Flacon &bull; Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-zinc-950">
                    {formatPrice(item.size.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-zinc-200 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Nationwide Shipping</span>
              <span>
                {order.shippingFee === 0 ? (
                  <strong className="text-emerald-700 uppercase">FREE</strong>
                ) : (
                  formatPrice(order.shippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-zinc-950 border-t border-zinc-300 pt-3">
              <span>Total Amount to Pay Rider (COD)</span>
              <span className="text-lg text-amber-900 font-extrabold">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Courier Dispatch Timeline */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Truck className="w-4 h-4 text-amber-700" />
              Dispatch Timeline Across Pakistan
            </div>
            <p className="text-amber-800 leading-relaxed">
              Your order is currently queued for packaging. TCS / Leopards courier will pick up within 24 hours. The delivery rider will call your phone number prior to delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 text-white rounded-xl font-bold text-sm hover:bg-zinc-800 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </Link>
      </div>
    </div>
  );
}
