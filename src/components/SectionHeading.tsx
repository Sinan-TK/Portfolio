import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Consistent eyebrow + title + optional lede used by every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <p
          className={`flex items-center gap-3.5 font-mono text-lg font-medium uppercase tracking-[0.16em] text-accent-600 sm:text-xl lg:text-2xl dark:text-accent-400 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span
            aria-hidden
            className="h-px w-8 bg-accent-500/60 sm:w-10"
          />
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          {/* Kept narrower than the heading — long measures are hard to read. */}
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed text-black/60 sm:text-lg dark:text-white/60 ${
              centered ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
