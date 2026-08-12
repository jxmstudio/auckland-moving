import { Container, ButtonLink } from "@/components/ui";
import { servicePillars } from "@/config/services";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="font-display text-6xl font-extrabold text-navy-100">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
        We can&apos;t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-navy-600">
        It may have moved — which, to be fair, is rather our speciality.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Get a quote
        </ButtonLink>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {servicePillars.map((pillar) => (
          <Link
            key={pillar.slug}
            href={`/services/${pillar.slug}`}
            className="font-semibold text-navy-700 underline underline-offset-4 hover:text-brand-600"
          >
            {pillar.title}
          </Link>
        ))}
      </div>
    </Container>
  );
}
