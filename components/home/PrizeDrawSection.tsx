"use client";

import { Gift } from "lucide-react";
import { PrizeDrawForm } from "./PrizeDrawForm";

export function PrizeDrawSection() {
  return (
    <section
      id="prize-draw"
      className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Prize Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold">
              <Gift className="w-3.5 h-3.5" />
              <span>Annual Mover Competition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Win <span className="text-orange-400">£10,000</span> for Your Home
              Makeover
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Every year we help one UK mover completely transform their new
              home with £10,000 in shopping vouchers for leading home,
              furniture, appliance, and DIY retailers.
            </p>

            {/* Prize Breakdown Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg">
                    1st
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      £10,000 Store Vouchers
                    </h4>
                    <p className="text-xs text-slate-400">
                      Home makeover shopping spree
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">
                  Grand Prize
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-base">
                    2nd
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      Eufy Smart Security Suite
                    </h4>
                    <p className="text-xs text-slate-400">
                      Doorbell, cameras &amp; base station
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  Smart Home
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-base">
                    3rd
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      Airtasker Home Credit
                    </h4>
                    <p className="text-xs text-slate-400">
                      Free handyman &amp; cleaning services
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  Task Credit
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Draw closes <strong>31 December 2026</strong>. Free to enter for
              UK residents aged 18+.
            </p>
          </div>

          {/* Right Column: Entry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl">
              <PrizeDrawForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
