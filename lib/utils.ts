export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatUKDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function calculateChecklistStats(
  total: number,
  completed: number,
): {
  percentage: number;
  remaining: number;
} {
  if (total <= 0) return { percentage: 0, remaining: 0 };
  const percentage = Math.round((completed / total) * 100);
  const remaining = Math.max(0, total - completed);
  return { percentage, remaining };
}
