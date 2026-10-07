import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projectHref } from "@/lib/projects";

/* Only <loc> and <lastmod> are emitted: Google documents that it ignores
   <priority> and <changefreq>, and trusts <lastmod> only if it is accurate.
   Rendered once at build time and served as a static /sitemap.xml. */
export const dynamic = "force-static";

/**
 * When the content last meaningfully changed (YYYY-MM-DD).
 *
 * Deliberately a fixed date and not `new Date()`: a lastmod that changes on
 * every build tells crawlers nothing and teaches them to ignore the field.
 * Bump it when you edit the site's content.
 */
const LAST_UPDATED = "2026-10-07";

const origin = site.url.replace(/\/+$/, "");

/** Absolute URL for a path that starts with "/" ("/" is the home page). */
const absolute = (path: string) => `${origin}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);

  const entries: MetadataRoute.Sitemap = [
    {
      url: absolute("/"),
      lastModified,
    },
    ...site.projects.map((project) => ({
      url: absolute(projectHref(project)),
      lastModified,
    })),
  ];

  /* Sitemaps must not list the same URL twice. */
  const seen = new Set<string>();
  return entries.filter(({ url }) => !seen.has(url) && !!seen.add(url));
}
