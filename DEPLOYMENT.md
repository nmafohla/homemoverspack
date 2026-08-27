# Deployment — two sites, one repository

This repository contains **two complete designs of the same site**, and can serve
either one at a root URL. Which design a deployment leads with is decided by a
single environment variable, so both sites build from the same `main` branch.

| Design | Source | Route | Leads with it when |
| --- | --- | --- | --- |
| Original | `app/page.tsx`, `components/` | `/` | `NEXT_PUBLIC_SITE_VARIANT` is unset |
| 2026 concept | `app/redesign/` | `/redesign` | `NEXT_PUBLIC_SITE_VARIANT=redesign` |

Both share the same data layer, Zod schemas and API routes. See
`app/redesign/README.md` for what the concept design actually changes.

## How the switch works

`middleware.ts` at the repo root rewrites `/` to `/redesign` when
`NEXT_PUBLIC_SITE_VARIANT=redesign`. It is a **rewrite, not a redirect** — the
visitor stays on `/` and never sees `/redesign` in the address bar. The matcher
is scoped to `/` alone, so `/privacy-policy`, `/api/*`, `/redesign` itself and
all static assets resolve normally under either setting.

`app/redesign/_data/variant.ts` carries the same flag into the page: on a
deployment that leads with the concept, it becomes indexable, its `<title>`
drops the "(2026 concept)" qualifier, its canonical points at `/`, and the
footer's "View the original design" link is dropped since it would link to
itself.

With the variable unset, middleware returns immediately and **nothing changes**.
That is the configuration for the current production site.

## Target setup

| Vercel project | Root Directory | Env | Domain | Serves |
| --- | --- | --- | --- | --- |
| `hmp1` | `./` | *(none)* | `hmp1.hakili.online` | Original design at `/` |
| `hmp2` | `./` | `NEXT_PUBLIC_SITE_VARIANT=redesign` | `hmp2.hakili.online` | 2026 concept at `/` |

Vercel team: `oby's projects` (`obys-projects-a8f245f1`).

### Two things that will break the build if missed

**Root Directory must stay `./` for both projects.** `app/redesign/` is a route
inside the single Next.js app, not a standalone app. It has no `package.json`
and no `next.config.ts`, and it imports from `@/data`, `@/lib` and
`@/components` at the repo root. Pointing Root Directory at `app/redesign` fails
the build.

**`hmp2` must be redeployed after the env var is set.** `NEXT_PUBLIC_` values are
inlined at build time. Setting the variable without triggering a fresh build
leaves `hmp2` serving the original design, which looks exactly like the env var
being ignored.

### DNS

`hakili.online` is managed in a **different Vercel account** from
`obys-projects-a8f245f1`. Adding `hmp1.hakili.online` / `hmp2.hakili.online` to
these projects will not verify on its own — Vercel will detect external
ownership and show the exact records needed (typically a `CNAME` per subdomain
plus a `_vercel` `TXT` for ownership). Those records must be added in the
account that holds `hakili.online`'s DNS. Use the values Vercel displays rather
than assumed defaults; they differ between delegated-subdomain and
cross-account cases.

## Verifying a deployment

On `hmp1` (variant unset):

- `/` returns the original design — title contains `Free Welcome Packs`
- `/redesign` returns the concept and carries `<meta name="robots" content="noindex, nofollow">`

On `hmp2` (`NEXT_PUBLIC_SITE_VARIANT=redesign`):

- `/` returns the concept — the HTML contains the `hmp-2026` wrapper class
- `/` has **no** `robots` meta tag
- `/privacy-policy` and `POST /api/feedback` both return `200`

Both configurations were verified locally against a production build before this
was committed.

## Local checks

```bash
npm run build && npm run typecheck && npm run lint && npm run test
```

To preview the concept-led configuration locally:

```bash
NEXT_PUBLIC_SITE_VARIANT=redesign npm run build && npm run start
```
