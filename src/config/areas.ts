/**
 * Service areas. Drives the coverage section, the footer link list, and the
 * areaServed array in our LocalBusiness schema.
 *
 * Brief: the whole of Auckland, plus out-of-town relocations. We do not
 * aggressively pursue jobs beyond roughly five hours' travel each way, so the
 * copy invites the enquiry without promising the country.
 */

export const aucklandRegions = [
  {
    name: "South Auckland",
    depot: true,
    suburbs: [
      "Manukau", "Papakura", "Pukekohe", "Botany", "Howick", "Ōtāhuhu",
      "Māngere", "Papatoetoe", "Takanini", "Franklin",
    ],
  },
  {
    name: "West Auckland",
    depot: true,
    suburbs: [
      "Henderson", "Te Atatū", "Massey", "New Lynn", "Titirangi", "Glen Eden",
      "Kumeū", "Swanson", "Hobsonville", "Westgate",
    ],
  },
  {
    name: "Central Auckland",
    depot: false,
    suburbs: [
      "Ponsonby", "Grey Lynn", "Mount Eden", "Epsom", "Remuera", "Newmarket",
      "Parnell", "Mount Albert", "Onehunga", "Ellerslie",
    ],
  },
  {
    name: "North Shore",
    depot: false,
    suburbs: [
      "Takapuna", "Devonport", "Albany", "Browns Bay", "Milford", "Glenfield",
      "Birkenhead", "Northcote", "Silverdale", "Orewa",
    ],
  },
  {
    name: "East Auckland",
    depot: false,
    suburbs: [
      "Bucklands Beach", "Pakuranga", "Half Moon Bay", "Beachlands",
      "Whitford", "Dannemora", "Flat Bush", "Mission Bay", "St Heliers", "Kohimarama",
    ],
  },
];

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
