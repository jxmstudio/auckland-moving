import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section, SectionHeading, ButtonLink, Pill, JsonLd } from "@/components/ui";
import { ServiceTabs } from "@/components/ServiceTabs";
import { TrustStats } from "@/components/TrustStats";
import { TestimonialsSection } from "@/components/Testimonials";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { CheckIcon, PhoneIcon, ShieldIcon, PinIcon, ArrowIcon, TruckIcon, BoxIcon } from "@/components/Icons";
import { LoadingScene, CrewScene } from "@/components/art/scenes";

import { site, credentials } from "@/config/site";
import { faqsFor } from "@/config/faqs";
import { faqSchema, defaultMeta } from "@/config/seo";
import { aucklandRegions, outOfTown } from "@/config/areas";

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
  alternates: { canonical: "/" },
};

const howItWorks = [
  {
    step: "01",
    title: "Tell us about the move",
    body: "Send through the details, or call if it's urgent. The more you tell us about stairs, access and heavy items, the more accurate the number.",
    Icon: BoxIcon,
  },
  {
    step: "02",
    title: "Get a written quote",
    body: "A fixed quote in writing, usually within one business day. For bigger or commercial jobs we'll come and walk the site first.",
    Icon: ShieldIcon,
  },
  {
    step: "03",
    title: "We do the heavy lifting",
    body: "A uniformed crew arrives on time with everything already on the truck. We wrap, load, drive, and put things where you want them.",
    Icon: TruckIcon,
  },
];

const whyUs = [
  {
    title: "A family business, not a franchise",
    body: "Graeme runs this company with his wife Carolyn, and still rings customers after the move to check how it went. You are dealing with the owners.",
  },
  {
    title: "Crews who are actually ours",
    body: "Trained, uniformed team members on a career path with us — several are working toward becoming owner-drivers. No day-labour hires meeting your furniture for the first time.",
  },
  {
    title: "Specialist gear for specialist loads",
    body: "Pianos, spa pools and pool tables need purpose-built trucks, skates and gantries. We have them, because this is where our family started.",
  },
  {
    title: "Fixed quotes, in writing",
    body: "You get a firm number before the day, not an hourly rate and a nasty surprise. If something changes, we tell you before we do it.",
  },
];

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

              <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Auckland movers who treat your things like their own
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
                {site.tagline}. Homes, offices, pianos and spa pools — moved by a
                family that has been doing this for a quarter of a century, from
                depots in South and West Auckland.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Get a free quote
                  <ArrowIcon className="h-5 w-5" />
                </ButtonLink>
                <a
                  href={`tel:${site.phones.sales.tel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-7 py-4 text-base font-semibold transition-colors hover:border-white hover:bg-white/10"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {site.phones.sales.label}
                </a>
              </div>

              <p className="mt-5 text-sm text-navy-200">
                Email us for a quote — or call if you&apos;re moving within{" "}
                {site.urgentMoveHours} hours.
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
                      South &amp; West Auckland depots
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

      <TrustStats />

      {/* ── Three service pillars ────────────────────────────────────────── */}
      <Section id="services">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What can we move for you?"
            title="Pick the kind of move you need"
            lede="Three straightforward options, so you're not wading through a page about office relocations when you just want your piano shifted."
          />
          <div className="mt-12">
            <ServiceTabs />
          </div>
        </Container>
      </Section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, no surprises"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howItWorks.map(({ step, title, body, Icon }) => (
              <div
                key={step}
                className="relative rounded-2xl border border-navy-100 bg-white p-7 shadow-sm"
              >
                <span className="absolute right-6 top-6 font-display text-4xl font-extrabold text-navy-100">
                  {step}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy-950">{title}</h3>
                <p className="mt-2.5 leading-relaxed text-navy-600">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The family story ─────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="mb-14 overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
            <CrewScene className="aspect-[16/9] w-full lg:aspect-[2.8/1]" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our story"
                title="It started with a piano and an uncle called Fats"
              />
              <div className="mt-6 space-y-4 leading-relaxed text-navy-700">
                <p>
                  Graeme Fatialofa learned this trade the hard way — moving pianos
                  alongside his uncle, the late Peter &ldquo;Fats&rdquo; Fatialofa,
                  the Samoan rugby captain who was as well known around Auckland
                  for his moving trucks as he was for his front row.
                </p>
                <p>
                  What Graeme took from those years was simple enough: brute force
                  is how things get broken. Moving well is mind and muscle
                  together — reading the doorway, the driveway and the staircase
                  before you pick anything up.
                </p>
                <p>
                  Twenty-five years on, he runs the company with his wife Carolyn,
                  the crews are trained in-house, and the phone call after your
                  move to check everything went well still comes from Graeme
                  himself.
                </p>
              </div>
              <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-brand-600"
              >
                More about the family and the team
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-navy-100 bg-navy-50 p-5"
                >
                  <h3 className="font-bold text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
                lede="Two depots mean a truck is rarely far away. We cover every Auckland suburb, and we run regular relocations out of town."
              />
              <div className="mt-8 space-y-3">
                {site.depots.map((depot) => (
                  <div
                    key={depot.region}
                    className="flex items-start gap-3 rounded-xl border border-navy-700 bg-navy-800/60 p-4"
                  >
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                    <div>
                      <p className="font-bold text-white">
                        {depot.region} depot
                      </p>
                      <p className="mt-0.5 text-sm text-navy-200">{depot.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {aucklandRegions.map((region) => (
                  <div key={region.name}>
                    <h3 className="flex items-center gap-2 font-bold text-white">
                      {region.name}
                      {region.depot && (
                        <span className="rounded bg-brand-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-300">
                          Depot
                        </span>
                      )}
                    </h3>
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

      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
