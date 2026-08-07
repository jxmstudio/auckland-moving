/**
 * Single source of truth for business details.
 *
 * Items marked PENDING are awaiting confirmation from Graeme / Tere.
 * Change them here and they update everywhere on the site.
 */

export const site = {
  /**
   * PENDING: Tere asked whether to incorporate "FATSBOYS" into the name.
   * Currently trading as Auckland Moving Professionals Ltd.
   * If Graeme confirms the co-brand, change `name` and `legalName` here only.
   */
  name: "Auckland Moving Professionals",
  legalName: "Auckland Moving Professionals Ltd",
  shortName: "AMP",

  tagline: "Moving Aucklanders into new homes and offices for over 25 years",

  url: "https://www.aucklandmoving.co.nz",

  /**
   * Former trading name. Kept for SEO continuity only — see /src/config/seo.ts
   * for the reasoning. Not used in visible headings or the logo.
   */
  formerName: "Suburban Metro Relocations",

  email: "sales@aucklandmoving.co.nz",

  phones: {
    /** Primary CTA everywhere — sales / office. */
    sales: {
      label: "021 217 3102",
      tel: "+64212173102",
      name: "Sales & bookings",
      person: "Tere McLindon, Office Manager",
    },
    /** Secondary — operations line, shown in footer and on /contact. */
    operations: {
      label: "027 486 6538",
      tel: "+6427486 6538".replace(/\s/g, ""),
      name: "Operations",
      person: "Graeme Fatialofa, General Manager",
    },
  },

  social: {
    /**
     * PENDING: Facebook handle changes to /aucklandmovingprofessionals once the
     * new logo lands and the page is renamed. Update this one value then.
     */
    facebook: "https://facebook.com/suburbanmetrorelocations",
  },

  /** Brother company — specialist piano & spa work. */
  siblingCompany: {
    name: "Fats Boys Ltd",
    url: "https://fatsboysltd.co.nz",
  },

  depots: [
    { region: "South Auckland", note: "Serving Manukau, Papakura, Franklin and the southern corridor" },
    { region: "West Auckland", note: "Serving Waitākere, Henderson, Massey and the north-west" },
  ],

  hours: {
    weekdays: "Mon – Fri, 7:00am – 6:00pm",
    saturday: "Saturday, 8:00am – 4:00pm",
    sunday: "Sunday by arrangement",
  },

  /** Threshold below which we push people to phone instead of email. */
  urgentMoveHours: 48,
} as const;

export const credentials = {
  yearsExperience: 25,
  propertiesMoved: 5000,
  propertiesMovedWindowYears: 10,
  googleRating: 4.8,
  googleReviewCount: 125,

  memberships: [
    {
      name: "National Road Carriers Association",
      confirmed: true,
      note: "Confirmed by Tere.",
    },
  ],

  /**
   * PENDING — Tere is speaking with the insurer to confirm these figures.
   * Sourced from the current aucklandmoving.co.nz site. While `confirmed` is
   * false the site says "comprehensive insurance available" WITHOUT quoting
   * dollar figures, so we never publish an unverified number.
   * Flip `confirmed: true` once verified and the amounts appear automatically.
   */
  insurance: {
    confirmed: false,
    perPackage: 2000,
    perMove: 150000,
    currency: "NZD",
  },
} as const;

/** Convenience: is it safe to publish the insurance dollar amounts yet? */
export const canPublishInsuranceFigures = credentials.insurance.confirmed;

export type Phone = (typeof site.phones)[keyof typeof site.phones];
