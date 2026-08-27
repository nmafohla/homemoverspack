"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { HOME_HREF } from "../_data/variant";

const NAV_LINKS = [
  { label: "The Pack", href: "#welcome-pack" },
  { label: "Offers", href: "#offers" },
  { label: "£10k Draw", href: "#prize-draw" },
  { label: "Checklist", href: "#checklist" },
  { label: "Guides", href: "#videos" },
  { label: "Reviews", href: "#reviews" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [progress, setProgress] = useState(0);

  // Header treatment and the reading-progress rail share one scroll pass.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(scrolled > 24);
      setProgress(scrollable > 0 ? Math.min(1, scrolled / scrollable) : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Underline whichever section currently owns the upper third of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) =>
      document.querySelector<HTMLElement>(href),
    ).filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0.01, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // The overlay covers the screen, so the page behind it must not scroll.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "border-b border-ink-900/10 bg-bone-50/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href={HOME_HREF}
            className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-4"
          >
            <span
              className={cn(
                "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-1 transition-all duration-500",
                isScrolled ? "ring-ink-900/10" : "ring-white/25",
              )}
            >
              <Image
                src="/images/logo-color.png"
                alt=""
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "text-[15px] font-semibold tracking-tight transition-colors duration-500",
                  isScrolled ? "text-ink-900" : "text-bone-50",
                )}
              >
                HomeMoversPack
              </span>
              <span
                className={cn(
                  "mt-1 text-[9.5px] font-medium uppercase tracking-[0.24em] transition-colors duration-500",
                  isScrolled ? "text-ink-400" : "text-bone-200/70",
                )}
              >
                Moving in made simple
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                    isScrolled
                      ? isActive
                        ? "text-ink-900"
                        : "text-ink-400 hover:text-ink-900"
                      : isActive
                        ? "text-bone-50"
                        : "text-bone-200/70 hover:text-bone-50",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-500 ease-out",
                      isScrolled ? "bg-ember-500" : "bg-ember-400",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a href="#prize-draw" className="hidden sm:block">
              <Button variant={isScrolled ? "accent" : "onDark"} size="sm">
                Enter the £10,000 draw
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                isScrolled
                  ? "border-ink-900/12 text-ink-800 hover:bg-ink-900/5"
                  : "border-bone-100/25 text-bone-50 hover:bg-bone-50/10",
              )}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Reading progress — a hairline, not a loading bar. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left bg-ember-500 transition-opacity duration-500",
            isScrolled ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      <div
        className={cn(
          "fixed inset-0 z-60 bg-ink-950 transition-opacity duration-400 lg:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-bone-50">
              HomeMoversPack
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/20 text-bone-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-12 flex flex-1 flex-col">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{ transitionDelay: `${index * 45}ms` }}
                className={cn(
                  "font-display border-b border-bone-100/10 py-4 text-3xl text-bone-50 transition-all duration-500",
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#prize-draw" onClick={closeMenu} className="mt-8">
            <Button variant="accent" size="lg" className="w-full">
              Enter the £10,000 draw
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
