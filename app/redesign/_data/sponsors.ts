/**
 * Advertiser inventory, by package.
 *
 * The three tiers are a commercial product, so the page has to make the
 * difference between them obvious at a glance — that visible gap is what a
 * platinum rate card is selling. Each tier gets its own creative size, its own
 * placement, and its own share of the page:
 *
 *   platinum — a 4:1 banner at the top of the stack, one per page, PLUS the
 *              "sponsored by" logo lockup on the hero. The lockup is the part
 *              gold cannot buy.
 *   gold     — a 6:1 banner in the stack below platinum. Narrower and shorter,
 *              deliberately, so the platinum slot still reads as the premium one.
 *   silver   — a 210x116 button in the grid. Present and clickable, but sized
 *              as a directory entry rather than a display ad.
 *
 * Creative sizes mirror the live site's specs so existing artwork drops in
 * unchanged; `width`/`height` below are the artwork's true pixel dimensions and
 * drive each slot's aspect ratio, which reserves space and prevents layout
 * shift as banners load.
 *
 * Creatives live in `public/redesign/sponsors/`, served from this deployment
 * rather than the live WordPress media library, so the site carries no runtime
 * dependency on homemoverspack.co.uk staying up.
 *
 * They are stored byte-identical to what each advertiser supplied — including
 * the animated GIFs (ADT, EE, Le Creuset) — and are deliberately not
 * re-compressed. These are creatives a brand has signed off; degrading the
 * artwork is not ours to do. Replacing one is a straight file swap, with the
 * `width`/`height` below updated to the new artwork's true dimensions.
 */
export type SponsorTier = "platinum" | "gold" | "silver";

export interface SponsorCreative {
  src: string;
  /** True artwork dimensions — used for the slot's aspect ratio. */
  width: number;
  height: number;
}

export interface Sponsor {
  id: string;
  brand: string;
  tier: SponsorTier;
  /** Tracked landing page, not the advertiser's own domain. */
  href: string;
  banner: SponsorCreative;
  /** Platinum only: the mark used in the hero "sponsored by" lockup. */
  logo?: SponsorCreative;
}

const MEDIA = "/redesign/sponsors";

