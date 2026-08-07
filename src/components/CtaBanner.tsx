"use client";

import { Container, ButtonLink } from "./ui";
import { PhoneIcon, MailIcon } from "./Icons";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * The brief is explicit about the hierarchy: email is the primary action, phone
 * is for moves inside 48 hours. The layout reflects that — quote button first
 * and largest, call second and framed as the urgent path.
 */
export function CtaBanner({
  title = "Ready to get moving?",
  lede = "Tell us what you're moving and we'll come back with a written quote — usually within one business day.",
  context = "page_bottom",
}: {
  title?: string;
  lede?: string;
  context?: string;
}) {
  return (
    <section className="bg-navy-900 py-16 text-white sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-navy-100">
              {lede}
            </p>
          </div>

          <div className="lg:justify-self-end">
            <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-brand-600">
                The quickest way
              </p>
              <p className="mt-2 text-xl font-bold text-navy-950">
                Send us the details
              </p>
              <ButtonLink href="/contact" size="lg" className="mt-4 w-full">
                <MailIcon className="h-5 w-5" />
                Get a free quote
              </ButtonLink>
              <p className="mt-2.5 text-center text-sm text-navy-500">
                Straight to {site.email}
              </p>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-navy-100" />
                <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  or
                </span>
                <span className="h-px flex-1 bg-navy-100" />
              </div>

              <p className="text-sm font-semibold text-navy-950">
                Moving within {site.urgentMoveHours} hours?
              </p>
              <p className="mt-1 text-sm text-navy-600">
                Don&apos;t email — give us a call and we&apos;ll sort it now.
              </p>
              <a
                href={`tel:${site.phones.sales.tel}`}
                onClick={() => trackEvent("call_click", { context })}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-navy-900 py-3.5 text-lg font-bold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
              >
                <PhoneIcon className="h-5 w-5" />
                {site.phones.sales.label}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
