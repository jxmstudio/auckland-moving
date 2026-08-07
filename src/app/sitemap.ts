import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { servicePillars } from "@/config/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/contact", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/areas", priority: 0.7 },
    { path: "/reviews", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...servicePillars.map((pillar) => ({
      url: `${site.url}/services/${pillar.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      /* Residential carries half the business, so it leads the service pages. */
      priority: pillar.slug === "residential" ? 0.9 : 0.8,
    })),
  ];
}
