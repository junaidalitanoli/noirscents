"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, User } from "lucide-react";
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
    { label: "About", href: "/pages/about" },
  ];

  return (
    <>
      <header className="sticky top-[38px] z-40 bg-white border-b border-black/8 transition-all">
        {/* 1. Mobile Header: Centered Brand Name & Symmetrical Action Icons */}
        <div className="lg:hidden max-w-[1400px] mx-auto px-4 h-16 relative flex items-center justify-between">
          {/* Left: Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-zinc-900 hover:text-black focus:outline-hidden"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center: Brand Name (Centered on Mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase text-[#121212] hover:opacity-80 transition-opacity whitespace-nowrap block"
            >
              Noir Scents
            </Link>
          </div>

          {/* Right: Search, Customer Account & Cart Icons */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-zinc-900 hover:text-black"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account"
              className="p-2 text-zinc-900 hover:text-black transition-colors"
              aria-label="Customer Account"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <CartBadge />
          </div>
        </div>

        {/* 2. Desktop Header: Centered Brand Name + Centered Nav */}
        <div className="hidden lg:block max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Top Row: Search on Left, Centered Brand Name in Middle, Cart on Right */}
          <div className="h-20 relative flex items-center justify-between">
            {/* Desktop Left: Search */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-zinc-700 hover:text-black flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-medium transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Desktop Center: Brand Name */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
              <Link
                href="/"
                className="text-2xl sm:text-3xl font-extrabold tracking-[0.24em] uppercase text-[#121212] hover:opacity-85 transition-opacity block"
              >
                Noir Scents
              </Link>
            </div>

            {/* Desktop Right: Single Contact Link, Customer Account & Cart */}
            <div className="flex items-center space-x-4">
              <Link
                href="/pages/contact"
                className="text-xs uppercase tracking-[0.12em] font-medium text-zinc-600 hover:text-black transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/account"
                className="p-1.5 text-zinc-700 hover:text-black transition-colors flex items-center justify-center"
                aria-label="Customer Account"
                title="Customer Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <CartBadge />
            </div>
          </div>

          {/* Bottom Row: Centered Navigation Menu */}
          <nav className="border-t border-black/6 flex items-center justify-center space-x-8 py-3" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.09em] font-medium text-zinc-800 hover:text-black hover:underline underline-offset-8 transition-colors py-0.5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/collections/deals"
              className="text-[13px] uppercase tracking-[0.09em] font-semibold text-[#cc0000] hover:text-[#990000] hover:underline underline-offset-8 transition-colors py-0.5"
            >
              Sale
            </Link>
          </nav>
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

      {/* Mobile Drawer Navigation Menu */}
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
                <li>
                  <Link
                    href="/collections/deals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold uppercase tracking-[0.08em] text-[#cc0000] hover:text-[#990000] block py-1"
                  >
                    Sale Deals
                  </Link>
                </li>
              </ul>

              <div className="pt-6 border-t border-zinc-200 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Customer Care
                </p>
                <div className="space-y-2 text-sm text-zinc-600">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-medium text-black hover:underline"
                  >
                    Customer Account / Login
                  </Link>
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
                  <Link
                    href="/policies/terms"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black"
                  >
                    Terms &amp; Conditions
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
