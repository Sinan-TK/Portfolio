import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">worked</span>
            </>
          }
        />

        <RevealGroup as="ul" className="relative mt-14" stagger={0.12}>
          {/* Timeline spine */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent-500/50 via-accent-500/20 to-transparent sm:block"
          />

          {site.experience.map((job) => (
            <RevealItem
              key={`${job.company}-${job.period}`}
              as="li"
              className="relative pb-12 last:pb-0 sm:pl-10"
            >
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] rounded-full border-2 border-accent-500 bg-white sm:block dark:bg-zinc-950"
              />

              <div className="rounded-3xl border border-black/[0.07] bg-white/40 p-6 transition-colors hover:border-accent-500/25 sm:p-7 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {job.role}
                  </h3>
                  <span className="font-mono text-xs text-black/40 dark:text-white/40">
                    {job.period}
                  </span>
                </div>

                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 font-medium text-accent-600 transition-colors hover:text-accent-500 dark:text-accent-400"
                    >
                      {job.company}
                      <ArrowUpRight size={13} aria-hidden />
                    </a>
                  ) : (
                    <span className="font-medium text-accent-600 dark:text-accent-400">
                      {job.company}
                    </span>
                  )}
                  <span aria-hidden className="text-black/20 dark:text-white/20">
                    •
                  </span>
                  <span className="text-black/45 dark:text-white/45">
                    {job.location}
                  </span>
                </p>

                <p className="mt-4 text-[15px] leading-relaxed text-black/60 dark:text-white/60">
                  {job.description}
                </p>

                {job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[15px] leading-relaxed text-black/60 dark:text-white/60"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent-500"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
