/**
 * Which design this deployment leads with.
 *
 * The repository serves two designs from one Next.js app: the original at `/`
 * and the 2026 concept at `/redesign`. Setting NEXT_PUBLIC_SITE_VARIANT to
 * "redesign" on a deployment makes that deployment lead with the concept —
 * middleware.ts rewrites `/` to `/redesign`, the page becomes indexable, and
 * internal "home" links point at `/` instead of `/redesign`.
 *
 * Leave the variable unset and nothing changes: `/` serves the original design
 * and `/redesign` stays a secondary, non-indexed route. That is what the
 * production homemoverspack.co.uk deployment does.
 *
 * NEXT_PUBLIC_ is required because client components read this too; the value
 * is inlined at build time, so each deployment must be built with its own
 * setting rather than sharing one build.
 */
export const IS_REDESIGN_ROOT =
  process.env.NEXT_PUBLIC_SITE_VARIANT === "redesign";

/** Where the logo and footer "home" links should point on this deployment. */
export const HOME_HREF = IS_REDESIGN_ROOT ? "/" : "/redesign";
