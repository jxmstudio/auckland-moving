import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Container, Section, SectionHeading, ButtonLink, JsonLd } from "@/components/ui";
import { CtaBanner } from "@/components/CtaBanner";
import { PhoneIcon, PinIcon, ArrowIcon, pillarIcons } from "@/components/Icons";
import { CoverageScene } from "@/components/art/scenes";

import { aucklandRegions, getRegion } from "@/config/areas";
import { servicePillars } from "@/config/services";
import { site, credentials } from "@/config/site";
import { breadcrumbSchema } from "@/config/seo";

export function generateStaticParams() {
  return aucklandRegions.map((region) => ({ region: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};

  return {
    title: region.metaTitle,
    description: region.metaDescription,
    alternates: { canonical: `/areas/${region.slug}` },
    openGraph: {
      title: region.metaTitle,
      description: region.metaDescription,
      url: `${site.url}/areas/${region.slug}`,
    },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const otherRegions = aucklandRegions.filter((r) => r.slug !== region.slug);

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
                <Link href="/areas" className="hover:text-navy-900">
                  Areas we cover
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-navy-900" aria-current="page">
                {region.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight text-navy-950 sm:text-5xl">
                Movers in {region.name}
              </h1>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-navy-700">
                {region.intro.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                Get a quote
              </p>
              <p className="mt-2 text-lg font-bold text-navy-950">
                Moving in {region.name}?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Send the details through and we&apos;ll come back with a written
                quote, usually within one business day.
              </p>
              <ButtonLink href="/contact" size="lg" className="mt-5 w-full">
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

      {/* ── Suburbs ──────────────────────────────────────────────────────── */}
      <Section className="py-12 sm:py-14">
        <Container>
          <div className="mb-8 overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
            <CoverageScene className="aspect-[16/9] w-full lg:aspect-[2.6/1]" />
          </div>
          <div className="rounded-2xl border border-navy-100 bg-navy-50 p-7">
            <div className="flex items-center gap-2.5">
              <PinIcon className="h-5 w-5 text-brand-600" />
              <h2 className="text-xl font-extrabold text-navy-950">
                {region.name} suburbs we cover
              </h2>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {region.suburbs.map((suburb) => (
                <li
                  key={suburb}
                  className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800"
                >
                  {suburb}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-navy-600">
              Not an exhaustive list — if your suburb isn&apos;t here, we still
              cover it. With {credentials.yearsExperience}+ years moving
              Aucklanders and depots across the city, a truck is never far from
              your door.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Services in this region ──────────────────────────────────────── */}
      <Section tone="tint" className="py-14">
        <Container>
          <SectionHeading
            eyebrow="What we move"
            title={`Moving services in ${region.name}`}
            lede="Every service we run across Auckland is available here — same crews, same gear, same written quote."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {servicePillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <Link
                  key={pillar.slug}
                  href={`/services/${pillar.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy-100 text-navy-800">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-navy-950 group-hover:text-brand-600">
                      {pillar.title}
                    </span>
                    {pillar.tagline && (
                      <span className="mt-1 block text-sm leading-relaxed text-navy-600">
                        {pillar.tagline}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Other regions ────────────────────────────────────────────────── */}
      <Section className="py-14">
        <Container>
          <h2 className="text-2xl font-extrabold text-navy-950">
            Moving to or from another part of Auckland?
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherRegions.map((other) => (
              <Link
                key={other.slug}
                href={`/areas/${other.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900"
              >
                {other.name} movers
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            ))}
            <Link
              href="/areas"
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900"
            >
              Everywhere we cover
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={`Ready to book your ${region.name} move?`}
        lede="Tell us where you're going and we'll get a written quote back to you, usually within one business day."
        context={`areas_${region.slug}`}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Areas we cover", path: "/areas" },
          { name: region.name, path: `/areas/${region.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Moving services in ${region.name}`,
          serviceType: "Moving company",
          description: region.metaDescription,
          provider: { "@id": `${site.url}/#organisation` },
          areaServed: region.suburbs.map((suburb) => ({
            "@type": "Place",
            name: `${suburb}, Auckland`,
          })),
        }}
      />
    </>
  );
}
