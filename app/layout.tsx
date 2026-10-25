import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE_URL, getAbsoluteUrl } from "@/lib/site";
import { STORE_CONFIG } from "@/lib/store-config";
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

const defaultTitle = "Noir Scents | Artisanal Extrait Perfumes in Pakistan";
const defaultDescription =
  "Handcrafted artisanal Extrait de Parfum in Pakistan with enduring all-day sillage. Premium fragrance creations with nationwide Cash on Delivery across Karachi, Lahore & Islamabad.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Noir Scents",
  },
  description: defaultDescription,
  authors: [{ name: "Noir Scents Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: "Noir Scents",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scents Artisanal Perfume Packaging",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [DEFAULT_PRODUCT_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sameAs: string[] = [];
  if (STORE_CONFIG.instagramUrl) sameAs.push(STORE_CONFIG.instagramUrl);
  if (STORE_CONFIG.facebookUrl) sameAs.push(STORE_CONFIG.facebookUrl);

  const rootJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: STORE_CONFIG.name,
        legalName: STORE_CONFIG.legalName,
        url: SITE_URL,
        logo: getAbsoluteUrl("/images/logo.svg"),
        email: STORE_CONFIG.contactEmail,
        telephone: STORE_CONFIG.phone,
        ...(sameAs.length > 0 ? { sameAs } : {}),
        address: {
          "@type": "PostalAddress",
          addressCountry: "PK",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: STORE_CONFIG.name,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
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