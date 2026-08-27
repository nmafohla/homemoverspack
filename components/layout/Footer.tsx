"use client";

import Link from "next/link";
import { Package, Mail, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                HomeMovers<span className="text-orange-500">Pack</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Helping take the stress out of moving home across the United
              Kingdom. Delivering essential welcome packs, verified partner
              discounts, moving checklists, and our £10,000 annual home makeover
              competition.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent UK Welcome Service &amp; Partner Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Home Movers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#welcome-pack"
                  className="hover:text-white transition-colors"
                >
                  The Welcome Pack
                </a>
              </li>
              <li>
                <a
                  href="#offers"
                  className="hover:text-white transition-colors"
                >
                  Exclusive Partner Offers
                </a>
              </li>
              <li>
                <a
                  href="#prize-draw"
                  className="hover:text-white transition-colors"
                >
                  £10,000 Prize Draw
                </a>
              </li>
              <li>
                <a
                  href="#checklist"
                  className="hover:text-white transition-colors"
                >
                  Moving House Checklist
                </a>
              </li>
              <li>
                <a
                  href="#videos"
                  className="hover:text-white transition-colors"
                >
                  Video Guides &amp; Hacks
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources &amp; Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#magazine"
                  className="hover:text-white transition-colors"
                >
                  Home Movers Magazine 2026
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-white transition-colors"
                >
                  Mover Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#feedback"
                  className="hover:text-white transition-colors"
                >
                  Pack Feedback Form
                </a>
              </li>
              <li>
                <a
                  href="#partner-with-us"
                  className="hover:text-white transition-colors"
                >
                  Brand Partnerships
                </a>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-xs text-slate-400">
                Questions about your pack, partner offers, or brand
                collaboration?
              </p>
              <a
                href="mailto:info@homemoverspack.co.uk"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                info@homemoverspack.co.uk
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} HomeMoversPack. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/privacy-policy#terms"
              className="hover:text-slate-300 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="inline-flex items-center gap-1">
              Built with{" "}
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for UK
              Movers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
