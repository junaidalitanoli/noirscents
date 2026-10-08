import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const sansFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noirscents.com"),
  title: "NOIR SCENTS | Luxury Fragrances & Artisanal Perfumes",
  description:
    "Discover NOIR SCENTS. An exclusive collection of handcrafted artisanal perfumes, pure extrait de parfum, and rare oriental oud blends.",
  keywords: [
    "Noir Scents",
    "Luxury Perfumes",
    "Extrait de Parfum",
    "Artisanal Fragrance Pakistan",
    "Oud Perfume",
    "French Perfumes",
  ],
  openGraph: {
    title: "NOIR SCENTS | Luxury Fragrances",
    description: "Handcrafted fine fragrances and pure extrait de parfum.",
    url: "https://noirscents.com",
    siteName: "NOIR SCENTS",
    images: [
      {
        url: "/products/p1.jpg",
        width: 1200,
        height: 630,
        alt: "NOIR SCENTS Luxury Collection",
      },
    ],
    locale: "en_US",
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
    name: "NOIR SCENTS",
    description: "Artisanal luxury perfumes and extrait de parfum.",
    url: "https://noirscents.com",
    priceRange: "PKR 4,000 - PKR 12,000",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${serifFont.variable} ${sansFont.variable} font-sans bg-[#FAF8F5] text-stone-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}