/**
 * Lead-source tracking.
 *
 * Tere asked: "lead with residential — is this something we can track, and if
 * not much movement on office then maybe make some changes?"
 *
 * Yes. Three things are instrumented, and together they answer it:
 *
 *   1. `service_tab_view`   — which of the three tabs people open on the
 *                             homepage. Measures *interest*.
 *   2. `quote_submitted`    — move type on every submitted quote form.
 *                             Measures *actual leads*.
 *   3. `call_click` /
 *      `email_click`        — which contact method people choose, and from
 *                             which page.
 *
 * Every quote also lands in the Google Sheet tagged with its move type, so the
 * commercial-vs-residential split is readable without touching an analytics
 * dashboard. After ~3 months there'll be enough data to decide whether office
 * moves deserve more prominence.
 *
 * GA4 is optional — set NEXT_PUBLIC_GA_ID to switch it on. With no ID set,
 * tracking degrades to a no-op in production and a console log in development.
 */

type EventName =
  | "service_tab_view"
  | "quote_started"
  | "quote_submitted"
  | "quote_failed"
  | "call_click"
  | "email_click";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrName: string | Date,
      params?: EventParams,
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function trackEvent(name: EventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", name, params);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    // Keeps the instrumentation verifiable before GA is connected.
    console.info(`[analytics] ${name}`, params);
  }
}
