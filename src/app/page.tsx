import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section, SectionHeading, ButtonLink, Pill, JsonLd } from "@/components/ui";
import { ServiceTabs } from "@/components/ServiceTabs";
import { TestimonialsSection } from "@/components/Testimonials";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { StickyRating } from "@/components/StickyRating";
import { CheckIcon, PhoneIcon, PinIcon, ArrowIcon } from "@/components/Icons";
import { LoadingScene } from "@/components/art/scenes";

import { site, credentials } from "@/config/site";
import { faqsFor } from "@/config/faqs";
import { faqSchema, defaultMeta } from "@/config/seo";
import { aucklandRegions, outOfTown } from "@/config/areas";

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faqs = faqsFor("all");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,199,62,0.20),transparent_55%)]"
        />
        <Container className="relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <Pill tone="light">
                  <CheckIcon className="h-3.5 w-3.5" />
                  {credentials.yearsExperience}+ years
                </Pill>
                <Pill tone="light">
                  <CheckIcon className="h-3.5 w-3.5" />
                  {credentials.propertiesMoved.toLocaleString()}+ properties moved
                </Pill>
                <Pill tone="light">
                  <CheckIcon className="h-3.5 w-3.5" />
                  NZ family owned
                </Pill>
              </div>

              {/*
                "Auckland" added for SEO — the H1 is the second-strongest
                on-page signal after the title tag, and without it the page's
                main heading says nothing about where we operate.
              */}
              <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Fatialofa Family — for all your Auckland moving needs
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
                {credentials.yearsExperience}+ years of moving experience. Our
                family-owned business has successfully moved Aucklanders into
                their new homes and offices. We understand what many moving
                companies don&apos;t, so when you move with us you get our minds
                as well as our muscles.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Get a free quote
                  <ArrowIcon className="h-5 w-5" />
                </ButtonLink>
                <a
                  href={`tel:${site.phones.sales.tel}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg border-2 border-white/30 px-7 py-4 text-xl font-extrabold tracking-wide transition-colors hover:border-white hover:bg-white/10"
                >
                  <PhoneIcon className="h-6 w-6" />
                  {site.phones.sales.label}
                </a>
              </div>

              <p className="mt-5 text-sm text-navy-200">
                Email us for a quote or call to speak to a move manager.
              </p>
            </div>

            {/*
              Hero visual. Team photography is being shot once the new uniforms
              arrive; until then this is brand illustration rather than a stock
              photo. Swap in the shoot when it lands — the frame stays as is.
            */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <LoadingScene className="h-full w-full" />
              </div>

              {/*
                Sits over the bottom-left of the illustration, where the villa
                is, rather than over the truck and crew in the middle.
              */}
              <div className="absolute -bottom-6 -left-4 max-w-[13.5rem] rounded-xl bg-white p-4 shadow-xl sm:-left-8">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-700">
                    <PinIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold leading-tight text-navy-950">
                      Auckland wide depots
                    </p>
                    <p className="mt-0.5 text-[11px] leading-tight text-navy-500">
                      Covering all of Auckland
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Three service pillars ────────────────────────────────────────── */}
      <Section id="services">
        <Container>
          <ServiceTabs />
        </Container>
      </Section>

      {/* ── Coverage ─────────────────────────────────────────────────────── */}
      <Section tone="navy">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                tone="light"
                eyebrow="Where we work"
                title="All of Auckland — and a good way beyond it"
                lede="We cover every Auckland suburb, and we run regular relocations out of town."
              />
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-navy-700 bg-navy-800/60 p-4">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-bold text-white">Auckland-wide depots</p>
                  <p className="mt-0.5 text-sm text-navy-200">
                    A truck is never far from your door, anywhere in Auckland
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {aucklandRegions.map((region) => (
                  <div key={region.name}>
                    <h3 className="font-bold text-white">{region.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-200">
                      {region.suburbs.slice(0, 6).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-navy-700 bg-navy-800/60 p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-brand-400">
                  Out-of-town relocations
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">
                  {outOfTown.join(" · ")} — and the wider upper North Island.
                </p>
                <Link
                  href="/areas"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-300"
                >
                  See everywhere we cover
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <TestimonialsSection />

      {/* ── Why us (SEO copy block) ──────────────────────────────────────────
          The one place on the homepage that says, in crawlable prose, what we
          are ("moving company in Auckland") and links every page we want
          ranking — service pillars and region pages. Written for a human
          reading it, which is also what Google rewards. */}
      <Section>
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Why Auckland moves with us"
            title="A moving company Aucklanders have trusted for 30 years"
          />
          <div className="mt-8 space-y-5 leading-relaxed text-navy-700">
            <p>
              There are plenty of moving companies in Auckland. What sets us
              apart is thirty years of doing only this, as one family, across
              more than {credentials.propertiesMoved.toLocaleString()} moves.
              Our crews handle{" "}
              <Link href="/services/residential" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                house moves
              </Link>
              ,{" "}
              <Link href="/services/commercial" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                office relocations
              </Link>{" "}
              and the{" "}
              <Link href="/services/piano-spa" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                piano, spa pool and heavy specialist moves
              </Link>{" "}
              most Auckland movers turn down — with the purpose-built gear and
              the training to do them properly.
            </p>
            <p>
              We&apos;re local everywhere in Auckland: from the{" "}
              <Link href="/areas/north-shore" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                North Shore
              </Link>{" "}
              to{" "}
              <Link href="/areas/south-auckland" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                South Auckland
              </Link>
              ,{" "}
              <Link href="/areas/west-auckland" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                out west
              </Link>
              ,{" "}
              <Link href="/areas/east-auckland" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                out east
              </Link>{" "}
              and across the{" "}
              <Link href="/areas/central-auckland" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                central suburbs
              </Link>
              . Rated {credentials.googleRating}★ from{" "}
              {credentials.googleReviewCount}{" "}
              <Link href="/reviews" className="font-semibold text-navy-900 underline underline-offset-2 hover:text-brand-600">
                Google reviews
              </Link>
              , every move gets a fixed written quote, a move manager, and a
              uniformed crew that turns up when we said we would.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Common questions"
            title="Things people ask us before they book"
            className="mb-10"
          />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      <CtaBanner context="home_bottom" />

      {/* Tere's ask: the 4.9 rating stays on screen as you scroll. */}
      <StickyRating />

      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
