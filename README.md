# Auckland Moving Professionals — website

Next.js 16 (App Router) + Tailwind CSS 4 + TypeScript.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

The site runs with no configuration at all. Environment variables only affect
where quote enquiries are delivered — see `.env.example`.

---

## Where to change things

Almost everything the business might want to edit lives in `src/config/`, not
in the page components:

| File | What's in it |
|---|---|
| `src/config/site.ts` | Business name, phone numbers, email, hours, depots, insurance figures |
| `src/config/services.ts` | The three service pillars — copy, inclusions, SEO metadata |
| `src/config/testimonials.ts` | Customer reviews |
| `src/config/areas.ts` | Suburbs and out-of-town locations |
| `src/config/faqs.ts` | FAQ questions and answers |
| `src/config/seo.ts` | Structured data + the note explaining the Suburban Metro decision |

Change a value in one of those files and it updates everywhere it appears —
page copy, the footer, structured data and meta tags all read from the same
source.

---

## Still to be confirmed

These are flagged in the code and easy to change when the answers come back.

**1. Insurance figures — `src/config/site.ts`**

The current site quotes $2,000 per package and $150,000 per move. Because
those numbers are unconfirmed, `credentials.insurance.confirmed` is set to
`false`, and the site currently says "comprehensive transit insurance"
*without any dollar figures*. Once the insurer confirms:

```ts
insurance: { confirmed: true, perPackage: 2000, perMove: 150000 }
```

The amounts then appear automatically on the About page, the contact sidebar
and in the FAQ. Change the numbers too if they turn out to be different.

**2. Business name — `src/config/site.ts`**

Currently `Auckland Moving Professionals Ltd`. If Graeme confirms the FATSBOYS
co-brand, edit `name` and `legalName`; everything else follows.

**3. Logo — `src/components/Logo.tsx`**

An interim wordmark is in place. When the designed logo arrives:

1. Save it as `public/logo.svg`, plus `public/logo-white.svg` for dark
   backgrounds (header utility bar and footer).
2. Set `USE_IMAGE_LOGO = true` at the top of `Logo.tsx`.

No other file needs touching.

**4. Facebook URL — `src/config/site.ts`**

Currently points at `/suburbanmetrorelocations`. Update `social.facebook` once
the page is renamed.

**5. Photography**

Placeholders are styled to look deliberate rather than broken — a patterned
navy panel, not an empty box. They're on the homepage hero and the four team
cards on `/about`. Search the codebase for `photo-pending` to find them all.

---

## Google Sheet lead log

Every quote enquiry can be appended to a Google Sheet, tagged with its move
type. That's what makes the residential-vs-commercial split readable without
opening an analytics dashboard.

This uses an Apps Script web app rather than the Sheets API, so there are no
service-account credentials to manage.

1. Create a new Google Sheet. Add these headers in row 1:

   ```
   Timestamp | Name | Email | Phone | Move type | Size | Move date | From | To | Extras | Message | Urgent | Source page
   ```

2. **Extensions → Apps Script**, and replace the contents with:

   ```javascript
   const SECRET = 'pick-any-random-string-and-put-it-in-env-too';

   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     if (data.secret !== SECRET) {
       return ContentService.createTextOutput('unauthorised');
     }
     SpreadsheetApp.getActiveSheet().appendRow([
       new Date(data.timestamp),
       data.name,
       data.email,
       data.phone,
       data.moveType,
       data.propertySize,
       data.moveDate,
       data.movingFrom,
       data.movingTo,
       data.extras,
       data.message,
       data.urgent,
       data.sourcePage,
     ]);
     return ContentService.createTextOutput('ok');
   }
   ```

3. **Deploy → New deployment → Web app**. Set *Execute as* to **Me** and
   *Who has access* to **Anyone**. Copy the resulting web app URL.

4. Put the URL in `GOOGLE_SHEET_WEBHOOK_URL` and the same secret string in
   `GOOGLE_SHEET_SECRET`.

If the sheet is unreachable, the enquiry email still sends — the two paths are
independent by design.

---

## Tracking which services generate leads

Three signals, all in place:

- **`service_tab_view`** — which of the three homepage tabs people open
  (interest)
- **`quote_submitted`** — the move type on every submitted form (actual leads)
- **`call_click` / `email_click`** — which contact method people choose

Set `NEXT_PUBLIC_GA_ID` to send these to GA4. The Google Sheet gives you the
same move-type split without any analytics setup at all.

After a couple of months there should be enough data to answer whether office
moves deserve more prominence than they currently get.

---

## Deploying

Vercel is the path of least resistance for a Next.js app:

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the project settings.
4. Point `aucklandmoving.co.nz` at Vercel per their DNS instructions.

**Before going live**, update `site.url` in `src/config/site.ts` if the domain
differs — it's used for canonical URLs, the sitemap and structured data.

Since this replaces an existing site, keep the old URLs working. The current
site has pages at paths like `/about-us-best-moving-company/` and
`/reviews-and-testimonials/`; add 301 redirects in `next.config.ts` so their
accumulated search ranking transfers to the new pages rather than 404ing.
