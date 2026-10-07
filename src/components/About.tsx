import { site } from "@/config/site";
import { ScrollHighlightParagraphs } from "./ScrollHighlightText";

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
        {/* One scrub across every paragraph, so each finishes before the next
            begins. */}
        <ScrollHighlightParagraphs
          texts={site.about}
          className="mt-16 max-w-4xl space-y-12 sm:space-y-16"
        />
      </div>
    </section>
  );
}
