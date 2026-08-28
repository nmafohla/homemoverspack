/**
 * Brand marks for the partner offers directory, keyed by offer id.
 *
 * The directory was reading as one block of grey text: twelve cards with
 * identical typographic structure and no brand colour anywhere. A real mark
 * gives each card something to recognise before reading it.
 *
 * Every mark here is an existing sponsor creative already in
 * `public/redesign/sponsors/`. No new assets, no new rights, nothing drawn or
 * approximated. Most are the 210x116 partner buttons rather than bare logos,
 * which is why each sits contained inside a chip: that normalises marks
 * arriving on their own background colours (Gousto red, TV Licensing black)
 * into a consistent row.
 *
 * `chip` says what the artwork needs behind it. Airtasker's mark is the one
 * from the site's hero slider — pure white on transparency — so on the default
 * white chip it renders as an empty box. It gets a dark chip instead. The rest
 * are opaque tiles that sit correctly on white.
 *
 * Four brands (ADT, EE, AEG, DVLA) have no standalone mark in the library,
 * only wide banners, two of them animated. They are deliberately absent here.
 * Their cards show the brand name as plain text, with no chip and no frame, so
 * nothing on the page can be mistaken for a logo the brand did not supply.
 * Cropping one out of a banner, or setting a wordmark to look like a mark,
 * would both be inventing brand assets.
 *
 * When a real logo arrives, adding it is a single line here.
 */
const SPONSORS = "/redesign/sponsors";

export interface OfferLogo {
  src: string;
  /** Background the artwork needs to stay visible. */
  chip: "light" | "dark";
}

export const OFFER_LOGOS: Readonly<Record<string, OfferLogo>> = {
  "airtasker-moving": {
    src: `${SPONSORS}/airtasker-logo.png`,
    chip: "dark",
  },
  "le-creuset": { src: `${SPONSORS}/le-creuset-button.jpg`, chip: "light" },
  "gousto-meals": { src: `${SPONSORS}/gousto-button.gif`, chip: "light" },
  "earthborn-paint": { src: `${SPONSORS}/earthborn-button.gif`, chip: "light" },
  "cuprinol-garden": { src: `${SPONSORS}/cuprinol-button.jpg`, chip: "light" },
  "amex-rewards": { src: `${SPONSORS}/amex-button.gif`, chip: "light" },
  "tv-licensing": { src: `${SPONSORS}/tv-licensing-button.jpg`, chip: "light" },
  "smeg-design": { src: `${SPONSORS}/smeg-button.png`, chip: "light" },
};

export const offerLogo = (offerId: string): OfferLogo | undefined =>
  OFFER_LOGOS[offerId];
