import type { Project } from "@/config/site";

/**
 * Artwork for a project tile.
 *
 * A real screenshot wins when `project.image` is set. Otherwise an SVG is
 * generated from the project's gradient pair plus its initials, so galleries
 * look finished before any screenshots exist.
 */
export function tileFor(project: Project) {
  if (project.image) return project.image;

  const [from, to] = project.gradient;
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${from}"/>
    <stop offset="100%" stop-color="${to}"/>
  </linearGradient>
  <radialGradient id="v" cx="50%" cy="35%" r="75%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.20"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.35"/>
  </radialGradient>
</defs>
<rect width="640" height="640" fill="url(#g)"/>
<rect width="640" height="640" fill="url(#v)"/>
<text x="320" y="360" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
  font-size="200" font-weight="700" fill="#fff" fill-opacity="0.22"
  letter-spacing="-8">${initials}</text>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
