import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projectHref } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...site.projects.map((project) => ({
      url: `${site.url}${projectHref(project)}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
