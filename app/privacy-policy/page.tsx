import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy & Terms | HomeMoversPack UK",
  description:
    "UK GDPR compliant privacy policy and competition terms and conditions for HomeMoversPack.co.uk.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
            {/* Header */}
            <div className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Legal &amp; Compliance
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Privacy Policy &amp; Competition Terms
              </h1>
              <p className="text-xs text-slate-500">
                Last updated: 2026 • Compliant with UK GDPR &amp; Data
                Protection Act 2018
              </p>
            </div>

            {/* Section 1: Introduction */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-500" />
                1. Information We Collect
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                HomeMoversPack (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;us&rdquo;) is committed to protecting the privacy and
                confidentiality of individuals moving home in the UK. We collect
                personal information when you enter our £10,000 Prize Draw,
                submit feedback, or request partnership information.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Contact details:</strong> Name, email address, UK
                  telephone number, and postcode.
                </li>
                <li>
                  <strong>Moving details:</strong> New property address and
                  moving date.
                </li>
                <li>
                  <strong>Preferences:</strong> Marketing opt-in or opt-out
                  selections and pack feedback ratings.
                </li>
              </ul>
            </section>

            {/* Section 2: How We Use Your Data */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-orange-500" />
                2. How We Use Your Information
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                We process your information under the lawful basis of consent
                and legitimate interest:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    Prize Draw Administration
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    To register your entry, verify UK residency, select winners
                    randomly, and notify qualifying participants.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    Welcome Box Fulfillment
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    To deliver essential household sample products and verified
                    moving vouchers to your new address.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Competition Terms */}
            <section
              id="terms"
              className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                3. £10,000 Prize Draw Terms &amp; Conditions
              </h2>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>Eligibility:</strong> The draw is open to UK residents
                  aged 18 or over who have recently moved or are in the process
                  of moving home. No purchase is necessary to enter.
                </p>
                <p>
                  <strong>Closing Date:</strong> Entries close on{" "}
                  <strong>31 December 2026</strong>. Entries received after this
                  time will not be counted.
                </p>
                <p>
                  <strong>Prizes:</strong> 1st Prize is £10,000 worth of gift
                  vouchers to be used at participating UK home retail partners.
                  2nd Prize is an Eufy Smart Home Security Package. 3rd Prize is
                  £250 Airtasker home services credit. Prizes are
                  non-transferable and cannot be exchanged for cash.
                </p>
                <p>
                  <strong>Winner Selection:</strong> The winner will be chosen
                  at random within 14 days of the closing date and contacted via
                  the email address and phone number provided upon registration.
                </p>
              </div>
            </section>

            {/* Section 4: Your Rights */}
            <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                4. Your Rights Under UK GDPR
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                You have the right to request access to, rectification of, or
                erasure of your personal data at any time. You can withdraw
                marketing consent immediately by emailing{" "}
                <a
                  href="mailto:info@homemoverspack.co.uk"
                  className="text-orange-600 dark:text-orange-400 font-semibold underline"
                >
                  info@homemoverspack.co.uk
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
