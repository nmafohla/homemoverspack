"use client";

import {
  Package,
  Coffee,
  Tag,
  FileText,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

export function PackShowcase() {
  const packItems = [
    {
      icon: Coffee,
      title: "First Kettle Break Essentials",
      description:
        "Premium tea, coffee, and refreshments ready to brew on arrival before unpacking.",
      badge: "Welcome Treat",
    },
    {
      icon: Tag,
      title: "Exclusive Partner Vouchers",
      description:
        "Significant discounts on broadband, smart alarms, furniture, paint, and removal tasks.",
      badge: "Up to £500 Value",
    },
    {
      icon: FileText,
      title: "Official Moving Checklist",
      description:
        "Comprehensive step-by-step moving guide and meter reading log to prevent billing disputes.",
      badge: "Stress Free",
    },
    {
      icon: ShieldCheck,
      title: "Government Utility Advice",
      description:
        "Direct guidance on energy efficiency, Council Tax transitions, and DVLA updates.",
      badge: "Help For Households",
    },
  ];

  return (
    <section
      id="welcome-pack"
      className="py-20 lg:py-28 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5 text-orange-600" />
            Our Concept Is Simple
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            A Genuine Welcome to Your New Home
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Moving is one of life’s biggest milestones — and one of the most
            hectic. We partner with trusted UK brands to deliver a complimentary
            welcome pack directly to your door, filled with useful products,
            helpful advice, and real savings.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1.5">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Included in Welcome Pack</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Just opened your HomeMoversPack box?
            </h3>
            <p className="text-orange-100 text-sm max-w-xl">
              Register your pack to automatically enter our £10,000 prize draw
              and access digital vouchers for online ordering.
            </p>
          </div>
          <a
            href="#prize-draw"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shrink-0 shadow-md text-sm cursor-pointer"
          >
            Register Pack &amp; Enter Draw
          </a>
        </div>
      </div>
    </section>
  );
}
