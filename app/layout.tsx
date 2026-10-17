import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { BRAND_NAME } from "@/lib/constants";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noir-scents.pk"),
  title: {
    default: `${BRAND_NAME} - Best Perfumes In Pakistan`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Noir Scents - Pakistan's artisanal perfume brand. Handcrafted Extraits de Parfum with high projection and nationwide Cash on Delivery.",
  keywords: [
    "Noir Scents",
    "Noir Scents Pakistan",
    "Pakistani Perfume Brand",
    "Extrait de Parfum Pakistan",
    "Cash on Delivery Perfumes",
    "Oud Perfume Pakistan",
    "Long Lasting Scents Karachi Lahore Islamabad",
  ],
  authors: [{ name: "Noir Scents Team" }],
  openGraph: {
    title: `${BRAND_NAME} - Best Perfumes In Pakistan`,
    description:
      "Handcrafted luxury Extraits de Parfum, pure ouds, and long projection fragrances in Pakistan. Order online with Cash on Delivery.",
    url: "https://noir-scents.pk",
    siteName: BRAND_NAME,
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: `${BRAND_NAME} Artisanal Perfume Packaging`,
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} - Best Perfumes In Pakistan`,
    description:
      "Pakistan's premier artisanal perfume brand. Long lasting projection with nationwide Cash on Delivery.",
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans bg-white text-[#121212] antialiased flex flex-col min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}