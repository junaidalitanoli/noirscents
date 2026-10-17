import type { Metadata } from "next";
import OrderSuccessClient from "./OrderSuccessClient";

interface OrderSuccessPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export async function generateMetadata({
  params,
}: OrderSuccessPageProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order Confirmed #${orderId}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderId } = await params;
  return <OrderSuccessClient orderId={orderId} />;
}
