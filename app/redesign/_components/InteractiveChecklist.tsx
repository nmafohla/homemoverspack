"use client";

import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Check, Info, Printer, RotateCcw } from "lucide-react";
import {
  CHECKLIST_STAGES,
  MOVING_CHECKLIST_ITEMS,
} from "@/data/checklist";
import { calculateChecklistStats } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

/** Shared with the original design, so progress carries across both. */
const STORAGE_KEY = "hmp_checklist_completed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || "[]";
  } catch {
    // Private mode and blocked storage both land here; an empty list is fine.
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

export function InteractiveChecklist() {
  const [activeStage, setActiveStage] = useState<string>("8-weeks");

  const storedJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Local state wins once the reader ticks anything; before that we render
  // whatever localStorage holds. This keeps the first paint SSR-consistent.
  const [localCompletedIds, setLocalCompletedIds] = useState<string[] | null>(
    null,
  );

  const completedIds = useMemo<string[]>(() => {
    if (localCompletedIds !== null) return localCompletedIds;
    try {
      const parsed: unknown = JSON.parse(storedJson);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      return [];
    }
  }, [localCompletedIds, storedJson]);

  const persist = useCallback((next: string[]) => {
    setLocalCompletedIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Nothing to do — the tick still applies for this session.
    }
  }, []);

  const toggleItem = useCallback(
    (id: string) => {
      persist(
        completedIds.includes(id)
          ? completedIds.filter((item) => item !== id)
          : [...completedIds, id],
      );
    },
    [completedIds, persist],
  );

  const stats = calculateChecklistStats(
    MOVING_CHECKLIST_ITEMS.length,
    completedIds.length,
  );

  const stageItems = MOVING_CHECKLIST_ITEMS.filter(
    (item) => item.stage === activeStage,
  );

  return (
    <section
      id="checklist"
      className="scroll-mt-24 border-b border-bone-300/60 bg-bone-50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Moving checklist"
            title={
              <>
                Everything, in the
                <br />
                <span className="italic text-ember-600">order it matters.</span>
              </>
            }
            lede="Eight weeks out to your first week in. Tick things off as you go — your progress is saved in this browser, no account needed."
            className="max-w-2xl"
          />

          {/* Progress dial */}
          <Reveal delay={180} className="flex items-center gap-6">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-bone-300"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="text-ember-500 transition-[stroke-dashoffset] duration-700 ease-out"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={
                    2 * Math.PI * 44 * (1 - stats.percentage / 100)
                  }
                />
              </svg>
              <span className="font-display absolute inset-0 flex items-center justify-center text-xl text-ink-900 tabular-nums">
                {stats.percentage}%
              </span>
            </div>

            <div>
              <p className="text-[15px] font-semibold text-ink-900">
                {completedIds.length} of {MOVING_CHECKLIST_ITEMS.length} done
              </p>
              <p className="mt-1 text-[13px] text-ink-400">
                {stats.remaining} task{stats.remaining === 1 ? "" : "s"} still
                to go
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.print()}
                  className="px-3"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  Print
                </Button>
                {completedIds.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => persist([])}
                    className="px-3"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stage rail */}
        <Reveal
          delay={120}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-bone-300/70 bg-bone-300/70 sm:grid-cols-3 lg:grid-cols-5"
        >
          {CHECKLIST_STAGES.map((stage) => {
            const total = MOVING_CHECKLIST_ITEMS.filter(
              (item) => item.stage === stage.id,
            );
            const done = total.filter((item) =>
              completedIds.includes(item.id),
            ).length;
            const isActive = activeStage === stage.id;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage.id)}
                aria-pressed={isActive}
                className={cn(
                  "cursor-pointer px-5 py-5 text-left transition-colors duration-400",
                  isActive
                    ? "bg-ink-900 text-bone-50"
                    : "bg-bone-50 text-ink-900 hover:bg-bone-100",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[13.5px] font-semibold">
                    {stage.label}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] tabular-nums",
                      isActive ? "text-bone-300/60" : "text-ink-400",
                    )}
                  >
                    {done}/{total.length}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-1.5 block text-[11.5px] leading-snug",
                    isActive ? "text-bone-300/60" : "text-ink-400",
                  )}
                >
                  {stage.subtitle}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Tasks */}
        <ul className="mt-12 border-t border-bone-300/70">
          {stageItems.map((item, index) => {
            const isDone = completedIds.includes(item.id);

            return (
              <Reveal
                key={item.id}
                as="li"
                delay={Math.min(index, 6) * 55}
                className="border-b border-bone-300/70"
              >
                <div className="flex items-start gap-5 py-6">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-pressed={isDone}
                    aria-label={`${isDone ? "Untick" : "Tick"} ${item.title}`}
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-all duration-300",
                      isDone
                        ? "border-sage-500 bg-sage-500 text-white"
                        : "border-ink-900/20 hover:border-ember-500",
                    )}
                  >
                    <Check
                      className={cn(
                        "h-3.5 w-3.5 transition-opacity duration-200",
                        isDone ? "opacity-100" : "opacity-0",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3
                        className={cn(
                          "text-[15.5px] font-semibold transition-colors duration-300",
                          isDone
                            ? "text-ink-300 line-through"
                            : "text-ink-900",
                        )}
                      >
                        {item.title}
                      </h3>
                      {item.important && !isDone && (
                        <span className="rounded-full bg-ember-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ember-700">
                          Don&rsquo;t skip
                        </span>
                      )}
                      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-300">
                        {item.category}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "mt-2 max-w-2xl text-[14px] leading-relaxed transition-colors duration-300",
                        isDone ? "text-ink-300" : "text-ink-500",
                      )}
                    >
                      {item.description}
                    </p>

                    {item.tip && !isDone && (
                      <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-400">
                        <Info
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-500"
                          aria-hidden="true"
                        />
                        {item.tip}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
