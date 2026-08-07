/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DECISION: what to do about "Suburban Metro Relocations"
 * ─────────────────────────────────────────────────────────────────────────────
 * Tere asked us to make the call. Short version: KEEP IT, BUT DEMOTE IT.
 *
 * Why not drop it entirely:
 *   - It's an existing trading name with real search history. People who moved
 *     with Graeme years ago will search that name, not the new one, and directory
 *     listings (callupcontact, Google Business, old invoices) still carry it.
 *   - Dropping the name outright means those searchers land on a competitor.
 *
 * Why not keep it prominent:
 *   - It has near-zero *generic* SEO value. Nobody searches "suburban metro
 *     relocations" unless they already know the name — it's a brand term, not a
 *     keyword. The volume that matters is "house movers Auckland", "piano movers
 *     Auckland" and so on, which the former name does nothing for.
 *   - Two names in headings and title tags splits brand signal and confuses
 *     customers, which is exactly what removing it from Facebook is meant to fix.
 *
 * So: it appears in exactly three low-visibility places —
 *   1. `alternateName` in the LocalBusiness JSON-LD (machine-readable only)
 *   2. one line in the About page history ("formerly trading as…")
 *   3. one FAQ entry answering "are you the same company as…"
 * That captures the name searches without polluting the visible brand.
 *
 * Revisit in ~12 months: if Search Console shows no impressions for the former
 * name, delete these three references and be done with it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { site, credentials } from "./site";
import { allSuburbs, outOfTown } from "./areas";
import { allServices } from "./services";
import { testimonials } from "./testimonials";
import type { Faq } from "./faqs";

export const defaultMeta = {
  /* Kept under ~60 chars so Google doesn't truncate it in results. */
  title: `${site.name} | House & Office Movers`,
  /* Kept under ~160 chars so Google shows the whole thing. */
  description: `Auckland movers with ${credentials.yearsExperience}+ years' experience and ${credentials.propertiesMoved.toLocaleString()}+ properties moved. Homes, offices, pianos and spa pools. Free written quote.`,
};

/** LocalBusiness / MovingCompany schema for the site root. */
export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${site.url}/#organisation`,
    name: site.legalName,
    /* The one place the former name earns its keep — see the note above. */
    alternateName: [site.name, site.shortName, site.formerName],
    url: site.url,
    email: site.email,
    description: defaultMeta.description,
    slogan: site.tagline,
    foundingDate: String(new Date().getFullYear() - credentials.yearsExperience),
    telephone: site.phones.sales.tel,
    priceRange: "$$",
    currenciesAccepted: "NZD",
    knowsLanguage: ["en-NZ", "sm"],
    sameAs: [site.social.facebook, site.siblingCompany.url],
    memberOf: credentials.memberships
      .filter((m) => m.confirmed)
      .map((m) => ({ "@type": "Organization", name: m.name })),
    address: {
      "@type": "PostalAddress",
      addressRegion: "Auckland",
      addressCountry: "NZ",
    },
    areaServed: [...allSuburbs, ...outOfTown, "Auckland"].map((name) => ({
      "@type": "Place",
      name,
    })),
    contactPoint: Object.values(site.phones).map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.tel,
      contactType: phone.name,
      areaServed: "NZ",
      availableLanguage: ["en-NZ", "Samoan"],
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: credentials.googleRating,
      reviewCount: credentials.googleReviewCount,
      bestRating: 5,
    },
    review: testimonials
      .filter((t) => t.verified)
      .slice(0, 5)
      .map((t) => ({
        "@type": "Review",
        reviewBody: t.quote,
        author: { "@type": "Person", name: t.name },
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Moving services",
      itemListElement: allServices.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
