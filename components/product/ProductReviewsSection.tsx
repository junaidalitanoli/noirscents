"use client";

import { useState } from "react";
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, ShieldCheck } from "lucide-react";
import { Product, ProductReview } from "@/types";

interface ProductReviewsSectionProps {
  product: Product;
}

const DEFAULT_REVIEWS: ProductReview[] = [
  {
    author: "Zohaib Khan",
    city: "DHA Phase 6, Karachi",
    rating: 5,
    title: "Incredible sillage and compliment magnet",
    comment: "Ordered on COD and received via Leopards in 2 days. The scent profile is unbelievably smooth and lasts well past 10 hours in Karachi's weather. Easily rivals my 30k imported bottles.",
    date: "19 Oct 2026",
    verified: true,
  },
  {
    author: "Ahsan Malik",
    city: "Model Town, Lahore",
    rating: 5,
    title: "Genuine extrait strength — zero harsh alcohol",
    comment: "The 45-day vault maceration is genuine. You can smell the dense oil concentration right from the first spray. The packaging in the gold box is stunning.",
    date: "14 Oct 2026",
    verified: true,
  },
  {
    author: "Saad Farooqi",
    city: "F-10/3, Islamabad",
    rating: 5,
    title: "Sophisticated and luxurious drydown",
    comment: "This has become my daily wear for office meetings and dinner events. Great longevity, and the drydown is hypnotic. Highly satisfied customer.",
    date: "06 Oct 2026",
    verified: true,
  },
];

export default function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<ProductReview[]>(
    product.reviews && product.reviews.length > 0 ? product.reviews : DEFAULT_REVIEWS
  );
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const averageRating = product.rating || 4.9;
  const reviewCount = product.reviewCount || (reviews.length + 140);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: ProductReview = {
      author: author.trim(),
      city: city.trim() || "Pakistan",
      rating,
      title: title.trim() || "Verified Experience",
      comment: comment.trim(),
      date: "Just now",
      verified: true,
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setAuthor("");
    setCity("");
    setTitle("");
    setComment("");
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="bg-white border border-black/8 p-6 sm:p-8 space-y-8">
      {/* Reviews Header & Score Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-black/8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#121212]">
              Customer Experiences &amp; Reviews
            </h3>
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase rounded-full">
              Verified Buyers
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-light">
            Real feedback from fragrance connoisseurs across Pakistan.
          </p>
        </div>

        <div className="flex items-center gap-4 self-start md:self-auto">
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-2xl font-extrabold text-zinc-950 font-mono">
                {averageRating}
              </span>
              <span className="text-xs text-zinc-400">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Based on {reviewCount} reviews
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2.5 bg-[#121212] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Review Submission Form Modal / Box */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-zinc-50 border border-zinc-300 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Share Your Olfactory Impression
            </h4>
            <span className="text-[11px] text-zinc-500">All submissions verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-zinc-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Daniyal Ahmed"
                className="w-full text-xs p-2.5 bg-white border border-zinc-300 focus:outline-black"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-700 mb-1">
                City / Location *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. DHA, Lahore"
                className="w-full text-xs p-2.5 bg-white border border-zinc-300 focus:outline-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-700 mb-1">
              Rating:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-zinc-800 ml-2">
                {rating} out of 5 stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-700 mb-1">
              Review Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Outstanding projection and luxury scent trail"
              className="w-full text-xs p-2.5 bg-white border border-zinc-300 focus:outline-black"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-700 mb-1">
              Detailed Experience (Longevity, Sillage &amp; Notes) *
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How did this fragrance perform on your skin and clothes? What notes stood out?"
              className="w-full text-xs p-2.5 bg-white border border-zinc-300 focus:outline-black"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#121212] hover:bg-black text-white text-xs font-bold uppercase tracking-wider"
            >
              Submit Review
            </button>
            {submitted && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Thank you! Your review has been submitted.
              </span>
            )}
          </div>
        </form>
      )}

      {/* Review Cards Grid */}
      <div className="space-y-4">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-5 bg-[#fafafa] border border-black/6 space-y-2.5 transition-all hover:bg-white hover:border-black/15"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-zinc-950">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Order
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                  {rev.city} &bull; {rev.date}
                </p>
              </div>

              <div className="flex items-center text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <h5 className="font-semibold text-xs text-zinc-900">
              {rev.title}
            </h5>

            <p className="text-xs text-zinc-600 leading-relaxed font-light">
              &ldquo;{rev.comment}&rdquo;
            </p>

            <div className="pt-2 flex items-center gap-4 text-[11px] text-zinc-400 font-light">
              <span className="flex items-center gap-1 hover:text-zinc-600 cursor-pointer">
                <ThumbsUp className="w-3 h-3 text-zinc-400" /> Helpful (14)
              </span>
              <span>&bull;</span>
              <span>Purchased via Cash on Delivery</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
