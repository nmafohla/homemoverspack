"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PartnerContactSchema, PartnerContactInput } from "@/lib/validations";

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerInquiryModal({
  isOpen,
  onClose,
}: PartnerInquiryModalProps) {
  const [formData, setFormData] = useState<PartnerContactInput>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    interestType: "pack_sampling",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PartnerContactInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = PartnerContactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PartnerContactInput, string>> =
        {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PartnerContactInput;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/partner-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrors({ message: data.error || "Submission failed" });
      }
    } catch {
      setErrors({ message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsSuccess(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Brand Partnership Inquiry"
      maxWidth="lg"
    >
      {isSuccess ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            Inquiry Received
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            Thank you for getting in touch. Our partnership team will contact
            you with media kit details within 1 business day.
          </p>
          <Button variant="outline" size="sm" onClick={handleClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Company / Brand Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              placeholder="e.g. Acme Home Solutions"
              className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.companyName && (
              <p className="text-xs text-rose-500 mt-1">{errors.companyName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                placeholder="e.g. John Smith"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.contactName && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.contactName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@brand.co.uk"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="020 1234 5678"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.phone && (
                <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Partnership Area *
              </label>
              <select
                value={formData.interestType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interestType: e.target
                      .value as PartnerContactInput["interestType"],
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="pack_sampling">
                  Physical Welcome Box Sampling
                </option>
                <option value="digital_offer">
                  Digital Mover Perk / Voucher
                </option>
                <option value="magazine_feature">
                  Magazine Feature / Advertorial
                </option>
                <option value="brand_sponsorship">
                  Overall Brand Sponsorship
                </option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Message / Campaign Details *
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell us about your brand, target audience, and expected campaign timeline."
              className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.message && (
              <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="accent"
              size="md"
              isLoading={isSubmitting}
              className="w-full justify-center"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Send Partnership Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
