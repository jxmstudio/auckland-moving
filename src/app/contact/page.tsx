import type { Metadata } from "next";
import { Suspense } from "react";

import { Container, Section, JsonLd } from "@/components/ui";
import { QuoteForm } from "@/components/QuoteForm";
import { PhoneIcon, MailIcon, ClockIcon, PinIcon, ShieldIcon } from "@/components/Icons";
import { PackingScene } from "@/components/art/scenes";
import { site, credentials, canPublishInsuranceFigures } from "@/config/site";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = {
  title: "Get a Free Moving Quote | Auckland Movers",
  description:
    "Get a free written quote for your Auckland move — home, office, piano or spa pool. Email us any time, or call 0800 328 425 to speak to a move manager.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <Container className="py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
              Get in touch
            </p>
            <h1 className="text-4xl font-extrabold text-navy-950 sm:text-5xl">
              Let&apos;s get you a quote
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-700">
              Fill in the form and it goes straight to our team at{" "}
              <span className="font-semibold text-navy-900">{site.email}</span>.
              We&apos;ll come back with a written quote, usually within one
              business day.
            </p>
          </div>
        </Container>
      </section>

      <Section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            {/* Form */}
            <div>
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse rounded-2xl bg-navy-50" />
                }
              >
                <QuoteForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Phone path — deliberately the most visually prominent card. */}
              <div className="rounded-2xl border-2 border-brand-400 bg-brand-50 p-6">
                <div className="flex items-center gap-2 text-brand-800">
                  <ClockIcon className="h-5 w-5" />
                  <p className="text-xs font-bold uppercase tracking-[0.16em]">
                    Prefer to talk?
                  </p>
                </div>
                <p className="mt-3 text-lg font-bold text-navy-950">
                  Call to speak to a move manager.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">
                  Email is perfect for quotes — but a phone call gets you an
                  answer straight away.
                </p>
                <a
                  href={`tel:${site.phones.sales.tel}`}
                  className="mt-4 flex items-center justify-center gap-2.5 rounded-lg bg-navy-900 py-4 text-2xl font-extrabold tracking-wide text-white transition-colors hover:bg-navy-800"
                >
                  <PhoneIcon className="h-6 w-6" />
                  {site.phones.sales.label}
                </a>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-950">
                  Contact details
                </h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-navy-900">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${site.email}`}
                          className="text-navy-600 underline underline-offset-2 hover:text-navy-900"
                        >
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  {Object.values(site.phones).map((phone) => (
                    <div key={phone.tel} className="flex items-start gap-3">
                      <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <div>
                        <dt className="font-semibold text-navy-900">
                          {phone.name}
                        </dt>
                        <dd>
                          <a
                            href={`tel:${phone.tel}`}
                            className="text-navy-600 underline underline-offset-2 hover:text-navy-900"
                          >
                            {phone.label}
                          </a>
                          <span className="mt-0.5 block text-xs text-navy-500">
                            {phone.person}
                          </span>
                        </dd>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-3">
                    <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-navy-900">Hours</dt>
                      <dd className="text-navy-600">
                        {site.hours.weekdays}
                        <span className="block">{site.hours.saturday}</span>
                        <span className="block">{site.hours.sunday}</span>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-navy-900">Depots</dt>
                      <dd className="text-navy-600">
                        Auckland wide
                        <span className="block text-xs">
                          Serving all Auckland suburbs
                        </span>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl bg-navy-900 p-6 text-white">
                <ShieldIcon className="h-7 w-7 text-brand-400" />
                <h2 className="mt-3 text-lg font-bold">You&apos;re covered</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">
                  {canPublishInsuranceFigures
                    ? `Comprehensive transit insurance covering up to $${credentials.insurance.perPackage.toLocaleString()} per package and $${credentials.insurance.perMove.toLocaleString()} per move.`
                    : "We carry comprehensive transit insurance, and we confirm in writing exactly what cover applies to your move alongside your quote."}
                </p>
                {credentials.memberships
                  .filter((m) => m.confirmed)
                  .map((m) => (
                    <p
                      key={m.name}
                      className="mt-4 border-t border-navy-800 pt-4 text-sm text-navy-200"
                    >
                      Member of the{" "}
                      <span className="font-semibold text-white">{m.name}</span>
                    </p>
                  ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
                <PackingScene className="aspect-[4/3] w-full" />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
