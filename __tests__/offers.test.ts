import { describe, it, expect } from "vitest";
import { PARTNER_OFFERS } from "@/data/offers";

describe("Partner Offers Directory", () => {
  it("contains valid offers with required metadata", () => {
    expect(PARTNER_OFFERS.length).toBeGreaterThan(5);

    PARTNER_OFFERS.forEach((offer) => {
      expect(offer.id).toBeTruthy();
      expect(offer.brand).toBeTruthy();
      expect(offer.title).toBeTruthy();
      expect(offer.link).toMatch(/^https?:\/\//);
    });
  });

  it("filters offers by category accurately", () => {
    const techOffers = PARTNER_OFFERS.filter(
      (o) => o.category === "Broadband & Tech",
    );
    expect(techOffers.length).toBeGreaterThan(0);
    expect(techOffers.some((o) => o.brand === "EE Full Fibre")).toBe(true);
  });

  it("has valid coupon codes where specified", () => {
    const offersWithCodes = PARTNER_OFFERS.filter((o) => !!o.discountCode);
    expect(offersWithCodes.length).toBeGreaterThan(0);

    offersWithCodes.forEach((offer) => {
      expect(offer.discountCode?.length).toBeGreaterThan(3);
    });
  });
});
