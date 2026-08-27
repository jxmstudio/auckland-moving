"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarIcon, ArrowIcon } from "./Icons";
import { testimonials, type Testimonial } from "@/config/testimonials";
import { site, credentials } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * The client's Google listing sits at 4.9★ across 199 reviews, so real reviews
 * rotate through the whole site rather than showing the same six quotes. Two
 * shapes share the rotation logic below: RotatingTestimonials (cards, used in
 * review sections) and ReviewStrip (one-liner band above the footer on every
 * page).
 */

/**
 * Auto-advance through `length` positions. Pauses while hovered or focused,
 * and never advances for users who prefer reduced motion.
 */
function useRotation(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (length < 2 || paused) return;
    const id = setInterval(() => {
      if (!reducedMotion.current) setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, paused, intervalMs]);

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  return { index, setIndex, pauseProps };
}

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-brand-500", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </span>
  );
}

export function TestimonialCard({
  testimonial,
  tone = "light",
}: {
  testimonial: Testimonial;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl p-6",
        dark
          ? "border border-navy-800 bg-navy-900"
          : "border border-navy-100 bg-white shadow-sm",
      )}
    >
      <Stars className="mb-4" />
      <blockquote
        className={cn(
          "flex-1 text-[15px] leading-relaxed",
          dark ? "text-navy-100" : "text-navy-700",
        )}
      >
        <span className="sr-only">Review: </span>“{testimonial.quote}”
      </blockquote>
      <figcaption
        className={cn(
          "mt-5 border-t pt-4",
          dark ? "border-navy-800" : "border-navy-100",
        )}
      >
        <p className={cn("font-bold", dark ? "text-white" : "text-navy-950")}>
          {testimonial.name}
        </p>
        {(testimonial.role || testimonial.location) && (
          <p
            className={cn(
              "mt-0.5 text-sm",
              dark ? "text-navy-300" : "text-navy-500",
            )}
          >
            {testimonial.role ?? testimonial.location}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

/** The 4.9 ★ / 199-review badge, linking to the live Google listing. */
export function GoogleRatingBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={site.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-3 rounded-xl border px-5 py-4 shadow-sm transition-shadow hover:shadow-md",
        dark ? "border-navy-700 bg-navy-800/60" : "border-navy-100 bg-white",
      )}
    >
      <span
        className={cn(
          "font-display text-3xl font-extrabold",
          dark ? "text-white" : "text-navy-950",
        )}
      >
        {credentials.googleRating}
      </span>
      <span>
        <Stars />
        <span
          className={cn(
            "mt-1 block text-xs",
            dark ? "text-navy-200" : "text-navy-600",
          )}
        >
          {credentials.googleReviewCount} Google reviews
        </span>
      </span>
    </a>
  );
}

/**
 * A page of cards that rotates through the whole pool. With `visible` cards
 * shown at a time, each turn advances one whole page.
 */
export function RotatingTestimonials({
  items = testimonials,
  visible = 3,
  intervalMs = 7000,
}: {
  items?: Testimonial[];
  visible?: number;
  intervalMs?: number;
}) {
  const pages = Math.ceil(items.length / visible);
  const { index, setIndex, pauseProps } = useRotation(pages, intervalMs);

  const page = items.slice(index * visible, index * visible + visible);
  // Wrap around so the last page is always full.
  const shown =
    page.length < visible && items.length >= visible
      ? [...page, ...items.slice(0, visible - page.length)]
      : page;

  return (
    <div {...pauseProps}>
      <div
        key={index}
        className={cn(
          "review-fade grid gap-5",
          visible >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {shown.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name + testimonial.quote.slice(0, 20)}
            testimonial={testimonial}
          />
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show reviews page ${i + 1} of ${pages}`}
              aria-current={i === index}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index
                  ? "w-7 bg-brand-500"
                  : "w-2.5 bg-navy-200 hover:bg-navy-300",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Site-wide band above the footer: the rating badge plus one review at a time.
 * Hidden on /reviews, which already shows the full set.
 */
export function ReviewStrip() {
  const pathname = usePathname();
  const { index, setIndex, pauseProps } = useRotation(testimonials.length, 6000);

  if (pathname === "/reviews") return null;

  const t = testimonials[index];

  return (
    <aside
      aria-label="Customer reviews"
      className="border-t border-navy-800 bg-navy-900 py-10 text-white"
      {...pauseProps}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:px-8">
        <GoogleRatingBadge tone="dark" />

        <figure key={index} className="review-fade min-w-0">
          <blockquote className="text-[15px] leading-relaxed text-navy-100 sm:text-base">
            <span className="sr-only">Review: </span>“{t.quote}”
          </blockquote>
          <figcaption className="mt-2 text-sm font-semibold text-white">
            {t.name}
            {(t.role || t.location) && (
              <span className="font-normal text-navy-300">
                {" "}
                — {t.role ?? t.location}
              </span>
            )}
          </figcaption>
        </figure>

        <div className="flex items-center gap-5 lg:flex-col lg:items-end lg:gap-2.5">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 hover:text-brand-200"
          >
            Read more reviews
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setIndex((index + 1) % testimonials.length)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-300 hover:text-white"
          >
            Next review
            <ArrowIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
