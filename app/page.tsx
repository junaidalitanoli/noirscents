"use client";

import React, { useState } from "react";
import ProductCard, { SelectedProductInfo } from "../components/ProductCard";
import CheckoutModal from "../components/CheckoutModal";
import { STORE_CONFIG, getDirectWhatsAppUrl } from "../lib/config";
import {
  Menu,
  X,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  Clock,
  Star,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const businessWhatsApp = STORE_CONFIG.whatsappNumber;

  const handleOpenWhatsAppChat = (customMessage: string) => {
    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const targetUrl = getDirectWhatsAppUrl(businessWhatsApp, customMessage);

    if (isMobile) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const products: Array<{
    id: string;
    title: string;
    price: string;
    category: string;
    image: string;
    volume: string;
  }> = [
    {
      id: "1",
      title: "Noir Intense (Extrait de Parfum)",
      price: "PKR 7,500",
      category: "Extrait de Parfum",
      image: "/products/p1.jpg",
      volume: "50ml Extrait",
    },
    {
      id: "2",
      title: "Royal Amber Oud",
      price: "PKR 8,900",
      category: "Oud Blends",
      image: "/products/p2.jpg",
      volume: "50ml Extrait",
    },
    {
      id: "3",
      title: "Imperial Oud Wood",
      price: "PKR 9,500",
      category: "Oud Blends",
      image: "/products/p5.jpg",
      volume: "50ml Extrait",
    },
    {
      id: "4",
      title: "Desert Velvet Rose",
      price: "PKR 6,400",
      category: "Extrait de Parfum",
      image: "/products/p3.jpg",
      volume: "50ml Extrait",
    },
    {
      id: "5",
      title: "NOIR Discovery Gift Vault",
      price: "PKR 11,500",
      category: "Gift Sets",
      image: "/products/p4.jpg",
      volume: "12x 10ml Vault",
    },
    {
      id: "6",
      title: "Smoky Leather & Tobacco",
      price: "PKR 9,200",
      category: "Extrait de Parfum",
      image: "/products/p6.jpg",
      volume: "50ml Extrait",
    },
  ];

  const handleOpenCheckout = (product: SelectedProductInfo) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setMobileMenuOpen(false);
    const section = document.getElementById("collection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    { label: "All", count: products.length },
    { label: "Extrait de Parfum", count: products.filter((p) => p.category === "Extrait de Parfum").length },
    { label: "Oud Blends", count: products.filter((p) => p.category === "Oud Blends").length },
    { label: "Gift Sets", count: products.filter((p) => p.category === "Gift Sets").length },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-[#C2A676] selection:text-white">
      {/* 1. Responsive Announcement Bar */}
      <div className="bg-stone-950 text-stone-300 text-[11px] sm:text-xs py-2 sm:py-2.5 px-4 text-center tracking-[0.18em] sm:tracking-[0.25em] uppercase font-light border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-[#C2A676] shrink-0 animate-pulse" />
          <span>Complimentary Nationwide Delivery on Orders Above PKR 5,000</span>
        </div>
      </div>

      {/* 2. Responsive Luxury Navigation */}
      <header className="border-b border-stone-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 -ml-1 text-stone-700 hover:text-stone-950 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="text-xs uppercase tracking-widest hidden md:flex items-center gap-7 text-stone-600 font-medium">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className={`py-1 relative transition hover:text-stone-950 ${
                  activeCategory === cat.label
                    ? "text-stone-950 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-stone-950"
                    : ""
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Brand Logo Header */}
          <div className="text-center">
            <a href="#" className="inline-block group">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-[0.25em] sm:tracking-[0.3em] font-semibold uppercase text-stone-950">
                NOIR SCENTS
              </h1>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-[#C2A676] font-medium -mt-1 sm:-mt-0.5">
                Artisanal Parfumerie
              </span>
            </a>
          </div>

          {/* Right Action: Direct WhatsApp Hotline Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                handleOpenWhatsAppChat(
                  "Hello NOIR SCENTS! I would like to inquire about your fragrance collection."
                )
              }
              className="hidden sm:inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-full border border-stone-200 transition duration-200 font-medium"
            >
              <MessageCircle size={14} className="text-[#25D366]" />
              <span>WhatsApp Store</span>
            </button>

            <button
              onClick={() =>
                handleOpenWhatsAppChat("Hello NOIR SCENTS! I would like to place an order.")
              }
              aria-label="Contact on WhatsApp"
              className="sm:hidden p-2 text-stone-800 hover:text-[#25D366] transition"
            >
              <MessageCircle size={22} className="text-[#25D366]" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-5 py-4 space-y-3 animate-in slide-in-from-top-3 duration-200">
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold mb-1">
              Browse Fragrances
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat.label)}
                  className={`text-left text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg border transition ${
                    activeCategory === cat.label
                      ? "bg-stone-950 text-white border-stone-950 font-semibold"
                      : "bg-stone-50 text-stone-700 border-stone-200"
                  }`}
                >
                  {cat.label}
                  <span className="block text-[10px] opacity-70">
                    {cat.count} {cat.count === 1 ? "blend" : "blends"}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={() =>
                  handleOpenWhatsAppChat(
                    "Assalam-o-Alaikum, I want to inquire about Noir Scents perfumes."
                  )
                }
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider py-2.5 rounded-lg font-medium transition"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp Directly</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section with Video Background and High-Contrast Text */}
      <section className="relative w-full min-h-[520px] sm:min-h-[600px] h-[72vh] sm:h-[82vh] overflow-hidden bg-stone-950 flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/40" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 bg-stone-900/80 backdrop-blur-md border border-stone-700/80 px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2A676] animate-ping" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C2A676] font-medium">
              Handcrafted Extrait de Parfum
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-wide font-light mb-4 sm:mb-5 leading-tight sm:leading-none">
            Timeless Essence & Pure Oud
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto mb-7 sm:mb-9 tracking-wide leading-relaxed">
            Concentrated artisanal perfumes macerated in small batches. Experience 12+ hours of lingering, opulent sillage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={() => handleCategoryClick("All")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-200 text-stone-950 text-xs uppercase tracking-[0.22em] px-7 py-3.5 rounded-lg font-medium transition duration-200 shadow-lg"
            >
              <span>Explore Collection</span>
              <ChevronDown size={14} />
            </button>

            <button
              onClick={() =>
                handleOpenWhatsAppChat(
                  "Hello NOIR SCENTS! Please share your perfume recommendations and price list."
                )
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/50 hover:border-white hover:bg-white/10 text-white text-xs uppercase tracking-[0.22em] px-7 py-3.5 rounded-lg transition duration-200 backdrop-blur-sm"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              <span>WhatsApp Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Luxury Trust & Value Strip (Responsive 2-col on Mobile, 4-col on Desktop) */}
      <section className="border-y border-stone-200 bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#C2A676] shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900">
                30% Extrait de Parfum
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                Highest oil concentration for rich longevity
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#C2A676] shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900">
                12+ Hours Longevity
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                Potent sillage with deep woody dry-down
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#C2A676] shrink-0">
              <Truck size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900">
                Nationwide Delivery
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                Free shipping on orders above PKR 5,000
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#C2A676] shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900">
                Cash on Delivery
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                Pay safely at doorstep across Pakistan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Catalog Grid Section */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 scroll-mt-14">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C2A676] font-semibold block mb-2">
            Private Reserve Collection
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif tracking-wider text-stone-900 font-light">
            {activeCategory === "All" ? "Featured Fragrances" : activeCategory}
          </h2>
          <div className="w-16 h-[2px] bg-[#C2A676] mx-auto mt-4" />
        </div>

        {/* Responsive Category Pills (Horizontally scrollable on mobile) */}
        <div className="flex sm:justify-center items-center gap-2 sm:gap-3 mb-10 overflow-x-auto no-scrollbar pb-2 px-1">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
              className={`shrink-0 text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded-full border transition duration-200 font-medium ${
                activeCategory === cat.label
                  ? "bg-stone-950 text-white border-stone-950 shadow-sm"
                  : "bg-white text-stone-600 border-stone-300 hover:border-stone-950"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Responsive Products Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              onSelect={handleOpenCheckout}
            />
          ))}
        </div>
      </section>

      {/* 6. Brand Story Section */}
      <section className="bg-stone-950 text-stone-200 py-16 sm:py-24 px-5 sm:px-8 border-y border-stone-800">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#C2A676] font-semibold">
            The Craft Behind Noir Scents
          </span>
          <h3 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Bottling Elegance Through Artisanal Chemistry
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Every creation at NOIR SCENTS begins with precious raw naturals—aged Cambodian oud, French grasse roses, amber resins, and rich smoky tobaccos. Formulated at pure Extrait concentration, each flask delivers unmatched depth and regal sophistication.
          </p>
          <div className="pt-4">
            <button
              onClick={() =>
                handleOpenWhatsAppChat(
                  "Assalam-o-Alaikum, I'd like to learn more about NOIR SCENTS custom orders and gifts."
                )
              }
              className="inline-flex items-center gap-2 border-b border-[#C2A676] pb-1 text-[#C2A676] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition cursor-pointer"
            >
              <span>Speak with Our Fragrance Specialist</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Verified Client Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C2A676] font-semibold block mb-2">
            Client Impressions
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-wider text-stone-900 font-light">
            Cherished by Fragrance Connoisseurs
          </h3>
          <div className="w-12 h-[1.5px] bg-[#C2A676] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-[#C2A676] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#C2A676" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-4">
                &ldquo;Noir Intense easily lasts over 14 hours on fabric. It smells richer and more multifaceted than designer niche fragrances three times its price.&rdquo;
              </p>
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-stone-900">Dr. Hamza K.</p>
              <p className="text-[11px] text-stone-500 uppercase tracking-wider">Lahore, Pakistan</p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-[#C2A676] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#C2A676" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-4">
                &ldquo;Ordered Royal Amber Oud via WhatsApp checkout. Received within 48 hours in Karachi. The packaging and bottle weight feel truly royal.&rdquo;
              </p>
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-stone-900">Saad Mansoor</p>
              <p className="text-[11px] text-stone-500 uppercase tracking-wider">Karachi, Pakistan</p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-[#C2A676] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#C2A676" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-4">
                &ldquo;The NOIR Discovery Vault was the perfect wedding gift. Every single miniature scent has an unforgettable identity. 10/10 craftsmanship.&rdquo;
              </p>
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-stone-900">Ayesha Tariq</p>
              <p className="text-[11px] text-stone-500 uppercase tracking-wider">Islamabad, Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Responsive Footer */}
      <footer className="border-t border-stone-200 bg-white py-12 sm:py-16 px-5 sm:px-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="font-serif text-base tracking-[0.2em] uppercase text-stone-950 font-semibold mb-3">
              NOIR SCENTS
            </h4>
            <p className="text-[11px] leading-relaxed text-stone-500 max-w-xs">
              Handcrafted artisanal extrait de parfum & rare oriental oud creations. Direct order fulfillment via WhatsApp.
            </p>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-[11px] font-bold text-stone-900 mb-3">
              Fragrance Categories
            </h5>
            <ul className="space-y-2 text-[11px]">
              {categories.slice(1).map((cat) => (
                <li key={cat.label}>
                  <button
                    onClick={() => handleCategoryClick(cat.label)}
                    className="hover:text-stone-950 transition"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-[11px] font-bold text-stone-900 mb-3">
              Ordering & Delivery
            </h5>
            <ul className="space-y-2 text-[11px] text-stone-500">
              <li>Cash on Delivery (COD) Nationwide</li>
              <li>Estimated Delivery: 2-3 Business Days</li>
              <li>Free Shipping on Orders Above PKR 5,000</li>
              <li>Secure Dispatch from Karachi</li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-[11px] font-bold text-stone-900 mb-3">
              WhatsApp Concierge
            </h5>
            <p className="text-[11px] text-stone-500 mb-3">
              Available 7 days a week for fragrance recommendations and tracking:
            </p>
            <button
              onClick={() =>
                handleOpenWhatsAppChat(
                  "Assalam-o-Alaikum NOIR SCENTS! I want to track my order."
                )
              }
              className="inline-flex items-center gap-2 bg-stone-950 text-white px-3.5 py-2 rounded-lg text-[11px] tracking-wider uppercase font-medium hover:bg-stone-800 transition"
            >
              <MessageCircle size={14} className="text-[#25D366]" />
              <span>+{STORE_CONFIG.whatsappNumber}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-stone-200/80 pt-8 text-center text-[11px] text-stone-500 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
          <p>© 2026 NOIR SCENTS. All Rights Reserved.</p>
          <p className="normal-case text-stone-400">
            Crafted for desktop, tablet, and mobile with luxury responsiveness.
          </p>
        </div>
      </footer>

      {/* 9. Floating WhatsApp Mobile Quick Button */}
      <button
        onClick={() =>
          handleOpenWhatsAppChat(
            "Assalam-o-Alaikum NOIR SCENTS! I want to inquire about your fragrances."
          )
        }
        aria-label="Direct WhatsApp Chat"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:shadow-green-500/30 group cursor-pointer"
      >
        <MessageCircle size={22} className="shrink-0" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase pr-1">
          WhatsApp Order
        </span>
      </button>

      {/* 10. WhatsApp Checkout Modal */}
      <CheckoutModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}