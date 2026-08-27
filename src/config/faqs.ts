import { site, credentials, canPublishInsuranceFigures } from "./site";
import { outOfTownNote } from "./areas";

/**
 * FAQs are rendered visibly AND emitted as FAQPage JSON-LD. That combination is
 * what wins featured snippets and gets quoted by AI search, so keep answers
 * self-contained: each one should make sense lifted out of context.
 */

export interface Faq {
  question: string;
  answer: string;
  /** Show on these pages. "all" = homepage + every service page. */
  scope: "all" | "residential" | "piano-spa" | "commercial";
}

export const faqs: Faq[] = [
  {
    question: "How much does it cost to move house in Auckland?",
    answer:
      "Cost depends on the size of your home, how far you're going, access at both ends, and whether you'd like us to pack. Rather than guess, we give you a fixed written quote before the day so there are no surprises on the invoice. Send through your details and we'll come back to you with a firm number.",
    scope: "all",
  },
  {
    question: "How far in advance should I book my move?",
    answer:
      `Two to three weeks is comfortable, and month-end and Fridays book out first. If your move is urgent, call us on ${site.phones.sales.label} to speak to a move manager and we'll tell you straight away what we can do.`,
    scope: "all",
  },
  {
    question: "What areas of Auckland do you cover?",
    answer:
      "The whole of Auckland — North Shore, Central, East, South and West — from our Auckland wide depots. " +
      outOfTownNote,
    scope: "all",
  },
  {
    question: "Are my belongings insured while you move them?",
    answer: canPublishInsuranceFigures
      ? `Yes. We carry comprehensive transit insurance covering items up to $${credentials.insurance.perPackage.toLocaleString()} per package and $${credentials.insurance.perMove.toLocaleString()} per move. We'll confirm the cover that applies to your move in writing with your quote.`
      : "Yes. We carry comprehensive transit insurance, and we'll confirm in writing exactly what cover applies to your move when we send your quote. If you're moving anything unusually valuable, tell us up front and we'll talk you through the options.",
    scope: "all",
  },
  {
    question: "Do you supply boxes and packing materials?",
    answer:
      "We do. You can buy cartons and materials from us, have our team pack the whole house, or anything in between — plenty of people pack their own boxes and leave the kitchen and wardrobes to us. We'll also take the flattened cartons away afterwards.",
    scope: "all",
  },
  {
    question: "Can you store my things if my settlement dates don't line up?",
    answer:
      "Yes. Professional storage is one of our core services, short or long term. It's a common situation — you settle on Friday and can't move in until the following week — and we'll hold everything securely and deliver when you're ready.",
    scope: "all",
  },
  {
    question: "Do I need to empty my drawers and wardrobes?",
    answer:
      "Empty drawers of anything heavy or breakable — clothing and linen can usually stay put. For wardrobes we bring hanging cartons so your clothes travel on the rail and go straight back on the rail at the other end.",
    scope: "residential",
  },
  {
    question: "Can you move a piano up or down stairs?",
    answer:
      "Yes. Stairs are routine for us — we use proper stair-climbing gear, skates and gantries rather than muscle alone. Tell us how many steps, how tight the turns are, and what the doorway width is, and we'll bring the right equipment and the right number of crew.",
    scope: "piano-spa",
  },
  {
    question: "Do you move grand pianos as well as uprights?",
    answer:
      "Both. A grand is dismantled properly for transport — legs and lyre removed, the case wrapped and carried on a purpose-built skid — then reassembled at the other end. We've been moving pianos as a family for over 30 years, which is where this business started.",
    scope: "piano-spa",
  },
  {
    question: "How do you move a spa pool?",
    answer:
      "It depends entirely on access. Where there's room we skate it out on purpose-built dollies; where there isn't, we crane it. Either way it travels on a truck with suspension rated for that kind of concentrated weight, and we reposition it level on the new pad. We'll check your driveway, gates and turning space before we quote.",
    scope: "piano-spa",
  },
  {
    question: "Can you move our office outside business hours?",
    answer:
      "Yes, and most of our commercial clients prefer it. We schedule office relocations for evenings and weekends so your team finishes on Friday in the old premises and starts on Monday in the new one. There's no premium drama about it — it's how we plan commercial work.",
    scope: "commercial",
  },
  {
    question: "How do you make sure everything ends up at the right desk?",
    answer:
      "We work to a labelled floor plan agreed with you at the walkthrough. Crates and furniture are numbered to match, so your staff arrive to their own gear at their own desk rather than a pile in reception. We coordinate IT and server equipment with your provider separately.",
    scope: "commercial",
  },
];

export const faqsFor = (scope: Faq["scope"]) =>
  faqs.filter((f) => f.scope === "all" || f.scope === scope);
