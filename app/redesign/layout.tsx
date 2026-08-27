import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import { IS_REDESIGN_ROOT } from "./_data/variant";
import "./redesign.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hmp-sans",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-hmp-display",
});

export const metadata: Metadata = {
  title: IS_REDESIGN_ROOT
    ? "HomeMoversPack — Moving In Made Simple"
    : "HomeMoversPack — Moving In Made Simple (2026 concept)",
  description:
    "Free welcome packs, verified partner discounts, an interactive moving checklist, and the £10,000 home makeover draw for UK movers.",
  /*
   * On its own deployment this design IS the site, so it should be indexed.
   * Where it sits alongside the original as a secondary route, it stays out of
   * search results rather than competing with the live site for the same terms.
   */
  robots: IS_REDESIGN_ROOT ? undefined : { index: false, follow: false },
  alternates: { canonical: IS_REDESIGN_ROOT ? "/" : "/redesign" },
};

export default function RedesignLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`hmp-2026 ${sans.variable} ${display.variable}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bone-50"
      >
        Skip to content
      </a>
      {children}
    </div>
  );
}
