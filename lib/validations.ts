import { z } from "zod";

export const PrizeDrawSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name is too long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name is too long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email is too long" }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid UK contact number" })
    .max(20, { message: "Phone number is too long" }),
  postalCode: z
    .string()
    .min(4, { message: "Please enter a valid UK postcode" })
    .max(10, { message: "Postcode is too long" }),
  address: z
    .string()
    .min(5, { message: "Please provide your new or current address" })
    .max(200, { message: "Address is too long" }),
  favoriteColor: z
    .string()
    .min(2, { message: "Please tell us your favourite colour" })
    .max(50, { message: "Colour is too long" }),
  optOutMarketing: z.boolean().default(false),
});

export type PrizeDrawInput = z.infer<typeof PrizeDrawSchema>;

export const FeedbackSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email is too long" }),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    message: "Please select a rating from 1 to 5",
  }),
  category: z
    .string()
    .min(2, { message: "Please select what pack or offer you received" }),
  comments: z
    .string()
    .min(10, { message: "Comments must be at least 10 characters" })
    .max(1000, { message: "Comments must not exceed 1,000 characters" }),
});

export type FeedbackInput = z.infer<typeof FeedbackSchema>;

export const PartnerContactSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  contactName: z
    .string()
    .min(2, { message: "Contact name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid business email" }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid telephone number" }),
  interestType: z.enum(
    [
      "pack_sampling",
      "digital_offer",
      "magazine_feature",
      "brand_sponsorship",
      "other",
    ],
    { message: "Please select an area of partnership" },
  ),
  message: z
    .string()
    .min(10, {
      message: "Please provide brief details about your brand and inquiry",
    })
    .max(1000, { message: "Message must not exceed 1,000 characters" }),
});

export type PartnerContactInput = z.infer<typeof PartnerContactSchema>;
