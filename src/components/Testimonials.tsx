import { Container, SectionHeading, Section } from "./ui";
import {
  RotatingTestimonials,
  GoogleRatingBadge,
} from "./RotatingReviews";
import { testimonials, type Testimonial } from "@/config/testimonials";

/* The card itself lives with the rotation logic; re-exported for callers. */
export { TestimonialCard } from "./RotatingReviews";

export function TestimonialsSection({
  items = testimonials,
  eyebrow = "What our customers say",
  title = "Thirty years of people trusting us with their things",
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
          <GoogleRatingBadge />
        </div>

        <div className="mt-10">
          <RotatingTestimonials items={items} />
        </div>
      </Container>
    </Section>
  );
}
