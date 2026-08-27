"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  setTheme,
  subscribeToTheme,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const OPTIONS: ReadonlyArray<{
  value: Theme;
  label: string;
  Icon: typeof Sun;
}> = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
];

/**
 * Three-way theme control: light, follow-the-system, dark.
 *
 * A plain two-state switch can't express "follow my OS", which is the setting
 * most people actually want — and once toggled it could never be given back.
 *
 * `onDark` styling is for the transparent header over the hero, where the
 * surface behind the control is dark regardless of theme.
 */
export function ThemeToggle({
  tone = "paper",
  className,
}: {
  tone?: "paper" | "onDark";
  className?: string;
}) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const isOnDark = tone === "onDark";

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5",
        isOnDark ? "border-bone-100/20" : "border-body/12",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500",
              isActive
                ? isOnDark
                  ? "bg-bone-50/15 text-bone-50"
                  : "bg-invert text-invert-fg"
                : isOnDark
                  ? "text-bone-200/60 hover:text-bone-50"
                  : "text-body-mute hover:text-body",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
