/**
 * Testimonials pulled from the existing aucklandmoving.co.nz site
 * (homepage + /reviews-and-testimonials/) plus the live Google Business
 * listing (4.9★, 199 reviews — see credentials in site.ts).
 *
 * `verified` marks quotes we have attribution for and are confident republishing.
 * Google reviews carry the reviewer's name exactly as it appears publicly.
 * Long reviews are shortened to a verbatim excerpt (with only spelling tidied),
 * never reworded — don't paraphrase a real customer.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  location?: string;
  /** Which service pillar this speaks to — used to filter on service pages. */
  pillar?: "residential" | "piano-spa" | "commercial";
  verified: boolean;
  /** Set for quotes lifted from the public Google Business listing. */
  source?: "google";
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We have used Graeme and his team on two occasions now and both experiences have been fantastic. The team was professional, friendly, on time, and took great care with all of our belongings. They made the whole moving process smooth and stress-free.",
    name: "Tim Begg",
    location: "Google review",
    pillar: "residential",
    verified: true,
    source: "google",
  },
  {
    quote:
      "Highly recommend Auckland Moving Professionals! The team was punctual, professional, and handled everything with great care from start to finish. All our furniture arrived safely and the team worked incredibly hard all day. Definitely a five-star experience.",
    name: "Sarikha McCarthy",
    location: "Google review",
    pillar: "residential",
    verified: true,
    source: "google",
  },
  {
    quote:
      "Nothing was too much for them. They took it all in their stride and just got on with it. Not once did they complain — they were truly fantastic. Thank you so very much for taking all the worry away from me. Great company to deal with.",
    name: "Sandra Carr",
    location: "Google review",
    pillar: "residential",
    verified: true,
    source: "google",
  },
  {
    quote:
      "Graeme's team of Tino, Junior, and Motu were a delight to deal with. Nothing was too much trouble, and they moved all our furniture quickly and carefully while being cheerful and positive throughout. I would also highly recommend them.",
    name: "Hamish Morrison",
    location: "Google review",
    pillar: "residential",
    verified: true,
    source: "google",
  },
  {
    quote:
      "The guys were very professional and did a great job with my grand piano. Highly recommend.",
    name: "Richelle Mullins",
    location: "Google review",
    pillar: "piano-spa",
    verified: true,
    source: "google",
  },
  {
    quote:
      "Your team Motu and Hemi are the best. They arrived on time and started work immediately. They worked cheerfully, respectfully, professionally and with well coordinated team work. Fa'afetai tele lava.",
    name: "Sulita",
    location: "Google review",
    verified: true,
    source: "google",
  },
  {
    quote:
      "Motu was very particular with the back of the truck — not dropping but placing items onto the floor. He also packed the truck really well with everything fastened and secured. They care for your stuff.",
    name: "Bryan Nimo",
    location: "Google review",
    pillar: "residential",
    verified: true,
    source: "google",
  },
  {
    quote:
      "Really awesome movers, they went above and beyond on our moving day and made the whole process a lot less stressful. Highly recommended.",
    name: "Charlie Isdale",
    location: "Google review",
    verified: true,
    source: "google",
  },
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
