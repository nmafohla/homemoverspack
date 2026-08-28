import { sponsorsByTier, type Sponsor } from "../_data/sponsors";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * One banner slot.
 *
 * The slot reserves its aspect ratio from the artwork's real dimensions, so the
 * page doesn't shift as creatives load — banners sit above the fold on most
 * screens and a late reflow would move whatever the reader was already looking
 * at. Plain <img> rather than next/image: these are remote WordPress uploads,
 * and next/image would need each host allowlisted in next.config.ts.
 */
function BannerSlot({
  sponsor,
  className,
  priority,
}: {
  sponsor: Sponsor;
  className?: string;
  priority?: boolean;
}) {
  const { banner, brand, href } = sponsor;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener sponsored"
      aria-label={`${brand} — advertisement`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-paper-edge/70 bg-paper-alt transition-all duration-500",
        "hover:border-body/25 hover:shadow-[0_18px_40px_-28px_rgba(6,8,12,0.6)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.src}
        alt={`${brand} advertisement`}
        width={banner.width}
        height={banner.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        style={{ aspectRatio: `${banner.width} / ${banner.height}` }}
      />
    </a>
  );
}

function TierLabel({ children }: { children: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-body-mute">
        {children}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-paper-edge/70" />
    </div>
  );
}

export function SponsorBanners() {
  const platinum = sponsorsByTier("platinum");
  const gold = sponsorsByTier("gold");
  const silver = sponsorsByTier("silver");

  return (
    <section
      id="partners"
      className="scroll-mt-24 border-b border-paper-edge/60 bg-paper py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our partners"
          title={
            <>
              The brands who put
              <br />
              <span className="italic text-accent">the pack together.</span>
            </>
          }
          lede="Every partner here funds a free pack for a UK mover. Their offers are the ones we would actually recommend to someone who moved in last week."
          className="max-w-2xl"
        />

        <div className="mt-16 space-y-16">
          {/* Platinum — largest slot, first position, one partner only. */}
          {platinum.length > 0 && (
            <div>
              <TierLabel>Platinum partner</TierLabel>
              <div className="space-y-4">
                {platinum.map((sponsor) => (
                  <Reveal key={sponsor.id}>
                    <BannerSlot sponsor={sponsor} priority />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Gold — full width, but a shallower slot than platinum. */}
          {gold.length > 0 && (
            <div>
              <TierLabel>Gold partners</TierLabel>
              <div className="grid gap-4 lg:grid-cols-2">
                {gold.map((sponsor, index) => (
                  <Reveal key={sponsor.id} delay={Math.min(index, 4) * 70}>
                    <BannerSlot sponsor={sponsor} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Silver — directory-scale buttons. */}
          {silver.length > 0 && (
            <div>
              <TierLabel>Silver partners</TierLabel>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {silver.map((sponsor, index) => (
                  <Reveal key={sponsor.id} delay={Math.min(index, 8) * 45}>
                    <BannerSlot sponsor={sponsor} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-14 text-[11.5px] text-body-faint">
          Partner advertising. Offers are subject to each brand&rsquo;s own terms.
        </p>
      </div>
    </section>
  );
}
