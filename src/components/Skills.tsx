import { site } from "@/config/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Positions } from "./Positions";
import { SkillsGrid } from "./SkillsGrid";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              The tools I reach for{" "}
              <span className="text-gradient">most often</span>
            </>
          }
          description="Hover a tile to bring it forward. I'm comfortable picking up whatever a project actually needs."
        />

        {/* Positions first, then the tooling they're built on. */}
        <div className="mt-14">
          <Positions />
        </div>

        <Reveal className="mt-20">
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
            Tools I work with
          </p>
          <SkillsGrid />
        </Reveal>

      </div>

      {/* The grid is images only — this is what crawlers and screen readers
          get for the tooling list. */}
      <div className="sr-only">
        <h3>Tools and technologies</h3>
        {site.skills.map((group) => (
          <div key={group.group}>
            <h4>{group.group}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
