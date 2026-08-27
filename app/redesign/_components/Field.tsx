"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

interface BaseProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  hint?: string;
  className?: string;
  required?: boolean;
  tone?: Tone;
}

interface FieldProps extends BaseProps {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
}

const toneClasses = {
  dark: {
    label: "text-bone-300/70",
    control:
      "border-bone-100/15 bg-bone-50/[0.04] text-bone-50 placeholder:text-bone-300/30 focus:border-bone-100/40",
    hint: "text-bone-300/45",
  },
  light: {
    label: "text-ink-500",
    control:
      "border-ink-900/12 bg-bone-50 text-ink-900 placeholder:text-ink-300 focus:border-ink-900/35",
    hint: "text-ink-400",
  },
} as const;

const controlBase =
  "w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ember-500/35";

/** Single-line input with its label, hint and validation message wired together. */
export function Field({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  className,
  type = "text",
  autoComplete,
  required,
  tone = "dark",
}: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const styles = toneClasses[tone];

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.14em]",
          styles.label,
        )}
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          controlBase,
          "mt-2 h-12",
          styles.control,
          error && "border-ember-500/70",
        )}
      />

      {hint && !error && (
        <p id={hintId} className={cn("mt-1.5 text-[11.5px]", styles.hint)}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[11.5px] text-ember-400">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextAreaFieldProps extends BaseProps {
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}

/** Multi-line sibling of Field, sharing its labelling and error wiring. */
export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  className,
  rows = 4,
  placeholder,
  maxLength,
  required,
  tone = "dark",
}: TextAreaFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const styles = toneClasses[tone];

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.14em]",
          styles.label,
        )}
      >
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          controlBase,
          "mt-2 resize-y py-3 leading-relaxed",
          styles.control,
          error && "border-ember-500/70",
        )}
      />

      {hint && !error && (
        <p id={hintId} className={cn("mt-1.5 text-[11.5px]", styles.hint)}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[11.5px] text-ember-400">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps extends BaseProps {
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
}

/** Native select, styled to match Field. */
export function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  className,
  options,
  placeholder,
  required,
  tone = "dark",
}: SelectFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const styles = toneClasses[tone];

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.14em]",
          styles.label,
        )}
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          controlBase,
          "mt-2 h-12 cursor-pointer appearance-none",
          styles.control,
          error && "border-ember-500/70",
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && !error && (
        <p id={hintId} className={cn("mt-1.5 text-[11.5px]", styles.hint)}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[11.5px] text-ember-400">
          {error}
        </p>
      )}
    </div>
  );
}
