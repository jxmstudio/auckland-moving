import type { Metadata } from "next";

import { Container, Section, SectionHeading, JsonLd, Pill } from "@/components/ui";
import { CtaBanner } from "@/components/CtaBanner";
import {
  ShieldIcon,
  TruckIcon,
  HomeIcon,
  CheckIcon,
  StarIcon,
} from "@/components/Icons";
import { CrewScene } from "@/components/art/scenes";
import { site, credentials, canPublishInsuranceFigures } from "@/config/site";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = {
  title: "About Us | 30+ Years Moving Aucklanders",
  description:
    "Auckland Moving Professionals is a family-run New Zealand moving company. 30+ years, 5,000+ properties moved, members of the National Road Carriers Association.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Family",
    Icon: HomeIcon,
    body: "A family business, not a franchise. Graeme runs the company with his wife Carolyn, and you deal with the owners from your first call to moving day.",
  },
  {
    title: "Care",
    Icon: ShieldIcon,
    body: "Mind over muscle. We read the doorway, the driveway and the staircase before we pick anything up, because brute force is how things get broken.",
  },
  {
    title: "Honesty",
    Icon: CheckIcon,
    body: "Fixed quotes in writing and straight answers. If something changes on the day, we tell you before we do it.",
  },
  {
    title: "Service",
    Icon: StarIcon,
    body: "A good move ends with a happy customer, not just an empty truck. The call after your move to check everything went well still comes from Graeme himself.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,199,62,0.20),transparent_55%)]"
        />
        <Container className="relative py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
                About us
              </p>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                A family business that has been moving Aucklanders for over{" "}
                {credentials.yearsExperience} years
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-navy-100">
                New Zealand owned family business. Mind over muscle.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Pill tone="light">NZ owned &amp; operated</Pill>
                <Pill tone="light">Family run</Pill>
                <Pill tone="light">
                  {credentials.propertiesMoved.toLocaleString()}+ properties moved
                </Pill>
              </div>
            </div>

            {/*
              Same frame as the home hero. Team photography is being shot once
              the new uniforms arrive; swap the shoot in here when it lands.
            */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <CrewScene className="h-full w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Our story"
            title="It started with pianos, and an Uncle called Fats"
          />
          <div className="mt-7 space-y-5 text-lg leading-relaxed text-navy-700">
            <p>
              Graeme Fatialofa started his career moving pianos with his Uncle
              &ldquo;Fats&rdquo; (FATSBOYS LTD) after leaving school. As his
              Uncle&apos;s international rugby career grew, Graeme stepped in to
              help run the business, learning the trade through hard work,
              honesty, and excellent customer care.
            </p>
            <p>
              Over time, Graeme built a reputation for careful, specialized
              moves, including concert grand pianos, spa pools, pool tables,
              statues, and other oversized bulky items.
            </p>
            <p>
              Alongside our brother company{" "}
              <a
                href={site.siblingCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-900 underline underline-offset-2"
              >
                {site.siblingCompany.name}
              </a>
              , all the skills and values learnt 30 years ago still hold true to
              how Graeme and his team serve our customers today.
            </p>
            <p>
              Graeme is a seasoned athlete of service, he remains focused on
              delivering reliable, high-quality, and friendly service every time.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our values"
            title="What we stand for"
            lede="The principles that guide every move we make"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, Icon, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Credentials ──────────────────────────────────────────────────── */}
      <Section tone="navy">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-navy-700 bg-navy-800/50 p-7">
              <TruckIcon className="h-8 w-8 text-brand-400" />
              <h2 className="mt-4 text-2xl font-bold">Industry membership</h2>
              {credentials.memberships
                .filter((m) => m.confirmed)
                .map((m) => (
                  <p key={m.name} className="mt-3 leading-relaxed text-navy-100">
                    We are members of the{" "}
                    <span className="font-semibold text-white">{m.name}</span>,
                    New Zealand&apos;s largest road transport association —
                    which means we are held to its standards on compliance,
                    safety and driver training.
                  </p>
                ))}
            </div>

            <div className="rounded-2xl border border-navy-700 bg-navy-800/50 p-7">
              <ShieldIcon className="h-8 w-8 text-brand-400" />
              <h2 className="mt-4 text-2xl font-bold">Insurance</h2>
              <p className="mt-3 leading-relaxed text-navy-100">
                {canPublishInsuranceFigures ? (
                  <>
                    We carry comprehensive transit insurance covering items up to{" "}
                    <span className="font-semibold text-white">
                      ${credentials.insurance.perPackage.toLocaleString()} per
                      package
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-white">
                      ${credentials.insurance.perMove.toLocaleString()} per move
                    </span>
                    . We confirm the cover that applies to your move in writing
                    with your quote.
                  </>
                ) : (
                  <>
                    We carry comprehensive transit insurance. Because cover varies
                    with what is being moved, we confirm in writing exactly what
                    applies to your move alongside your quote — and if you are
                    moving something unusually valuable, tell us up front and we
                    will talk you through the options.
                  </>
                )}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner
        title="Come and meet us properly"
        lede="Tell us what you're moving and we'll get you a written quote — or pick up the phone if it's urgent."
        context="about_bottom"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About us", path: "/about" },
        ])}
      />
    </>
  );
}
