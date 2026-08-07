import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ── Layout ──────────────────────────────────────────────────────────────── */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
  tone = "white",
}: {
  className?: string;
  children: ReactNode;
  id?: string;
  tone?: "white" | "tint" | "navy";
}) {
  const tones = {
    white: "bg-white",
    tint: "bg-navy-50",
    navy: "bg-navy-900 text-white",
  };
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

/* ── Typography ──────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "light";
}) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-bold uppercase tracking-[0.2em]",
        tone === "amber" ? "text-amber-brand-600" : "text-navy-200",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "amber"}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-3xl font-extrabold sm:text-4xl",
          tone === "light" ? "text-white" : "text-navy-950",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "light" ? "text-navy-100" : "text-navy-700",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60",
  size: {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-[15px]",
    lg: "px-7 py-4 text-base",
  },
  variant: {
    primary:
      "bg-amber-brand-500 text-white shadow-sm hover:bg-amber-brand-600 hover:shadow-md",
    navy: "bg-navy-900 text-white shadow-sm hover:bg-navy-800 hover:shadow-md",
    outline:
      "border-2 border-navy-200 bg-white text-navy-900 hover:border-navy-900 hover:bg-navy-50",
    ghostLight:
      "border-2 border-white/30 text-white hover:border-white hover:bg-white/10",
  },
};

type ButtonVariant = keyof typeof buttonStyles.variant;
type ButtonSize = keyof typeof buttonStyles.size;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cn(
        buttonStyles.base,
        buttonStyles.size[size],
        buttonStyles.variant[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonStyles.base,
        buttonStyles.size[size],
        buttonStyles.variant[variant],
        className,
      )}
      {...props}
    />
  );
}

/* ── Misc ────────────────────────────────────────────────────────────────── */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-navy-100 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "navy" | "light";
}) {
  const tones = {
    amber: "bg-amber-brand-50 text-amber-brand-800 ring-amber-brand-200",
    navy: "bg-navy-50 text-navy-800 ring-navy-200",
    light: "bg-white/10 text-white ring-white/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Renders JSON-LD structured data. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
