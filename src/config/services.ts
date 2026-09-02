/**
 * The three service pillars. Graeme asked for three tabbed options so customers
 * don't get lost on one long page — this array drives the homepage tabs, the
 * nav dropdown, the quote form's move-type selector, and the /services/[slug]
 * pages. Order matters: residential, commercial, then heavy weight, per the
 * client's Sep 2026 revision.
 */

export type ServiceSlug = "residential" | "piano-spa" | "commercial";

export interface ServicePillar {
  slug: ServiceSlug;
  /** Short label for tabs and form options. */
  label: string;
  /** Full name for headings and page titles. */
  title: string;
  /** Share of current business — informs prominence, shown to nobody. */
  businessShare: number;
  tagline?: string;
  blurb?: string;
  /** Longer copy for the dedicated service page. */
  intro: string[];
  /** Heading over the inclusions list — the client words this per pillar. */
  inclusionsLabel: string;
  inclusions: { name: string; detail?: string }[];
  /** Reassurance points specific to this move type. */
  assurances: string[];
  /** Primary keyword cluster for this page. */
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  accent: "navy" | "brand" | "teal";
  icon: "home" | "piano" | "office";
}

export const servicePillars: ServicePillar[] = [
  {
    slug: "residential",
    label: "Residential move",
    title: "Residential moving",
    businessShare: 50,
    tagline: "From small apartments to large house moves.",
    blurb: "When you book with us you can expect:",
    intro: [
      "Half of everything we move is somebody's home. After thirty years and more than five thousand properties, we have a fair idea of what makes moving day go badly — and how to keep it from happening to you.",
      "Our crews arrive on time, in uniform, with blankets, straps, wardrobe cartons and trolleys already on the truck. We wrap your furniture before it leaves the room, not after it is scratched. And we place things where you actually want them in the new house, rather than stacking every box in the garage and driving off.",
    ],
    inclusionsLabel: "Services available",
    inclusions: [
      { name: "Full house move" },
      { name: "Full pre-pack of your home" },
      { name: "Unpack and set up of your home" },
      { name: "Packing materials" },
      { name: "Secure short or long term storage available" },
      { name: "Intercity North Island relocations" },
    ],
    assurances: [
      "All quotes personalised for each move",
      "Move manager throughout the booking process",
      "Team leader assigned for all moves",
      "Experienced and serving movers in uniform",
      "Clean trucks, equipped with moving blankets, ties and trolleys",
    ],
    keywords: [
      "house movers Auckland",
      "furniture removals Auckland",
      "residential moving company Auckland",
      "home movers Auckland",
      "moving house Auckland",
    ],
    metaTitle: "House Movers Auckland | Residential Moving Co.",
    metaDescription:
      "Auckland house movers with 30+ years' experience and 5,000+ homes moved. Uniformed crews, packing and storage, personalised written quotes.",
    accent: "navy",
    icon: "home",
  },
  {
    slug: "commercial",
    label: "Commercial move",
    title: "Commercial relocations",
    businessShare: 10,
    blurb: "When you book with us you can expect:",
    intro: [
      "An office move is a project, not a truck booking. The cost of getting it wrong is not a scratched sideboard — it is a floor of staff who cannot work on Monday morning.",
      "We plan commercial relocations backwards from the moment you need to be trading again. That means a walkthrough, a labelled floor plan, crate delivery ahead of time, an agreed sequence for IT and server gear, and a crew working the hours that suit you rather than the hours that suit us. We have moved thirty-person offices with fifteen years of accumulated contents in a single day.",
    ],
    inclusionsLabel: "Services provided",
    inclusions: [
      { name: "Office and workspace moves" },
      { name: "Fitout moving specialist" },
      { name: "Exhibition and tradeshow moves" },
    ],
    assurances: [
      "All quotes personalised for each move",
      "Move manager throughout the booking process",
      "Team leader assigned for all moves",
      "Experienced and serving movers in uniform",
      "Clean trucks, equipped with moving blankets, ties and trolleys",
    ],
    keywords: [
      "office movers Auckland",
      "commercial relocation Auckland",
      "business movers Auckland",
      "office relocation company Auckland",
      "corporate movers Auckland",
    ],
    metaTitle: "Office Movers Auckland | Commercial Relocations",
    metaDescription:
      "Auckland office and commercial relocation. Weekend and after-hours moves, crate hire, IT and server relocation, planned around your trading hours.",
    accent: "teal",
    icon: "office",
  },
  {
    slug: "piano-spa",
    label: "Heavy Weight Move",
    title: "Specialised moving",
    businessShare: 40,
    tagline: "The specialist gear, and the family that has been doing it longest.",
    blurb:
      "Grand pianos, uprights, spa pools, pool tables, safes, statues and anything heavy and challenging.",
    intro: [
      "This is where the family started. Graeme learned the trade moving pianos alongside his Uncle, Peter “Fats” Fatialofa, and it is still the work we are best known for. Four in every ten jobs we do is a piano, a spa pool or something else heavy and unforgiving.",
      "Heavy specialist items are not a furniture move with more people on the end of it. They need the right trucks — suspension rated for concentrated point loads — plus skates, gantries, stair-climbing gear and crews who have moved hundreds of them. Brute force is how instruments get broken. We combine mind and muscle, in that order.",
    ],
    inclusionsLabel: "Services available",
    inclusions: [
      { name: "Grand & baby grand pianos", detail: "Legs and lyre removed, wrapped, boarded and moved on a purpose-built skid." },
      { name: "Upright pianos", detail: "Including tight hallways, staircases and second-storey apartments." },
      { name: "Spa pools", detail: "Craned or skated out, transported level, and repositioned on the new pad." },
      { name: "Pool & billiard tables", detail: "Dismantled, slate handled properly, reassembled and re-levelled." },
      { name: "Safes & heavy machinery", detail: "Gym equipment, safes, statues, industrial plant and workshop gear." },
      { name: "Access assessment", detail: "We check driveways, gates, steps and turning space before quoting." },
    ],
    assurances: [
      "All quotes personalised for each move",
      "Team members trained from the same blueprint set by Peter “Fats” Fatialofa",
      "Purpose-built cradles, slides, hand trolleys and dollies",
      "Move manager throughout the booking process",
      "Team leader assigned for all moves",
      "Experienced and serving movers in uniform",
      "Clean trucks, equipped with moving blankets, ties and trolleys",
    ],
    keywords: [
      "piano movers Auckland",
      "spa pool movers Auckland",
      "pool table movers Auckland",
      "grand piano moving Auckland",
      "specialist heavy item movers Auckland",
    ],
    metaTitle: "Piano & Spa Pool Movers Auckland | Specialists",
    metaDescription:
      "Auckland's specialist piano and spa pool movers. Purpose-built trucks, proper gantries and skates, 30+ years in the moving industry. Pool tables and safes too.",
    accent: "brand",
    icon: "piano",
  },
];

export const getPillar = (slug: string) =>
  servicePillars.find((pillar) => pillar.slug === slug);

/** Everything we do, for the footer and the "full service list" block. */
export const allServices = [
  "Residential moving",
  "Commercial relocations",
  "Large furniture moves",
  "Piano moving",
  "Spa pool moving",
  "Pool table moving",
  "Packing & boxes",
  "Unpack & setup",
  "Professional storage",
  "Moving insurance",
] as const;
