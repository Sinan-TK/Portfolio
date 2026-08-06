import { site } from "@/config/site";
import { RevealGroup, RevealItem } from "./Reveal";
import { ScrollHighlightText } from "./ScrollHighlightText";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 pt-16 pb-24 sm:pt-20 sm:pb-32"
    >
      {/* The visible heading is the hanging card in SectionIndicator, which is
          shared across sections. This keeps the document outline intact. */}
      <h2 className="sr-only">About</h2>

      <div className="container-page">
        {/* Each paragraph brightens word by word as it scrolls through. */}
        <div className="mt-16 max-w-4xl space-y-12 sm:space-y-16">
          {site.about.map((paragraph, i) => (
            <ScrollHighlightText key={i} text={paragraph} />
          ))}
        </div>

        {/* Stats */}
        <RevealGroup
          className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4"
          stagger={0.09}
        >
          {site.stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group relative overflow-hidden rounded-3xl border border-black/[0.07] bg-gradient-to-br from-black/[0.02] to-transparent p-6 transition-colors hover:border-accent-500/30 sm:p-7 dark:border-white/10 dark:from-white/[0.05]"
            >
              <div
                aria-hidden
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
              />
              <div className="relative">
                <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="text-gradient">{stat.value}</span>
                </p>
                <p className="mt-2 text-sm text-black/50 dark:text-white/50">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
