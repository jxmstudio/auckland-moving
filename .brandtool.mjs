/**
 * One-off: derives the site's logo assets from the supplied logo artwork.
 * Not part of the build — run with `node .brandtool.mjs` if the source changes.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "public/brand/logo-square.jpg";
const GREEN = { r: 0x91, g: 0xc7, b: 0x3e };
const NAVY = { r: 0x04, g: 0x01, b: 0x1e };

// Measured from the source artwork.
const BBOX = { left: 46, top: 340, width: 899, height: 311 };

/* ── 1. Navy tile: the wordmark with even padding, for light backgrounds ──── */
const PAD_X = 42;
const PAD_Y = 46;
await sharp(SRC)
  .extract({
    left: BBOX.left - PAD_X,
    top: BBOX.top - PAD_Y,
    width: BBOX.width + PAD_X * 2,
    height: BBOX.height + PAD_Y * 2,
  })
  .png({ compressionLevel: 9 })
  .toFile("public/brand/logo-tile.png");

/* ── 2. Transparent wordmark: navy keyed out, for dark backgrounds ────────── */
const PAD = 10;
const { data, info } = await sharp(SRC)
  .extract({
    left: BBOX.left - PAD,
    top: BBOX.top - PAD,
    width: BBOX.width + PAD * 2,
    height: BBOX.height + PAD * 2,
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

/*
  The artwork is two flat colours, so alpha is simply how far each pixel has
  travelled from navy towards green. That keeps the anti-aliased letter edges
  soft instead of producing a jagged hard-keyed cutout.
*/
const navyToGreen =
  Math.abs(GREEN.r - NAVY.r) + Math.abs(GREEN.g - NAVY.g) + Math.abs(GREEN.b - NAVY.b);

for (let i = 0; i < data.length; i += 4) {
  const distance =
    Math.abs(data[i] - NAVY.r) +
    Math.abs(data[i + 1] - NAVY.g) +
    Math.abs(data[i + 2] - NAVY.b);
  const alpha = Math.min(1, distance / navyToGreen);
  data[i] = GREEN.r;
  data[i + 1] = GREEN.g;
  data[i + 2] = GREEN.b;
  data[i + 3] = Math.round(alpha * 255);
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile("public/brand/logo-wordmark.png");

/* ── 3. App icon: a green truck mark on navy, legible at favicon sizes ────── */
const truck = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="#04011e"/>
  <g fill="#91c73e">
    <rect x="64" y="168" width="212" height="152" rx="16"/>
    <path d="M296 216h84a24 24 0 0 1 19.4 9.9l40 55A24 24 0 0 1 444 295v25a16 16 0 0 1-16 16h-16a44 44 0 0 0-88 0h-12a16 16 0 0 1-16-16V216Z"/>
    <rect x="64" y="352" width="384" height="26" rx="13"/>
  </g>
  <circle cx="164" cy="336" r="42" fill="#04011e"/>
  <circle cx="164" cy="336" r="26" fill="#91c73e"/>
  <circle cx="368" cy="336" r="42" fill="#04011e"/>
  <circle cx="368" cy="336" r="26" fill="#91c73e"/>
</svg>`;

await sharp(Buffer.from(truck(512))).png().toFile("public/brand/icon.png");
await sharp(Buffer.from(truck(180))).png().toFile("public/brand/apple-icon.png");
await writeFile("public/brand/icon.svg", truck(512));

/* ── 4. Open Graph card: wordmark on navy with a green rule ───────────────── */
const OG_W = 1200;
const OG_H = 630;
const markWidth = 760;
const mark = await sharp("public/brand/logo-wordmark.png")
  .resize({ width: markWidth })
  .toBuffer({ resolveWithObject: true });

await sharp({
  create: {
    width: OG_W,
    height: OG_H,
    channels: 4,
    background: { ...NAVY, alpha: 1 },
  },
})
  .composite([
    {
      input: mark.data,
      left: Math.round((OG_W - markWidth) / 2),
      top: Math.round((OG_H - mark.info.height) / 2) - 34,
    },
    {
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
           <rect x="470" y="470" width="260" height="10" rx="5" fill="#91c73e"/>
           <rect x="0" y="612" width="${OG_W}" height="18" fill="#91c73e"/>
         </svg>`,
      ),
      left: 0,
      top: 0,
    },
  ])
  .png()
  .toFile("public/brand/og.png");

console.log("brand assets written to public/brand/");
