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
 * A two-state switch can't express "follow my OS" — the setting most people
 * actually want — and once toggled it could never be handed back.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-slate-200 p-0.5 dark:border-slate-700",
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
              "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-orange-500",
              isActive
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
