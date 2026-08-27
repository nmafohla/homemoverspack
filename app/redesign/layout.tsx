import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
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
  title: "HomeMoversPack — Moving In Made Simple (2026 concept)",
  description:
    "A concept redesign of HomeMoversPack: free welcome packs, verified partner discounts, an interactive moving checklist, and the £10,000 home makeover draw.",
  // A design concept sitting alongside the live site shouldn't compete with it
  // in search results.
  robots: { index: false, follow: false },
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
