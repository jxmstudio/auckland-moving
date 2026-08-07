/**
 * Testimonials pulled from the existing aucklandmoving.co.nz site
 * (homepage + /reviews-and-testimonials/).
 *
 * `verified` marks quotes we have attribution for and are confident republishing.
 * Anything added later from Google should carry the reviewer's name as it appears
 * publicly on the review — don't paraphrase a real customer.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  location?: string;
  /** Which service pillar this speaks to — used to filter on service pages. */
  pillar?: "residential" | "piano-spa" | "commercial";
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I've moved a couple of times and each time I've used Graeme and his team. They're professional, prompt and helpful and their pricing is very reasonable. I'd highly recommend them.",
    name: "Stacey Jones",
    role: "Rugby league legend",
    pillar: "residential",
    verified: true,
  },
  {
    quote:
      "Auckland Moving did a fantastic job helping us move offices. There were 30 people who needed to be moved and we'd been there 15 years so it was a major task. They did it all in one day. They made it so easy.",
    name: "Frances Tagaloa",
    role: "Operations Manager, Tandem Ministries",
    pillar: "commercial",
    verified: true,
  },
  {
    quote:
      "It was a tricky move – we had people moving into our home and things were delayed. Graeme and his team arrived with big smiles and just rallied round, nothing was a problem. Thank you Team – you did a great job.",
    name: "Ian Grant",
    role: "Author, youth mentor & parenting consultant",
    pillar: "residential",
    verified: true,
  },
  {
    quote:
      "Rarely have we experienced such remarkable service in any industry. This is an exceptional company with great leadership from Graeme Fatialofa.",
    name: "Simon",
    location: "North Shore",
    verified: true,
  },
  {
    quote:
      "They arrived promptly, great care was shown in the movement of furniture from house to truck and expert packing into our storage unit.",
    name: "Kevin & Lois McPherson",
    pillar: "residential",
    verified: true,
  },
  {
    quote:
      "The guys turned up half an hour early on the day and got into it straight away – they are very quick and efficient and we had no breakages at all.",
    name: "Hannah A",
    pillar: "residential",
    verified: true,
  },
  {
    quote:
      "They were friendly, dealt with my 3 year old 'helping' and directing and did a great job.",
    name: "Melissa",
    pillar: "residential",
    verified: true,
  },
  {
    quote:
      "Awesome service all day, very experienced group that helped us relocate 3 truckloads of household items. Respect, energy and smiles are the key ingredients.",
    name: "Darren",
    pillar: "residential",
    verified: true,
  },
];

export const testimonialsFor = (pillar: Testimonial["pillar"]) =>
  testimonials.filter((t) => t.pillar === pillar);
