# Developer Portfolio

A modern, animated, SEO-optimized portfolio built with Next.js 15, Tailwind CSS v4,
Framer Motion and GSAP, with a WebGL hero background.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
```

---

## Make it yours

**Everything lives in one file: [`src/config/site.ts`](src/config/site.ts).**

Open it and replace the placeholder values. The entire site — every heading,
project card, meta tag and structured-data entry — is generated from that file.
You don't need to touch any component.

At minimum, change these:

| Field | Why it matters |
|---|---|
| `name`, `firstName`, `role` | Hero headline, logo initials, structured data |
| `url` | **Critical for SEO.** Must be your real production URL, no trailing slash. Canonical tags, sitemap and OG image URLs all derive from it. |
| `email`, `socials` | Contact section, footer, `sameAs` structured data |
| `seo.title`, `seo.description` | The blue link and grey snippet in Google |
| `projects`, `experience`, `skills` | The actual content |

### Adding project screenshots

Drop an image in `public/projects/` and set the project's `image` field:

```ts
image: "/projects/orbit.png",
```

Leave it as `""` and the card renders a generated gradient instead — which is
why the site looks complete before you have any screenshots.

### Résumé

Put a PDF at `public/resume.pdf`. To hide the button, set `resumeUrl: ""`.

---

## SEO — what's already wired up

| Feature | Where |
|---|---|
| Title, description, keywords, canonical | `src/app/layout.tsx` (Metadata API) |
| Open Graph + Twitter card tags | `src/app/layout.tsx` |
| **Auto-generated 1200×630 share image** | `src/app/opengraph-image.tsx` |
| Auto-generated favicon from your initials | `src/app/icon.tsx` |
| JSON-LD: `Person`, `WebSite`, `ProfilePage` | `src/components/JsonLd.tsx` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| `robots.txt` | `src/app/robots.ts` |
| PWA manifest | `src/app/manifest.ts` |
| Semantic landmarks, one `<h1>`, skip link | throughout |
| Security headers | `next.config.mjs` |

**After deploying**, do these two things:

1. Set `seo.googleSiteVerification` in `site.ts` to your Search Console token.
2. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

Validate structured data at
[search.google.com/test/rich-results](https://search.google.com/test/rich-results).

---

## Mobile & accessibility

- Fluid `clamp()` typography — scales smoothly, no layout breakpoints to fight
- Every interactive element is at least 44×44px (Apple's touch-target minimum)
- Full-screen mobile drawer with focus trapping, `Esc` to close, scroll lock
- Pinch-to-zoom deliberately **not** disabled
- Hover-only effects (cursor glow, magnetic buttons, 3D tilt) are gated behind
  `pointer: fine` so phones never run those listeners
- `prefers-reduced-motion` respected globally in CSS **and** per-component via
  `useReducedMotion()`
- Visible focus rings, `aria-current` on active nav, `aria-live` on the copy
  button, `sr-only` skip link

---

## The signature effects

Four custom effects, each in its own file. All of them read the theme from
`next-themes` (they draw to canvas/WebGL or tween with GSAP, so none can use
CSS variables) and all of them no-op under `prefers-reduced-motion`.

| Effect | File | Where |
|---|---|---|
| **Ferrofluid** — WebGL metaball shader ([react-bits](https://reactbits.dev), uses `ogl`) | `Ferrofluid.jsx` + `FerrofluidBackground.tsx` | Hero background |
| **LED ticker** — canvas dot-matrix marquee | `LEDTicker.tsx` + `LEDBanner.tsx` | Band under the hero |
| **Scroll highlight** — GSAP word-by-word reveal | `ScrollHighlight.tsx` + `ScrollHighlightText.tsx` | About section |
| **Click effects** — GSAP sniper burst | `ClickEffects.tsx` + `ClickEffectsOverlay.tsx` | Whole page |
| **Profile card** — tilt-on-hover holo card ([react-bits](https://reactbits.dev)) | `ProfileCard.jsx` | Hero, beside the headline |
| **Preloader** — brand mark + progress, curtain reveal | `Preloader.tsx` | First paint, once per session |

Each pairs a **raw component** with a **wrapper**. The wrapper is where theming,
reduced-motion, sizing and lifecycle live — so you can drop in a new version of
the raw component without losing the integration.

**They unmount when off screen.** The ferrofluid runs a full-screen fragment
shader and the LED ticker a `requestAnimationFrame` loop; both would otherwise
keep rendering behind the rest of the page. An `IntersectionObserver` in each
wrapper tears them down once they scroll away.

### Tuning

- **Ferrofluid** — installed with
  `npx shadcn@latest add @react-bits/Ferrofluid-JS-CSS`. Props live in
  `FerrofluidBackground.tsx`: `turbulence`, `fluidity`, `rimWidth`,
  `sharpness`, `glow`, `mouseStrength`. Drop `dpr` to `1` for cheaper rendering
  on retina screens. `Ferrofluid.d.ts` types the JSX component — without it
  TypeScript treats `className`/`mixBlendMode` as required.
- **LED ticker** — text lives in `site.ticker` (uppercase only; the pixel font
  has no lowercase). `SPEED` and `GLYPH_RATIO` are constants at the top of
  `LEDBanner.tsx`; the band height is the CSS classes on the inner div.
- **Scroll highlight** — `scrollStart`/`scrollEnd` control the scrub range.
  Note `spacing` defaults to `0px` here; the upstream demo hardcoded `100dvh`,
  which would insert two blank screens per paragraph.
- **Click effects** — `interactionMode` accepts `sniper`, `rings`, `burst`,
  `particles`, `crosshair`, `wavy`.
- **Profile card** — installed with
  `npx shadcn@latest add @react-bits/ProfileCard-JS-CSS`. Content comes from
  `site.ts` (`name`, `role`, `handle`, `avatarUrl`, `available`). Mobile tilt is
  off deliberately: on touch it competes with scrolling. `ProfileCard.d.ts`
  types the JSX, same as Ferrofluid.

### Preloader

Cycles "hello" through a dozen languages on **every page load**, skipped under
`prefers-reduced-motion`. Edit the list in `site.ts`:

```ts
greetings: ["Hello", "Bonjour", "Hola", "こんにちは", "مرحبا", …],
```

Put your primary language first — that entry holds longer (`FIRST_MS`, 420ms)
than the rest (`STEP_MS`, 155ms). Non-Latin scripts fall back to OS fonts per
glyph, so no extra webfont is needed, and the text uses `dir="auto"` so Arabic
renders right-to-left.

It leaves when the greetings have finished **and** `window.load` has fired,
whichever is last — so it tracks real loading rather than a fixed fake timer.

It renders **on the server too**, so the overlay is present in the very first
paint. That's deliberate: mounting it from an effect instead shows the page for
a beat and then covers it, which looks like a bug. Your content still sits in
the HTML underneath — it's covered, never removed — so crawlers read it
normally.

Two safeguards worth keeping:

- **`FAILSAFE` (6s)** — if `load` never fires (a stalled image, a dead third
  party), it dismisses anyway instead of trapping the page behind an overlay.
- **`<noscript>` rule** — with JS off nothing would ever dismiss it, so the
  overlay is hidden outright.

To disable it, remove `<Preloader />` from `src/app/layout.tsx`. To show it only
once per visit, gate the effect on a `sessionStorage` flag — be aware that makes
it invisible on refresh while you're working on it.

### Registries

`components.json` is wired for three registries:

```jsonc
"@animate-ui":  "https://animate-ui.com/r/{name}.json",
"@react-bits":  "https://reactbits.dev/r/{name}.json",
"@skiper-ui":   { url + Bearer ${SKIPER_UI_LICENSE} }   // Pro, needs a key
```

Skiper UI components are paid. To use them, put your key in `.env.local`
(already gitignored):

```bash
SKIPER_UI_LICENSE=your_key_here
```

Then `npx shadcn@latest add @skiper-ui/<name>` works. Note their registry lives
at `/r/{name}.json` — shadcn's default guess of `/registry/{name}.json` 404s.

### Replace the placeholder avatar

`public/avatar.svg` is a generated stand-in so the card looks right out of the
box. Drop a real photo in `public/` and point `site.avatarUrl` at it:

```ts
avatarUrl: "/me.jpg",
```

A portrait crop near **3:4** fits the card frame (its aspect ratio is 0.718).

> The About section renders **real text** server-side, so it's fully crawlable
> and readable with JS disabled — the highlight is progressive enhancement on
> top of a normal paragraph.

---

## Theming

The accent color is defined once in `src/app/globals.css`:

```css
@theme {
  --color-accent-500: #6366f1;   /* change these */
  --color-cyan-accent: #06b6d4;
}
```

Dark mode is handled by **next-themes** (`attribute="class"`). It defaults to
the OS setting, persists to `localStorage`, and injects its own pre-paint script
so there's no white flash. Every canvas/GSAP effect reads `resolvedTheme` from
it, so they recolor when you toggle.

> shadcn's design tokens (`--background`, `--accent`, `--border`, …) coexist
> with the custom `accent-50…900` scale. `bg-accent` is shadcn's neutral;
> `bg-accent-500` is the indigo brand color.

---

## Deploying

**Vercel** (easiest — zero config):

```bash
npx vercel
```

Any Node host works too: `npm run build && npm start`.

Whatever you choose, make sure `site.url` matches the final domain — otherwise
canonical tags and social previews will point at the wrong place.

---

## Structure

```
src/
├─ app/
│  ├─ layout.tsx           # SEO metadata, fonts, ThemeProvider, shell
│  ├─ page.tsx             # section order — reorder here
│  ├─ globals.css          # design tokens, shadcn tokens, motion prefs
│  ├─ opengraph-image.tsx  # generated social card
│  ├─ icon.tsx             # generated favicon
│  ├─ sitemap.ts / robots.ts / manifest.ts
│  └─ not-found.tsx
├─ components/
│  ├─ Hero.tsx             # + Ferrofluid WebGL backdrop
│  ├─ About.tsx            # GSAP scroll-highlight prose
│  ├─ Ferrofluid.jsx       # raw effects — swap freely,
│  ├─ ProfileCard.jsx      #   (react-bits: .jsx + .css + .d.ts)
│  ├─ LEDTicker.tsx        #   the *Background/*Banner/*Overlay
│  ├─ ScrollHighlight.tsx  #   wrappers hold the integration
│  ├─ ClickEffects.tsx     #
│  └─ …                    # one file per section + animation primitives
├─ lib/                    # cn()
└─ config/
   └─ site.ts              # ← ALL YOUR CONTENT
```
