export interface ChecklistItem {
  id: string;
  stage: "8-weeks" | "4-weeks" | "2-weeks" | "moving-day" | "week-one";
  category:
    "Utilities & Bills" | "Packing & Removals" | "Legal & Admin" | "Home Setup";
  title: string;
  description: string;
  important?: boolean;
  tip?: string;
}

export const CHECKLIST_STAGES = [
  {
    id: "8-weeks",
    label: "8 Weeks Before",
    subtitle: "Planning & Decluttering",
  },
  {
    id: "4-weeks",
    label: "4 Weeks Before",
    subtitle: "Bookings & Notifications",
  },
  {
    id: "2-weeks",
    label: "2 Weeks Before",
    subtitle: "Packing & Final Utility Prep",
  },
  {
    id: "moving-day",
    label: "Moving Day",
    subtitle: "Meters, Keys & Essentials",
  },
  {
    id: "week-one",
    label: "First Week In",
    subtitle: "Settling & Council Tax",
  },
] as const;

export const MOVING_CHECKLIST_ITEMS: ChecklistItem[] = [
  // 8 Weeks Before
  {
    id: "declutter-rooms",
    stage: "8-weeks",
    category: "Packing & Removals",
    title: "Declutter room by room (Sell, Donate, Recycle)",
    description:
      "Sort through the loft, cupboards, and garage. Don’t pay movers to transport things you no longer need.",
    tip: "Rule of thumb: If you haven’t used it in 12 months, consider donating or recycling.",
  },
  {
    id: "get-removal-quotes",
    stage: "8-weeks",
    category: "Packing & Removals",
    title: "Obtain 3 quotes from BAR-accredited removal companies",
    description:
      "Compare full-pack vs part-pack quotes, van sizes, and goods-in-transit insurance coverage.",
    important: true,
  },
  {
    id: "order-moving-boxes",
    stage: "8-weeks",
    category: "Packing & Removals",
    title: "Order heavy-duty double-walled boxes and bubble wrap",
    description:
      "Ensure you have a mix of small (for heavy books/cookware) and large boxes plus packing tape and markers.",
  },
  // 4 Weeks Before
  {
    id: "broadband-transfer",
    stage: "4-weeks",
    category: "Utilities & Bills",
    title: "Book broadband move / order new fibre installation",
    description:
      "Broadband transitions usually take 2-3 weeks for engineer scheduling. Book early so WiFi is live on arrival.",
    important: true,
    tip: "Check with your new provider if an Openreach engineer visit or simple router self-install is required.",
  },
  {
    id: "royal-mail-redirection",
    stage: "4-weeks",
    category: "Legal & Admin",
    title: "Set up Royal Mail postal redirection",
    description:
      "Redirect your post for 3, 6, or 12 months to prevent identity theft and missing vital correspondence.",
  },
  {
    id: "notify-landlord-or-solicitor",
    stage: "4-weeks",
    category: "Legal & Admin",
    title: "Confirm exchange & completion dates with solicitors / landlord",
    description:
      "Align your handover time (usually around 1:00 PM on completion day) with your removal company.",
    important: true,
  },
  // 2 Weeks Before
  {
    id: "notify-energy-supplier",
    stage: "2-weeks",
    category: "Utilities & Bills",
    title: "Contact gas and electricity suppliers with move-out date",
    description:
      "Provide 48+ hours notice of departure and provide your forwarding address for the closing bill.",
  },
  {
    id: "pack-non-essentials",
    stage: "2-weeks",
    category: "Packing & Removals",
    title: "Pack non-essential items & label boxes clearly by room",
    description:
      "Mark boxes clearly with destination room and contents. Mark fragile boxes in bold red marker.",
  },
  {
    id: "defrost-freezer",
    stage: "2-weeks",
    category: "Home Setup",
    title: "Eat through freezer items & plan freezer defrosting",
    description:
      "Washing machines and fridges/freezers must be drained and dried 24 hours before transit.",
  },
  // Moving Day
  {
    id: "first-night-box",
    stage: "moving-day",
    category: "Home Setup",
    title: 'Keep "First Night Box" accessible in your car',
    description:
      "Kettle, mugs, tea/coffee, snacks, phone chargers, toilet roll, bed sheets, medication, and essential tools.",
    important: true,
    tip: "Never pack this box in the removal van; keep it with you in your vehicle.",
  },
  {
    id: "meter-readings-photo",
    stage: "moving-day",
    category: "Utilities & Bills",
    title: "Take timestamped photos of gas, electric & water meters",
    description:
      "Photograph meters at old property before leaving AND at your new property as soon as you enter.",
    important: true,
    tip: "Take photos with clear serial numbers and numeric displays to resolve supplier disputes easily.",
  },
  {
    id: "locate-stopcock-fusebox",
    stage: "moving-day",
    category: "Home Setup",
    title: "Locate the main water stopcock and electrical fusebox",
    description:
      "Know where to shut off water in an emergency and check all boiler pressure gauges and radiator valves.",
  },
  // Week One In
  {
    id: "register-council-tax",
    stage: "week-one",
    category: "Legal & Admin",
    title: "Register for Council Tax with the local authority",
    description:
      "Set up your direct debit and check for single occupant discounts (25%) if applicable.",
    important: true,
  },
  {
    id: "update-dvla-v5c",
    stage: "week-one",
    category: "Legal & Admin",
    title: "Update Driving Licence and Vehicle Logbook (V5C) with DVLA",
    description:
      "Failing to update your vehicle registration address with DVLA carries a potential fine up to £1,000.",
    important: true,
  },
  {
    id: "register-local-gp",
    stage: "week-one",
    category: "Home Setup",
    title: "Register with local NHS GP surgery and dentist",
    description:
      "Transfer medical records to your local neighbourhood healthcare practice.",
  },
  {
    id: "electoral-roll",
    stage: "week-one",
    category: "Legal & Admin",
    title: "Register on the Electoral Roll at your new address",
    description:
      "Helps maintain your UK credit score and gives you voting eligibility in your constituency.",
  },
];
