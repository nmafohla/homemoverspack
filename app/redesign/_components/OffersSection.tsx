"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, Search, Star } from "lucide-react";
import { PARTNER_OFFERS, type PartnerOffer } from "@/data/offers";
import { offerLogo } from "../_data/offerLogos";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All offers",
  ...Array.from(new Set(PARTNER_OFFERS.map((offer) => offer.category))),
] as const;

export function OffersSection() {
  const [category, setCategory] = useState<string>("All offers");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleOffers = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return PARTNER_OFFERS.filter((offer) => {
      const matchesCategory =
        category === "All offers" || offer.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;

      return [offer.brand, offer.title, offer.tagline, offer.description]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [category, query]);

  const copyCode = async (offer: PartnerOffer) => {
    if (!offer.discountCode) return;

    try {
      await navigator.clipboard.writeText(offer.discountCode);
      setCopiedId(offer.id);
      window.setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // Clipboard access can be refused; the code stays visible to copy by hand.
    }
  };

  return (
    <section
      id="offers"
      className="scroll-mt-24 border-b border-paper-edge/60 bg-paper-alt py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Partner offers"
            title={
              <>
                The discounts that
                <br />
                <span className="italic text-accent">actually apply</span> to
                you.
              </>
            }
            lede="Every offer here is negotiated for people who have just moved and checked before it goes in the pack. Filter by what you still need to sort out."
            className="max-w-2xl"
          />

          <Reveal
            delay={200}
            className="font-display shrink-0 text-right text-6xl text-body lg:text-7xl"
          >
            {PARTNER_OFFERS.length}
            <span className="mt-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-body-mute">
              live offers
            </span>
          </Reveal>
        </div>

        {/* Controls */}
        <Reveal delay={120} className="mt-14">
          <label className="relative block max-w-md">
            <span className="sr-only">Search partner offers</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body-mute"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search broadband, paint, removals…"
              className="h-12 w-full rounded-full border border-body/12 bg-paper pl-11 pr-4 text-sm text-body placeholder:text-body-mute focus:border-body/30 focus:outline-none focus:ring-2 focus:ring-ember-500/30"
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                aria-pressed={category === option}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
                  category === option
                    ? "border-body bg-invert text-invert-fg"
                    : "border-body/12 text-body-soft hover:border-body/30 hover:text-body",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Directory */}
        {visibleOffers.length === 0 ? (
          <p className="mt-16 border-t border-paper-edge/70 pt-16 text-center text-body-mute">
            Nothing matches “{query}” in {category.toLowerCase()}. Try a broader
            search.
          </p>
        ) : (
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-paper-edge/70 bg-paper-edge/70 sm:grid-cols-2 lg:grid-cols-3">
            {visibleOffers.map((offer, index) => (
              <Reveal
                key={offer.id}
                delay={Math.min(index, 5) * 70}
                className="group relative flex flex-col bg-paper p-7 transition-colors duration-500 hover:bg-paper-alt"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {(() => {
                      const logo = offerLogo(offer.id);

                      // No supplied mark: the brand name as plain text, with no
                      // chip or frame, so nothing here can be mistaken for a
                      // logo the brand never gave us. The shared h-14 keeps the
                      // row aligned with the cards that do have one.
                      if (!logo) {
                        return (
                          <span className="flex h-14 items-center">
                            <span className="text-[17px] font-semibold text-body">
                              {offer.brand}
                            </span>
                          </span>
                        );
                      }

                      return (
                        <>
                          <span
                            className={cn(
                              "flex h-14 w-28 items-center justify-center overflow-hidden rounded-xl p-2 ring-1",
                              logo.chip === "dark"
                                ? "bg-ink-900 ring-white/10"
                                : "bg-white ring-body/[0.08]",
                            )}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={logo.src}
                              alt={offer.brand}
                              loading="lazy"
                              decoding="async"
                              className="max-h-full max-w-full object-contain"
                            />
                          </span>
                          <span className="sr-only">{offer.brand}</span>
                        </>
                      );
                    })()}
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-body-mute">
                      {offer.category}
                    </p>
                  </div>

                  {offer.featured && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ember-500/12 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">
                      <Star
                        className="h-3 w-3 fill-current"
                        aria-hidden="true"
                      />
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-6 text-[1.4rem] leading-snug text-body">
                  {offer.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-body-soft">
                  {offer.description}
                </p>

                {offer.discountCode && (
                  <button
                    type="button"
                    onClick={() => void copyCode(offer)}
                    className="mt-6 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-body/20 bg-paper-alt/80 px-4 py-3 text-left transition-colors duration-300 hover:border-ember-500/60 hover:bg-ember-500/[0.06]"
                  >
                    <span className="font-mono text-[13px] font-semibold tracking-wider text-body">
                      {offer.discountCode}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-body-mute">
                      {copiedId === offer.id ? (
                        <>
                          <Check
                            className="h-3.5 w-3.5 text-sage-500"
                            aria-hidden="true"
                          />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy
                        </>
                      )}
                    </span>
                  </button>
                )}

                <a
                  href={offer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-body transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-4"
                >
                  {offer.badge}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>

                {offer.terms && (
                  <p className="mt-4 border-t border-paper-edge/70 pt-4 text-[11.5px] leading-relaxed text-body-mute">
                    {offer.terms}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
