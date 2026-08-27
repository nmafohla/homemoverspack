"use client";

import Image from "next/image";
import {
  Sparkles,
  CheckCircle2,
  Shield,
  ArrowRight,
  Gift,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Headline & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              <span>Official UK Mover Welcome Service 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Moving In{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Made Simple.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We take the stress out of your home move with welcome packs of
              essential household products, exclusive partner discounts from
              leading UK brands, and our annual £10,000 home makeover prize
              draw.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Welcome Packs</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Gift className="w-4 h-4 text-orange-600 shrink-0" />
                <span>£10,000 Makeover Draw</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Verified UK Brand Partners</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#prize-draw" className="w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto gap-2 group shadow-lg shadow-orange-500/25"
                >
                  <Award className="w-5 h-5" />
                  Enter £10,000 Prize Draw
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#offers" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                >
                  Browse Partner Offers
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column - Hero Visual Card / Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 overflow-hidden">
              {/* Background ambient accents */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl" />

              {/* Floating Mover Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center p-1">
                    <Image
                      src="/images/pack-box.png"
                      alt="Home Movers Welcome Box"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      Your Welcome Companion
                    </h3>
                    <p className="text-xs text-slate-400">
                      Delivered directly to UK doorsteps
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Active
                </span>
              </div>

              {/* Card Feature Highlights */}
              <div className="space-y-4 py-6">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Home Movers Welcome Box
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Complimentary tea, coffee, household essentials &amp;
                      curated vouchers.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-900 shrink-0 mt-0.5 font-bold">
                    £
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      £10,000 Makeover Draw
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Enter free to win shopping vouchers for furniture,
                      appliances, and decor.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Verified Partner Savings
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Up to £500+ in discounts with ADT, EE Fibre, Airtasker, Le
                      Creuset &amp; AEG.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Draw Closes: 31 December 2026</span>
                <a
                  href="#welcome-pack"
                  className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
