"use client";

import React, { useState, useRef } from "react";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Truck,
  Sparkles,
  ShieldCheck,
  Clock,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { PRODUCTS, Product } from "../lib/products";
import ProductCard from "../components/ProductCard";
import CartDrawer, { CartItem } from "../components/CartDrawer";
import SearchDrawer from "../components/SearchDrawer";
import LoginDrawer from "../components/LoginDrawer";
import QuickViewModal from "../components/QuickViewModal";
import CheckoutModal from "../components/CheckoutModal";
import { STORE_CONFIG, getDirectWhatsAppUrl } from "../lib/config";

export default function Home() {
  // Navigation & Category filter state
  const [activeTab, setActiveTab] = useState<"Men" | "Women" | "Unisex" | "All">("Men");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Drawers & Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<Product | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Video Banner state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Toggle video sound
  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  // Toggle video play
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((it): it is CartItem => it !== null)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Filter products for collection section
  const displayedProducts =
    activeTab === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab || p.category === "Discovery");

  // Open direct COD checkout modal for cart
  const handleOpenCartCheckout = () => {
    setDirectCheckoutProduct(null);
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BAR
      ───────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Announcement"
        className="bg-[#111111] text-white py-2.5 px-4 text-center text-xs tracking-wider border-b border-neutral-900 shrink-0 font-medium"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-[#c5a880] shrink-0" />
          <span>Get FREE Delivery &amp; a FREE 3ml perfume with every purchase.</span>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. STICKY LUXURY HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger + Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-neutral-800 hover:text-black transition-colors"
              aria-label="Open menu drawer"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-semibold text-neutral-800">
              <button
                onClick={() => {
                  const disc = PRODUCTS.find((p) => p.id === "discovery-box");
                  if (disc) setQuickViewProduct(disc);
                }}
                className="hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Discovery Box
              </button>
              <button
                onClick={() => {
                  setActiveTab("Men");
                  scrollToSection("collection-grid");
                }}
                className={`transition-colors cursor-pointer ${
                  activeTab === "Men" ? "text-neutral-950 font-bold" : "hover:text-neutral-500"
                }`}
              >
                Men&apos;s Perfumes
              </button>
              <button
                onClick={() => {
                  setActiveTab("Women");
                  scrollToSection("collection-grid");
                }}
                className={`transition-colors cursor-pointer ${
                  activeTab === "Women" ? "text-neutral-950 font-bold" : "hover:text-neutral-500"
                }`}
              >
                Women&apos;s Perfumes
              </button>
              <button
                onClick={() => {
                  setActiveTab("Unisex");
                  scrollToSection("collection-grid");
                }}
                className={`transition-colors cursor-pointer ${
                  activeTab === "Unisex" ? "text-neutral-950 font-bold" : "hover:text-neutral-500"
                }`}
              >
                Unisex Perfumes
              </button>
              <button
                onClick={() => scrollToSection("about-sahare")}
                className="hover:text-neutral-500 transition-colors cursor-pointer"
              >
                About Us
              </button>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] font-bold text-neutral-950 leading-none">
                SAHARÉ
              </span>
              <span className="text-[9px] uppercase tracking-[0.38em] text-neutral-400 mt-1 font-medium">
                HOUSE OF SAHARÉ
              </span>
            </div>
          </div>

          {/* Right: Icons (Search, Login, Cart) */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Search perfumes"
              title="Search"
            >
              <Search size={19} />
            </button>

            <button
              onClick={() => setLoginOpen(true)}
              className="p-2 text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Account Login"
              title="Account"
            >
              <User size={19} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-neutral-900 hover:text-black transition-colors"
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingBag size={20} />
              {cartTotalCount > 0 && (
                <span className="absolute top-1 right-0.5 bg-neutral-950 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. CINEMATIC VIDEO HERO BANNER (from houseofsahare.com)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[820px] bg-neutral-950 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          poster="/products/discovery.jpg"
          className="w-full h-full object-cover object-center opacity-85"
        >
          <source
            src="/videos/sahare_hero.mp4"
            type="video/mp4"
          />
          <source
            src="/videos/hero.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl text-white space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#c5a880] block">
              Original Niche Fragrance House &bull; Pakistan
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight text-white">
              Haute Parfumerie &amp; Extrait de Parfum
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed font-light">
              Crafted with 35%+ pure perfume oil concentration for sublime, all-day sillage and timeless distinction.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setActiveTab("Men");
                  scrollToSection("collection-grid");
                }}
                className="bg-white hover:bg-neutral-200 text-neutral-950 px-6 sm:px-8 py-3 rounded-xs text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md active:scale-95"
              >
                Shop Men
              </button>
              <button
                onClick={() => {
                  setActiveTab("Women");
                  scrollToSection("collection-grid");
                }}
                className="bg-neutral-900/80 hover:bg-neutral-900 text-white border border-neutral-700/80 backdrop-blur-sm px-6 sm:px-8 py-3 rounded-xs text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md active:scale-95"
              >
                Shop Women
              </button>
            </div>
          </div>
        </div>

        {/* Video Controls (Mute & Play/Pause buttons) */}
        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2">
          <button
            onClick={toggleVideoPlay}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all border border-white/20"
            title={isVideoPlaying ? "Pause Video" : "Play Video"}
          >
            {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleVideoMute}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all border border-white/20"
            title={isVideoMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THREE CATEGORY IMAGE BANNERS (MEN, WOMEN, UNISEX)
          Matching `clickable_banner_kHpxkH`
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: MEN */}
          <div
            onClick={() => {
              setActiveTab("Men");
              scrollToSection("collection-grid");
            }}
            className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-xs cursor-pointer bg-neutral-900"
          >
            <img
              src="/images/banner_men.jpg"
              alt="Men's Fragrances"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-1">
                Explore Collection
              </span>
              <h2 className="text-xl sm:text-2xl font-serif tracking-[0.16em] uppercase font-medium">
                Men
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 mt-2 font-medium group-hover:text-white transition-colors">
                <span>View Perfumes</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: WOMEN */}
          <div
            onClick={() => {
              setActiveTab("Women");
              scrollToSection("collection-grid");
            }}
            className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-xs cursor-pointer bg-neutral-900"
          >
            <img
              src="/images/banner_women.jpg"
              alt="Women's Fragrances"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-1">
                Explore Collection
              </span>
              <h2 className="text-xl sm:text-2xl font-serif tracking-[0.16em] uppercase font-medium">
                Women
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 mt-2 font-medium group-hover:text-white transition-colors">
                <span>View Perfumes</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: UNISEX */}
          <div
            onClick={() => {
              setActiveTab("Unisex");
              scrollToSection("collection-grid");
            }}
            className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-xs cursor-pointer bg-neutral-900"
          >
            <img
              src="/images/banner_unisex.jpg"
              alt="Unisex Fragrances"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-1">
                Explore Collection
              </span>
              <h2 className="text-xl sm:text-2xl font-serif tracking-[0.16em] uppercase font-medium">
                Unisex
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 mt-2 font-medium group-hover:text-white transition-colors">
                <span>View Perfumes</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. COLLECTION TABS & PRODUCT CAROUSEL / GRID
          Matching `collection_tabs_carousel_zpr39c`
      ───────────────────────────────────────────────────────────── */}
      <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Section Heading & Tabs */}
        <div className="text-center space-y-4 mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.28em] text-neutral-500 font-medium">
            Signature Creations
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif uppercase tracking-widest text-neutral-950 font-light">
            Extrait de Parfum
          </h2>

          {/* Tabs Filter matching House of Sahare */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-4 border-b border-neutral-200 pb-3">
            <button
              onClick={() => setActiveTab("Men")}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all relative pb-2 ${
                activeTab === "Men"
                  ? "text-neutral-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-neutral-950"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              Men’s Perfumes
            </button>

            <button
              onClick={() => setActiveTab("Women")}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all relative pb-2 ${
                activeTab === "Women"
                  ? "text-neutral-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-neutral-950"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              Women’s Perfumes
            </button>

            <button
              onClick={() => setActiveTab("Unisex")}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all relative pb-2 ${
                activeTab === "Unisex"
                  ? "text-neutral-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-neutral-950"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              Unisex Perfumes
            </button>

            <button
              onClick={() => setActiveTab("All")}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all relative pb-2 ${
                activeTab === "All"
                  ? "text-neutral-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-neutral-950"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              All Creations
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(p) => setQuickViewProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DISCOVERY BOX PROMO VAULT HIGHLIGHT
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] border-y border-neutral-200/80 my-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <div className="w-full lg:w-1/2 aspect-square max-w-md mx-auto rounded-xs overflow-hidden bg-white border border-neutral-200 shadow-sm">
              <img
                src="/products/discovery.jpg"
                alt="House of Sahare Discovery Box"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-4 text-left">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#c5a880] font-semibold">
                The Sampling Ritual
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light text-neutral-950 uppercase tracking-wider">
                Sahare Discovery Box
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl">
                Experience 5 of our most celebrated extrait de parfum creations in deluxe 10ml travel atomizers. Includes a 100% redeemable voucher for your first 50ml full bottle purchase.
              </p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-xl font-bold text-neutral-950">Rs.6,500</span>
                <span className="text-sm text-neutral-400 line-through">Rs.8,500</span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                  Free Delivery + Free 3ml Tester
                </span>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const disc = PRODUCTS.find((p) => p.id === "discovery-box");
                    if (disc) handleAddToCart(disc, 1);
                  }}
                  className="bg-neutral-950 hover:bg-neutral-800 text-white px-7 py-3 rounded-xs text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm"
                >
                  Add Discovery Box to Cart
                </button>
                <button
                  onClick={() => {
                    const disc = PRODUCTS.find((p) => p.id === "discovery-box");
                    if (disc) setQuickViewProduct(disc);
                  }}
                  className="border border-neutral-300 hover:border-neutral-950 text-neutral-900 px-6 py-3 rounded-xs text-xs uppercase tracking-[0.18em] font-medium transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. BRAND PHILOSOPHY / ABOUT US
      ───────────────────────────────────────────────────────────── */}
      <section id="about-sahare" className="max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center space-y-5">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
          About House of Saharé
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-widest text-neutral-950 font-light">
          Pakistan&apos;s Original Niche Perfume Brand
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light italic max-w-2xl mx-auto">
          &ldquo;SAHARÉ is a modern fragrance house dedicated to creating memorable scent experiences through quality, craftsmanship, and attention to detail. Every fragrance is formulated at true Extrait de Parfum strength for uncompromised performance and elegance.&rdquo;
        </p>

        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-neutral-200 mt-10">
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 block">35%+</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Extrait Concentration</span>
          </div>
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 block">14+ Hours</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">All-Day Longevity</span>
          </div>
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 block">Free 3ml</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Tester with Every Order</span>
          </div>
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 block">100%</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Nationwide Free Delivery</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FOOTER
          Matching `shopify-section-sections--19473826316442__footer`
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
            {/* Col 1: About */}
            <div className="space-y-4">
              <span className="font-serif text-xl tracking-[0.24em] font-bold text-white block">
                SAHARÉ
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                SAHARÉ is a modern fragrance house dedicated to creating memorable scent experiences through quality, craftsmanship, and attention to detail.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, "Hi! I have a question about House of Sahare fragrances.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>WhatsApp Concierge: +92 332 2224331</span>
                </a>
              </div>
            </div>

            {/* Col 2: Shop */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Shop
              </h3>
              <ul className="space-y-2 text-xs text-neutral-400 font-light">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("Men");
                      scrollToSection("collection-grid");
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Perfumes for Men
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("Women");
                      scrollToSection("collection-grid");
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Perfumes for Women
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("Unisex");
                      scrollToSection("collection-grid");
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Unisex Perfumes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const disc = PRODUCTS.find((p) => p.id === "discovery-box");
                      if (disc) setQuickViewProduct(disc);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Discovery Box (Sampler Set)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Company
              </h3>
              <ul className="space-y-2 text-xs text-neutral-400 font-light">
                <li>
                  <button onClick={() => scrollToSection("about-sahare")} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500">Blogs &amp; Stories</span>
                </li>
                <li>
                  <a
                    href={getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, "Hello House of Sahare")}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <span className="text-neutral-500">FAQs &amp; Guidance</span>
                </li>
                <li>
                  <span className="text-neutral-500">Where To Find Us</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Customer Care & Newsletter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Customer Care
              </h3>
              <ul className="space-y-2 text-xs text-neutral-400 font-light">
                <li>
                  <span className="text-neutral-300">Free Nationwide Shipping (Pakistan)</span>
                </li>
                <li>
                  <span className="text-neutral-300">Cash on Delivery (COD) Available</span>
                </li>
                <li>
                  <span className="text-neutral-300">Complimentary 3ml Tester Included</span>
                </li>
                <li>
                  <span className="text-neutral-300">Easy 7-Day Exchange Policy</span>
                </li>
              </ul>

              <div className="pt-3">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1.5 font-semibold">
                  Subscribe to Saharé
                </span>
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full text-xs px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
                  />
                  <button
                    type="button"
                    onClick={() => alert("Thank you for subscribing to House of Sahare VIP Club.")}
                    className="px-3 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-200"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Payment Methods */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>&copy; {new Date().getFullYear()} HOUSE OF SAHARÉ. All rights reserved.</p>
            <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
              <span>Cash on Delivery (COD)</span>
              <span>&bull;</span>
              <span>Bank Transfer</span>
              <span>&bull;</span>
              <span>Visa &amp; Mastercard</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          9. FLOATING WHATSAPP BUTTON (DIRECT ORDER / CONCIERGE)
      ───────────────────────────────────────────────────────────── */}
      <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
        <a
          href={getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, "Hi! I am browsing House of Sahare perfumes and would like assistance.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group font-medium text-xs tracking-wider"
          title="Chat with House of Saharé Concierge"
        >
          <MessageCircle size={20} className="shrink-0" />
          <span className="hidden sm:inline">WhatsApp Concierge</span>
        </a>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          10. MOBILE NAVIGATION DRAWER
      ───────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm animate-fade">
          <aside className="w-4/5 max-w-sm bg-white h-full flex flex-col justify-between p-6 shadow-2xl animate-drawer-left">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-neutral-100">
                <span className="font-serif text-xl font-bold tracking-[0.25em] text-neutral-950">
                  SAHARÉ
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-black rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="py-6 space-y-4 text-sm uppercase tracking-[0.2em] font-semibold text-neutral-900">
                <div>
                  <button
                    onClick={() => {
                      const disc = PRODUCTS.find((p) => p.id === "discovery-box");
                      if (disc) setQuickViewProduct(disc);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-[#c5a880]"
                  >
                    Discovery Box
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setActiveTab("Men");
                      scrollToSection("collection-grid");
                    }}
                    className="block w-full text-left py-2 hover:text-[#c5a880]"
                  >
                    Men’s Perfumes
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setActiveTab("Women");
                      scrollToSection("collection-grid");
                    }}
                    className="block w-full text-left py-2 hover:text-[#c5a880]"
                  >
                    Women’s Perfumes
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setActiveTab("Unisex");
                      scrollToSection("collection-grid");
                    }}
                    className="block w-full text-left py-2 hover:text-[#c5a880]"
                  >
                    Unisex Perfumes
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => scrollToSection("about-sahare")}
                    className="block w-full text-left py-2 hover:text-[#c5a880]"
                  >
                    About Us
                  </button>
                </div>
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <div className="text-xs text-neutral-500">
                Free Nationwide Delivery across Pakistan
              </div>
              <a
                href={getDirectWhatsAppUrl(STORE_CONFIG.whatsappNumber, "Hi! I am contacting from the website.")}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded text-xs uppercase tracking-wider font-semibold"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </aside>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          11. DRAWERS & MODALS
      ───────────────────────────────────────────────────────────── */}
      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={handleOpenCartCheckout}
      />

      {/* Search Drawer */}
      <SearchDrawer
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Login Drawer */}
      <LoginDrawer
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />

      {/* Quick View Fragrance Notes Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cash on Delivery Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        product={directCheckoutProduct}
        cartItems={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}