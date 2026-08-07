import type { Metadata } from "next";

import { Container, Section, SectionHeading, JsonLd, Pill } from "@/components/ui";
import { CtaBanner } from "@/components/CtaBanner";
import { TrustStats } from "@/components/TrustStats";
import { CheckIcon, ShieldIcon, TruckIcon } from "@/components/Icons";
import { site, credentials, canPublishInsuranceFigures } from "@/config/site";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = {
  title: "About Us | 25+ Years Moving Aucklanders",
  description:
    "Auckland Moving Professionals is a family-run New Zealand moving company. 25+ years, 5,000+ properties moved, members of the National Road Carriers Association.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    name: "Graeme Fatialofa",
    role: "General Manager",
    bio: "Learned the trade moving pianos with his uncle, Peter “Fats” Fatialofa. Twenty-five years on he still meets customers face to face and rings after the move to check it went well.",
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

const values = [
  {
    title: "Mind before muscle",
    body: "Read the doorway, the driveway and the stairs before you pick anything up. It is the single thing Graeme took from his uncle, and it is why things do not get broken.",
  },
  {
    title: "The crew are ours",
    body: "We train people in-house and give them a pathway — several of our team are working toward becoming owner-driver operators. Stable crews mean careful crews.",
  },
  {
    title: "Say what it will cost",
    body: "A fixed quote in writing before the day. If something changes on site, we talk to you before we do it, not after.",
  },
  {
    title: "Answer the phone",
    body: "You get people who know your job, not a call centre. And when it is done, you get a call from Graeme asking how it went.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-brand-400">
              About us
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              A family business that has been moving Aucklanders for over{" "}
              {credentials.yearsExperience} years
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-100">
              New Zealand owned, family run, and still doing it the way Graeme
              learned it — carefully, and with a bit of a laugh.
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

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Our story"
            title="It started with pianos, and an uncle called Fats"
          />
          <div className="mt-7 space-y-5 text-lg leading-relaxed text-navy-700">
            <p>
              Peter &ldquo;Fats&rdquo; Fatialofa captained Manu Samoa and propped
              the scrum for Auckland, but plenty of people around this city knew
              him first as the man with the piano trucks. His moving business was
              where a lot of the family learned to work.
            </p>
            <p>
              Graeme Fatialofa did his apprenticeship there — moving pianos with
              his uncle, learning that a grand piano does not forgive
              impatience. The lesson stuck: brute strength is how instruments get
              damaged and backs get hurt. Doing it properly means combining mind
              and muscle, in that order. Look at the job, plan the lift, bring the
              right gear.
            </p>
            <p>
              He took that into his own company, and has spent the last
              twenty-five years building it with his wife Carolyn. In the last
              decade alone the team has moved more than{" "}
              {credentials.propertiesMoved.toLocaleString()} properties — houses,
              apartments, offices, and a great many pianos and spa pools that
              other companies would rather not touch.
            </p>
            <p>
              These days the business runs from two depots, in South Auckland and
              West Auckland, alongside our brother company{" "}
              <a
                href={site.siblingCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-900 underline underline-offset-2"
              >
                {site.siblingCompany.name}
              </a>
              , which handles the heaviest specialist work. Same family, same
              standards.
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

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <Section tone="tint">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Four things we do not compromise on"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-navy-100 bg-white p-7 shadow-sm"
              >
                <CheckIcon className="h-7 w-7 text-amber-brand-600" />
                <h3 className="mt-4 text-xl font-bold text-navy-950">
                  {value.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-navy-600">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <Section>
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
                {/* Placeholder until the team shoot is done. */}
                <div className="photo-pending grid aspect-[4/3] place-items-center">
                  <span className="font-display text-4xl font-extrabold text-white/30">
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
                  <p className="mt-0.5 text-sm font-semibold text-amber-brand-600">
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
              <TruckIcon className="h-8 w-8 text-amber-brand-400" />
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
              <ShieldIcon className="h-8 w-8 text-amber-brand-400" />
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
