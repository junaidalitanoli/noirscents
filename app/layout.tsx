import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { SITE_URL, getAbsoluteUrl, IS_PRODUCTION_DOMAIN } from "@/lib/site-config";
import { STORE_CONFIG } from "@/lib/store-config";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500"],
  display: "swap",
});

const defaultTitle = "Noir Scent | Artisanal Extrait Perfumes in Pakistan";
const defaultDescription =
  "Handcrafted artisanal Extrait de Parfum in Pakistan with enduring all-day sillage. Premium fragrance creations with nationwide Cash on Delivery across Karachi, Lahore & Islamabad.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Noir Scent",
  },
  description: defaultDescription,
  authors: [{ name: "Noir Scent Team" }],
  alternates: {
    canonical: "/",
  },
  robots: IS_PRODUCTION_DOMAIN
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Noir Scent",
    images: [
      {
        url: DEFAULT_PRODUCT_IMAGE,
        width: 1024,
        height: 1024,
        alt: "Noir Scent Artisanal Perfume Packaging",
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
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: `+${STORE_CONFIG.whatsappNumber}`,
            contactType: "Customer Support & Orders",
            contactOption: "WhatsApp",
            areaServed: "PK",
            availableLanguage: ["English", "Urdu"],
          },
        ],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('noir_theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <JsonLd data={rootJsonLd} />
      </head>
      <body className="font-sans bg-white dark:bg-[#09090b] text-[#121212] dark:text-[#f4f4f5] antialiased flex flex-col min-h-screen transition-colors duration-200">
        <ThemeProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <WhatsAppButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}