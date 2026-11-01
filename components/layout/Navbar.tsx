"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, User } from "lucide-react";
import CartBadge from "@/components/cart/CartBadge";
import ThemeToggle from "@/components/theme/ThemeToggle";

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
    { label: "Bundles & Offers", href: "/collections/deals" },
    { label: "Testers", href: "/collections/testers" },
    { label: "About", href: "/pages/about" },
  ];

  return (
    <>
      <header className="sticky top-[38px] z-40 bg-white/95 dark:bg-[#09090b]/95 border-b border-black/8 dark:border-white/10 backdrop-blur-md transition-colors duration-200">
        {/* 1. Mobile Header: Left-aligned Bold Brand Name + Menu & Quick Actions */}
        <div className="lg:hidden max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Mobile Drawer Trigger + Bold Brand Name */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 -ml-1 text-stone-900 dark:text-stone-100 hover:text-black dark:hover:text-[#d4af37] focus:outline-hidden"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              href="/"
              className="text-lg sm:text-xl font-black tracking-[0.22em] uppercase text-stone-950 dark:text-[#f4f4f5] font-serif hover:text-[#8c530b] dark:hover:text-[#d4af37] transition-colors whitespace-nowrap block"
            >
              Noir Scent
            </Link>
          </div>

          {/* Right: Theme Toggle, Search & Cart */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            <ThemeToggle variant="icon" />
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-stone-900 dark:text-stone-100 hover:text-black dark:hover:text-[#d4af37] transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <CartBadge />
          </div>
        </div>

        {/* 2. Desktop Header: Left-aligned Bold Brand Name + Right Actions */}
        <div className="hidden lg:block max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Top Row: Bold Brand Name on Left, Actions on Right */}
          <div className="h-20 flex items-center justify-between">
            {/* Desktop Left: Bold, Highly Visible Brand Name */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-[0.24em] uppercase text-[#121212] dark:text-[#f4f4f5] font-serif hover:text-[#8c530b] dark:hover:text-[#d4af37] transition-colors block"
              >
                Noir Scent
              </Link>
            </div>

            {/* Desktop Right: Search, Theme Toggle, Contact Link, Customer Account & Cart */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-[#d4af37] flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>

              <ThemeToggle variant="pill" />

              <Link
                href="/pages/contact"
                className="text-xs uppercase tracking-[0.14em] font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#d4af37] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/account"
                className="p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-[#d4af37] transition-colors flex items-center justify-center"
                aria-label="Customer Account"
                title="Customer Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <CartBadge />
            </div>
          </div>

          {/* Bottom Row: Centered Navigation Menu */}
          <nav className="border-t border-black/6 dark:border-white/10 flex items-center justify-center space-x-8 py-3" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.1em] font-medium text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-[#d4af37] hover:underline underline-offset-8 transition-colors py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white dark:bg-[#121216] w-full max-w-2xl p-6 shadow-2xl relative animate-fade-in border border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500 mb-4">
              Search Noir Scent
            </h3>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search perfumes, notes (e.g. Oud, Rose, Amber)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base border-b-2 border-black dark:border-[#d4af37] pb-3 pr-10 focus:outline-hidden font-medium placeholder-zinc-400 dark:placeholder-zinc-500 bg-transparent text-zinc-950 dark:text-zinc-50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-1 p-2 text-zinc-900 dark:text-[#d4af37] hover:opacity-75 transition-opacity"
                aria-label="Submit search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 dark:text-zinc-500">Popular:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Desert Majesty");
                  router.push("/search?q=Desert%20Majesty");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black dark:hover:text-[#d4af37] transition-colors"
              >
                Desert Majesty
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Silk Oud");
                  router.push("/search?q=Silk%20Oud");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black dark:hover:text-[#d4af37] transition-colors"
              >
                Silk Oud
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Loyal Heart");
                  router.push("/search?q=Loyal%20Heart");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black dark:hover:text-[#d4af37] transition-colors"
              >
                Loyal Heart
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("Raaz");
                  router.push("/search?q=Raaz");
                  setSearchModalOpen(false);
                }}
                className="underline hover:text-black dark:hover:text-[#d4af37] transition-colors"
              >
                Raaz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white dark:bg-[#0c0c0f] border-r border-transparent dark:border-white/10 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-over text-zinc-900 dark:text-zinc-100">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-base font-bold tracking-[0.18em] uppercase text-black dark:text-[#f4f4f5] font-serif">
                  Noir Scent
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-[#d4af37] transition-colors"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Luxury Theme Switcher */}
              <div>
                <ThemeToggle variant="drawer" />
              </div>

              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium uppercase tracking-[0.08em] text-zinc-900 dark:text-zinc-200 hover:text-black dark:hover:text-[#d4af37] transition-colors block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/collections/all"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium uppercase tracking-[0.08em] text-zinc-900 dark:text-zinc-200 hover:text-black dark:hover:text-[#d4af37] transition-colors block py-1"
                  >
                    All Products
                  </Link>
                </li>
              </ul>

              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Customer Care
                </p>
                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-medium text-black dark:text-zinc-200 hover:underline"
                  >
                    Track Order / Customer Account
                  </Link>
                  <Link
                    href="/pages/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/pages/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    Contact &amp; WhatsApp
                  </Link>
                  <Link
                    href="/policies/shipping"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    Shipping Policy
                  </Link>
                  <Link
                    href="/policies/returns"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    Returns &amp; Exchanges
                  </Link>
                  <Link
                    href="/policies/terms"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-black dark:hover:text-zinc-100 transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
              <p className="font-semibold text-black dark:text-zinc-200">Pakistan (PKR)</p>
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
