import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { site } from "@/config/site";
import { tileFor } from "@/lib/project-art";
import {
  getProjectBySlug,
  projectHref,
  projectOverview,
  projectSlug,
} from "@/lib/projects";

type Params = { slug: string };

/** Every project is known at build time, so all pages prerender as static. */
export function generateStaticParams(): Params[] {
  return site.projects.map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const url = `${site.url}${projectHref(project)}`;

  return {
    title: project.title,
    description: project.description,
    keywords: [...project.tags, project.title, site.name],
    alternates: { canonical: projectHref(project) },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — ${site.name}`,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const overview = projectOverview(project);
  const index = site.projects.findIndex((p) => projectSlug(p) === slug);
  const next = site.projects[(index + 1) % site.projects.length];

  /* Structured data so the page can stand on its own in search results. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${site.url}${projectHref(project)}`,
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    /* id="top" so the footer's back-to-top anchor resolves here too — the
       home page puts it on the hero section. */
    <article id="top" className="pt-32 pb-24 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-black/50 transition-colors hover:text-accent-700 dark:text-white/50 dark:hover:text-accent-300"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-sm text-black/40 dark:text-white/40">
            {project.year}
          </p>
          <h1 className="mt-3 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-black/60 dark:text-white/60">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-black/[0.05] px-2.5 py-1 font-mono text-[11px] font-medium text-accent-700 dark:bg-white/10 dark:text-accent-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
                >
                  Visit live site
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-black/12 px-6 text-sm font-medium transition-colors hover:bg-black/[0.04] dark:border-white/18 dark:hover:bg-white/[0.06]"
                >
                  <Github size={15} aria-hidden />
                  Source code
                </a>
              )}
            </div>
          )}
        </header>

        {/* Cover */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-black/[0.07] dark:border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tileFor(project)}
            alt={`${project.title} cover`}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-black/70 sm:text-lg dark:text-white/70">
            {overview.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <aside className="space-y-8">
            {project.highlights?.length ? (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                  Highlights
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-relaxed text-black/70 dark:text-white/70"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                Stack
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                {project.tags.join(" · ")}
              </p>
            </div>
          </aside>
        </div>

        {/* Next project */}
        <nav className="mt-24 border-t border-black/[0.07] pt-10 dark:border-white/10">
          <Link href={projectHref(next)} className="group block">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
              Next project
            </p>
            <p className="mt-3 flex items-center gap-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-700 sm:text-3xl dark:group-hover:text-accent-300">
              {next.title}
              <ArrowUpRight
                size={22}
                aria-hidden
                className="shrink-0 text-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-white/30"
              />
            </p>
          </Link>
        </nav>
      </div>
    </article>
  );
}
