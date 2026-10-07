/* ============================================================================
 *  ██  EDIT THIS FILE  ██
 *  Everything on the site — text, links, projects, SEO — comes from here.
 *  Change the values below and the whole portfolio updates. Nothing else
 *  needs to be touched.
 * ========================================================================== */

export type Social = {
  name: string;
  url: string;
  /** github | linkedin | twitter | x | mail | website | dribbble | youtube | instagram */
  icon: string;
};

export type Project = {
  title: string;
  /** One-liner used on the card and as the page meta description. */
  description: string;
  /** Optional longer write-up for /projects/<slug>. Falls back to description. */
  overview?: string[];
  /** Optional bullets shown on the detail page. */
  highlights?: string[];
  tags: string[];
  /** Leave "" to hide the button. */
  liveUrl: string;
  repoUrl: string;
  /** Gives the card a wider, highlighted layout. */
  featured: boolean;
  /** Path in /public, e.g. "/projects/orbit.png". "" falls back to a gradient. */
  image: string;
  /** [from, to] hex pair for the generated artwork. */
  gradient: string[];
  year: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  /** "" hides the company link. */
  url: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Position = {
  title: string;
  /** Short line shown on the right of the row. */
  focus: string;
};

export type Service = {
  title: string;
  description: string;
  /** code | zap | layers | compass */
  icon: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const site = {
  /* -- Identity ----------------------------------------------------------- */
  name: "Muhammed Sinan TK",
  firstName: "Sinan",
  role: "Full-Stack Engineer",

  /* Cycled under the hero name by RotatingText. Keep them short — they all
   * share one line, so the longest entry sets the width. */
  roles: [
    "Developer",
    "Full-Stack Engineer",
    "React Specialist",
    "TypeScript Nerd",
    "Design-Minded",
  ],

  /* Hero backdrop image. Empty = plain background colour, with just the
   * ferrofluid effect over it. Point this at a file in /public (e.g.
   * "/hero.jpg", or the bundled "/hero-bg.svg") to put an image behind it. */
  heroBackground: "",

  /* Your photo, sitting behind the hero name. A cut-out with a transparent
   * background reads best — the name overlaps its lower half. Set "" to hide. */
  heroPhoto: "/squaredp.png",

  /* One line under the hero. Sell yourself in ~20 words. */
  tagline:
    "I design and build fast, accessible web products — from the database schema all the way to the last pixel.",

  /* 2–3 short paragraphs for the About section. */
  about: [
    "I'm a full-stack engineer with 1 year of experience turning ambiguous ideas into products people actually use. Most of my work lives in the React and TypeScript ecosystem.",
    "Backend is where I enjoy working the most — designing APIs, modelling data in Postgres or MongoDB, and making the whole system fast and reliable. I'm a quick learner who likes picking up new technologies, and I'd rather learn whatever a project needs than force the same tools onto every problem.",
    "I care a lot about the details that don't show up in a demo: bundle size, keyboard navigation, error states, and the 3 a.m. pager. I believe the best interfaces feel obvious in hindsight.",
    "Outside of work you'll find me contributing to open source, writing about web performance, or failing to beat my personal best on a bouldering problem.",
  ],

  /* -- Location & availability -------------------------------------------- */
  location: "San Francisco, CA",
  locationShort: "SF Bay Area",
  timezone: "PST (UTC−8)",
  /* Set to false to show a "not currently available" state. */
  available: true,
  availabilityText: "Open to new opportunities",

  /* -- Profile card (hero) ------------------------------------------------ */
  /* Swap in a real photo: drop it in /public and point this at it, e.g.
   * "/me.jpg". A portrait crop around 3:4 fits the card frame best. */
  avatarUrl: "/profile.png",
  /** Shown under your name on the card, rendered as @handle. */
  handle: "sinantk",

  /* -- Contact ------------------------------------------------------------ */
  email: "sinantkthonikadavath@gmail.com",
  /* Optional — leave as "" to hide. */
  phone: "+91 70121 93446",
  /* Put a real PDF at /public/resume.pdf, or set to "" to hide the button. */
  resumeUrl: "/resume.pdf",

  /* -- Domain (used for canonical URLs, sitemap, OG tags) ------------------ */
  /* NO trailing slash. Must be the real production URL for SEO to work. */
  url: "https://sinantk.dev",

  /* -- Social links. Delete any you don't use. ---------------------------- */
  socials: [
    { name: "GitHub", url: "https://github.com/Sinan-TK", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammedsinantk", icon: "linkedin" },
    { name: "X", url: "https://x.com/sinantk", icon: "x" },
    { name: "Email", url: "mailto:sinantkthonikadavath@gmail.com", icon: "mail" },
  ] as Social[],

  /* -- SEO ---------------------------------------------------------------- */
  seo: {
    /* Appears in the browser tab and Google's blue link. ~60 chars max. */
    title: "Muhammed Sinan TK - Full-Stack Engineer",
    titleTemplate: "%s | Muhammed Sinan TK",
    /* Google's snippet. 150–160 chars is the sweet spot. */
    description:
      "Muhammed Sinan TK is a full-stack engineer in San Francisco building fast, accessible web products with React, Next.js and TypeScript. View projects and get in touch.",
    keywords: [
      "full-stack engineer",
      "React developer",
      "Next.js developer",
      "TypeScript",
      "web developer portfolio",
      "San Francisco software engineer",
      "frontend engineer",
      "Muhammed Sinan TK",
    ],
    /* Two-letter language code for <html lang="…">. */
    locale: "en_US",
    lang: "en",
    /* Add once you have them; leave "" to skip the meta tag. */
    googleSiteVerification: "",
    /* Your @handle without the @, for Twitter/X cards. */
    twitterHandle: "sinantk",
  },

  /* -- Preloader ---------------------------------------------------------- */
  /* Cycled rapidly on load. The first entry holds a little longer, so put your
   * primary language first. Non-Latin scripts fall back to the OS font
   * automatically — no extra webfont needed. */
  greetings: [
    "Hello",
    "Bonjour",
    "Hola",
    "Ciao",
    "Hallo",
    "Olá",
    "Привет",
    "こんにちは",
    "안녕하세요",
    "你好",
    "नमस्ते",
    "مرحبا",
  ] as string[],

  /* -- LED ticker under the hero ------------------------------------------ */
  /* Scrolls across the dot-matrix band. UPPERCASE reads best — the pixel font
   * is uppercase-only. Supported: A–Z 0–9 and . , ! ? & @ # $ % + - / : ; ( )
   * plus the separator glyphs ● • · ° ★ → ←. Keep entries short and punchy. */
  ticker: [
    "WEB DEVELOPER",
    "FULL-STACK ENGINEER",
    "REACT & NEXT.JS",
    "TYPESCRIPT",
    "UI ENGINEERING",
    "OPEN TO WORK",
  ] as string[],

  /** Glyph drawn between ticker items. One of: ● • · ° ★ → ← */
  tickerSeparator: "●",

  /* -- Positions you take on. Listed above the tools grid. ---------------- */
  positions: [
    {
      title: "Front-End Developer",
      focus: "Interfaces, motion, accessibility",
    },
    {
      title: "Full-Stack Engineer",
      focus: "APIs, data, and everything between",
    },
    {
      title: "UI Engineer",
      focus: "Design systems and component libraries",
    },
    {
      title: "Performance Engineer",
      focus: "Core Web Vitals and bundle budgets",
    },
  ] as Position[],

  /* -- Skills. Group names are free-form; add or remove groups freely. ----- */
  skills: [
    {
      group: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      group: "Backend",
      items: ["Node.js", "PostgreSQL", "MongoDB", "Redis", "Prisma"],
    },
    {
      group: "Infra & Tooling",
      items: ["AWS", "Docker", "GitHub Actions", "Vercel", "Git", "Figma"],
    },
    {
      group: "Craft",
      items: ["Web Performance", "Accessibility (WCAG)", "System Design", "Testing"],
    },
  ],

  /* -- Stats strip. Keep to 3–4 items. ------------------------------------ */
  stats: [
    { value: "1", label: "Year experience" },
    { value: "40+", label: "Projects shipped" },
    { value: "12k", label: "GitHub stars" },
    { value: "99", label: "Avg Lighthouse" },
  ],

  /* -- Projects ----------------------------------------------------------- */
  /* `featured: true` gives the card a larger, highlighted layout.
   * `gradient` is a pair of hex colors used for the card's artwork.
   * Set `image` to a path in /public (e.g. "/projects/foo.png") to use a real
   * screenshot instead of the gradient. */
  projects: [
    {
      title: "Orbit Analytics",
      description:
        "A real-time product analytics platform handling 2B+ events per month. Built a custom columnar query layer that cut p95 dashboard load time from 4.2s to 380ms.",
      /* Optional — shown on /projects/orbit-analytics. Add these to any
       * project for a fuller write-up; otherwise the description is used. */
      overview: [
        "Orbit is a product analytics platform built for teams that had outgrown off-the-shelf tools but didn't want to run their own warehouse. It ingests roughly two billion events a month and keeps dashboards interactive while doing it.",
        "The interesting problem was query latency. The original implementation fanned out row-oriented scans per widget, which meant a dashboard with twelve charts issued twelve full-table reads. I replaced it with a columnar layer that batches widget queries into a single pass and caches partial aggregates by time bucket.",
      ],
      highlights: [
        "Cut p95 dashboard load from 4.2s to 380ms",
        "Sustains 2B+ events/month on a three-node cluster",
        "Live updates over WebSockets with backpressure handling",
      ],
      tags: ["Next.js", "Go", "ClickHouse", "WebSockets"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/sinantk",
      featured: true,
      image: "",
      gradient: ["#3f3f46", "#a1a1aa"],
      year: "2025",
    },
    {
      title: "Kanban Zero",
      description:
        "An offline-first project board with CRDT-based sync. Works fully without a network and reconciles conflict-free when you come back online.",
      tags: ["React", "TypeScript", "IndexedDB", "Yjs"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/sinantk",
      featured: true,
      image: "",
      gradient: ["#18181b", "#71717a"],
      year: "2024",
    },
    {
      title: "Lumen UI",
      description:
        "An accessible React component library with 48 primitives, full keyboard support and a 14 kB gzipped core. 3.2k stars on GitHub.",
      tags: ["React", "Radix", "Tailwind", "Storybook"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/sinantk",
      featured: false,
      image: "",
      gradient: ["#52525b", "#d4d4d8"],
      year: "2024",
    },
    {
      title: "Shipyard CLI",
      description:
        "A zero-config deployment CLI for monorepos. Detects your framework, builds a minimal container and ships it in under 60 seconds.",
      tags: ["Go", "Docker", "AWS"],
      liveUrl: "",
      repoUrl: "https://github.com/sinantk",
      featured: false,
      image: "",
      gradient: ["#27272a", "#8f8f99"],
      year: "2023",
    },
    {
      title: "Ferry",
      description:
        "A type-safe webhook gateway with automatic retries, replay and signature verification. Processes 8M deliveries a day for 200+ customers.",
      tags: ["TypeScript", "Redis", "Kubernetes"],
      liveUrl: "https://example.com",
      repoUrl: "",
      featured: false,
      image: "",
      gradient: ["#09090b", "#52525b"],
      year: "2023",
    },
    {
      title: "Palette Lab",
      description:
        "A browser tool for generating WCAG-compliant color systems. Computes contrast across every pair and exports to Tailwind, CSS or Figma.",
      tags: ["React", "Canvas", "Color Science"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/sinantk",
      featured: false,
      image: "",
      gradient: ["#3f3f46", "#e4e4e7"],
      year: "2022",
    },
  ],

  /* -- Work history ------------------------------------------------------- */
  experience: [
    {
      company: "Nimbus Labs",
      role: "Senior Full-Stack Engineer",
      period: "2023 — Present",
      location: "San Francisco, CA",
      description:
        "Lead engineer on the analytics platform. Rebuilt the query pipeline for 10× throughput and mentor a team of four.",
      highlights: [
        "Cut infrastructure spend 38% by redesigning the ingestion path",
        "Shipped a design system now used across 6 product teams",
        "Drove Core Web Vitals from 62 to 98 on the marketing site",
      ],
      url: "https://example.com",
    },
    {
      company: "Vertex Digital",
      role: "Full-Stack Engineer",
      period: "2021 — 2023",
      location: "Remote",
      description:
        "Built client-facing products for fintech and healthcare companies, owning features end to end.",
      highlights: [
        "Delivered a HIPAA-compliant patient portal serving 90k users",
        "Introduced end-to-end testing, dropping production incidents 55%",
      ],
      url: "https://example.com",
    },
    {
      company: "Stackbridge",
      role: "Frontend Developer",
      period: "2019 — 2021",
      location: "Austin, TX",
      description:
        "First frontend hire. Established the component architecture and CI pipeline the team still uses today.",
      highlights: [
        "Migrated a legacy jQuery app to React with zero downtime",
        "Reduced initial bundle size from 1.8 MB to 240 kB",
      ],
      url: "",
    },
  ],

  /* -- Services / what you offer. Set to [] to hide the section. ----------- */
  services: [
    {
      title: "Web Application Development",
      description:
        "End-to-end product builds — architecture, API design, frontend and deployment. Shipped, tested and documented.",
      icon: "code",
    },
    {
      title: "Performance Engineering",
      description:
        "Audits and hands-on fixes for slow apps. Core Web Vitals, bundle analysis, caching strategy and database tuning.",
      icon: "zap",
    },
    {
      title: "Design Systems",
      description:
        "Accessible, themeable component libraries that keep a growing team consistent without slowing it down.",
      icon: "layers",
    },
    {
      title: "Technical Consulting",
      description:
        "Architecture reviews, tech-stack decisions and code-quality guidance for teams scaling past their first product.",
      icon: "compass",
    },
  ],

  /* -- Navigation. `href` must match a section id in page.tsx. ------------- */
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
};

export type Site = typeof site;
