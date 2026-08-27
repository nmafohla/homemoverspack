"use client";

import { useEffect, useRef, useState } from "react";
import type { AmbientClip } from "@/app/redesign/_data/media";
import { cn } from "@/lib/utils";

interface BackgroundVideoClasses {
  /** Extra classes on the positioned wrapper. */
  className?: string;
  /** Scrim/gradient markup layered above the footage, below the content. */
  overlay?: string;
}

interface BackgroundVideoProps extends BackgroundVideoClasses {
  clip: AmbientClip;
  /** Dials the footage back so foreground copy keeps its contrast. */
  opacity?: number;
}

/**
 * Full-bleed ambient footage.
 *
 * The clip is decorative, so it earns its bytes only when it can actually be
 * seen: nothing downloads until the section scrolls into view, playback pauses
 * again once it leaves, and readers who ask for reduced motion (or whose
 * browser reports a metered/slow connection) get the poster frame instead and
 * never fetch the video at all.
 */
export function BackgroundVideo({
  clip,
  className,
  overlay,
  opacity = 0.85,
}: BackgroundVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // navigator.connection is Chromium-only; absence just means "assume fine".
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const isMetered =
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (motionQuery.matches || isMetered) return;

    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          // play() rejects on autoplay-policy refusals; the poster is the fallback.
          void videoRef.current?.play().catch(() => undefined);
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ backgroundColor: clip.tint }}
    >
      <video
        ref={videoRef}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        onCanPlay={() => setIsPlayable(true)}
        className="h-full w-full scale-105 object-cover transition-opacity duration-1000 ease-out"
        style={{ opacity: isPlayable ? opacity : 0 }}
      >
        {shouldLoad && <source src={clip.src} type="video/mp4" />}
      </video>

      {/* Poster stand-in: keeps the panel from flashing flat tint before decode. */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${clip.poster})`,
          opacity: isPlayable ? 0 : opacity,
        }}
      />

      {overlay && <div className={cn("absolute inset-0", overlay)} />}
    </div>
  );
}
