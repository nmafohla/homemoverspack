import { describe, it, expect } from "vitest";
import {
  PrizeDrawSchema,
  FeedbackSchema,
  PartnerContactSchema,
} from "@/lib/validations";

describe("Form Validation Schemas", () => {
  describe("PrizeDrawSchema", () => {
    it("validates correct prize draw input", () => {
      const validData = {
        firstName: "Sarah",
        lastName: "Jenkins",
        email: "sarah.jenkins@example.co.uk",
        phone: "07123456789",
        postalCode: "SW1A 1AA",
        address: "10 Downing Street, London",
        favoriteColor: "Cobalt Blue",
        optOutMarketing: false,
      };

      const result = PrizeDrawSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects invalid email and short names", () => {
      const invalidData = {
        firstName: "S",
        lastName: "",
        email: "not-an-email",
        phone: "123",
        postalCode: "SW",
        address: "No",
        favoriteColor: "",
        optOutMarketing: false,
      };

      const result = PrizeDrawSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.firstName).toBeDefined();
        expect(errors.email).toBeDefined();
        expect(errors.phone).toBeDefined();
      }
    });
  });

  describe("FeedbackSchema", () => {
    it("validates legitimate feedback", () => {
      const validFeedback = {
        email: "mover@example.com",
        rating: "5" as const,
        category: "Welcome Box & Essentials",
        comments: "Loved the tea bags and the discount codes for Airtasker!",
      };

      const result = FeedbackSchema.safeParse(validFeedback);
      expect(result.success).toBe(true);
    });

    it("rejects too short comments", () => {
      const invalidFeedback = {
        email: "mover@example.com",
        rating: "5" as const,
        category: "Welcome Box",
        comments: "Short",
      };

      const result = FeedbackSchema.safeParse(invalidFeedback);
      expect(result.success).toBe(false);
    });
  });

  describe("PartnerContactSchema", () => {
    it("validates brand partnership inquiries", () => {
      const validPartner = {
        companyName: "British Gas Solutions",
        contactName: "James Wilson",
        email: "james@britishgas.co.uk",
        phone: "02079460123",
        interestType: "pack_sampling" as const,
        message:
          "We would like to include boiler service vouchers in your 2026 welcome packs.",
      };

      const result = PartnerContactSchema.safeParse(validPartner);
      expect(result.success).toBe(true);
    });
  });
});
