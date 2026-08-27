"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gift, Menu, X, CheckSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Welcome Pack", href: "#welcome-pack" },
    { label: "Partner Offers", href: "#offers" },
    { label: "Moving Checklist", href: "#checklist" },
    { label: "Video Guides", href: "#videos" },
    { label: "Magazine", href: "#magazine" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
          >
            <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-white shadow-md border border-slate-100 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo-color.png"
                alt="HomeMoversPack Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                HomeMovers<span className="text-orange-600">Pack</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-0.5">
                Moving In Made Simple
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="#checklist">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex gap-1.5"
              >
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                Checklist Tool
              </Button>
            </a>
            <a href="#prize-draw">
              <Button variant="accent" size="sm" className="gap-1.5">
                <Sparkles className="w-4 h-4" />
                Win £10,000
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a href="#prize-draw">
              <Button
                variant="accent"
                size="sm"
                className="px-2.5 py-1 text-xs"
              >
                <Gift className="w-3.5 h-3.5 mr-1" />
                £10k Draw
              </Button>
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <a href="#checklist" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center gap-2"
                  >
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Interactive Checklist
                  </Button>
                </a>
                <a
                  href="#prize-draw"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="accent"
                    size="md"
                    className="w-full justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Enter £10,000 Prize Draw
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
