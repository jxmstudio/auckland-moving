import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { MailIcon, PhoneIcon, ClockIcon } from "./Icons";
import { site, credentials } from "@/config/site";
import { servicePillars, allServices } from "@/config/services";
import { aucklandRegions } from "@/config/areas";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed">
              A family-run New Zealand moving company. {credentials.yearsExperience}+
              years, {credentials.propertiesMoved.toLocaleString()}+ properties
              moved, and depots in South and West Auckland.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-2.5 hover:text-white"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{site.email}</span>
              </a>
              <a
                href={`tel:${site.phones.sales.tel}`}
                className="flex items-start gap-2.5 hover:text-white"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>
                  <span className="font-semibold text-white">
                    {site.phones.sales.label}
                  </span>
                  <span className="block text-xs text-navy-300">
                    {site.phones.sales.name}
                  </span>
                </span>
              </a>
              <a
                href={`tel:${site.phones.operations.tel}`}
                className="flex items-start gap-2.5 hover:text-white"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                <span>
                  <span className="font-semibold text-white">
                    {site.phones.operations.label}
                  </span>
                  <span className="block text-xs text-navy-300">
                    {site.phones.operations.name}
                  </span>
                </span>
              </a>
              <p className="flex items-start gap-2.5">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                <span>
                  {site.hours.weekdays}
                  <span className="block">{site.hours.saturday}</span>
                </span>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicePillars.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="font-semibold text-white hover:text-brand-400"
                  >
                    {pillar.title}
                  </Link>
                </li>
              ))}
              {allServices.slice(2).map((service) => (
                <li key={service} className="text-navy-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Areas we cover
            </h3>
            <ul className="space-y-2.5 text-sm">
              {aucklandRegions.map((region) => (
                <li key={region.name} className="flex items-center gap-2">
                  <span>{region.name}</span>
                  {region.depot && (
                    <span className="rounded bg-brand-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-300">
                      Depot
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/areas"
              className="mt-4 inline-block text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              Out-of-town relocations →
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white">
                  Reviews &amp; testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Get a quote
                </Link>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={site.siblingCompany.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {site.siblingCompany.name} ↗
                </a>
              </li>
            </ul>

            {credentials.memberships
              .filter((m) => m.confirmed)
              .map((m) => (
                <div
                  key={m.name}
                  className="mt-6 rounded-lg border border-navy-800 bg-navy-900/60 p-3"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
                    Member of
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{m.name}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy-800 pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. New Zealand owned and operated.
          </p>
          {/*
            The single visible reference to the former trading name — kept for
            customers who knew Graeme under it. See src/config/seo.ts.
          */}
          <p className="text-navy-300">
            Formerly trading as {site.formerName}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
