import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
  JsonLd,
} from "@/components/ui";
import { RotatingTestimonials, GoogleRatingBadge } from "@/components/RotatingReviews";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { CheckIcon, PhoneIcon, ArrowIcon, pillarIcons } from "@/components/Icons";
import { sceneForService } from "@/components/art/scenes";

import { servicePillars, getPillar } from "@/config/services";
import { site } from "@/config/site";
import { faqsFor } from "@/config/faqs";
import { testimonialsFor, testimonials } from "@/config/testimonials";
import { faqSchema, breadcrumbSchema } from "@/config/seo";

export function generateStaticParams() {
  return servicePillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};

  return {
    title: pillar.metaTitle,
    description: pillar.metaDescription,
    keywords: [...pillar.keywords],
    alternates: { canonical: `/services/${pillar.slug}` },
    openGraph: {
      title: pillar.metaTitle,
      description: pillar.metaDescription,
      url: `${site.url}/services/${pillar.slug}`,
    },
  };
}

const accents = {
  navy: { chip: "bg-navy-100 text-navy-800", check: "text-navy-600" },
  brand: { chip: "bg-brand-100 text-brand-700", check: "text-brand-600" },
  teal: { chip: "bg-teal-brand-500/15 text-teal-brand-700", check: "text-teal-brand-600" },
} as const;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const accent = accents[pillar.accent];
  const Icon = pillarIcons[pillar.icon];
  const PillarScene = sceneForService[pillar.slug];
  const faqs = faqsFor(pillar.slug);
  /* Lead with this pillar's own reviews, then top up from the general pool. */
  const pillarReviews = testimonialsFor(pillar.slug);
  const reviews = [
    ...pillarReviews,
    ...testimonials.filter((t) => !pillarReviews.includes(t)),
  ].slice(0, 9);
  const others = servicePillars.filter((p) => p.slug !== pillar.slug);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-navy-100 bg-navy-50">
        <Container className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-navy-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy-900">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#services" className="hover:text-navy-900">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-navy-900" aria-current="page">
                {pillar.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <span
                className={`mb-5 inline-grid h-14 w-14 place-items-center rounded-xl ${accent.chip}`}
              >
                <Icon className="h-8 w-8" />
              </span>
              <h1 className="text-4xl font-extrabold leading-tight text-navy-950 sm:text-5xl">
                {pillar.title}
              </h1>
              {pillar.tagline && (
                <p className="mt-4 text-xl font-semibold text-navy-700">
                  {pillar.tagline}
                </p>
              )}
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-navy-700">
                {pillar.intro.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                Get a quote
              </p>
              <p className="mt-2 text-lg font-bold text-navy-950">
                Tell us about your {pillar.label.toLowerCase()}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Send the details through and we&apos;ll come back with a written
                quote, usually within one business day.
              </p>
              <ButtonLink
                href={`/contact?service=${pillar.slug}`}
                size="lg"
                className="mt-5 w-full"
              >
                Get a free quote
              </ButtonLink>
              <a
                href={`tel:${site.phones.sales.tel}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-navy-200 py-3.5 text-xl font-extrabold tracking-wide text-navy-900 transition-colors hover:border-navy-900"
              >
                <PhoneIcon className="h-5 w-5" />
                {site.phones.sales.label}
              </a>
              <p className="mt-3 text-center text-xs text-navy-500">
                Call to speak to a move manager.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-12 sm:pt-16">
        <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
          <PillarScene className="aspect-[16/9] w-full lg:aspect-[2.6/1]" />
        </div>
      </Container>

      {/* ── What's included ──────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHeading eyebrow={pillar.inclusionsLabel} title={`Everything we handle`} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillar.inclusions.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-navy-950">{item.name}</h3>
                {item.detail && (
                  <p className="mt-2 leading-relaxed text-navy-600">{item.detail}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-navy-50 p-7 sm:p-9">
            <h3 className="text-xl font-bold text-navy-950">
              Why people choose us for this
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {pillar.assurances.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckIcon className={`mt-0.5 h-5 w-5 shrink-0 ${accent.check}`} />
                  <span className="text-navy-800">{point}</span>
                </li>
              ))}
            </ul>

            {pillar.slug === "piano-spa" && (
              <p className="mt-6 border-t border-navy-200 pt-5 text-sm leading-relaxed text-navy-600">
                Our specialist heavy-moving work runs alongside our brother
                company,{" "}
                <a
                  href={site.siblingCompany.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy-900 underline underline-offset-2"
                >
                  {site.siblingCompany.name}
                </a>
                . Same family, same gear, decades of pianos and spa pools between
                them.
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Customer reviews" title="What people say" />
            <GoogleRatingBadge />
          </div>
          <div className="mt-10">
            <RotatingTestimonials items={reviews} />
          </div>
          <Link
            href="/reviews"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-brand-600"
          >
            Read more reviews
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title={`${pillar.title} — the things people ask`}
            className="mb-10"
          />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      {/* ── Cross-links ──────────────────────────────────────────────────── */}
      <Section tone="tint" className="py-14">
        <Container>
          <h2 className="text-2xl font-extrabold text-navy-950">
            Need something else moved?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((other) => {
              const OtherIcon = pillarIcons[other.icon];
              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${accents[other.accent].chip}`}
                  >
                    <OtherIcon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-navy-950 group-hover:text-brand-600">
                      {other.title}
                    </span>
                    {other.tagline && (
                      <span className="mt-1 block text-sm leading-relaxed text-navy-600">
                        {other.tagline}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={`Let's talk about your ${pillar.label.toLowerCase()}`}
        context={`service_${pillar.slug}`}
      />

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: pillar.title, path: `/services/${pillar.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pillar.title,
          serviceType: pillar.title,
          description: pillar.metaDescription,
          provider: { "@id": `${site.url}/#organisation` },
          areaServed: { "@type": "City", name: "Auckland" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: pillar.title,
            itemListElement: pillar.inclusions.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item.name, description: item.detail },
            })),
          },
        }}
      />
    </>
  );
}
