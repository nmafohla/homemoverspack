"use client";

import { useState, useMemo } from "react";
import { Search, Tag, ExternalLink, Copy, Check, Filter } from "lucide-react";
import { PARTNER_OFFERS, PartnerOffer } from "@/data/offers";
import { Button } from "@/components/ui/Button";

export function OffersSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const categories = [
    "All",
    "Broadband & Tech",
    "Home & Security",
    "Kitchen & Dining",
    "Decor & DIY",
    "Essential Services",
    "Lifestyle & Food",
  ];

  const filteredOffers = useMemo(() => {
    return PARTNER_OFFERS.filter((offer) => {
      const matchesCategory =
        selectedCategory === "All" || offer.category === selectedCategory;
      const matchesSearch =
        offer.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCode = (offer: PartnerOffer) => {
    if (!offer.discountCode) return;
    navigator.clipboard.writeText(offer.discountCode);
    setCopiedCodeId(offer.id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <section
      id="offers"
      className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-orange-600" />
            Exclusive Partner Perks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Verified Mover Discounts &amp; Deals
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Save hundreds on broadband setup, smart alarms, designer cookware,
            eco paints, and local handymen with our official UK partner network.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-10 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partner offers (e.g. broadband, ADT, Le Creuset, paint, cleaning)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white dark:bg-orange-500 dark:text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-400/60 dark:hover:border-orange-500/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Brand & Badge Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {offer.brand}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                      {offer.title}
                    </h3>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                    {offer.badge}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {offer.tagline}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Action Area */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {offer.discountCode ? (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col pl-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Promo Code
                      </span>
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white tracking-wider">
                        {offer.discountCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer)}
                      aria-label="Copy promo code"
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      {copiedCodeId === offer.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-2">
                  <a
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center gap-1.5 text-xs"
                    >
                      Claim Offer
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>

                {offer.terms && (
                  <p className="text-[10px] text-slate-400 text-center italic">
                    *{offer.terms}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-base text-slate-600 dark:text-slate-400">
              No partner offers found matching &quot;{searchQuery}&quot;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
