"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FeedbackSchema, FeedbackInput } from "@/lib/validations";

export function FeedbackSection() {
  const [formData, setFormData] = useState<FeedbackInput>({
    email: "",
    rating: "5",
    category: "Welcome Box & Essentials",
    comments: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FeedbackInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = FeedbackSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FeedbackInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FeedbackInput;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setFormData({
          email: "",
          rating: "5",
          category: "Welcome Box & Essentials",
          comments: "",
        });
      } else {
        setErrors({ comments: data.error || "Submission failed" });
      }
    } catch {
      setErrors({ comments: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="feedback"
      className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
              Mover Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Just Got Your Pack? Tell Us What You Think
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Your feedback directly shapes the sample products, partner offers,
              and moving tools we include in future welcome packs.
            </p>
          </div>

          {successMessage ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Thank You for Your Feedback!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {successMessage}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuccessMessage(null)}
              >
                Send Another Response
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.co.uk"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pack Usefulness Rating *
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: e.target.value as "1" | "2" | "3" | "4" | "5",
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="5">
                      5 ★ - Extremely Useful &amp; Loved It
                    </option>
                    <option value="4">4 ★ - Very Helpful</option>
                    <option value="3">3 ★ - Good / Average</option>
                    <option value="2">2 ★ - Minor Value</option>
                    <option value="1">1 ★ - Not Very Useful</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Which pack or tool did you receive / use?
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="Welcome Box & Essentials">
                    Physical HomeMovers Welcome Box
                  </option>
                  <option value="Moving Checklist & Tools">
                    Interactive Moving Checklist Tool
                  </option>
                  <option value="Partner Discounts & Deals">
                    Partner Discount Vouchers
                  </option>
                  <option value="Digital Magazine 2026">
                    Home Movers Digital Magazine
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Comments &amp; Suggestions *
                </label>
                <textarea
                  rows={4}
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                  placeholder="What did you enjoy most about the pack? What additional products or services would have helped your move?"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.comments && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.comments}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
