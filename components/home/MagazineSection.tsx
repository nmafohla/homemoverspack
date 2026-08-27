"use client";

import Image from "next/image";
import { BookOpen, Sparkles, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MagazineSection() {
  const magazineHighlights = [
    "Smart Energy Hacks: Save £££ on your heating & electricity bills",
    "Kitchen & Dining Makeovers: From compact flats to family homes",
    "The 48-Hour Unpacking Strategy: Essential room prioritisation",
    "Official UK Address Directory: All the organisations you must notify",
  ];

  return (
    <section
      id="magazine"
      className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Magazine Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Digital Publication • 2026 Edition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              The Official Home Movers Magazine
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore our latest digital lifestyle and home-moving publication.
              Packed with interior design inspiration, practical DIY tutorials,
              partner promotions, and moving hacks tailored to UK homeowners and
              tenants.
            </p>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              {magazineHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-slate-200"
                >
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Read CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="https://homemoverspack.co.uk/?r3d=homemoverspack-magazine-2025"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Read Digital Magazine Online
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Magazine Cover Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Card Layer Backdrop */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-30 blur-lg group-hover:opacity-60 transition duration-500" />

              <div className="relative rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-2xl space-y-6">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                    alt="Home Movers Magazine Cover"
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-600 text-white shadow-sm">
                        Issue 2026
                      </span>
                      <span className="text-xs font-mono font-bold text-white/80">
                        FREE DIGITAL EDITION
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                        HomeMoversPack Lifestyle
                      </p>
                      <h3 className="text-xl font-black text-white leading-snug">
                        Making Your New House a Home
                      </h3>
                      <p className="text-xs text-slate-300">
                        48 Pages of tips, checklists &amp; partner vouchers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-4">
                  <span>Interactive Flipbook Format</span>
                  <span className="text-orange-400 font-semibold flex items-center gap-1">
                    Free Instant Access <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
