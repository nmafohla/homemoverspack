"use client";

import { useState } from "react";
import {
  Handshake,
  Building2,
  CheckCircle2,
  Mail,
  Users,
  BarChart3,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PartnerInquiryModal } from "./PartnerInquiryModal";

export function PartnerWithUsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="partner-with-us"
      className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold">
              <Handshake className="w-3.5 h-3.5" />
              <span>Brand Partnerships &amp; Sampling</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Reach UK Movers at the Highest-Intent Moment
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Moving house triggers more brand switches and household purchases
              than any other life event. Place your product samples, digital
              offers, and magazine features directly into the hands of motivated
              movers.
            </p>

            {/* B2B Metrics / Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                <PackageCheck className="w-5 h-5 text-orange-400" />
                <h4 className="font-bold text-white text-sm">
                  Targeted Sampling
                </h4>
                <p className="text-xs text-slate-400">
                  Physical pack placement
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                <Users className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white text-sm">
                  High Conversion
                </h4>
                <p className="text-xs text-slate-400">
                  Receptive new homeowners
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Verified Reach</h4>
                <p className="text-xs text-slate-400">
                  Direct doorstep delivery
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <Button
                variant="accent"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto gap-2"
              >
                <Building2 className="w-5 h-5" />
                Request Partnership Media Kit
              </Button>
              <a
                href="mailto:info@homemoverspack.co.uk"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 underline underline-offset-4"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                info@homemoverspack.co.uk
              </a>
            </div>
          </div>

          {/* Right Column: Mini Contact Card */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-3xl p-8 border border-slate-700 space-y-6">
            <h3 className="text-xl font-bold text-white">
              Join Our Network of Leading UK Brands
            </h3>
            <p className="text-sm text-slate-300">
              We collaborate with premier utilities, telecom operators, home
              security providers, retailers, and DIY manufacturers across
              Britain.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Physical product sample insertion into welcome boxes
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Digital portal voucher placement &amp; affiliate links
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Editorial features in Home Movers Magazine 2026</span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsModalOpen(true)}
                className="w-full justify-center text-white border-slate-600 hover:bg-slate-700"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Inquiry Modal */}
      <PartnerInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
