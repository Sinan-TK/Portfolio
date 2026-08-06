import { Hero } from "@/components/Hero";
import { LEDBanner } from "@/components/LEDBanner";
import { SectionIndicator } from "@/components/SectionIndicator";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LEDBanner />

      {/* The hanging card pins across these, relabels itself as the active
          section changes, then expands into the Contact panel — which lives
          inside the card, so there's no separate Contact section. */}
      <SectionIndicator>
        <About />
        <Skills />
        <Projects />
        <Experience />
      </SectionIndicator>
    </>
  );
}
