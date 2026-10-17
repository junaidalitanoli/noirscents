import Link from "next/link";
import { Compass, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white text-zinc-900">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-zinc-950 text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center mx-auto shadow-xl">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#b48325] block">
          404 &bull; Page Not Found
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-zinc-950">
          Fragrance Lost to the Wind
        </h1>

        <p className="text-sm text-zinc-600 leading-relaxed max-w-sm mx-auto">
          The perfume, collection, or document you are searching for does not exist or has been retired from our catalog.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-950 text-[#fef08a] rounded-xl font-bold text-xs hover:bg-zinc-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#d4af37]" /> Return to Home
          </Link>
          <Link
            href="/collections/men"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            Explore Best Sellers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
