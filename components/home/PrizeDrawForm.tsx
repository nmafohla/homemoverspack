"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Award, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PrizeDrawSchema, PrizeDrawInput } from "@/lib/validations";

export function PrizeDrawForm() {
  const [formData, setFormData] = useState<PrizeDrawInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    address: "",
    favoriteColor: "",
    optOutMarketing: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PrizeDrawInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    reference: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = PrizeDrawSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PrizeDrawInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PrizeDrawInput;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prize-draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();
      if (data.success) {
        setSubmissionSuccess({
          reference: data.reference,
          message: data.message,
        });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrors({ email: data.error || "Submission failed" });
      }
    } catch {
      setErrors({ email: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="text-center py-10 space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white">You&apos;re Entered!</h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          {submissionSuccess.message}
        </p>
        <div className="inline-block p-4 rounded-xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 block uppercase tracking-wider">
            Entry Reference
          </span>
          <span className="text-xl font-mono font-bold text-amber-400">
            {submissionSuccess.reference}
          </span>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => setSubmissionSuccess(null)}
            className="text-white border-slate-600 hover:bg-slate-700"
          >
            Enter Another Mover
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="border-b border-slate-700 pb-4 mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-400" />
          Free Prize Draw Registration
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Fill out your details to enter. No purchase required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="e.g. Sarah"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.firstName && (
            <p className="text-xs text-rose-400 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="e.g. Jenkins"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.lastName && (
            <p className="text-xs text-rose-400 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="sarah@example.co.uk"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && (
            <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="07123 456789"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Postal Code *
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            placeholder="e.g. SW1A 1AA"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase"
          />
          {errors.postalCode && (
            <p className="text-xs text-rose-400 mt-1">{errors.postalCode}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Favourite Colour *
          </label>
          <input
            type="text"
            value={formData.favoriteColor}
            onChange={(e) =>
              setFormData({ ...formData, favoriteColor: e.target.value })
            }
            placeholder="e.g. Teal / Navy"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.favoriteColor && (
            <p className="text-xs text-rose-400 mt-1">{errors.favoriteColor}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          New Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="14 Meadow Way, Town, County"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.address && (
          <p className="text-xs text-rose-400 mt-1">{errors.address}</p>
        )}
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400">
          <input
            type="checkbox"
            checked={formData.optOutMarketing}
            onChange={(e) =>
              setFormData({ ...formData, optOutMarketing: e.target.checked })
            }
            className="mt-0.5 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500"
          />
          <span>
            Opt out of partner discount alerts and moving advice updates.
          </span>
        </label>
      </div>

      <div className="pt-3">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          isLoading={isSubmitting}
          className="w-full justify-center shadow-lg shadow-orange-500/20"
        >
          <Award className="w-5 h-5 mr-2" />
          Submit £10,000 Prize Draw Entry
        </Button>
      </div>
    </form>
  );
}
