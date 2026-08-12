/**
 * The three service pillars. Graeme asked for three tabbed options so customers
 * don't get lost on one long page — this array drives the homepage tabs, the
 * nav dropdown, the quote form's move-type selector, and the /services/[slug]
 * pages. Order matters: residential leads, per the brief.
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
  tagline: string;
  blurb: string;
  /** Longer copy for the dedicated service page. */
  intro: string[];
  inclusions: { name: string; detail: string }[];
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
    title: "Residential house moving",
    businessShare: 50,
    tagline: "From a studio apartment to a five-bedroom family home.",
    blurb:
      "The bulk of what we do. Careful, uniformed crews who wrap, load, drive and place your things exactly where you want them — anywhere in Auckland and well beyond.",
    intro: [
      "Half of everything we move is somebody's home. After twenty-five years and more than five thousand properties, we have a fair idea of what makes moving day go badly — and how to keep it from happening to you.",
      "Our crews arrive on time, in uniform, with blankets, straps, wardrobe cartons and trolleys already on the truck. We wrap your furniture before it leaves the room, not after it is scratched. And we place things where you actually want them in the new house, rather than stacking every box in the garage and driving off.",
    ],
    inclusions: [
      { name: "Full home moves", detail: "Studio through to large family homes, single or multi-truck." },
      { name: "Large furniture moves", detail: "Wardrobes, beds, fridges, pool tables and awkward one-off items." },
      { name: "Packing & boxes", detail: "We can pack the whole house, just the kitchen, or simply drop off cartons." },
      { name: "Unpack & setup", detail: "Beds reassembled, boxes unpacked, flattened cartons taken away." },
      { name: "Professional storage", detail: "Secure short and long-term storage when settlement dates don't line up." },
      { name: "Out-of-town relocations", detail: "Hamilton, Mangawhai, Tauranga and the wider upper North Island." },
    ],
    assurances: [
      "Uniformed, trained crews — no day-labour hires",
      "Furniture blanket-wrapped before it leaves the room",
      "Fixed quote confirmed in writing before the day",
      "Graeme personally follows up after the move",
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
      "Auckland house movers with 25+ years' experience and 5,000+ homes moved. Uniformed crews, packing and storage, fixed written quotes.",
    accent: "navy",
    icon: "home",
  },
  {
    slug: "piano-spa",
    label: "Piano & spa pool",
    title: "Piano & spa pool moving",
    businessShare: 40,
    tagline: "The specialist gear, and the family that has been doing it longest.",
    blurb:
      "Grand pianos, uprights, spa pools, pool tables and safes. Purpose-built trucks, proper skates and gantries, and crews who learned this trade from Peter “Fats” Fatialofa himself.",
    intro: [
      "This is where the family started. Graeme learned the trade moving pianos alongside his uncle, Peter “Fats” Fatialofa, and it is still the work we are best known for. Four in every ten jobs we do is a piano, a spa pool or something else heavy and unforgiving.",
      "Heavy specialist items are not a furniture move with more people on the end of it. They need the right trucks — suspension rated for concentrated point loads — plus skates, gantries, stair-climbing gear and crews who have moved hundreds of them. Brute force is how instruments get broken. We combine mind and muscle, in that order.",
    ],
    inclusions: [
      { name: "Grand & baby grand pianos", detail: "Legs and lyre removed, wrapped, boarded and moved on a purpose-built skid." },
      { name: "Upright pianos", detail: "Including tight hallways, staircases and second-storey apartments." },
      { name: "Spa pools", detail: "Craned or skated out, transported level, and repositioned on the new pad." },
      { name: "Pool & billiard tables", detail: "Dismantled, slate handled properly, reassembled and re-levelled." },
      { name: "Safes & heavy machinery", detail: "Gym equipment, safes, statues, industrial plant and workshop gear." },
      { name: "Access assessment", detail: "We check driveways, gates, steps and turning space before quoting." },
    ],
    assurances: [
      "Purpose-built trucks rated for heavy point loads",
      "Cushioned moving blankets protect against moisture and knocks",
      "Skates, gantries and stair gear as standard — not improvised",
      "Decades of specialist experience through our brother company, Fats Boys",
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
      "Auckland's specialist piano and spa pool movers. Purpose-built trucks, proper gantries and skates, 25+ years in the trade. Pool tables and safes too.",
    accent: "brand",
    icon: "piano",
  },
  {
    slug: "commercial",
    label: "Commercial move",
    title: "Commercial & office relocation",
    businessShare: 10,
    tagline: "Move over the weekend. Open for business on Monday.",
    blurb:
      "Office and workplace relocations planned around your trading hours. Desks, workstations, server racks, archives and fitout — sequenced so your team walks in and simply gets back to work.",
    intro: [
      "An office move is a project, not a truck booking. The cost of getting it wrong is not a scratched sideboard — it is a floor of staff who cannot work on Monday morning.",
      "We plan commercial relocations backwards from the moment you need to be trading again. That means a walkthrough, a labelled floor plan, crate delivery ahead of time, an agreed sequence for IT and server gear, and a crew working the hours that suit you rather than the hours that suit us. We have moved thirty-person offices with fifteen years of accumulated contents in a single day.",
    ],
    inclusions: [
      { name: "Office & workplace moves", detail: "Single suites through to whole-floor relocations." },
      { name: "After-hours & weekend moves", detail: "Scheduled outside trading hours to protect your downtime." },
      { name: "Crate hire & labelling", detail: "Numbered crates and a floor plan so everything lands at the right desk." },
      { name: "IT & server relocation", detail: "Coordinated with your IT provider, racks moved and reinstated." },
      { name: "Archive & records", detail: "Secure handling of files, with storage available." },
      { name: "Fitout & delivery", detail: "New furniture received, assembled and installed to plan." },
    ],
    assurances: [
      "Site walkthrough and written move plan before we quote",
      "One point of contact from planning through to handover",
      "Weekend and after-hours scheduling at no drama",
      "Desks labelled to a floor plan — staff sit down and start",
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
];

export const getPillar = (slug: string) =>
  servicePillars.find((pillar) => pillar.slug === slug);

/** Everything we do, for the footer and the "full service list" block. */
export const allServices = [
  "Residential house moving",
  "Commercial & office relocation",
  "Large furniture moves",
  "Piano moving",
  "Spa pool moving",
  "Pool table moving",
  "Packing & boxes",
  "Unpack & setup",
  "Professional storage",
  "Moving insurance",
] as const;
