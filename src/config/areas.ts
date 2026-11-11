/**
 * Service areas. Drives the coverage section, the footer link list, and the
 * areaServed array in our LocalBusiness schema.
 *
 * Brief: the whole of Auckland, plus out-of-town relocations. We do not
 * aggressively pursue jobs beyond roughly five hours' travel each way, so the
 * copy invites the enquiry without promising the country.
 */

export interface AucklandRegion {
  /** URL segment for the region landing page, /areas/[slug]. */
  slug: string;
  name: string;
  suburbs: string[];
  /**
   * Unique copy for the region landing page. Two short paragraphs each —
   * written to be genuinely local (streets, housing stock, access realities)
   * so the pages earn rankings for "movers <region>" instead of reading as
   * doorway-page boilerplate, which Google demotes.
   */
  intro: string[];
  /** ~60-char title and ~160-char description for the region page. */
  metaTitle: string;
  metaDescription: string;
}

export const aucklandRegions: AucklandRegion[] = [
  {
    slug: "south-auckland",
    name: "South Auckland",
    suburbs: [
      "Manukau", "Papakura", "Pukekohe", "Botany", "Howick", "Ōtāhuhu",
      "Māngere", "Papatoetoe", "Takanini", "Franklin",
    ],
    intro: [
      "South Auckland is where a big share of our work happens — family homes in Papatoetoe and Māngere, new builds filling up Takanini and Pukekohe, and everything in between. Our South Auckland crews know the subdivisions as well as the established streets, so the truck that arrives is close by, on time, and driven by someone who has moved in your suburb before.",
      "We handle full house moves, pre-packing, and the heavy jobs South Auckland families call us for most — pianos, spa pools and pool tables. Moving within the south, across town, or down to the Waikato, you get the same crew standard and a fixed written quote before the day.",
    ],
    metaTitle: "South Auckland Movers | Auckland Moving Professionals",
    metaDescription:
      "Movers in South Auckland — Manukau, Papakura, Pukekohe, Botany, Māngere and every suburb between. Family-owned, 30+ years' experience. Free written quote.",
  },
  {
    slug: "west-auckland",
    name: "West Auckland",
    suburbs: [
      "Henderson", "Te Atatū", "Massey", "New Lynn", "Titirangi", "Glen Eden",
      "Kumeū", "Swanson", "Hobsonville", "Westgate",
    ],
    intro: [
      "West Auckland moves come with their own geography — steep bush driveways in Titirangi, long right-of-ways in Glen Eden, and brand-new terraces in Hobsonville and Westgate where the truck has to share a narrow lane with the neighbours' cars. We assess access before we quote, so the day never starts with a surprise.",
      "From Henderson out to Kumeū and Swanson, our West Auckland crews move households, offices and heavy specialist items with the same gear and the same care. If you're heading further — up to Northland or across the bridge — the quote covers the whole trip, not just the loading.",
    ],
    metaTitle: "West Auckland Movers | Auckland Moving Professionals",
    metaDescription:
      "Movers in West Auckland — Henderson, New Lynn, Titirangi, Massey, Hobsonville and beyond. Steep drives and tricky access handled daily. Free written quote.",
  },
  {
    slug: "central-auckland",
    name: "Central Auckland",
    suburbs: [
      "Ponsonby", "Grey Lynn", "Mount Eden", "Epsom", "Remuera", "Newmarket",
      "Parnell", "Mount Albert", "Onehunga", "Ellerslie",
    ],
    intro: [
      "Central Auckland is villas, apartments and narrow streets. A Ponsonby or Grey Lynn villa means weatherboard hallways, tight staircases and furniture that has to come out through a window more often than you'd think; a Newmarket or city-fringe apartment means booking the lift and working to body-corporate rules. We do both every week.",
      "Our crews move homes and offices across Mount Eden, Epsom, Remuera, Parnell and the city fringe, and we're one of the few Auckland moving companies with the specialist gear for the grand pianos these suburbs are full of. Parking, lifts and loading-zone timing are sorted before the day, in the plan, not improvised on it.",
    ],
    metaTitle: "Central Auckland Movers | Auckland Moving Professionals",
    metaDescription:
      "Movers in Central Auckland — Ponsonby, Grey Lynn, Mount Eden, Remuera, Parnell and the city fringe. Villas, apartments and offices. Free written quote.",
  },
  {
    slug: "north-shore",
    name: "North Shore",
    suburbs: [
      "Takapuna", "Devonport", "Albany", "Browns Bay", "Milford", "Glenfield",
      "Birkenhead", "Northcote", "Silverdale", "Orewa",
    ],
    intro: [
      "North Shore moves run from Devonport's heritage villas to Albany's new apartments and the growing streets of Silverdale and Orewa. Hillside sections in Birkenhead and Northcote often mean steps — sometimes a lot of them — so we scope the access first and bring the crew size the job actually needs.",
      "Whether you're moving within the Shore, crossing the bridge, or heading north to Whangārei or Mangawhai, you get a fixed written quote and a crew that has done hundreds of Shore moves. Takapuna and Milford apartment buildings, Browns Bay family homes, Glenfield townhouses — we know the buildings and the shortcuts.",
    ],
    metaTitle: "North Shore Movers Auckland | Moving Professionals",
    metaDescription:
      "Movers on the North Shore — Takapuna, Albany, Browns Bay, Devonport, Glenfield, Orewa and every bay between. Family-owned, 30+ years. Free written quote.",
  },
  {
    slug: "east-auckland",
    name: "East Auckland",
    suburbs: [
      "Bucklands Beach", "Pakuranga", "Half Moon Bay", "Beachlands",
      "Whitford", "Dannemora", "Flat Bush", "Mission Bay", "St Heliers", "Kohimarama",
    ],
    intro: [
      "East Auckland is big family homes — Dannemora, Flat Bush and Pakuranga houses that fill a truck properly, and bays-side properties in Mission Bay, St Heliers and Kohimarama where the driveway drops steeply to the water. Our East Auckland moves are planned around exactly that: the right truck, the right crew size, and furniture protected before it leaves the room.",
      "We also run regular moves out to Beachlands and Whitford, where lifestyle blocks add long drives and gravel to the equation. Spa pools are a staple out east — craned or skated out, moved level, and set down on the new pad ready to fill.",
    ],
    metaTitle: "East Auckland Movers | Auckland Moving Professionals",
    metaDescription:
      "Movers in East Auckland — Pakuranga, Bucklands Beach, Half Moon Bay, Flat Bush, Mission Bay and out to Beachlands. Homes, offices and spa pools. Free written quote.",
  },
];

export const getRegion = (slug: string) =>
  aucklandRegions.find((region) => region.slug === slug);

/** Out-of-town relocations we regularly run. */
export const outOfTown = [
  "Hamilton",
  "Mangawhai",
  "Whangārei",
  "Tauranga",
  "Waikato",
  "Northland",
  "Coromandel",
  "Bay of Plenty",
];

export const outOfTownNote =
  "We regularly run relocations out of Auckland — Hamilton, Mangawhai, Whangārei and the wider upper North Island. As a rule of thumb we take on jobs within about five hours' travel each way; if you're further afield, ask us anyway and we'll tell you honestly whether we're the right fit.";

/** Flattened list of every suburb, for schema.org areaServed. */
export const allSuburbs = aucklandRegions.flatMap((r) => r.suburbs);
