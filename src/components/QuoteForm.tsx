"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/config/site";
import { servicePillars, type ServiceSlug } from "@/config/services";
import { Button } from "./ui";
import { PhoneIcon, CheckIcon } from "./Icons";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const propertySizes = [
  "Studio / 1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4 bedrooms",
  "5+ bedrooms",
  "Office / commercial",
  "Single item only",
];

const extras = [
  "Packing service",
  "Boxes & materials",
  "Unpack & setup",
  "Storage",
  "Piano",
  "Spa pool",
  "Pool table",
];

/** Hours between now and a yyyy-mm-dd date string. */
function hoursUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  const then = new Date(`${dateStr}T08:00:00`).getTime();
  if (Number.isNaN(then)) return null;
  return (then - Date.now()) / 36e5;
}

const todayISO = () => new Date().toISOString().split("T")[0];

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [moveDate, setMoveDate] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  /*
    Deep links from the service tabs (/contact?service=commercial) preselect the
    move type. Derived during render rather than synced in an effect — the URL
    is the source of truth until the customer picks something else themselves.
  */
  const paramService = searchParams.get("service");
  const linkedService = servicePillars.some((p) => p.slug === paramService)
    ? (paramService as ServiceSlug)
    : null;
  const [chosenService, setChosenService] = useState<ServiceSlug | null>(null);
  const service = chosenService ?? linkedService ?? "residential";

  const hours = hoursUntil(moveDate);
  const isUrgent = hours !== null && hours < site.urgentMoveHours;

  function onFirstInteraction() {
    if (!started) {
      setStarted(true);
      trackEvent("quote_started", { service });
    }
  }

  function toggleExtra(extra: string) {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service,
      propertySize: String(formData.get("propertySize") ?? ""),
      moveDate: String(formData.get("moveDate") ?? ""),
      movingFrom: String(formData.get("movingFrom") ?? ""),
      movingTo: String(formData.get("movingTo") ?? ""),
      extras: selectedExtras,
      message: String(formData.get("message") ?? ""),
      /* Honeypot — bots fill hidden fields, humans never see them. */
      company: String(formData.get("company") ?? ""),
      urgent: isUrgent,
      pageUrl: window.location.href,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("success");
      trackEvent("quote_submitted", {
        service,
        property_size: payload.propertySize,
        urgent: isUrgent,
        extras_count: selectedExtras.length,
      });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
      trackEvent("quote_failed", { service });
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center sm:p-12">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-600 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold text-navy-950">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-navy-700">
          Your enquiry is with the team at {site.email}. We&apos;ll come back to
          you with a written quote, usually within one business day.
        </p>
        {isUrgent && (
          <div className="mx-auto mt-6 max-w-md rounded-xl border-2 border-brand-300 bg-white p-5">
            <p className="font-semibold text-navy-950">
              You&apos;re moving in under {site.urgentMoveHours} hours.
            </p>
            <p className="mt-1.5 text-sm text-navy-700">
              Please call us as well so we can lock in a crew straight away.
            </p>
            <a
              href={`tel:${site.phones.sales.tel}`}
              onClick={() => trackEvent("call_click", { context: "urgent_success" })}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 font-semibold text-navy-950 hover:bg-brand-400"
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phones.sales.label}
            </a>
          </div>
        )}
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-lg border-2 border-navy-200 bg-white px-4 py-3 text-[15px] text-navy-950 placeholder:text-navy-400 transition-colors focus:border-navy-600 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-semibold text-navy-900";

  return (
    <form onSubmit={onSubmit} onChange={onFirstInteraction} noValidate>
      {/* Honeypot: hidden from humans and screen readers, visible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Move type — mirrors the three homepage tabs. */}
      <fieldset className="mb-6">
        <legend className={labelClass}>What are we moving?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {servicePillars.map((pillar) => (
            <label
              key={pillar.slug}
              className={cn(
                "cursor-pointer rounded-lg border-2 px-4 py-3 text-center text-sm font-semibold transition-all",
                service === pillar.slug
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-800 hover:border-navy-400",
              )}
            >
              <input
                type="radio"
                name="service"
                value={pillar.slug}
                checked={service === pillar.slug}
                onChange={() => setChosenService(pillar.slug)}
                className="sr-only"
              />
              {pillar.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name <span className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone <span className="text-brand-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldClass}
            placeholder="021 234 5678"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="email">
            Email <span className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jane@example.co.nz"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="movingFrom">
            Moving from
          </label>
          <input
            id="movingFrom"
            name="movingFrom"
            className={fieldClass}
            placeholder="Suburb or address"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="movingTo">
            Moving to
          </label>
          <input
            id="movingTo"
            name="movingTo"
            className={fieldClass}
            placeholder="Suburb or address"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="propertySize">
            Size
          </label>
          <select id="propertySize" name="propertySize" className={fieldClass}>
            <option value="">Please choose…</option>
            {propertySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="moveDate">
            Preferred move date
          </label>
          <input
            id="moveDate"
            name="moveDate"
            type="date"
            min={todayISO()}
            value={moveDate}
            onChange={(e) => setMoveDate(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {/*
        The 48-hour rule, enforced by the form rather than just stated in copy.
        Pick an imminent date and the page stops selling email and starts
        selling the phone.
      */}
      {isUrgent && (
        <div className="mt-5 rounded-xl border-2 border-brand-400 bg-brand-50 p-5">
          <p className="font-bold text-navy-950">
            That&apos;s within {site.urgentMoveHours} hours — please call us.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
            Send this form through by all means, but for a move this close a
            phone call is far quicker. We&apos;ll tell you on the spot what we
            can do.
          </p>
          <a
            href={`tel:${site.phones.sales.tel}`}
            onClick={() => trackEvent("call_click", { context: "urgent_form" })}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 font-semibold text-navy-950 hover:bg-brand-400"
          >
            <PhoneIcon className="h-4 w-4" />
            Call {site.phones.sales.label}
          </a>
        </div>
      )}

      <fieldset className="mt-6">
        <legend className={labelClass}>Anything else you need?</legend>
        <div className="flex flex-wrap gap-2">
          {extras.map((extra) => {
            const isOn = selectedExtras.includes(extra);
            return (
              <label
                key={extra}
                className={cn(
                  "cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-medium transition-all",
                  isOn
                    ? "border-brand-500 bg-brand-500 text-navy-950"
                    : "border-navy-200 bg-white text-navy-700 hover:border-navy-400",
                )}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => toggleExtra(extra)}
                  className="sr-only"
                />
                {extra}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label className={labelClass} htmlFor="message">
          Tell us about the move
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(fieldClass, "resize-y")}
          placeholder="Stairs, tricky driveway access, a piano, anything fragile or unusually heavy — the more we know, the more accurate your quote."
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-semibold">We couldn&apos;t send that.</p>
          <p className="mt-1">
            {error} Please call{" "}
            <a href={`tel:${site.phones.sales.tel}`} className="font-semibold underline">
              {site.phones.sales.label}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline">
              {site.email}
            </a>{" "}
            and we&apos;ll sort it out.
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-7 w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send my enquiry"}
      </Button>

      <p className="mt-4 text-sm text-navy-500">
        We&apos;ll only use your details to quote your move. No mailing lists,
        and we never pass them on.
      </p>
    </form>
  );
}