export const SPONSORS: Sponsor[] = [
  {
    id: "airtasker",
    brand: "Airtasker",
    tier: "platinum",
    href: "https://homemoverspack.co.uk/airtasker",
    banner: {
      src: `${MEDIA}/airtasker-banner.jpg`,
      width: 1024,
      height: 256,
    },
    logo: {
      src: `${MEDIA}/airtasker-logo.png`,
      width: 297,
      height: 102,
    },
  },
  {
    id: "adt",
    brand: "ADT Smart Home",
    tier: "gold",
    href: "https://homemoverspack.co.uk/adt-260630",
    banner: {
      src: `${MEDIA}/adt-banner.gif`,
      width: 1200,
      height: 200,
    },
  },
  {
    id: "ee",
    brand: "EE Full Fibre",
    tier: "gold",
    href: "https://homemoverspack.co.uk/ee-26-07-01",
    banner: {
      src: `${MEDIA}/ee-banner.gif`,
      width: 1200,
      height: 200,
    },
  },
  {
    id: "aeg",
    brand: "AEG",
    tier: "gold",
    href: "https://homemoverspack.co.uk/aeg",
    banner: { src: `${MEDIA}/aeg-banner.jpg`, width: 600, height: 100 },
  },
  {
    id: "le-creuset-banner",
    brand: "Le Creuset",
    tier: "gold",
    href: "https://homemoverspack.co.uk/lecreuset-23-10-30",
    banner: {
      src: `${MEDIA}/le-creuset-banner.gif`,
      width: 600,
      height: 100,
    },
  },
  {
    id: "gousto",
    brand: "Gousto",
    tier: "silver",
    href: "https://homemoverspack.co.uk/gousto",
    banner: { src: `${MEDIA}/gousto-button.gif`, width: 210, height: 116 },
  },
  {
    id: "charlton-jenrick",
    brand: "Charlton & Jenrick",
    tier: "silver",
    href: "https://homemoverspack.co.uk/charltonandjenrick",
    banner: {
      src: `${MEDIA}/charlton-jenrick-button.jpg`,
      width: 210,
      height: 116,
    },
  },
  {
    id: "earthborn",
    brand: "Earthborn Paints",
    tier: "silver",
    href: "https://homemoverspack.co.uk/earthborn",
    banner: {
      src: `${MEDIA}/earthborn-button.gif`,
      width: 210,
      height: 116,
    },
  },
  {
    id: "le-creuset-button",
    brand: "Le Creuset",
    tier: "silver",
    href: "https://homemoverspack.co.uk/lecreuset",
    banner: {
      src: `${MEDIA}/le-creuset-button.jpg`,
      width: 210,
      height: 116,
    },
  },
  {
    id: "amex",
    brand: "American Express",
    tier: "silver",
    href: "https://homemoverspack.co.uk/amex",
    banner: { src: `${MEDIA}/amex-button.gif`, width: 210, height: 116 },
  },
  {
    id: "cuprinol",
    brand: "Cuprinol",
    tier: "silver",
    href: "https://homemoverspack.co.uk/cuprinol",
    banner: {
      src: `${MEDIA}/cuprinol-button.jpg`,
      width: 210,
      height: 116,
    },
  },
  {
    id: "geberit",
    brand: "Geberit",
    tier: "silver",
    href: "https://homemoverspack.co.uk/geberit-23-10-30",
    banner: {
      src: `${MEDIA}/geberit-button.jpg`,
      width: 210,
      height: 116,
    },
  },
  {
    id: "tv-licensing",
    brand: "TV Licensing",
    tier: "silver",
    href: "https://homemoverspack.co.uk/tvlicensing",
    banner: {
      src: `${MEDIA}/tv-licensing-button.jpg`,
      width: 210,
      height: 116,
    },
  },
  {
    id: "smeg",
    brand: "Smeg UK",
    tier: "silver",
    href: "https://homemoverspack.co.uk/smeguk",
    banner: { src: `${MEDIA}/smeg-button.png`, width: 210, height: 116 },
  },
  {
    id: "ebay",
    brand: "eBay",
    tier: "silver",
    href: "https://homemoverspack.co.uk/ebay",
    banner: {
      src: `${MEDIA}/ebay-button.jpg`,
      width: 200,
      height: 110,
    },
  },
  {
    id: "nectar",
    brand: "Nectar",
    tier: "silver",
    href: "https://homemoverspack.co.uk/nectar",
    banner: {
      src: `${MEDIA}/nectar-button.jpg`,
      width: 210,
      height: 116,
    },
  },
];

export const sponsorsByTier = (tier: SponsorTier): Sponsor[] =>
  SPONSORS.filter((sponsor) => sponsor.tier === tier);

/** The single platinum advertiser, whose logo appears on the hero. */
export const platinumSponsor = (): Sponsor | undefined =>
  SPONSORS.find((sponsor) => sponsor.tier === "platinum");

/* ------------------------------------------------------------------
   Rate-card copy. Kept beside the inventory so what the page promises a
   buyer and what it actually renders can't drift apart.
   ------------------------------------------------------------------ */
export interface SponsorPackage {
  tier: SponsorTier;
  name: string;
  creative: string;
  includes: readonly string[];
}

export const SPONSOR_PACKAGES: readonly SponsorPackage[] = [
  {
    tier: "platinum",
    name: "Platinum",
    creative: "1024 × 256",
    includes: [
      "Logo on the homepage hero, badged “sponsored by”",
      "Largest banner, first position in the stack",
      "Exclusive — one platinum partner at a time",
      "Product placement in every pack",
      "Full page in the digital magazine",
    ],
  },
  {
    tier: "gold",
    name: "Gold",
    creative: "1200 × 200",
    includes: [
      "Full-width banner below the platinum slot",
      "Listed in the partner offers directory",
      "Product placement in every pack",
      "Half page in the digital magazine",
    ],
  },
  {
    tier: "silver",
    name: "Silver",
    creative: "210 × 116",
    includes: [
      "Button in the partner grid",
      "Listed in the partner offers directory",
      "Voucher or insert in every pack",
    ],
  },
];
