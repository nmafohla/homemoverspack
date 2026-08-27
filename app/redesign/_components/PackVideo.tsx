"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

/** The server can't know the preference; assume motion is fine and correct on hydration. */
function getServerSnapshot() {
  return false;
}

/**
 * The welcome pack, lid lifting and settling on a loop.
 *
 * The clip carries a baked dark backdrop rather than an alpha channel —
 * transparent video has no single format that plays in every browser — so its
 * edges are feathered with a radial mask instead. That dissolves the frame into
 * the hero rather than leaving a visible rectangle over the ambient footage
 * behind it.
 *
 * Readers who ask for reduced motion get the original still, and so does anyone
 * whose browser refuses to autoplay: the still is the video's own poster frame,
 * so the fallback looks the same either way.
 */
export function PackVideo() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (prefersReducedMotion) {
    return (
      <Image
        src="/images/pack-box.png"
        alt="The HomeMoversPack welcome box"
        width={520}
        height={520}
        priority
        className="relative mx-auto w-full max-w-[27rem] drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/redesign/videos/pack-open.jpg"
      aria-label="The HomeMoversPack welcome box, its lid lifting open and closing again"
      className="relative mx-auto w-full max-w-[30rem] [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_76%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_76%)]"
    >
      <source src="/redesign/videos/pack-open.mp4" type="video/mp4" />
    </video>
  );
}
