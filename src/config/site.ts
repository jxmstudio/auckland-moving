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

  tagline: "Moving Aucklanders into new homes and offices for over 30 years",

  url: "https://www.aucklandmoving.co.nz",

  /**
   * Former trading name. Kept for SEO continuity only — see /src/config/seo.ts
   * for the reasoning. Not used in visible headings or the logo.
   */
  formerName: "Suburban Metro Relocations",

  /**
   * Both the address quote enquiries are delivered to and the one shown to
   * customers — header, footer, contact, reviews, the quote form's success
   * message, and the Organization schema all read this one value.
   */
  email: "sales@aucklandmoving.co.nz",

  phones: {
    /**
     * The one number, everywhere — the client asked for a single 0800 line as
     * the call-to-action on every phone reference.
     */
    sales: {
      label: "0800 328 425",
      tel: "0800328425",
      name: "Call to speak to a move manager",
      person: "Sales, bookings & operations",
    },
  },

  social: {
    /**
     * PENDING: Facebook handle changes to /aucklandmovingprofessionals once the
     * new logo lands and the page is renamed. Update this one value then.
     */
    facebook: "https://facebook.com/suburbanmetrorelocations",
  },

  /**
   * The live Google Business listing (place CID). Where "read our reviews on
   * Google" links point; also where customers land to leave one.
   */
  googleReviewsUrl: "https://maps.google.com/?cid=14409457913544713031",

  /** Brother company — specialist piano & spa work. */
  siblingCompany: {
    name: "Fats Boys Ltd",
    url: "https://fatsboysltd.co.nz",
  },

  hours: {
    weekdays: "Mon – Fri, 7:00am – 6:00pm",
    saturday: "Saturday, 8:00am – 4:00pm",
    sunday: "Sunday by arrangement",
  },

  /** Threshold below which we push people to phone instead of email. */
  urgentMoveHours: 48,
} as const;

export const credentials = {
  yearsExperience: 30,
  propertiesMoved: 5000,
  propertiesMovedWindowYears: 10,
  /* Checked live on the Google Business listing, 28 Aug 2026. */
  googleRating: 4.9,
  googleReviewCount: 199,

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
