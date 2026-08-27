import type { Metadata } from "next";
import { ReactNode } from "react";
import { THEME_BOOTSTRAP } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "HomeMoversPack | Moving In Made Simple — Free Welcome Packs & £10k Draw",
  description:
    "We help take the stress out of moving home by delivering free HomeMoversPacks with essential products, verified partner discounts, moving checklists, and our £10,000 home makeover prize draw.",
  keywords: [
    "home movers pack",
    "moving house checklist uk",
    "free moving pack",
    "moving in perks",
    "home makeover prize draw",
    "uk broadband deals moving",
    "adt home movers",
    "airtasker moving",
  ],
  authors: [{ name: "HomeMoversPack UK" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://homemoverspack.co.uk",
  ),
  openGraph: {
    title: "HomeMoversPack | Moving In Made Simple",
    description:
      "Essential welcome packs, exclusive partner discounts, interactive moving checklists, and a £10,000 home makeover competition for UK movers.",
    url: "https://homemoverspack.co.uk",
    siteName: "HomeMoversPack",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeMoversPack | Moving In Made Simple",
    description:
      "Free welcome packs, moving house checklist, verified partner perks, and our annual £10,000 prize draw.",
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /* suppressHydrationWarning: the bootstrap script below sets a class on
       <html> before React hydrates, which React would otherwise flag. */
    <html lang="en-GB" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
