export interface PartnerOffer {
  id: string;
  brand: string;
  category:
    | "Broadband & Tech"
    | "Home & Security"
    | "Kitchen & Dining"
    | "Decor & DIY"
    | "Essential Services"
    | "Lifestyle & Food";
  title: string;
  tagline: string;
  description: string;
  badge: string;
  discountCode?: string;
  link: string;
  featured?: boolean;
  terms?: string;
}

export const PARTNER_OFFERS: PartnerOffer[] = [
  {
    id: "airtasker-moving",
    brand: "Airtasker",
    category: "Essential Services",
    title: "Up to £25 Off Local Home Mover & Handyman Tasks",
    tagline: "Assembly, packing help, deep cleaning & wall mounting",
    description:
      "Connect with trusted local Taskers for furniture assembly, box shifting, end of tenancy cleans, and TV mounting in your new home.",
    badge: "Popular Mover Perk",
    discountCode: "HOMEMOVER25",
    link: "https://www.airtasker.com/uk/lp/partners/homemoverspack/",
    featured: true,
    terms: "Valid on first task booking over £50 for verified movers.",
  },
  {
    id: "adt-security",
    brand: "ADT Smart Home",
    category: "Home & Security",
    title: "Exclusive Home Security Package + Free Video Doorbell",
    tagline: "24/7 Professional monitoring & smart app controls",
    description:
      "Protect your new property from day one with the UK’s leading security specialist. Includes professional installation and smart alarm starter kit.",
    badge: "Home Security Deal",
    discountCode: "HMP-ADT-SECURE",
    link: "https://homemoverspack.co.uk/adt-260630",
    featured: true,
    terms: "Applicable to new homeowner ADT monitoring contracts.",
  },
  {
    id: "ee-broadband",
    brand: "EE Full Fibre",
    category: "Broadband & Tech",
    title: "Gigabit Fibre Broadband with £50 Bill Credit",
    tagline: "Ultra-fast, reliable WiFi ready for your move-in day",
    description:
      "Ensure your new home is connected on moving day with EE UK Full Fibre broadband. Fast speeds for remote work, streaming, and smart home appliances.",
    badge: "Broadband Special",
    discountCode: "EE-MOVER-CREDIT",
    link: "https://homemoverspack.co.uk/ee-26-07-01",
    featured: true,
    terms: "Available to new fibre connections on 24-month plans.",
  },
  {
    id: "le-creuset",
    brand: "Le Creuset",
    category: "Kitchen & Dining",
    title: "15% Off Iconic Cast Iron Cookware & Kitchen Sets",
    tagline: "Timeless culinary essentials for your new kitchen",
    description:
      "Equip your new home with handcrafted cast iron casseroles, stoneware, and chef-quality kitchenware built to last a lifetime.",
    badge: "Kitchen Upgrade",
    discountCode: "NEWKITCHEN15",
    link: "https://homemoverspack.co.uk/lecreuset-23-10-30",
    featured: true,
    terms: "Valid online at Le Creuset UK across qualifying collections.",
  },
  {
    id: "gousto-meals",
    brand: "Gousto",
    category: "Lifestyle & Food",
    title: "60% Off Your 1st Recipe Box + 20% Off for 2 Months",
    tagline: "Zero-fuss dinners during your busy first moving weeks",
    description:
      "Take the chore out of cooking while unpacking boxes. Choose from 75+ weekly delicious chef-developed recipes delivered straight to your door.",
    badge: "Move-in Dining",
    discountCode: "GOUS-MOVER60",
    link: "https://homemoverspack.co.uk/gousto",
    terms: "New customer offer. Discount automatically applied at checkout.",
  },
  {
    id: "aeg-appliances",
    brand: "AEG Appliances",
    category: "Kitchen & Dining",
    title: "Up to £150 Cashback on EcoLine Home Appliances",
    tagline: "Smart ovens, quiet washing machines & induction hobs",
    description:
      "Upgrade your new home with cutting-edge German engineering, maximum energy efficiency, and extended multi-year warranties.",
    badge: "Energy Efficient",
    discountCode: "AEG-ECO-CASHBACK",
    link: "https://homemoverspack.co.uk/aeg",
  },
  {
    id: "earthborn-paint",
    brand: "Earthborn Paints",
    category: "Decor & DIY",
    title: "Free Colour Card Pack & 10% Off Eco Paints",
    tagline: "Breathable, odourless paints with rich velvety pigments",
    description:
      "Claypaint and breathable interior wall paints designed specifically for healthy homes and historic or modern plasterwork.",
    badge: "Eco Decor",
    discountCode: "EARTHMOVE10",
    link: "https://homemoverspack.co.uk/earthborn",
  },
  {
    id: "cuprinol-garden",
    brand: "Cuprinol",
    category: "Decor & DIY",
    title: "Transform Your Garden Fence & Shed with 20% Off",
    tagline: "Ducksback weatherproof wood stains & vibrant garden shades",
    description:
      "Give your new garden an instant refresh. Long-lasting weatherproof protection in 30+ stunning outdoor shades.",
    badge: "Garden Refresh",
    link: "https://homemoverspack.co.uk/cuprinol",
  },
  {
    id: "amex-rewards",
    brand: "American Express",
    category: "Lifestyle & Food",
    title: "Earn Bonus Welcome Points on Moving Expenses",
    tagline:
      "Turn sofa purchases, white goods, and van hire into travel rewards",
    description:
      "Maximize the purchasing power of your move-in expenditures with introductory cashback and points on qualifying spend.",
    badge: "Financial Rewards",
    link: "https://homemoverspack.co.uk/amex",
  },
  {
    id: "dvla-change-address",
    brand: "DVLA Guidance",
    category: "Essential Services",
    title: "Free Official Vehicle & Driving Licence Address Checklist",
    tagline: "Keep your logbook (V5C) and driving licence fully legal",
    description:
      "Direct government guidance to update your driving licence, car tax address, and logbook for free without third-party fees.",
    badge: "Official Guide",
    link: "https://homemoverspack.co.uk/dvla",
  },
  {
    id: "tv-licensing",
    brand: "TV Licensing",
    category: "Essential Services",
    title: "Transfer Your TV Licence to Your New Address in 60 Seconds",
    tagline: "Stay covered for live television and BBC iPlayer",
    description:
      "Official direct link to transfer your TV Licence so you remain fully compliant from the moment you plug in your television.",
    badge: "Essential Admin",
    link: "https://homemoverspack.co.uk/tvlicensing",
  },
  {
    id: "smeg-design",
    brand: "Smeg UK",
    category: "Kitchen & Dining",
    title: "Complimentary Accessory with 50s Style Retro Appliances",
    tagline: "Iconic Italian style for your countertop and kitchen",
    description:
      "Add statement character to your breakfast bar with retro kettles, toasters, and bean-to-cup espresso machines.",
    badge: "Design Icon",
    link: "https://homemoverspack.co.uk/smeguk",
  },
];
