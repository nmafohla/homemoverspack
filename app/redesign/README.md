# HomeMoversPack — 2026 concept redesign

A second, self-contained design for the same site, served at **`/redesign`**.

The original design at `/` is **not touched by any of this**. No existing file was
edited to add it — the whole concept lives in this folder, plus two new
directories (`public/redesign/` for the video assets and `scripts/` for the
generator that produces them).

## Why it's a separate folder

`app/redesign/redesign.css` is its own Tailwind entry point with its own `@theme`
tokens, and every base rule in it is scoped to `.hmp-2026` — the wrapper that
`layout.tsx` puts around the page. So the two designs share the data layer, the
API routes and the Zod schemas, but share no styling at all. Changing one cannot
break the other.

Shared, unmodified: `data/*`, `lib/validations.ts`, `lib/utils.ts`,
`app/api/*`, `public/images/*`.

## What's different

**Direction.** Warm "bone" paper against a cool near-black ink, with a single
ember accent — instead of the white/slate/orange-gradient palette. Display type
is Instrument Serif set large and tight; UI type is Inter. Editorial layout:
asymmetric grids, hairline rules, numbered lists, generous whitespace, no card
shadows doing the work that structure should do.

**Ambient video backgrounds.** Three full-bleed loops behind the hero, the prize
draw and the partner section, each under a gradient scrim heavy enough to keep
text at full contrast.

**Behaviour.** Scroll-reveal on section content, a reading-progress hairline in
the header, active-section tracking in the nav, a full-screen mobile menu, and
a progress dial on the checklist.

**Accessibility.** Every form control is labelled and wires its own hint/error
via `aria-describedby`; the modal traps focus, restores it on close and closes
on Escape; reduced-motion stops all decoration without hiding any content; the
reveal system degrades to plain visible content with JS off.

## The background videos

Every clip resolves through `_data/media.ts`. To swap in licensed footage
(Artlist, Coverr, your own shoot), drop the file into `public/redesign/videos/`,
export a poster frame beside it, and change `src`/`poster` for that slot.
Nothing else needs to change.

What the `BackgroundVideo` component expects of a clip:

- muted, with no audio track — autoplay is blocked otherwise
- a seamless loop, roughly 6–12 seconds
- H.264 / `yuv420p` MP4 with `+faststart`; 720p is plenty behind a scrim
- dark and low-contrast, since headline text sits on top of it

The component only pays for the clip when it can be seen: nothing downloads
until the section scrolls into view, playback pauses when it leaves, and readers
on reduced motion or a metered connection get the poster frame and never fetch
the video at all.

### The shipped loops

The three clips here are generated procedurally rather than licensed, so the
repository carries no third-party footage licence. All three are under 240 KB —
664 KB including posters.

```bash
W=1280 H=720 FRAMES=200 PRESET=ember node scripts/generate-ambient.mjs \
  | ffmpeg -y -f rawvideo -pix_fmt rgb24 -s 1280x720 -r 25 -i - \
      -frames:v 200 -vf "gblur=sigma=9" \
      -c:v libx264 -preset veryslow -crf 29 -pix_fmt yuv420p \
      -movflags +faststart -an public/redesign/videos/ambient-ember.mp4
```

`PRESET` is `ember`, `gold` or `slate`. The generator writes raw RGB frames of a
domain-warped light field to stdout; every term is periodic in `t` over one
cycle, so the last frame wraps onto the first and the loop has no visible seam.
Poster frames come from `ffmpeg -i <clip>.mp4 -frames:v 1 -q:v 6 <clip>.jpg`.

## Running it

```bash
npm run dev
```

Then open `/redesign`. `npm run build`, `npm run lint`, `npm run typecheck` and
`npm run test` all cover this folder along with the rest of the project.
