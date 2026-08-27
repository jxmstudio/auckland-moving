"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "./Logo";
import { Container, ButtonLink } from "./ui";
import { ChevronIcon, PhoneIcon } from "./Icons";
import { site } from "@/config/site";
import { servicePillars } from "@/config/services";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/about", label: "About us" },
  { href: "/areas", label: "Areas we cover" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  /*
    Close both menus on navigation. Adjusted during render rather than in an
    effect, so the menu never flashes open on the new page — and it still works
    for browser back/forward, which per-link onClick handlers would miss.
  */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur">
      {/* Utility bar — the 0800 number is the site-wide call to action. */}
      <div className="hidden bg-navy-900 py-2 text-white lg:block">
        <Container className="flex items-center justify-between text-[13px]">
          <p className="text-navy-100">
            Call to speak to a move manager
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phones.sales.tel}`}
              className="flex items-center gap-2 text-lg font-extrabold tracking-wide text-brand-300 hover:text-brand-200"
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phones.sales.label}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-navy-100 hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">
          <LogoLink />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {/* Services dropdown — Graeme's three options, so nobody gets lost. */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-[15px] font-medium transition-colors",
                  pathname.startsWith("/services")
                    ? "text-brand-600"
                    : "text-navy-800 hover:text-brand-600",
                )}
              >
                Services
                <ChevronIcon
                  className={cn(
                    "h-4 w-4 transition-transform",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full w-[340px] pt-2">
                  <div className="overflow-hidden rounded-xl border border-navy-100 bg-white p-2 shadow-xl">
                    {servicePillars.map((pillar) => (
                      <Link
                        key={pillar.slug}
                        href={`/services/${pillar.slug}`}
                        className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-navy-50"
                      >
                        <span className="block text-[15px] font-semibold text-navy-900">
                          {pillar.title}
                        </span>
                        {pillar.tagline && (
                          <span className="mt-0.5 block text-[13px] leading-snug text-navy-600">
                            {pillar.tagline}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-[15px] font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-600"
                    : "text-navy-800 hover:text-brand-600",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile: tapping the phone number is the fastest urgent path. */}
            <a
              href={`tel:${site.phones.sales.tel}`}
              aria-label={`Call ${site.phones.sales.label}`}
              className="grid h-11 w-11 place-items-center rounded-lg border-2 border-navy-200 text-navy-900 lg:hidden"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>

            <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
              Get a free quote
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-lg border-2 border-navy-200 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden
              >
                {mobileOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-navy-100 bg-white lg:hidden"
        >
          <Container className="py-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
              Services
            </p>
            <div className="mb-5 space-y-1">
              {servicePillars.map((pillar) => (
                <Link
                  key={pillar.slug}
                  href={`/services/${pillar.slug}`}
                  className="block rounded-lg bg-navy-50 px-4 py-3 font-semibold text-navy-900"
                >
                  {pillar.title}
                </Link>
              ))}
            </div>

            <div className="space-y-1 border-t border-navy-100 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 font-medium text-navy-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-navy-100 pt-5">
              <ButtonLink href="/contact" size="lg" className="w-full">
                Get a free quote
              </ButtonLink>
              <a
                href={`tel:${site.phones.sales.tel}`}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-navy-900 py-3.5 text-xl font-extrabold text-navy-900"
              >
                <PhoneIcon className="h-5 w-5" />
                {site.phones.sales.label}
              </a>
              <p className="text-center text-[13px] text-navy-600">
                Call to speak to a move manager.
              </p>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
