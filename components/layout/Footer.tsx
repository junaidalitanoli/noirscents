"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail.trim())) {
      setNewsletterStatus("error");
      setFeedbackMessage("Please provide a valid email address.");
      return;
    }

    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setFeedbackMessage("Thank you for subscribing! Your VIP welcome discount has been registered.");
      setNewsletterEmail("");
    }, 600);
  };

  const instagramUrl = STORE_CONFIG.instagramUrl || "https://instagram.com/noirscents";
  const facebookUrl = STORE_CONFIG.facebookUrl || "https://facebook.com/noirscents";
  const tiktokUrl = "https://tiktok.com/@noirscents";
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;

  return (
    <footer className="bg-[#f8f8f8] text-zinc-600 border-t border-black/8 text-xs tracking-wider">
      {/* Newsletter Subscription Section */}
      <div className="border-b border-black/8 bg-white py-12 sm:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b48325]">
              Private Olfactory Reserve
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-zinc-950">
              Subscribe to Noir Scents
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
              Join our private circle for VIP invitations to limited edition extrait decanters, fragrance launches, and exclusive member discounts across Pakistan.
            </p>

            {/* Newsletter Form & Feedback Banner */}
            <form onSubmit={handleNewsletterSubmit} className="pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus === "error") setNewsletterStatus("idle");
                  }}
                  placeholder="Enter your email address..."
                  required
                  aria-label="Email address for newsletter"
                  className="w-full sm:flex-1 px-4 py-3 text-xs bg-zinc-50 border border-zinc-300 focus:border-black focus:outline-hidden text-zinc-900 placeholder:text-zinc-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="w-full sm:w-auto px-6 py-3 bg-[#121212] text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  <span>{newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsletterStatus === "success" && (
                <div
                  role="status"
                  className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center justify-center gap-2 max-w-md mx-auto animate-fade-in"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {newsletterStatus === "error" && (
                <div
                  role="alert"
                  className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md flex items-center justify-center gap-2 max-w-md mx-auto animate-fade-in"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}
            </form>

            {/* Social Icons row below newsletter */}
            <div className="pt-4 flex items-center justify-center gap-4 text-zinc-500">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Follow Noir Scents:</span>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1 hover:scale-110"
                aria-label="Follow Noir Scents on Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1 hover:scale-110"
                aria-label="Follow Noir Scents on Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1 hover:scale-110"
                aria-label="Follow Noir Scents on TikTok"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1 hover:scale-110"
                aria-label="Chat with Noir Scents on WhatsApp"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Footer Navigation Layout */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Contacts & Socials */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#121212]">
              Concierge &amp; Contact
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a
                  href={whatsappUrl}
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

            {/* Social Icons inside Contact Column */}
            <div className="pt-2 flex items-center gap-3 text-zinc-500">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1"
                aria-label="Follow Noir Scents on Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1"
                aria-label="Follow Noir Scents on Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1"
                aria-label="Follow Noir Scents on TikTok"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors p-1"
                aria-label="Chat with Noir Scents on WhatsApp"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
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
                <Link href="/account" className="hover:text-black hover:underline underline-offset-4 transition-colors">
                  Customer Account &amp; Tracking
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
