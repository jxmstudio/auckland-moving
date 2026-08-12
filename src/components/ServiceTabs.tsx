"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { servicePillars } from "@/config/services";
import { pillarIcons, CheckIcon, ArrowIcon } from "./Icons";
import { sceneForService } from "./art/scenes";
import { ButtonLink } from "./ui";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

/**
 * Graeme's brief: give customers three clear doors rather than one long page.
 *
 * Implemented as a real tablist (arrow-key navigable, proper ARIA) rather than
 * a set of styled divs, because a lot of this audience is on mobile and a
 * meaningful slice uses assistive tech.
 */

const accentClasses = {
  navy: {
    activeTab: "bg-navy-900 text-white border-navy-900",
    icon: "bg-navy-100 text-navy-800",
    check: "text-navy-600",
  },
  brand: {
    activeTab: "bg-brand-600 text-white border-brand-600",
    icon: "bg-brand-100 text-brand-700",
    check: "text-brand-600",
  },
  teal: {
    activeTab: "bg-teal-brand-600 text-white border-teal-brand-600",
    icon: "bg-teal-brand-500/15 text-teal-brand-700",
    check: "text-teal-brand-600",
  },
} as const;

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const pillar = servicePillars[active];
  const accent = accentClasses[pillar.accent];
  const Icon = pillarIcons[pillar.icon];
  const PillarScene = sceneForService[pillar.slug];

  function select(index: number) {
    setActive(index);
    // Feeds the residential-vs-commercial interest question Tere raised.
    trackEvent("service_tab_view", { service: servicePillars[index].slug });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const last = servicePillars.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    if (e.key === "Home") select(0);
    if (e.key === "End") select(last);
  }

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Choose the kind of move you need"
        onKeyDown={onKeyDown}
        className="grid gap-3 sm:grid-cols-3"
      >
        {servicePillars.map((p, i) => {
          const TabIcon = pillarIcons[p.icon];
          const isActive = i === active;
          return (
            <button
              key={p.slug}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all duration-150",
                isActive
                  ? accentClasses[p.accent].activeTab + " shadow-md"
                  : "border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:shadow-sm",
              )}
            >
              <TabIcon className="h-7 w-7 shrink-0" />
              <span>
                <span className="block text-[15px] font-bold leading-tight">
                  {p.label}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-xs leading-snug",
                    isActive ? "text-white/80" : "text-navy-500",
                  )}
                >
                  {p.slug === "residential" && "Houses & apartments"}
                  {p.slug === "piano-spa" && "Pianos, spas & heavy items"}
                  {p.slug === "commercial" && "Offices & workplaces"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-hidden rounded-xl border border-navy-100">
              <PillarScene className="aspect-[4/3] w-full" />
            </div>
            <span
              className={cn(
                "mb-5 grid h-14 w-14 place-items-center rounded-xl",
                accent.icon,
              )}
            >
              <Icon className="h-8 w-8" />
            </span>
            <h3 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {pillar.title}
            </h3>
            <p className="mt-3 text-[15px] font-semibold text-navy-700">
              {pillar.tagline}
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">{pillar.blurb}</p>

            <ul className="mt-6 space-y-2.5">
              {pillar.assurances.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px]">
                  <CheckIcon
                    className={cn("mt-0.5 h-4 w-4 shrink-0", accent.check)}
                  />
                  <span className="text-navy-700">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/contact?service=${pillar.slug}`}>
                Get a quote
              </ButtonLink>
              <Link
                href={`/services/${pillar.slug}`}
                className="inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-semibold text-navy-900 hover:text-brand-600"
              >
                Full details
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-navy-500">
              What&apos;s included
            </p>
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {pillar.inclusions.map((item) => (
                <div key={item.name}>
                  <p className="font-semibold text-navy-900">{item.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
