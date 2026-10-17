"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import CartBadge from "@/components/cart/CartBadge";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchModalOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Men", href: "/collections/men" },
    { label: "Women", href: "/collections/women" },
    { label: "Bundles", href: "/collections/deals" },
    { label: "Testers", href: "/collections/testers" },
    { label: "Contact", href: "/pages/contact" },
  ];

  return (
    <>
      <header className="sticky top-[38px] z-40 bg-white border-b border-black/8 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-zinc-900 hover:text-black focus:outline-hidden"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-zinc-900 hover:text-black ml-1"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Logo: Simple "Noir Scents" Text Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-lg sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#121212] hover:opacity-80 transition-opacity"
              >
                Noir Scents
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.08em] font-medium text-zinc-800 hover:text-black hover:underline underline-offset-8 transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Header Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Desktop Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="hidden lg:flex p-2 text-zinc-800 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>


              {/* Cart Drawer Trigger */}
              <CartBadge />
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl p-6 shadow-2xl relative animate-fade-in border border-zinc-200">
            <button
              type="button"
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-4">
              Search Noir Scents
            </h3>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search perfumes, notes (e.g. Oud, Rose, Amber)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base border-b-2 border-black pb-3 pr-10 focus:outline-hidden font-medium placeholder-zinc-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-1 p-2 text-zinc-900 hover:opacity-75"
                aria-label="Submit search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap gap-2 text-xs text-zinc-600">
              <span className="text-zinc-400">Popular:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Urban Legend");
                  router.push("/search?q=Urban%20Legend");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black"
              >
                Urban Legend
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Oud");
                  router.push("/search?q=Oud");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black"
              >
                Noir Oud
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Rose");
                  router.push("/search?q=Rose");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black"
              >
                Velvet Rose
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Discovery");
                  router.push("/search?q=Discovery");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black"
              >
                Discovery Set
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu (Shopify Dawn Style) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-over">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <span className="text-base font-bold tracking-[0.14em] uppercase text-black">
                  Noir Scents
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-zinc-500 hover:text-black"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium uppercase tracking-[0.08em] text-zinc-900 hover:text-black block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/collections/all"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium uppercase tracking-[0.08em] text-zinc-900 hover:text-black block py-1"
                  >
                    All Products
                  </Link>
                </li>
              </ul>

              <div className="pt-6 border-t border-zinc-200 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Customer Care
                </p>
                <div className="space-y-2 text-sm text-zinc-600">
                  <Link
                    href="/pages/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/pages/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black"
                  >
                    Contact &amp; WhatsApp
                  </Link>
                  <Link
                    href="/policies/shipping"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black"
                  >
                    Shipping Policy
                  </Link>
                  <Link
                    href="/policies/returns"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black"
                  >
                    Returns &amp; Exchanges
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 text-xs text-zinc-500 space-y-1">
              <p className="font-semibold text-black">Pakistan (PKR Rs.)</p>
              <p>Cash on Delivery Available Nationwide</p>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
