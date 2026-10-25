"use client";

import { useState } from "react";
import { BookOpen, Droplets, Package, HelpCircle, ChevronDown, Check } from "lucide-react";
import { Product } from "@/types";
import { STORE_CONFIG } from "@/lib/store-config";

interface ProductStoryAndApplicationProps {
  product: Product;
}

export default function ProductStoryAndApplication({ product }: ProductStoryAndApplicationProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How does Cash on Delivery (COD) work?",
      a: `Cash on Delivery is available across Karachi, Lahore, Islamabad, and 250+ cities across Pakistan. When your package arrives via ${STORE_CONFIG.couriers}, you simply pay the exact bill in cash to the rider upon receiving your package. No advance card payment needed.`,
    },
    {
      q: "What is your 7-day scent swap guarantee?",
      a: `Fragrance is deeply personal and reacts uniquely to each person's skin chemistry. If this scent profile does not resonate with you, simply message our WhatsApp concierge at ${STORE_CONFIG.whatsappDisplay} within 7 days of receiving your order to arrange a smooth fragrance swap.`,
    },
    {
      q: "How should I store this Extrait flacon in Pakistani weather?",
      a: "Because our formulations contain high percentages of natural perfume oils, keep your flacon in a cool, dry place away from direct sunlight, such as your wardrobe or dressing drawer. Avoid leaving it inside a parked car in direct heat.",
    },
    {
      q: "Can I spray this on clothes as well as skin?",
      a: "Yes! While applying 2–3 sprays directly to warm pulse points (neck, wrists, behind ears) activates the scent's silage, spraying onto natural fabric fibers like cotton, linen, wool, or blazer lapels ensures an intoxicating scent bubble that lasts over 24 hours.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 2-Column Story & Application Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: The Olfactory Story */}
        <div className="p-6 sm:p-8 bg-white dark:bg-[#111115] border border-black/8 dark:border-white/10 space-y-4 transition-colors">
          <div className="flex items-center gap-2.5 pb-3 border-b border-black/8 dark:border-white/10">
            <BookOpen className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
              The Atelier Inspiration
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            {product.description}
          </p>
          {product.inspiration && (
            <div className="pt-2">
              <blockquote className="p-3 bg-[#fbf9f4] dark:bg-[#16161c] border-l-2 border-[#c5a059] dark:border-[#d4af37] text-xs italic text-zinc-700 dark:text-zinc-300">
                &ldquo;{product.inspiration}&rdquo;
              </blockquote>
            </div>
          )}
        </div>

        {/* Right: How to Apply for 14+ Hours */}
        <div className="p-6 sm:p-8 bg-white dark:bg-[#111115] border border-black/8 dark:border-white/10 space-y-4 transition-colors">
          <div className="flex items-center gap-2.5 pb-3 border-b border-black/8 dark:border-white/10">
            <Droplets className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
              How to Wear for 14+ Hours Sillage
            </h3>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#b48325] dark:text-[#d4af37] border border-amber-200 dark:border-amber-700/50 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100 font-medium">Warm Pulse Points:</strong> Spray 2–3 times onto the base of your neck, inner wrists, and behind the earlobes where arterial warmth activates the oil molecules.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#b48325] dark:text-[#d4af37] border border-amber-200 dark:border-amber-700/50 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100 font-medium">Never Rub Wrists:</strong> Friction crushes the volatile top molecules and impairs the natural 3-tier pyramid progression. Let the mist settle naturally.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#b48325] dark:text-[#d4af37] border border-amber-200 dark:border-amber-700/50 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100 font-medium">Fabrics &amp; Lapels:</strong> Spritz your suit lapels, cotton shirts, or dupattas from 6 inches away. The perfume oil clings tenaciously to fibers for multi-day endurance.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-black/6 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Formulated for maximum performance in Pakistani humidity and winter chills.</span>
          </div>
        </div>
      </div>

      {/* Presentation & Unboxing Bar */}
      <div className="p-6 bg-[#121212] dark:bg-[#0c0c10] border border-black/10 dark:border-[#d4af37]/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-800 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-[#c5a059] dark:text-[#d4af37]" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Luxury Unboxing Experience Included
            </h4>
            <p className="text-xs text-zinc-300 dark:text-zinc-400 font-light mt-0.5">
              Weighted crystal flacon, ultra-fine mist atomization pump, and gold-embossed presentation box.
            </p>
          </div>
        </div>

        <div className="text-xs text-zinc-400 shrink-0 border-l border-zinc-700 dark:border-zinc-800 pl-4 hidden md:block">
          Complimentary tester vials included with every full flacon order.
        </div>
      </div>

      {/* Accordion FAQs */}
      <div className="p-6 sm:p-8 bg-white dark:bg-[#111115] border border-black/8 dark:border-white/10 space-y-4 transition-colors">
        <div className="flex items-center gap-2 pb-3 border-b border-black/8 dark:border-white/10">
          <HelpCircle className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 bg-zinc-50/60 dark:bg-[#16161c] hover:bg-zinc-100/70 dark:hover:bg-[#1d1d24] transition-colors"
              >
                <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 shrink-0 ${
                    openFaq === idx ? "rotate-180 text-black dark:text-[#d4af37]" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white dark:bg-[#111115] border-t border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
