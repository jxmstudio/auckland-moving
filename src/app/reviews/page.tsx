import type { Metadata } from "next";

import { Container, Section, JsonLd } from "@/components/ui";
import { TestimonialCard } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { StarIcon } from "@/components/Icons";
import { testimonials } from "@/config/testimonials";
import { credentials, site } from "@/config/site";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | Auckland Movers",
  description: `Read what Auckland customers say about moving with us — ${credentials.googleReviewCount}+ reviews and a ${credentials.googleRating} average rating across residential, commercial and piano moves.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50">
        <Container className="py-14 sm:py-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-brand-600">
              Reviews &amp; testimonials
            </p>
            <h1 className="text-4xl font-extrabold text-navy-950 sm:text-5xl">
              Don&apos;t take our word for it
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-700">
              Twenty-five years of moves, and a lot of customers who came back to
              us the second and third time they moved.
            </p>
          </div>

          <div className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-navy-100 bg-white px-6 py-5 shadow-sm">
            <span className="font-display text-5xl font-extrabold text-navy-950">
              {credentials.googleRating}
            </span>
            <span>
              <span className="flex gap-0.5 text-amber-brand-500" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="h-5 w-5" />
                ))}
              </span>
              <span className="mt-1.5 block text-sm text-navy-600">
                Average from {credentials.googleReviewCount}+ customer reviews
              </span>
            </span>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name + testimonial.quote.slice(0, 20)}
                testimonial={testimonial}
              />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50 p-7 sm:p-9">
            <h2 className="text-xl font-bold text-navy-950">
              Moved with us recently?
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-navy-700">
              We&apos;d genuinely appreciate a review — it is the main way people
              find us. Leave one on{" "}
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-900 underline underline-offset-2"
              >
                our Facebook page
              </a>
              , or email us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-navy-900 underline underline-offset-2"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      <CtaBanner context="reviews_bottom" />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
    </>
  );
}
