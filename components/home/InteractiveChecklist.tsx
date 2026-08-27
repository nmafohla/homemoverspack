"use client";

import { useState, useSyncExternalStore, useMemo, useCallback } from "react";
import { CheckSquare, Printer, Download, RotateCcw } from "lucide-react";
import {
  MOVING_CHECKLIST_ITEMS,
  CHECKLIST_STAGES,
  ChecklistItem,
} from "@/data/checklist";
import { calculateChecklistStats } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChecklistTaskCard } from "./ChecklistTaskCard";

const STORAGE_KEY = "hmp_checklist_completed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || "[]";
  } catch {
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

  const [localCompletedIds, setLocalCompletedIds] = useState<string[] | null>(
    null,
  );

  const completedIds: string[] = useMemo(() => {
    if (localCompletedIds !== null) {
      return localCompletedIds;
    }
    try {
      return JSON.parse(storedJson) as string[];
    } catch {
      return [];
    }
  }, [localCompletedIds, storedJson]);

  const toggleItem = useCallback(
    (id: string) => {
      const next = completedIds.includes(id)
        ? completedIds.filter((item) => item !== id)
        : [...completedIds, id];
      setLocalCompletedIds(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    [completedIds],
  );

  const handleReset = () => {
    if (window.confirm("Reset your moving checklist progress?")) {
      setLocalCompletedIds([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const stageItems = useMemo(() => {
    return MOVING_CHECKLIST_ITEMS.filter((item) => item.stage === activeStage);
  }, [activeStage]);

  const stats = useMemo(() => {
    const total = MOVING_CHECKLIST_ITEMS.length;
    const completed = completedIds.length;
    return calculateChecklistStats(total, completed);
  }, [completedIds]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="checklist"
      className="py-20 lg:py-28 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
            Interactive Moving Tool
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            UK Moving House Checklist
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Stay organized from 8 weeks prior to move-in day. Tick tasks off as
            you go; your progress saves automatically on this device.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Move Preparation Progress
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                <span>{stats.percentage}% Completed</span>
                <span className="text-sm font-normal text-slate-500">
                  ({completedIds.length} of {MOVING_CHECKLIST_ITEMS.length}{" "}
                  tasks done)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-1.5 text-xs bg-white dark:bg-slate-700"
              >
                <Printer className="w-3.5 h-3.5" />
                Print List
              </Button>
              <a
                href="https://homemoverspack.com/wp-content/uploads/2020/08/moving-checklist.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </Button>
              </a>
              {completedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Checklist"
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        {/* Timeline Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {CHECKLIST_STAGES.map((stage) => {
            const isActive = activeStage === stage.id;
            const stageTasks = MOVING_CHECKLIST_ITEMS.filter(
              (i) => i.stage === stage.id,
            );
            const stageCompleted = stageTasks.filter((i) =>
              completedIds.includes(i.id),
            ).length;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-orange-500 dark:text-white border-slate-900 dark:border-orange-500 shadow-md"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>{stage.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {stageCompleted}/{stageTasks.length}
                  </span>
                </div>
                <div
                  className={`text-[11px] truncate ${
                    isActive
                      ? "text-slate-300 dark:text-orange-100"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {stage.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Checklist Task Items */}
        <div className="space-y-4">
          {stageItems.map((item: ChecklistItem) => (
            <ChecklistTaskCard
              key={item.id}
              item={item}
              isDone={completedIds.includes(item.id)}
              onToggle={toggleItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
