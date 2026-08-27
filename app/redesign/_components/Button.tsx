"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-ink-900 text-bone-50 hover:bg-ink-800 active:bg-ink-950 shadow-[0_1px_2px_rgba(6,8,12,0.35)]",
    accent:
      "bg-ember-500 text-white hover:bg-ember-600 shadow-[0_12px_32px_-14px_rgba(242,107,36,0.9)]",
    outline:
      "border border-ink-900/15 text-ink-800 hover:border-ink-900/35 hover:bg-ink-900/[0.04]",
    ghost: "text-ink-500 hover:text-ink-900 hover:bg-ink-900/[0.05]",
    onDark:
      "border border-bone-100/25 bg-bone-50/[0.06] text-bone-50 backdrop-blur-sm hover:bg-bone-50/[0.14] hover:border-bone-100/45",
  }[variant];

  const sizeStyles = {
    sm: "h-9 px-4 text-[13px] rounded-full",
    md: "h-11 px-6 text-sm rounded-full",
    lg: "h-14 px-8 text-[15px] rounded-full",
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100",
        variantStyles,
        sizeStyles,
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin text-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Working…
        </>
      ) : (
        children
      )}
    </button>
  );
}
