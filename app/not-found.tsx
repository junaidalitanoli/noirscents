import Link from "next/link";
import { Compass, Home, ArrowRight, Sparkles } from "lucide-react";

export default function NotFound() {
  const collectionLinks = [
    { label: "All Fragrances", href: "/collections/all" },
    { label: "Men's Collection", href: "/collections/men" },
    { label: "Women's Collection", href: "/collections/women" },
    { label: "Bundles & Deals", href: "/collections/deals" },
    { label: "Discovery Testers", href: "/collections/testers" },
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white text-zinc-900">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-zinc-950 text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center mx-auto shadow-xl">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#b48325] block">
          404 &bull; Page Not Found
        </span>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950">
          Fragrance Lost to the Wind
        </h1>

        <p className="text-sm text-zinc-600 leading-relaxed max-w-sm mx-auto font-light">
          The perfume, collection, or document you are searching for does not exist or may have moved. Explore our signature creations below.
        </p>

        {/* Home & All Products CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-950 text-[#fef08a] rounded-xl font-bold text-xs hover:bg-zinc-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#d4af37]" /> Return to Home
          </Link>
          <Link
            href="/collections/all"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            Explore All Perfumes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Collection Links */}
        <div className="pt-6 border-t border-zinc-200/80 space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Popular Olfactory Collections</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {collectionLinks.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-3.5 py-1.5 bg-[#f4f4f5] hover:bg-zinc-200 text-zinc-800 text-xs rounded-full font-medium transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
