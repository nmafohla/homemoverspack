import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Dark sections invert the whole stack rather than restating six classes. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <Reveal
        className={cn(
          "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
          centered && "justify-center",
          isDark ? "text-ember-300" : "text-accent",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            isDark ? "bg-ember-400/60" : "bg-accent/50",
          )}
        />
        {eyebrow}
      </Reveal>

      <Reveal
        as="h2"
        delay={80}
        className={cn(
          "font-display mt-5 text-[2.15rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]",
          isDark ? "text-bone-50" : "text-body",
        )}
      >
        {title}
      </Reveal>

      {lede && (
        <Reveal
          as="p"
          delay={160}
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            isDark ? "text-bone-300/80" : "text-body-soft",
          )}
        >
          {lede}
        </Reveal>
      )}
    </div>
  );
}
