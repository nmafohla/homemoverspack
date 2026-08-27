/**
 * Ambient background footage.
 *
 * Every full-bleed video on the site resolves through this file, so swapping
 * the shipped loops for licensed footage (Artlist, Coverr, your own shoot) is a
 * one-line change per slot — drop the file into `public/videos/`, export a
 * matching poster frame, and update `src` / `poster` below. Nothing else needs
 * to change.
 *
 * What the site expects of a clip:
 *   - muted, no audio track (autoplay is blocked otherwise)
 *   - seamless loop, roughly 6–12s
 *   - H.264 / yuv420p MP4 with `+faststart`, 720p is plenty behind a scrim
 *   - dark and low-contrast, since headline text sits on top of it
 *
 * The loops shipped here are generated procedurally (see the repo README) so the
 * project carries no third-party footage licence.
 */
export interface AmbientClip {
  src: string;
  poster: string;
  /** Fallback paint shown before the poster decodes and behind transparent scrims. */
  tint: string;
  /** Described for screen readers only where the clip carries meaning; decorative otherwise. */
  label: string;
}

export const AMBIENT: Record<"hero" | "prize" | "partner", AmbientClip> = {
  hero: {
    src: "/redesign/videos/ambient-ember.mp4",
    poster: "/redesign/videos/ambient-ember.jpg",
    tint: "#0b0f16",
    label: "Warm light drifting across a dark room",
  },
  prize: {
    src: "/redesign/videos/ambient-gold.mp4",
    poster: "/redesign/videos/ambient-gold.jpg",
    tint: "#12100c",
    label: "Golden light moving slowly through a doorway",
  },
  partner: {
    src: "/redesign/videos/ambient-slate.mp4",
    poster: "/redesign/videos/ambient-slate.jpg",
    tint: "#06090c",
    label: "Cool daylight shifting across a wall",
  },
};
