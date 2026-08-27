import Link from "next/link";
import Image from "next/image";
import { Mail, ShieldCheck } from "lucide-react";
import { HOME_HREF, IS_REDESIGN_ROOT } from "../_data/variant";

const COLUMNS = [
  {
    heading: "Home movers",
    links: [
      { label: "The welcome pack", href: "#welcome-pack" },
      { label: "Partner offers", href: "#offers" },
      { label: "£10,000 prize draw", href: "#prize-draw" },
      { label: "Moving checklist", href: "#checklist" },
      { label: "Video guides", href: "#videos" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Magazine 2026", href: "#magazine" },
      { label: "Mover reviews", href: "#reviews" },
      { label: "Pack feedback", href: "#feedback" },
      { label: "Brand partnerships", href: "#partner-with-us" },
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 pt-20 pb-10 text-bone-300">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 border-b border-bone-100/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href={HOME_HREF}
              className="inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5">
                <Image
                  src="/images/logo-color.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </span>
              <span className="text-[15px] font-semibold text-bone-50">
                HomeMoversPack
              </span>
            </Link>

            <p className="font-display mt-8 max-w-sm text-[1.7rem] leading-[1.25] text-bone-50">
              Taking the stress out of moving home, across the UK.
            </p>

            <p className="mt-6 flex items-center gap-2 text-[12.5px] text-bone-300/55">
              <ShieldCheck
                className="h-3.5 w-3.5 text-sage-400"
                aria-hidden="true"
              />
              Independent UK welcome service &amp; partner network
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} className="lg:col-span-2">
              <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-bone-300/45">
                {column.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[13.5px] text-bone-300/70 transition-colors duration-300 hover:text-bone-50"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-bone-300/45">
              Get in touch
            </h2>
            <p className="mt-5 text-[13.5px] leading-relaxed text-bone-300/60">
              Questions about your pack, an offer, or working with us?
            </p>
            <a
              href="mailto:info@homemoverspack.co.uk"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-4 py-2.5 text-[12.5px] text-bone-200 transition-colors duration-300 hover:border-bone-100/35 hover:bg-bone-50/5"
            >
              <Mail className="h-3.5 w-3.5 text-ember-400" aria-hidden="true" />
              info@homemoverspack.co.uk
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[12px] text-bone-300/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} HomeMoversPack. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-bone-200"
            >
              Privacy policy
            </Link>
            <Link
              href="/privacy-policy#terms"
              className="transition-colors duration-300 hover:text-bone-200"
            >
              Terms &amp; conditions
            </Link>
            {/* Only meaningful where the original design is still at `/`; on a
                deployment that leads with this design it would link to itself. */}
            {!IS_REDESIGN_ROOT && (
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-bone-200"
              >
                View the original design
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
