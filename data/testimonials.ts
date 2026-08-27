export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  highlight: string;
  verifiedMoveDate: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Charlotte Cottle",
    location: "Kent",
    quote:
      "Wow, what a pleasant surprise to receive this on our doorstep! Took the stress right away from having to search around for broadband and security deals. Thanks HomeMoversPack, keep up the fantastic work.",
    rating: 5,
    highlight: "Saved hours searching for broadband deals",
    verifiedMoveDate: "Verified 2026 Home Mover",
  },
  {
    id: "test-2",
    name: "Nathan & Jenny Dyer",
    location: "Newcastle",
    quote:
      "The interactive moving checklist was genuinely a lifesaver. It kept our moving weekend running completely smoothly without any forgotten meter readings or utility headaches.",
    rating: 5,
    highlight: "Checklist kept everything organized",
    verifiedMoveDate: "Verified 2026 Home Mover",
  },
  {
    id: "test-3",
    name: "Kevin Brown",
    location: "Watford",
    quote:
      "Haven’t even finished unpacking all our boxes yet but already redeemed £75+ worth of discounts from the partner brands. Loved the tea and coffee samples inside the welcome box too!",
    rating: 5,
    highlight: "Redeemed over £75 in partner savings",
    verifiedMoveDate: "Verified Home Mover",
  },
  {
    id: "test-4",
    name: "Stephen McKenzie",
    location: "London",
    quote:
      "Used one of the appliance codes to pick up our brand new kitchen set with zero hassle and genuine savings. An unexpected but high-value welcome surprise.",
    rating: 5,
    highlight: "Substantial savings on brand new appliances",
    verifiedMoveDate: "Verified Home Mover",
  },
  {
    id: "test-5",
    name: "Paula Graham",
    location: "Manchester",
    quote:
      "What a delightful package to arrive on moving week. The guides, prize draw entry, and thoughtful vouchers made our move feel celebrated rather than stressful.",
    rating: 5,
    highlight: "Made moving feel celebrated",
    verifiedMoveDate: "Verified Home Mover",
  },
];
