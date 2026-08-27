"use client";

import { useState } from "react";
import {
  Star,
  MessageSquareQuote,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5 text-orange-600" />
            UK Mover Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Movers Across the Nation
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Thousands of UK households receive our packs and use our checklist
            tools every month. Here is what our movers have to say.
          </p>
        </div>

        {/* Featured Testimonials Carousel / Showcase */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-lg relative">
            <MessageSquareQuote className="w-12 h-12 text-orange-400/20 absolute top-8 right-8 pointer-events-none" />

            <div className="space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(TESTIMONIALS[currentIndex]?.rating || 5)].map(
                  (_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ),
                )}
                <span className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  5.0 / 5.0 Rating
                </span>
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic">
                &ldquo;{TESTIMONIALS[currentIndex]?.quote}&rdquo;
              </p>

              {/* Author & Meta */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {TESTIMONIALS[currentIndex]?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      {TESTIMONIALS[currentIndex]?.location}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {TESTIMONIALS[currentIndex]?.verifiedMoveDate}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    aria-label="Previous review"
                    className="p-2.5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono font-semibold text-slate-400 px-2">
                    {currentIndex + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    aria-label="Next review"
                    className="p-2.5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
