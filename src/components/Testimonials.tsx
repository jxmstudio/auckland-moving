import { StarIcon } from "./Icons";
import { Container, SectionHeading, Section } from "./ui";
import { testimonials, type Testimonial } from "@/config/testimonials";
import { credentials } from "@/config/site";
import { cn } from "@/lib/cn";

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5 text-brand-500", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </div>
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

export function TestimonialsSection({
  items = testimonials.slice(0, 6),
  eyebrow = "What our customers say",
  title = "Twenty-five years of people trusting us with their things",
}: {
  items?: Testimonial[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <Section tone="tint">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white px-5 py-4 shadow-sm">
            <span className="text-3xl font-extrabold text-navy-950">
              {credentials.googleRating}
            </span>
            <span>
              <Stars />
              <span className="mt-1 block text-xs text-navy-600">
                {credentials.googleReviewCount}+ customer reviews
              </span>
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((testimonial) => (
            <TestimonialCard key={testimonial.name + testimonial.quote.slice(0, 20)} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
