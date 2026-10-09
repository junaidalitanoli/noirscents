import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.houseofsahare.com"),
  title: "Sahare Perfumes | Original Perfume Brand in Pakistan",
  description:
    "Sahare is Pakistan's original niche perfume brand. Discover long-lasting fragrances for men, women, and unisex. Buy perfumes online in Pakistan with fast nationwide delivery.",
  keywords: [
    "Sahare Perfumes",
    "House of Sahare",
    "Niche Perfumes Pakistan",
    "Extrait de Parfum",
    "Talis of the Skies",
    "Hibiscaria",
    "Gozoire",
    "Oud Passionata",
    "Long Lasting Perfumes",
  ],
  openGraph: {
    title: "Sahare Perfumes | Original Perfume Brand in Pakistan",
    description:
      "Sahare is Pakistan's original niche perfume brand. Discover long-lasting fragrances for men, women, and unisex. Buy perfumes online in Pakistan with fast nationwide delivery.",
    url: "https://www.houseofsahare.com",
    siteName: "House of Saharé",
    images: [
      {
        url: "https://www.houseofsahare.com/cdn/shop/files/New_Project_-_2026-04-24T020930.954.webp?v=1776978588",
        width: 1200,
        height: 630,
        alt: "Sahare Perfumes Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "House of Saharé",
    description: "Pakistan's original niche perfume brand.",
    url: "https://www.houseofsahare.com",
    priceRange: "PKR 6,500 - PKR 16,000",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${serifFont.variable} ${sansFont.variable} font-sans bg-white text-[#111111] antialiased`}>
        {children}
      </body>
    </html>
  );
}