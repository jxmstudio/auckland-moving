import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

import logoTile from "../../public/brand/logo-tile.png";
import logoWordmark from "../../public/brand/logo-wordmark.png";

/**
 * The supplied logo is green type on a near-black indigo field, so it gets two
 * treatments rather than one:
 *
 *   variant="dark"  — for light backgrounds. The artwork is kept intact as a
 *                     rounded navy plate, which is how the concept was drawn.
 *   variant="light" — for dark backgrounds. The navy is keyed out so the green
 *                     type sits directly on the section behind it.
 *
 * Both files are derived from /public/brand/logo-square.jpg by .brandtool.mjs.
 */
export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  /*
    `sizes` matters here: the artwork is ~1000px wide but never renders above
    about 140px, and without a hint next/image serves the full-width variant.
    The light variant lives in the footer, so it is not preloaded.
  */
  if (variant === "light") {
    return (
      <Image
        src={logoWordmark}
        alt={site.legalName}
        sizes="130px"
        className={cn("h-11 w-auto", className)}
      />
    );
  }

  return (
    <Image
      src={logoTile}
      alt={site.legalName}
      priority
      sizes="140px"
      className={cn("h-12 w-auto rounded-lg sm:h-14", className)}
    />
  );
}

export function LogoLink(props: React.ComponentProps<typeof Logo>) {
  return (
    <Link href="/" aria-label={`${site.legalName} — home`} className="shrink-0">
      <Logo {...props} />
    </Link>
  );
}
