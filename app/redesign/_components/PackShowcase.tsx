import { Coffee, FileText, ShieldCheck, Tag } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const PACK_CONTENTS = [
  {
    icon: Coffee,
    title: "The first kettle break",
    description:
      "Tea, coffee and something to eat, packed at the top so it is the first box you open — not the last one you find.",
    meta: "Welcome treat",
  },
  {
    icon: Tag,
    title: "Partner vouchers worth having",
    description:
      "Broadband, smart alarms, furniture, paint and removal help. Verified UK brands, no filler codes that expired last year.",
    meta: "Up to £500 value",
  },
  {
    icon: FileText,
    title: "The moving checklist and meter log",
    description:
      "Every step from eight weeks out to your first week in, plus a meter reading page that settles billing disputes before they start.",
    meta: "Printed and online",
  },
  {
    icon: ShieldCheck,
    title: "Straight answers on the admin",
    description:
      "Council Tax, energy efficiency, the electoral roll and DVLA — the official guidance, without the government-website maze.",
    meta: "Help for households",
  },
] as const;

export function PackShowcase() {
  return (
    <section
      id="welcome-pack"
      className="scroll-mt-24 border-b border-paper-edge/60 bg-paper py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* The heading holds its own column and stays put while the list scrolls. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="The welcome pack"
                title={
                  <>
                    A real welcome,
                    <br />
                    <span className="italic text-accent">
                      not a leaflet drop.
                    </span>
                  </>
                }
                lede="Moving is one of the biggest things you will do, and the week you arrive is the week nobody helps. So we send a box that covers the first few days and the first few decisions."
              />

              <Reveal
                delay={240}
                className="mt-10 flex items-center gap-4 border-t border-paper-edge/70 pt-8"
              >
                <span className="font-display text-5xl text-body">Free</span>
                <span className="max-w-[14rem] text-[13px] leading-snug text-body-mute">
                  No catch and no card details. Partner brands cover the cost of
                  the pack.
                </span>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-paper-edge/70">
              {PACK_CONTENTS.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={index * 90}
                  className="group border-b border-paper-edge/70 py-8 transition-colors duration-500 hover:bg-paper-alt/70"
                >
                  <div className="flex items-start gap-6 px-1 sm:gap-8">
                    <span className="font-display mt-1 w-8 shrink-0 text-lg text-body-faint tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-display text-2xl text-body sm:text-[1.7rem]">
                          {item.title}
                        </h3>
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                          {item.meta}
                        </span>
                      </div>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body-soft">
                        {item.description}
                      </p>
                    </div>

                    <item.icon
                      className="mt-1.5 h-5 w-5 shrink-0 text-body-faint transition-colors duration-500 group-hover:text-ember-500"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
