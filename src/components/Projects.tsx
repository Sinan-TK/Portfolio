"use client";

import Link from "next/link";

import { site } from "@/config/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { HoverExpand_002 } from "@/components/ui/skiper-ui/skiper53";
import { tileFor } from "@/lib/project-art";
import { projectHref } from "@/lib/projects";

export function Projects() {
  const items = site.projects.map((project) => ({
    src: tileFor(project),
    alt: `${project.title} — ${project.description}`,
    code: project.year,
    title: project.title,
    description: project.description,
    tags: [...project.tags],
    href: projectHref(project),
  }));

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Things I&apos;ve <span className="text-gradient">built</span>
            </>
          }
          description="Open a row to preview it, then click through for the full write-up."
        />

        {/* Vertical accordion — each row opens to reveal the project. */}
        <Reveal className="mt-14">
          <HoverExpand_002 images={items} />
        </Reveal>

      </div>

      {/* Only the open row shows its details, so give crawlers and screen
          readers the full list as text. */}
      <div className="sr-only">
        <h3>All projects</h3>
        <ul>
          {site.projects.map((project) => (
            <li key={project.title}>
              <h4>
                <Link href={projectHref(project)}>
                  {project.title} ({project.year})
                </Link>
              </h4>
              <p>{project.description}</p>
              <p>Built with: {project.tags.join(", ")}</p>
              {project.liveUrl && <a href={project.liveUrl}>Live site</a>}
              {project.repoUrl && <a href={project.repoUrl}>Source code</a>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
