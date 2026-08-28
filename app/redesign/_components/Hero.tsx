import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AMBIENT } from "../_data/media";
import { platinumSponsor } from "../_data/sponsors";
import { BackgroundVideo } from "./BackgroundVideo";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { PackVideo } from "./PackVideo";

const PROOF_POINTS = [
  { figure: "Free", label: "Welcome pack, delivered to your new door" },
  { figure: "£500+", label: "Typical savings across verified partners" },
  { figure: "£10,000", label: "Home makeover draw, free to enter" },
] as const;

export function Hero() {
  const platinum = platinumSponsor();

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink-950 pt-32 pb-10">
      <BackgroundVideo
        clip={AMBIENT.hero}
        opacity={0.9}
        className="grain"
        overlay="bg-[linear-gradient(to_right,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.72)_45%,rgba(6,8,12,0.35)_100%)]"
      />
      {/* Second scrim, vertical, so the header and the footer rule stay legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 bg-[linear-gradient(to_bottom,rgba(6,8,12,0.85)_0%,transparent_28%,transparent_58%,rgba(6,8,12,0.92)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ember-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-400" />
              </span>
              Entries open · 2026 draw
            </Reveal>

            <Reveal
              as="h1"
              delay={90}
              className="font-display mt-7 text-[3.1rem] leading-[0.95] text-bone-50 sm:text-7xl lg:text-[5.6rem]"
            >
              Moving in,
              <br />
              <span className="text-ember-400 italic">made simple.</span>
            </Reveal>

            <Reveal
              as="p"
              delay={180}
              className="mt-8 max-w-xl text-[17px] leading-relaxed text-bone-200/75"
            >
              A free welcome pack on your doormat, the discounts worth having
              from brands you already know, and a checklist that remembers the
              eleven things everyone forgets. Then we put you in the draw for a
              £10,000 home makeover.
            </Reveal>

            <Reveal
              delay={260}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a href="#prize-draw">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Enter the £10,000 draw
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </a>
              <a href="#offers">
                <Button variant="onDark" size="lg" className="w-full sm:w-auto">
                  See partner offers
                </Button>
              </a>
            </Reveal>
          </div>

          {/* The pack itself, floating free of any card. */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <Reveal delay={320} className="relative">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/20 blur-[80px]"
              />
              <PackVideo />
            </Reveal>
          </div>
        </div>

        {/* Proof rail */}
        <Reveal
          delay={380}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-bone-100/10 bg-bone-100/10 sm:grid-cols-3"
        >
          {PROOF_POINTS.map((point) => (
            <div
              key={point.figure}
              className="bg-ink-950/70 px-6 py-6 backdrop-blur-sm"
            >
              <p className="font-display text-3xl text-bone-50">
                {point.figure}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-bone-300/65">
                {point.label}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bone-300/45">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            What&rsquo;s in the pack
          </div>

          {/*
            The platinum lockup. Placement on the hero is the benefit that
            separates platinum from gold, so it sits in the first screenful
            rather than down in the banner stack.
          */}
          {platinum?.logo && (
            <a
              href={platinum.href}
              target="_blank"
              rel="noopener sponsored"
              aria-label={`Sponsored by ${platinum.brand}`}
              className="group flex items-center gap-3.5 rounded-full border border-bone-100/12 bg-ink-950/40 py-2 pl-4 pr-5 backdrop-blur-sm transition-colors duration-500 hover:border-bone-100/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-bone-300/50">
                Sponsored by
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={platinum.logo.src}
                alt={platinum.brand}
                width={platinum.logo.width}
                height={platinum.logo.height}
                className="h-5 w-auto opacity-85 transition-opacity duration-500 group-hover:opacity-100"
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
