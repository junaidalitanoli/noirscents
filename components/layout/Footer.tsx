import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";

export default function Footer() {
  const hasInstagram = Boolean(STORE_CONFIG.instagramUrl);
  const hasFacebook = Boolean(STORE_CONFIG.facebookUrl);

  return (
    <footer className="bg-[#f8f8f8] text-zinc-600 border-t border-black/8 text-xs tracking-wider">
      {/* 4-Column Footer Layout */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Contacts */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#121212]">
              Contacts
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  {STORE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a
                  href={`mailto:${STORE_CONFIG.contactEmail}`}
                  className="hover:text-black transition-colors"
                >
                  {STORE_CONFIG.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-500">
                <span>Online Store &bull; Dispatched Nationwide via COD</span>
              </li>
            </ul>

            {/* Social Icons: Render ONLY if URLs are configured */}
            {(hasInstagram || hasFacebook || STORE_CONFIG.whatsappNumber) && (
              <div className="pt-2 flex items-center gap-3 text-zinc-500">
                {hasInstagram && (
                  <a
                    href={STORE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors p-1"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {hasFacebook && (
                  <a
                    href={STORE_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors p-1"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                    </svg>
                  </a>
                )}
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors p-1"
                  aria-label="WhatsApp Concierge"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Column 2: About */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#121212]">
              About
            </h3>
            <p className="text-xs leading-relaxed text-zinc-600 font-light">
              Handcrafted non-alcoholic Extrait de Parfum formulated for enduring sillage in Pakistan&apos;s climate. Enjoy direct-to-consumer luxury at accessible prices.
            </p>
            <div>
              <Link
                href="/pages/about"
                className="text-xs font-semibold text-[#121212] hover:underline underline-offset-4"
              >
                Our Story &rarr;
              </Link>
            </div>
          </div>

          {/* Column 3: Quick links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#121212]">
              Quick links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/men" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Men&apos;s Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections/women" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Women&apos;s Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections/deals" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Bundles &amp; Deals
                </Link>
              </li>
              <li>
                <Link href="/collections/testers" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Testers &amp; Sets
                </Link>
              </li>
              <li>
                <Link href="/pages/about" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#121212]">
              Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/policies/shipping" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Information */}
      <div className="border-t border-black/8 py-8 bg-[#f4f4f5]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()},{" "}
            <Link
              href="/"
              className="font-semibold text-black uppercase tracking-wider hover:underline underline-offset-4"
            >
              {BRAND_NAME}
            </Link>
            <span className="mx-2 text-zinc-400">&bull;</span>
            <span>Handcrafted in Pakistan</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-zinc-600">
            <span className="bg-white border border-zinc-200 px-2.5 py-1 text-[10px] font-medium tracking-wider">
              Cash on Delivery (COD)
            </span>
            <span className="bg-white border border-zinc-200 px-2.5 py-1 text-[10px] font-medium tracking-wider">
              TCS / Leopards Courier
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
