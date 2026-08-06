import { site, type Project } from "@/config/site";

/** "Orbit Analytics" -> "orbit-analytics" */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function projectSlug(project: Project) {
  return slugify(project.title);
}

export function projectHref(project: Project) {
  return `/projects/${projectSlug(project)}`;
}

export function getProjectBySlug(slug: string) {
  return site.projects.find((project) => projectSlug(project) === slug);
}

/** Paragraphs for the detail page — falls back to the card description. */
export function projectOverview(project: Project): string[] {
  return project.overview?.length ? project.overview : [project.description];
}
