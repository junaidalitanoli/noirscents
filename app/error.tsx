"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-white text-zinc-900">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-md">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
          Session Interrupted
        </span>

        <h1 className="font-heading text-3xl font-bold text-zinc-950">
          Something went wrong
        </h1>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          An unexpected error occurred while loading this page. Please try refreshing or return to the main storefront.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-zinc-950 text-white rounded-xl font-bold text-xs hover:bg-zinc-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Request
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" /> Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
