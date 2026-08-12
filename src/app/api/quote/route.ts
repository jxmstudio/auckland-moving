import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { getPillar } from "@/config/services";

/**
 * Quote enquiry handler.
 *
 * Two destinations, deliberately independent:
 *
 *   1. EMAIL to sales@ — the actual lead channel. If this fails, the customer
 *      is told so and shown the phone number, because a silently dropped lead
 *      is a lost job.
 *   2. GOOGLE SHEET — a running lead log tagged by move type, so the
 *      residential / commercial split is readable at a glance. Best-effort:
 *      a broken sheet must never stop an email going out.
 *
 * Both are configured by env vars. With neither set (local dev), submissions
 * are logged to the console and the form still reports success.
 */

export const runtime = "nodejs";

interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  propertySize?: string;
  moveDate?: string;
  movingFrom?: string;
  movingTo?: string;
  extras?: string[];
  message?: string;
  company?: string; // honeypot
  urgent?: boolean;
  pageUrl?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Partial<QuotePayload>): string | null {
  if (!data.name?.trim()) return "Please tell us your name.";
  if (!data.email?.trim() || !EMAIL_RE.test(data.email)) {
    return "Please give us a valid email address.";
  }
  if (!data.phone?.trim()) return "Please give us a phone number.";
  if (data.name.length > 200 || data.email.length > 200) return "That doesn't look right.";
  if ((data.message?.length ?? 0) > 5000) return "That message is a bit long for our form.";
  return null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(data: QuotePayload) {
  const pillar = getPillar(data.service);
  const serviceLabel = pillar?.title ?? data.service;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Move type", serviceLabel],
    ["Size", data.propertySize || "—"],
    ["Preferred date", data.moveDate || "—"],
    ["Moving from", data.movingFrom || "—"],
    ["Moving to", data.movingTo || "—"],
    ["Extras", data.extras?.length ? data.extras.join(", ") : "—"],
  ];

  const subject = `${data.urgent ? "[URGENT] " : ""}Quote enquiry — ${serviceLabel} — ${data.name}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:600px;color:#04011e">
      ${
        data.urgent
          ? `<p style="background:#91c73e;color:#04011e;padding:12px 16px;border-radius:8px;font-weight:700;margin:0 0 20px">
               ⚡ Moving within ${site.urgentMoveHours} hours — call this customer back first.
             </p>`
          : ""
      }
      <h2 style="margin:0 0 4px">New quote enquiry</h2>
      <p style="margin:0 0 20px;color:#3162a1;font-weight:600">${escapeHtml(serviceLabel)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#437abd;white-space:nowrap;vertical-align:top">${label}</td>
            <td style="padding:8px 0;font-weight:600">${escapeHtml(String(value))}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        data.message
          ? `<div style="margin-top:20px;padding:16px;background:#f0f5fb;border-radius:8px">
               <p style="margin:0 0 6px;color:#437abd;font-size:13px;font-weight:600">Their message</p>
               <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(data.message)}</p>
             </div>`
          : ""
      }
      <p style="margin-top:24px;font-size:13px;color:#6598d2">
        Sent from ${escapeHtml(data.pageUrl || site.url)} · ${new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })}
      </p>
    </div>`;

  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n") +
    (data.message ? `\n\nMessage:\n${data.message}` : "");

  return { subject, html, text };
}

/** Primary channel. Throws on failure so the caller can tell the customer. */
async function sendEmail(data: QuotePayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[quote] RESEND_API_KEY / QUOTE_FROM_EMAIL not set — email not sent.",
    );
    return { sent: false as const };
  }

  const { subject, html, text } = buildEmail(data);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [site.email],
      reply_to: data.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }

  return { sent: true as const };
}

/**
 * Secondary channel — the lead log.
 *
 * Posts to a Google Apps Script web app rather than the Sheets API, so there's
 * no service-account JSON to manage. Setup instructions live in README.md.
 * Never throws: a sheet problem must not cost us the lead.
 */
async function appendToSheet(data: QuotePayload) {
  const endpoint = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!endpoint) return { logged: false as const };

  try {
    const pillar = getPillar(data.service);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        /* The column Tere will actually read — residential vs office split. */
        moveType: pillar?.title ?? data.service,
        moveTypeSlug: data.service,
        propertySize: data.propertySize ?? "",
        moveDate: data.moveDate ?? "",
        movingFrom: data.movingFrom ?? "",
        movingTo: data.movingTo ?? "",
        extras: data.extras?.join(", ") ?? "",
        message: data.message ?? "",
        urgent: data.urgent ? "YES" : "",
        sourcePage: data.pageUrl ?? "",
        secret: process.env.GOOGLE_SHEET_SECRET ?? "",
      }),
    });

    clearTimeout(timeout);
    return { logged: true as const };
  } catch (err) {
    console.error("[quote] Sheet logging failed (email unaffected):", err);
    return { logged: false as const };
  }
}

export async function POST(request: Request) {
  let data: QuotePayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot tripped — accept silently so the bot doesn't learn anything.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const invalid = validate(data);
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 });
  }

  try {
    const [emailResult] = await Promise.all([sendEmail(data), appendToSheet(data)]);

    if (!emailResult.sent) {
      // No mail transport configured — log it so nothing is lost in dev.
      console.info("[quote] Enquiry received (email transport not configured):", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        urgent: data.urgent,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] Failed to deliver enquiry:", err);
    return NextResponse.json(
      { error: "We couldn't send your enquiry just now." },
      { status: 500 },
    );
  }
}
