import type { NextConfig } from "next";

/**
 * 301 redirects from the old aucklandmoving.co.nz URLs.
 *
 * This site replaces an existing one that already ranks. Without these, every
 * old page 404s and its accumulated search ranking is thrown away rather than
 * passed to the new equivalent.
 *
 * These are the paths confirmed to exist on the current site. Before launch,
 * pull the full URL list from Google Search Console (Pages report) or the old
 * site's sitemap and add anything missing — it is much cheaper to do now than
 * to recover rankings later.
 */
const legacyRedirects = [
  { from: "/about-us-best-moving-company", to: "/about" },
  { from: "/about-us", to: "/about" },
  { from: "/reviews-and-testimonials", to: "/reviews" },
  { from: "/moving-house", to: "/services/residential" },
  { from: "/moving-house/the-best-furniture-movers-auckland-has", to: "/services/residential" },
  { from: "/house-moving", to: "/services/residential" },
  { from: "/furniture-moving", to: "/services/residential" },
  { from: "/office-moving", to: "/services/commercial" },
  { from: "/commercial-moving", to: "/services/commercial" },
  { from: "/piano-moving", to: "/services/piano-spa" },
  { from: "/spa-pool-moving", to: "/services/piano-spa" },
  { from: "/contact-us", to: "/contact" },
  { from: "/get-a-quote", to: "/contact" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return legacyRedirects.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
