"use client";

import { CheckSquare, Square, AlertCircle, Lightbulb } from "lucide-react";
import { ChecklistItem } from "@/data/checklist";

interface ChecklistTaskCardProps {
  item: ChecklistItem;
  isDone: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistTaskCard({
  item,
  isDone,
  onToggle,
}: ChecklistTaskCardProps) {
  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none flex items-start gap-4 ${
        isDone
          ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-xs"
          : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        aria-label={
          isDone ? "Mark task as incomplete" : "Mark task as complete"
        }
        className="mt-0.5 shrink-0 text-slate-400 hover:text-orange-500 focus:outline-none cursor-pointer"
      >
        {isDone ? (
          <CheckSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Square className="w-6 h-6 text-slate-300 dark:text-slate-600" />
        )}
      </button>

      <div className="space-y-1.5 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-base font-bold ${
              isDone
                ? "line-through text-slate-500 dark:text-slate-400"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {item.title}
          </span>

          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {item.category}
          </span>

          {item.important && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-3 h-3" />
              Priority
            </span>
          )}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {item.description}
        </p>

        {item.tip && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300 text-xs font-medium mt-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Pro Tip: {item.tip}</span>
          </div>
        )}
      </div>
    </div>
  );
}
