import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-b border-paper-edge/60 bg-paper py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Mover reviews"
          title={
            <>
              What people say when
              <br />
              <span className="italic text-accent">the box arrives.</span>
            </>
          }
          lede="Unedited feedback from verified UK movers who received a pack this year."
          className="max-w-2xl"
        />

        {/* Masonry via CSS columns: quotes vary in length and shouldn't be padded
            out to a uniform card height. */}
        <div className="mt-16 gap-6 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={Math.min(index, 5) * 70}
              className="mb-6 break-inside-avoid"
            >
              <figure className="rounded-2xl border border-paper-edge/70 bg-paper-alt/60 p-7 transition-colors duration-500 hover:bg-paper-alt">
                <div
                  className="flex gap-0.5"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      aria-hidden="true"
                      className={
                        starIndex < testimonial.rating
                          ? "h-3.5 w-3.5 fill-ember-500 text-ember-500"
                          : "h-3.5 w-3.5 text-body-faint"
                      }
                    />
                  ))}
                </div>

                <blockquote className="font-display mt-5 text-[1.35rem] leading-[1.4] text-body">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <p className="mt-5 text-[13px] leading-relaxed text-body-mute">
                  {testimonial.highlight}
                </p>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-paper-edge/70 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-invert text-[12px] font-semibold text-invert-fg"
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-semibold text-body">
                      {testimonial.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-body-mute">
                      {testimonial.location} · {testimonial.verifiedMoveDate}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
