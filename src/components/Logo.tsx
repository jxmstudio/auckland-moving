import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Interim wordmark. The designed logo lands early next week.
 *
 * TO SWAP IN THE REAL LOGO:
 *   1. Drop the file at /public/logo.svg (and /public/logo-white.svg for the
 *      dark footer/header variant).
 *   2. Set USE_IMAGE_LOGO to true below.
 * No other file needs to change.
 */
const USE_IMAGE_LOGO = false;

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const light = variant === "light";

  if (USE_IMAGE_LOGO) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={light ? "/logo-white.svg" : "/logo.svg"}
        alt={site.legalName}
        className={cn("h-11 w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {/* Monogram — a stylised truck box, replaced by the real mark later. */}
      <span
        aria-hidden
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-lg font-display text-[15px] font-black tracking-tight",
          light
            ? "bg-white text-navy-900"
            : "bg-navy-900 text-white",
        )}
      >
        AM
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-extrabold tracking-tight",
            light ? "text-white" : "text-navy-900",
          )}
        >
          Auckland Moving
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
            light ? "text-navy-200" : "text-amber-brand-600",
          )}
        >
          Professionals
        </span>
      </span>
    </span>
  );
}

export function LogoLink(props: React.ComponentProps<typeof Logo>) {
  return (
    <Link href="/" aria-label={`${site.legalName} — home`} className="shrink-0">
      <Logo {...props} />
    </Link>
  );
}
