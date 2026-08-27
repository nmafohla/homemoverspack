import { describe, it, expect } from "vitest";
import { calculateChecklistStats } from "@/lib/utils";
import { MOVING_CHECKLIST_ITEMS, CHECKLIST_STAGES } from "@/data/checklist";

describe("Moving Checklist Logic & Data", () => {
  it("contains valid stages with items assigned to each", () => {
    CHECKLIST_STAGES.forEach((stage) => {
      const itemsInStage = MOVING_CHECKLIST_ITEMS.filter(
        (item) => item.stage === stage.id,
      );
      expect(itemsInStage.length).toBeGreaterThan(0);
    });
  });

  it("calculates completion statistics accurately", () => {
    const total = 20;
    const completed = 5;
    const stats = calculateChecklistStats(total, completed);

    expect(stats.percentage).toBe(25);
    expect(stats.remaining).toBe(15);
  });

  it("handles 0 or empty checklist edge cases gracefully", () => {
    const stats = calculateChecklistStats(0, 0);
    expect(stats.percentage).toBe(0);
    expect(stats.remaining).toBe(0);
  });

  it("verifies essential priority moving tasks exist", () => {
    const meterReadings = MOVING_CHECKLIST_ITEMS.find(
      (i) => i.id === "meter-readings-photo",
    );
    expect(meterReadings).toBeDefined();
    expect(meterReadings?.important).toBe(true);

    const councilTax = MOVING_CHECKLIST_ITEMS.find(
      (i) => i.id === "register-council-tax",
    );
    expect(councilTax).toBeDefined();
    expect(councilTax?.important).toBe(true);
  });
});
