import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Served at /robots.txt.
 *
 * Everything is crawlable on purpose — including /_next/, which Googlebot
 * needs to fetch the CSS and JS it renders the page with. Blocking it can make
 * Search Console report "page not rendered correctly".
 *
 * (A `host` directive is deliberately absent: Google ignores it.)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url.replace(/\/+$/, "")}/sitemap.xml`,
  };
}
