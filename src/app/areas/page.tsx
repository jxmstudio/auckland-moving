import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { CtaBanner } from "@/components/CtaBanner";
import { PinIcon, TruckIcon, ArrowIcon } from "@/components/Icons";
import { CoverageScene } from "@/components/art/scenes";
import { aucklandRegions, outOfTown, outOfTownNote } from "@/config/areas";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = {
  title: "Areas We Cover | Movers Across Auckland",
  description:
    "We move homes and offices across every Auckland suburb from our Auckland-wide depots, plus out-of-town relocations to Hamilton, Mangawhai and beyond.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <Container className="py-14 sm:py-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
              Areas we cover
            </p>
            <h1 className="text-4xl font-extrabold text-navy-950 sm:text-5xl">
              All of Auckland, covered
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-700">
              Auckland-wide depots mean shorter runs to your door and less time
              on the clock. We cover every Auckland suburb, and we regularly
              head out of town.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Depots ───────────────────────────────────────────────────────── */}
      <Section className="py-12 sm:py-14">
        <Container>
          <div className="mb-6 overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
            <CoverageScene className="aspect-[16/9] w-full lg:aspect-[2.6/1]" />
          </div>
          <div className="rounded-2xl border-2 border-navy-900 bg-navy-900 p-7 text-white">
            <div className="flex items-center gap-2.5">
              <PinIcon className="h-6 w-6 text-brand-400" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                Depots
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold">
              Auckland-wide depots
            </h2>
            <p className="mt-2 leading-relaxed text-navy-100">
              Wherever you are in Auckland, a truck is never far from your door.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Suburbs ──────────────────────────────────────────────────────── */}
      <Section tone="tint" className="py-14">
        <Container>
          <SectionHeading
            eyebrow="Auckland suburbs"
            title="Everywhere across the region"
            lede="Not an exhaustive list — if your suburb isn't here, we still cover it. Just ask."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aucklandRegions.map((region) => (
              <div
                key={region.name}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-navy-950">{region.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-sm text-navy-600">
                  {region.suburbs.map((suburb) => (
                    <li key={suburb} className="after:ml-2 after:text-navy-300 after:content-['·'] last:after:content-['']">
                      {suburb}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/areas/${region.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-brand-600"
                >
                  {region.name} movers
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Out of town ──────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Out of town"
                title="Leaving Auckland? We'll take you there"
              />
              <p className="mt-5 leading-relaxed text-navy-700">{outOfTownNote}</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-7">
              <TruckIcon className="h-8 w-8 text-brand-600" />
              <h3 className="mt-4 text-lg font-bold text-navy-950">
                Relocations we run regularly
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {outOfTown.map((place) => (
                  <li
                    key={place}
                    className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner
        title="Moving somewhere in this list?"
        lede="Tell us where you're going and we'll get a written quote back to you, usually within one business day."
        context="areas_bottom"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Areas we cover", path: "/areas" },
        ])}
      />
    </>
  );
}
