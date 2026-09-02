import type { Metadata } from "next";

import { Container, Section, SectionHeading, JsonLd, Pill } from "@/components/ui";
import { CtaBanner } from "@/components/CtaBanner";
import { TrustStats } from "@/components/TrustStats";
import { ShieldIcon, TruckIcon } from "@/components/Icons";
import { CrewScene } from "@/components/art/scenes";
import { site, credentials, canPublishInsuranceFigures } from "@/config/site";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = {
  title: "About Us | 30+ Years Moving Aucklanders",
  description:
    "Auckland Moving Professionals is a family-run New Zealand moving company. 30+ years, 5,000+ properties moved, members of the National Road Carriers Association.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "Graeme Fatialofa",
    role: "General Manager",
    bio: "Learned the trade moving pianos with his Uncle, Peter “Fats” Fatialofa. Thirty years on he still meets customers face to face and rings after the move to check it went well.",
  },
  {
    name: "Carolyn Fatialofa",
    role: "Office Manager",
    bio: "Runs the systems that keep the trucks where they should be, and holds the line on a culture where the crews get home to their families at a reasonable hour.",
  },
  {
    name: "Tere McLindon",
    role: "Office Manager",
    bio: "Usually the first person you'll speak to. Handles quotes, bookings and the thousand small questions that come up in the week before a move.",
  },
  {
    name: "Krima",
    role: "Team Leader",
    bio: "One of the original crew. Measures a good day by whether the customer is happy at the end of it, not by how fast the truck was emptied.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
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
        </Container>
      </section>

      <TrustStats />

      <Container className="pt-14 sm:pt-16">
        <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
          <CrewScene className="aspect-[16/9] w-full lg:aspect-[2.8/1]" />
        </div>
      </Container>

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
            {/*
              Second of the three permitted references to the former trading
              name — see the reasoning in src/config/seo.ts.
            */}
            <p className="border-l-4 border-navy-100 pl-5 text-base text-navy-600">
              If you moved with Graeme some years ago, you may know the business
              as {site.formerName}. Same family, same team — we simply trade as{" "}
              {site.legalName} now.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="The people you'll actually deal with"
            lede="Team photography is being shot shortly, once the new uniforms arrive."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm"
              >
                {/*
                  Initials on the brand navy until the team shoot is done.
                  Deliberately not a stock headshot — it would be a photo of
                  someone who doesn't work here.
                */}
                <div className="grid aspect-[4/3] place-items-center bg-navy-900">
                  <span className="font-display text-4xl font-extrabold text-brand-500">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy-950">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-brand-600">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {member.bio}
                  </p>
                </div>
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
