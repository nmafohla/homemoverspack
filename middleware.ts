import { NextResponse, type NextRequest } from "next/server";

/**
 * Lets one repository serve two sites.
 *
 * On a deployment built with NEXT_PUBLIC_SITE_VARIANT=redesign, the root URL
 * serves the 2026 concept design instead of the original. This is a rewrite,
 * not a redirect: the visitor stays on `/` and never sees `/redesign` in the
 * address bar.
 *
 * With the variable unset — which is the case for the production
 * homemoverspack.co.uk deployment — this returns immediately and the original
 * design at `/` is completely unaffected.
 */
const LEADS_WITH_REDESIGN =
  process.env.NEXT_PUBLIC_SITE_VARIANT === "redesign";

export function middleware(request: NextRequest) {
  if (!LEADS_WITH_REDESIGN) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/redesign";
  return NextResponse.rewrite(url);
}

export const config = {
  /*
   * Only the root path is rewritten. Everything else — /redesign itself,
   * /privacy-policy, the API routes, Next's own assets and any file with an
   * extension — is matched out so it resolves normally.
   */
  matcher: "/",
};
