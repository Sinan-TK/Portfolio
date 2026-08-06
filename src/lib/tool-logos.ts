/**
 * Logos for the skills grid.
 *
 * Icons come from simple-icons' CDN, which serves a single-colour SVG per
 * slug — the colour is part of the URL, so it can follow the theme. Anything
 * without a slug falls back to a generated initials tile, so adding a new
 * skill to site.ts never leaves a broken image.
 */

/** Tool name (lowercased) -> simple-icons slug. */
const SLUGS: Record<string, string> = {
  react: "react",
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  typescript: "typescript",
  javascript: "javascript",
  "tailwind css": "tailwindcss",
  tailwindcss: "tailwindcss",
  "framer motion": "framer",
  redux: "redux",
  "react query": "reactquery",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  go: "go",
  python: "python",
  rust: "rust",
  postgresql: "postgresql",
  postgres: "postgresql",
  mysql: "mysql",
  mongodb: "mongodb",
  redis: "redis",
  graphql: "graphql",
  trpc: "trpc",
  prisma: "prisma",
  /* No `aws` or `playwright` here on purpose — simple-icons dropped both over
     trademark policy and the CDN 404s for them, which would render a broken
     image. They fall through to the text tile instead. */
  gcp: "googlecloud",
  azure: "microsoftazure",
  docker: "docker",
  kubernetes: "kubernetes",
  terraform: "terraform",
  "github actions": "githubactions",
  github: "github",
  gitlab: "gitlab",
  vercel: "vercel",
  netlify: "netlify",
  cypress: "cypress",
  jest: "jest",
  vitest: "vitest",
  vite: "vite",
  figma: "figma",
  storybook: "storybook",
  sass: "sass",
  git: "git",
  linux: "linux",
  supabase: "supabase",
  firebase: "firebase",
  stripe: "stripe",
  clickhouse: "clickhouse",
  webassembly: "webassembly",
  svelte: "svelte",
  vuedotjs: "vuedotjs",
  vue: "vuedotjs",
};

/**
 * Wordmark tile for anything without an icon. A wide viewBox rather than a
 * square one, so a name like "Playwright" stays legible instead of shrinking
 * to fit a square; the font size scales with length.
 */
function textTile(name: string, hex: string) {
  const label = name.replace(/[<>&]/g, "").trim();
  const fontSize = Math.max(14, Math.min(30, 300 / Math.max(label.length, 3)));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" width="160" height="48">
<text x="80" y="32" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
  font-size="${fontSize.toFixed(1)}" font-weight="700" letter-spacing="-0.5"
  fill="#${hex}">${label}</text>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** `hex` is bare (no leading #), e.g. "ffffff". */
export function toolLogo(name: string, hex: string) {
  const slug = SLUGS[name.toLowerCase().trim()];
  return slug
    ? `https://cdn.simpleicons.org/${slug}/${hex}`
    : textTile(name, hex);
}
