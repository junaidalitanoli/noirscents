import Link from "next/link";
import { MessageCircle, ArrowRight, ShieldCheck, Clock, Sparkles, Gift, Droplets } from "lucide-react";
import { STORE_CONFIG } from "@/lib/store-config";
import { INITIAL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";

interface CollectionComingSoonProps {
  category: "testers" | "deals" | string;
}

export default function CollectionComingSoon({ category }: CollectionComingSoonProps) {
  const isTesters = category === "testers";
  const whatsappNumber = STORE_CONFIG.whatsappNumber;

  const whatsappMessage = isTesters
    ? "Hi Noir Scent, please add me to the VIP waitlist for the 5ml Discovery Testers and notify me when available."
    : "Hi Noir Scent, I would like to create a custom perfume bundle order with complimentary gift packaging.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Best-seller recommendations so the customer never encounters a dead end
  const recommendedProducts = INITIAL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Haute Parfumerie Status Notice Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#faf8f4] via-[#f5eee3] to-[#efe5d5] dark:from-[#131216] dark:via-[#100f13] dark:to-[#0c0c0f] border border-[#e2d5c3] dark:border-white/10 p-6 sm:p-10 lg:p-12 text-center overflow-hidden shadow-sm">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c9a96a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-black/60 border border-[#c5a059]/40 text-[#8c6314] dark:text-[#f5e7b2] text-[11px] font-bold uppercase tracking-widest shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#b48325] dark:text-[#c9a96a]" />
            <span>
              {isTesters
                ? "Atelier Maceration • Batch 02 In Maturation"
                : "Seasonal Allocation • Assembling in Atelier"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-950 dark:text-white leading-tight">
            {isTesters
              ? "Discovery Sample Flights Are Currently in 45-Day Maceration."
              : "Curated Reserve Bundles Are Being Hand-Packaged."}
          </h2>

          {/* Brand Explanation Copy */}
          <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 font-light leading-relaxed">
            {isTesters
              ? "To protect the delicate volatility of pure botanical extraits, French pear essences, and aged oud oils, our 5ml travel spray atomizers are macerated in small artisan batches for 45 days. The upcoming batch is currently undergoing final quality filtration and will open for ordering soon."
              : "Our curated twin duos and couple pairings are hand-boxed in rigid presentation packaging with velvet lining and gold foil sealing. We are currently packaging our upcoming seasonal allocation for nationwide release."}
          </p>

          {/* Reassurance Notice */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-stone-200/90 dark:border-white/10 text-xs text-stone-700 dark:text-zinc-300 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#9b6f1e] dark:text-[#c9a96a] shrink-0" />
            <span>
              {isTesters
                ? "No need to wait: Order any 50ml full flacon risk-free with our 7-Day Scent Swap Guarantee."
                : "Custom order option: Our WhatsApp concierge can prepare a custom 2-flacon bundle with free shipping."}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>
                {isTesters
                  ? "Join Priority Waitlist on WhatsApp"
                  : "Order Custom Pair on WhatsApp"}
              </span>
            </a>

            <Link
              href="/collections/all"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#121212] hover:bg-black dark:bg-[#c9a96a] dark:hover:bg-[#dfbe7c] text-white dark:text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore Available 50ml Bottles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Three Luxury Reassurance Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111115] border border-stone-200/90 dark:border-zinc-800 text-left space-y-2.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center">
            {isTesters ? (
              <Droplets className="w-4 h-4 text-[#9b6f1e] dark:text-[#c9a96a]" />
            ) : (
              <Gift className="w-4 h-4 text-[#9b6f1e] dark:text-[#c9a96a]" />
            )}
          </div>
          <h3 className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-white uppercase tracking-wider">
            {isTesters ? "5ml Precision Sprayers" : "Rigid Gift Packaging"}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 font-light leading-relaxed">
            {isTesters
              ? "Leak-proof travel spray atomizers delivering a fine micro-mist of 35% pure Extrait strength."
              : "Handcrafted presentation boxes with gold foil embossing, perfect for personal and corporate gifting."}
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111115] border border-stone-200/90 dark:border-zinc-800 text-left space-y-2.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <h3 className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-white uppercase tracking-wider">
            {isTesters ? "Scent Blotting Cards" : "Complimentary TCS Delivery"}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 font-light leading-relaxed">
            {isTesters
              ? "Every flight includes laboratory fragrance strips to test the evolution of top, heart, and base notes."
              : "All multi-bottle pairings automatically qualify for free doorstep Cash on Delivery across Pakistan."}
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111115] border border-stone-200/90 dark:border-zinc-800 text-left space-y-2.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-white uppercase tracking-wider">
            7-Day Scent Swap Guarantee
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-zinc-400 font-light leading-relaxed">
            Order any 50ml flacon today. If the fragrance doesn&apos;t suit your skin chemistry, exchange it effortlessly.
          </p>
        </div>
      </div>

      {/* 3. Recommended Full Flacons Available for Immediate Purchase */}
      <div className="space-y-6 pt-4 border-t border-stone-200/90 dark:border-zinc-800">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#9b6f1e] dark:text-[#c9a96a]">
              In Stock &bull; Dispatched Today
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-950 dark:text-white mt-0.5">
              Available Signature Extraits You Can Experience Today
            </h3>
          </div>
          <Link
            href="/collections/all"
            className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-[#c9a96a] hover:underline flex items-center gap-1 shrink-0 ml-3"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
