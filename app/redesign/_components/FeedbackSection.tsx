"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { FeedbackSchema, type FeedbackInput } from "@/lib/validations";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { Field, SelectField, TextAreaField } from "./Field";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof FeedbackInput, string[]>>;

const PACK_CATEGORIES = [
  { value: "Welcome Box & Essentials", label: "Welcome box & essentials" },
  { value: "Moving Checklist & Tools", label: "Moving checklist & tools" },
  { value: "Partner Discounts & Deals", label: "Partner discounts & deals" },
  { value: "Digital Magazine 2026", label: "Digital magazine 2026" },
] as const;

const RATINGS = ["1", "2", "3", "4", "5"] as const;

export function FeedbackSection() {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<string>("5");
  const [category, setCategory] = useState<string>(
    PACK_CATEGORIES[0].value,
  );
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = FeedbackSchema.safeParse({
      email,
      rating,
      category,
      comments,
    });

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
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

  return (
    <section
      id="feedback"
      className="scroll-mt-24 border-b border-paper-edge/60 bg-paper-alt py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Your feedback"
              title={
                <>
                  Tell us what was
                  <br />
                  <span className="italic text-accent">actually useful.</span>
                </>
              }
              lede="We rebuild the pack every year from what movers tell us. If something in it earned its place — or didn't — this is where it gets decided."
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal
              delay={120}
              className="rounded-3xl border border-paper-edge/80 bg-paper p-7 sm:p-10"
            >
              {isSent ? (
                <div role="status" className="py-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-500/12 text-sage-600">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl text-body">
                    Thank you.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-body-soft">
                    That goes straight to the team putting together next
                    year&rsquo;s pack.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <fieldset>
                    <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-body-soft">
                      How useful was your pack?
                    </legend>
                    <div className="mt-3 flex gap-2">
                      {RATINGS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          aria-pressed={rating === value}
                          className={cn(
                            "h-12 flex-1 cursor-pointer rounded-xl border text-[15px] font-semibold transition-all duration-300",
                            rating === value
                              ? "border-body bg-invert text-invert-fg"
                              : "border-body/12 text-body-soft hover:border-body/30 hover:text-body",
                          )}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[11.5px] text-body-mute">
                      1 = not much use, 5 = genuinely helped.
                    </p>
                  </fieldset>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field
                      tone="light"
                      label="Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(value) => {
                        setEmail(value);
                        setErrors((current) => ({
                          ...current,
                          email: undefined,
                        }));
                      }}
                      error={errors.email?.[0]}
                      autoComplete="email"
                    />
                    <SelectField
                      tone="light"
                      label="What did you receive?"
                      name="category"
                      value={category}
                      onChange={setCategory}
                      options={PACK_CATEGORIES}
                      error={errors.category?.[0]}
                    />
                  </div>

                  <TextAreaField
                    tone="light"
                    className="mt-5"
                    label="Comments"
                    name="comments"
                    rows={5}
                    maxLength={1000}
                    value={comments}
                    onChange={(value) => {
                      setComments(value);
                      setErrors((current) => ({
                        ...current,
                        comments: undefined,
                      }));
                    }}
                    error={errors.comments?.[0]}
                    placeholder="What did you use, what did you ignore, and what was missing?"
                    hint={`${comments.length}/1000 characters`}
                  />

                  {formError && (
                    <p
                      role="alert"
                      className="mt-6 rounded-xl border border-ember-500/30 bg-ember-500/8 px-4 py-3 text-[13px] text-accent"
                    >
                      {formError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="mt-7 w-full sm:w-auto"
                  >
                    Send feedback
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
