"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { VIDEO_GUIDES, type VideoGuide } from "@/data/videos";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Modal } from "./Modal";

export function VideoGuidesSection() {
  const [activeGuide, setActiveGuide] = useState<VideoGuide | null>(null);

  return (
    <section
      id="videos"
      className="scroll-mt-24 bg-ink-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Video guides"
          title={
            <>
              The five-minute answers to
              <br />
              <span className="italic text-ember-400">
                the things that go wrong.
              </span>
            </>
          }
          lede="Cold radiators, a boiler you've never seen before, and the list of people who need your new address. Short, practical, UK-specific."
          className="max-w-2xl"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_GUIDES.map((guide, index) => (
            <Reveal key={guide.id} delay={Math.min(index, 5) * 80}>
              <button
                type="button"
                onClick={() => setActiveGuide(guide)}
                className="group w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
              >
                <span className="relative block aspect-16/10 overflow-hidden rounded-2xl bg-ink-800">
                  {/*
                    Plain <img> rather than next/image: these thumbnails are
                    remote (Unsplash) and next/image would need a host allowed
                    in next.config.ts, which belongs to the original design.
                  */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={guide.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,8,12,0.85)_0%,transparent_55%)]" />

                  <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-bone-200 backdrop-blur-sm">
                    {guide.category}
                  </span>

                  <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] font-medium tabular-nums text-bone-200 backdrop-blur-sm">
                    {guide.duration}
                  </span>

                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember-500 text-white shadow-[0_12px_32px_-10px_rgba(242,107,36,0.9)] transition-transform duration-500 ease-out group-hover:scale-110">
                    <Play
                      className="ml-0.5 h-5 w-5 fill-current"
                      aria-hidden="true"
                    />
                  </span>
                </span>

                <span className="font-display mt-5 block text-xl leading-snug text-bone-50 transition-colors duration-300 group-hover:text-ember-300">
                  {guide.title}
                </span>
                <span className="mt-2 block text-[13.5px] leading-relaxed text-bone-300/60">
                  {guide.description}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        isOpen={activeGuide !== null}
        onClose={() => setActiveGuide(null)}
        title={activeGuide?.title ?? "Video guide"}
        className="max-w-4xl"
      >
        {activeGuide && (
          <>
            <div className="aspect-video overflow-hidden rounded-2xl bg-ink-950">
              <iframe
                key={activeGuide.id}
                src={`https://www.youtube-nocookie.com/embed/${activeGuide.youtubeId}?autoplay=1&rel=0`}
                title={activeGuide.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-bone-300/70">
              {activeGuide.description}
            </p>
          </>
        )}
      </Modal>
    </section>
  );
}
