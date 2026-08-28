"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import {
  PartnerContactSchema,
  type PartnerContactInput,
} from "@/lib/validations";
import { PARTNER_OFFERS } from "@/data/offers";
import { SPONSOR_PACKAGES } from "../_data/sponsors";
import { AMBIENT } from "../_data/media";
import { BackgroundVideo } from "./BackgroundVideo";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Field, SelectField, TextAreaField } from "./Field";

type FieldErrors = Partial<Record<keyof PartnerContactInput, string[]>>;

const INTEREST_OPTIONS = [
  { value: "pack_sampling", label: "Product sampling in the pack" },
  { value: "digital_offer", label: "A digital offer or discount code" },
  { value: "magazine_feature", label: "Magazine feature" },
  { value: "brand_sponsorship", label: "Brand sponsorship" },
  { value: "other", label: "Something else" },
] as const;

const REACH = [
  { figure: "UK-wide", label: "Distribution to verified new movers" },
  { figure: "First 30 days", label: "Reached in the window that decides habits" },
  { figure: "Opt-in only", label: "Every household chose to receive the pack" },
] as const;

const EMPTY_FORM = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  message: "",
};

export function PartnerWithUsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(EMPTY_FORM);
  const [interestType, setInterestType] = useState<string>("pack_sampling");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const setField = (key: keyof typeof EMPTY_FORM, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset only after a successful send, so a failed attempt keeps its input.
    if (isSent) {
      setIsSent(false);
      setValues(EMPTY_FORM);
      setInterestType("pack_sampling");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = PartnerContactSchema.safeParse({ ...values, interestType });

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partner-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as {
        success?: boolean;
        error?: string;
        details?: FieldErrors;
      };

      if (!response.ok || !body.success) {
        if (body.details) setErrors(body.details);
        setFormError(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSent(true);
    } catch {
      setFormError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const brands = PARTNER_OFFERS.map((offer) => offer.brand);

  return (
    <section
      id="partner-with-us"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      <BackgroundVideo
        clip={AMBIENT.partner}
        opacity={0.7}
        className="grain"
        overlay="bg-[radial-gradient(120%_100%_at_80%_0%,rgba(6,8,12,0.45)_0%,rgba(6,8,12,0.94)_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-300">
            <span aria-hidden="true" className="h-px w-8 bg-sage-400/60" />
            For brands
          </Reveal>

          <Reveal
            as="h2"
            delay={80}
            className="font-display mt-6 text-[2.4rem] leading-[1.04] text-bone-50 sm:text-6xl"
          >
            Meet a household on
            <br />
            <span className="italic text-sage-300">day one.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={150}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-bone-200/70"
          >
            People replace more in the first month of a move than in the next
            three years. If your product belongs in that decision, the pack puts
            it in their hands before anyone else gets a look in.
          </Reveal>

          <Reveal delay={220} className="mt-10">
            <Button variant="accent" size="lg" onClick={() => setIsOpen(true)}>
              Talk to the partnerships team
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Reveal>
        </div>

        {/* The rate card. Package contents live beside the advertiser inventory
            in _data/sponsors.ts, so what this promises and what the page
            actually renders cannot drift apart. */}
        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {SPONSOR_PACKAGES.map((pkg, index) => {
            const isPlatinum = pkg.tier === "platinum";
            return (
              <Reveal key={pkg.tier} delay={index * 90}>
                <div
                  className={
                    isPlatinum
                      ? "flex h-full flex-col rounded-3xl border border-gold-400/35 bg-gold-400/[0.07] p-7 backdrop-blur-sm"
                      : "flex h-full flex-col rounded-3xl border border-bone-100/12 bg-ink-950/50 p-7 backdrop-blur-sm"
                  }
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className={
                        isPlatinum
                          ? "font-display text-3xl text-gold-300"
                          : "font-display text-3xl text-bone-50"
                      }
                    >
                      {pkg.name}
                    </h3>
                    <span className="font-mono text-[11px] tracking-wider text-bone-300/50">
                      {pkg.creative}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-bone-200/75"
                      >
                        <Check
                          className={
                            isPlatinum
                              ? "mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400"
                              : "mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-400"
                          }
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={280}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-bone-100/12 bg-bone-100/12 sm:grid-cols-3"
        >
          {REACH.map((item) => (
            <div
              key={item.figure}
              className="bg-ink-950/70 px-6 py-7 backdrop-blur-sm"
            >
              <p className="font-display text-2xl text-bone-50">
                {item.figure}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-bone-300/60">
                {item.label}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Existing partners, on a slow ribbon. Duplicated once so the
            -50% translate in the keyframe wraps without a visible seam. */}
        <div className="relative mt-16 overflow-hidden">
          <div className="animate-marquee flex w-max gap-12">
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                aria-hidden={index >= brands.length}
                className="font-display shrink-0 text-xl text-bone-300/35"
              >
                {brand}
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(to_right,#06080c,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,#06080c,transparent)]"
          />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Partnership enquiry"
      >
        {isSent ? (
          <div role="status" className="py-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-500/15 text-sage-300">
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-display mt-6 text-2xl text-bone-50">
              Message sent.
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-bone-300/70">
              The partnerships team will come back to you within one business
              day.
            </p>
            <Button
              variant="onDark"
              size="md"
              onClick={closeModal}
              className="mt-7"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Company"
                name="companyName"
                value={values.companyName}
                onChange={(value) => setField("companyName", value)}
                error={errors.companyName?.[0]}
                autoComplete="organization"
              />
              <Field
                label="Your name"
                name="contactName"
                value={values.contactName}
                onChange={(value) => setField("contactName", value)}
                error={errors.contactName?.[0]}
                autoComplete="name"
              />
              <Field
                label="Business email"
                name="email"
                type="email"
                value={values.email}
                onChange={(value) => setField("email", value)}
                error={errors.email?.[0]}
                autoComplete="email"
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(value) => setField("phone", value)}
                error={errors.phone?.[0]}
                autoComplete="tel"
              />
              <SelectField
                className="sm:col-span-2"
                label="What are you interested in?"
                name="interestType"
                value={interestType}
                onChange={setInterestType}
                options={INTEREST_OPTIONS}
                error={errors.interestType?.[0]}
              />
            </div>

            <TextAreaField
              className="mt-5"
              label="Tell us about your brand"
              name="message"
              rows={5}
              maxLength={1000}
              value={values.message}
              onChange={(value) => setField("message", value)}
              error={errors.message?.[0]}
              placeholder="What you sell, who it's for, and what you'd want out of the partnership."
            />

            {formError && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-ember-500/30 bg-ember-500/10 px-4 py-3 text-[13px] text-ember-200"
              >
                {formError}
              </p>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              isLoading={isSubmitting}
              className="mt-7 w-full"
            >
              Send enquiry
            </Button>
          </form>
        )}
      </Modal>
    </section>
  );
}
