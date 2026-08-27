"use client";

import { useRef, useState, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { Check, Sparkles } from "lucide-react";
import { PrizeDrawSchema, type PrizeDrawInput } from "@/lib/validations";
import { AMBIENT } from "../_data/media";
import { BackgroundVideo } from "./BackgroundVideo";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { Field } from "./Field";

type FieldErrors = Partial<Record<keyof PrizeDrawInput, string[]>>;

const PRIZE_BREAKDOWN = [
  { label: "Furniture & soft furnishings", value: "£4,000" },
  { label: "Kitchen & white goods", value: "£3,500" },
  { label: "Decorating & finishing touches", value: "£2,500" },
] as const;

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postalCode: "",
  address: "",
  favoriteColor: "",
};

export function PrizeDrawSection() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [optOutMarketing, setOptOutMarketing] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const setField = (key: keyof typeof EMPTY_FORM, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear the message for a field as soon as the reader starts fixing it.
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const celebrate = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    void confetti({
      particleCount: 90,
      spread: 72,
      origin: { y: 0.7 },
      colors: ["#f26b24", "#f0be5e", "#fdfbf8", "#6faf9e"],
      disableForReducedMotion: true,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const payload = { ...values, optOutMarketing };
    const parsed = PrizeDrawSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prize-draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: unknown = await response.json();
      const body = result as {
        success?: boolean;
        reference?: string;
        error?: string;
        details?: FieldErrors;
      };

      if (!response.ok || !body.success) {
        if (body.details) setErrors(body.details);
        setFormError(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      setReference(body.reference ?? null);
      celebrate();
      // Move focus to the confirmation so screen readers land on the outcome.
      window.setTimeout(() => successRef.current?.focus(), 60);
    } catch {
      setFormError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="prize-draw"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      <BackgroundVideo
        clip={AMBIENT.prize}
        opacity={0.72}
        className="grain"
        overlay="bg-[radial-gradient(120%_90%_at_20%_10%,rgba(6,8,12,0.55)_0%,rgba(6,8,12,0.93)_65%)]"
      />

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Free to enter · Closes 31 December 2026
            </Reveal>

            <Reveal
              as="h2"
              delay={80}
              className="font-display mt-6 text-[2.6rem] leading-[1.02] text-bone-50 sm:text-6xl"
            >
              Win a{" "}
              <span className="italic text-gold-400">£10,000</span>
              <br />
              home makeover.
            </Reveal>

            <Reveal
              as="p"
              delay={150}
              className="mt-7 max-w-lg text-[16px] leading-relaxed text-bone-200/70"
            >
              One UK mover wins the lot: vouchers to spend across furniture,
              appliances and decorating in the home they have just moved into.
              No purchase, no subscription, one entry per household.
            </Reveal>

            <Reveal delay={220} className="mt-12">
              <dl className="border-t border-bone-100/12">
                {PRIZE_BREAKDOWN.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-bone-100/12 py-4"
                  >
                    <dt className="text-[14px] text-bone-300/70">
                      {row.label}
                    </dt>
                    <dd className="font-display text-2xl text-bone-50">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Entry form */}
          <div className="lg:col-span-7">
            <Reveal
              delay={120}
              className="rounded-3xl border border-bone-100/12 bg-ink-950/70 p-7 backdrop-blur-xl sm:p-10"
            >
              {reference ? (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="py-10 text-center focus:outline-none"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-500/15 text-sage-300">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl text-bone-50">
                    You&rsquo;re in the draw.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-bone-300/70">
                    Keep this reference safe — it&rsquo;s how we&rsquo;ll
                    identify your entry when the draw is made.
                  </p>
                  <p className="mt-6 inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-5 py-2.5 font-mono text-sm font-semibold tracking-wider text-gold-300">
                    {reference}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="font-display text-2xl text-bone-50">
                    Enter the draw
                  </h3>
                  <p className="mt-2 text-[13px] text-bone-300/60">
                    Takes about a minute. We only use these details to run the
                    draw and post your pack.
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="First name"
                      name="firstName"
                      value={values.firstName}
                      onChange={(value) => setField("firstName", value)}
                      error={errors.firstName?.[0]}
                      autoComplete="given-name"
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      value={values.lastName}
                      onChange={(value) => setField("lastName", value)}
                      error={errors.lastName?.[0]}
                      autoComplete="family-name"
                    />
                    <Field
                      label="Email"
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
                    <Field
                      label="Postcode"
                      name="postalCode"
                      value={values.postalCode}
                      onChange={(value) => setField("postalCode", value)}
                      error={errors.postalCode?.[0]}
                      autoComplete="postal-code"
                    />
                    <Field
                      label="Favourite colour"
                      name="favoriteColor"
                      value={values.favoriteColor}
                      onChange={(value) => setField("favoriteColor", value)}
                      error={errors.favoriteColor?.[0]}
                      hint="Used as your tie-breaker answer."
                    />
                    <Field
                      className="sm:col-span-2"
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={(value) => setField("address", value)}
                      error={errors.address?.[0]}
                      autoComplete="street-address"
                    />
                  </div>

                  <label className="mt-7 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-bone-300/70">
                    <input
                      type="checkbox"
                      checked={optOutMarketing}
                      onChange={(event) =>
                        setOptOutMarketing(event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-bone-100/30 bg-transparent accent-ember-500"
                    />
                    Don&rsquo;t send me partner offers or moving tips by email.
                    You&rsquo;ll still get everything about this entry.
                  </label>

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
                    className="mt-8 w-full"
                  >
                    Enter the £10,000 draw
                  </Button>

                  <p className="mt-4 text-center text-[11.5px] leading-relaxed text-bone-300/45">
                    By entering you accept the prize draw terms. Open to UK
                    residents aged 18+.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
