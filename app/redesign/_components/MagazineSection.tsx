import { ArrowUpRight, BookOpen } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

const MAGAZINE_URL =
  "https://homemoverspack.co.uk/?r3d=homemoverspack-magazine-2025";

const FEATURES = [
  {
    kicker: "Energy",
    title: "Smart energy hacks",
    blurb: "What actually cuts a heating bill, and what just sounds like it does.",
  },
  {
    kicker: "Interiors",
    title: "Kitchen & dining makeovers",
    blurb: "From compact flats to family homes, on a real budget.",
  },
  {
    kicker: "Method",
    title: "The 48-hour unpack",
    blurb: "Which rooms to finish first so the house works while you sort the rest.",
  },
  {
    kicker: "Admin",
    title: "The UK address directory",
    blurb: "Every organisation that needs telling, in one list.",
  },
] as const;

export function MagazineSection() {
  return (
    <section
      id="magazine"
      className="scroll-mt-24 border-b border-paper-edge/60 bg-paper-alt py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="2026 edition"
              title={
                <>
                  The Home Movers
                  <br />
                  <span className="italic text-accent">Magazine.</span>
                </>
              }
              lede="Our digital publication for people mid-move: interiors that survive contact with a real family, DIY you can finish in a weekend, and the practical UK guidance nobody puts in one place."
            />

            <Reveal delay={220} className="mt-10">
              <a href={MAGAZINE_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Read it online — free
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </a>
            </Reveal>
          </div>

          {/* Contents page, set as type rather than a stock photo. */}
          <div className="lg:col-span-6">
            <Reveal
              delay={140}
              className="rounded-3xl border border-paper-edge/80 bg-paper p-8 shadow-[0_30px_60px_-40px_rgba(6,8,12,0.35)] sm:p-10"
            >
              <p className="flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.22em] text-body-mute">
                <span>Inside this issue</span>
                <span>No. 04</span>
              </p>

              <ul className="mt-8 border-t border-paper-edge/80">
                {FEATURES.map((feature, index) => (
                  <li
                    key={feature.title}
                    className="flex items-baseline gap-5 border-b border-paper-edge/80 py-5"
                  >
                    <span className="font-display w-6 shrink-0 text-sm text-body-faint tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {feature.kicker}
                      </p>
                      <h3 className="font-display mt-1.5 text-xl text-body">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-body-soft">
                        {feature.blurb}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
