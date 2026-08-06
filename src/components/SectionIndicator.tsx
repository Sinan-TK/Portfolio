"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { site } from "@/config/site";
import { ContactPanel } from "./Contact";

/** Distance from the viewport top the card pins at. */
const STICK_TOP = 60;

/** Collapsed pill height — the label row.
 *  In px on purpose: useTransform interpolates numerically, so mixing units
 *  across a range ("3.5rem" → "1500px") makes it read the 3.5 and emit px. */
const PILL_H = 56;

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * The hanging card that starts as the About heading, pins near the top of the
 * viewport, relabels itself per section, and finally expands into the Contact
 * panel as you scroll through the merge zone.
 *
 * It has to wrap its sections: `sticky` only spans its own parent, so scoping
 * it to one section would unpin it at that section's end. The Contact content
 * lives *inside* the card, so the expansion and the section are the same
 * element rather than a card handing off to a separate panel.
 */
export function SectionIndicator({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  const topRef = useRef<HTMLDivElement>(null);
  const mergeRef = useRef<HTMLDivElement>(null);

  const [passedTop, setPassedTop] = useState(false);
  const [label, setLabel] = useState(site.nav[0]?.label ?? "About");

  /* Phones skip the morph entirely. Stacked single-column, the panel is far
     taller than the animated max-height, so every frame re-clipped and
     repainted a subtree containing a backdrop-filtered card — which is what
     made it flicker. They get a plain Contact section instead. */
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Has the card reached its pin position? */
  useEffect(() => {
    const top = topRef.current;
    if (!top) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPassedTop(!entry.isIntersecting),
      { rootMargin: `-${STICK_TOP}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(top);
    return () => observer.disconnect();
  }, []);

  /* Whichever section owns the most of the viewport names the card. */
  useEffect(() => {
    const sections = site.nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const labelFor = (id: string) =>
      site.nav.find((item) => item.href.slice(1) === id)?.label;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const next = visible && labelFor(visible.target.id);
        if (next) setLabel(next);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Scroll only *triggers* the morph — it doesn't drive it frame by frame.
     Scrubbing meant the card sat half-open wherever you stopped; this way one
     scroll past the threshold plays the whole expansion through to the end. */
  /* Measured from where the merge zone's top meets the viewport's top — i.e.
     the moment Experience has fully scrolled past. The previous
     "start end" origin began counting as soon as the zone peeked in from the
     bottom, so the morph fired while Experience was still on screen. */
  const { scrollYProgress } = useScroll({
    target: mergeRef,
    offset: ["start start", "end start"],
  });

  const [expanded, setExpanded] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Asymmetric thresholds, so hovering near the trigger point can't flip it
    // back and forth.
    setExpanded((prev) => (prev ? v > 0.04 : v > 0.12));
  });

  /* One tween, always run to completion. */
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, expanded ? 1 : 0, {
      duration: reduce ? 0 : 0.9,
      ease: [0.65, 0, 0.35, 1],
    });
    return () => controls.stop();
  }, [expanded, progress, reduce]);

  const maxWidth = useTransform(progress, [0, 1], [272, 1216]);
  const maxHeight = useTransform(progress, [0, 1], [PILL_H, 1500]);
  const radius = useTransform(progress, [0, 1], [16, 32]);
  const labelOpacity = useTransform(progress, [0, 0.22], [1, 0]);

  /* Pinned at 1 so ContactPanel renders fully revealed on phones. */
  const settled = useMotionValue(1);

  /* Cords belong to the hanging state only — once pinned there's nothing left
     to hang from. */
  const cord = (side: "left" | "right") => ({
    className: `pointer-events-none absolute top-1/2 h-[2px] w-screen rounded-full bg-black/25 dark:bg-white/25 ${
      side === "left" ? "right-full origin-left" : "left-full origin-right"
    }`,
    style: { y: "-50%" as const },
    animate: { scaleX: passedTop ? 0 : 1 },
    transition: reduce ? { duration: 0 } : { duration: 0.65, ease: EASE },
  });

  /* The swapping label, shared by both layouts. */
  const labelSwap = (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={label}
        initial={reduce ? false : { opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
        transition={{ duration: 0.3 }}
        className="block whitespace-nowrap"
      >
        {label}
      </motion.span>
    </AnimatePresence>
  );

  if (compact) {
    return (
      <div className="relative pt-16">
        <div ref={topRef} aria-hidden className="h-px w-full" />

        {/* Same hanging card and section-label swap as desktop — only the
            scroll-driven morph is dropped here. */}
        <div
          className="sticky z-30 flex justify-center px-4"
          style={{ top: STICK_TOP }}
        >
          <div className="relative w-fit rounded-2xl border border-black/[0.1] bg-white/85 px-7 py-3 shadow-lg shadow-black/[0.05] dark:border-white/12 dark:bg-zinc-900/85">
            <motion.span aria-hidden {...cord("left")} />
            <motion.span aria-hidden {...cord("right")} />

            <div className="flex h-[1.35em] items-center justify-center overflow-hidden font-mono text-[clamp(1.1rem,4.5vw,1.5rem)] font-semibold tracking-[0.14em] text-accent-700 uppercase dark:text-accent-300">
              {labelSwap}
            </div>
          </div>
        </div>

        {children}

        {/* Static panel: no per-frame resize, so nothing flickers. */}
        <section id="contact" className="scroll-mt-24 px-4 pt-10 pb-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-black/[0.1] bg-white/85 shadow-lg shadow-black/[0.05] dark:border-white/12 dark:bg-zinc-900/85">
            <ContactPanel progress={settled} />
          </div>
        </section>
      </div>
    );
  }

  return (
    /* pt lifts the card clear of the ticker above it.
       mb is the important one. The card is out of flow, hanging ~700px below a
       56px sticky container, so the container ends — and the card unpins —
       while the panel still fills the screen. The clearance below must be at
       least (card height − container height), or the footer scrolls up
       underneath it. In rem, not vh: a viewport-relative value is too small on
       short screens, which is exactly where the overlap showed up. */
    <div className="relative mb-[46rem] pt-20 pb-12 sm:pt-28">
      <div ref={topRef} aria-hidden className="h-px w-full" />

      {/* Fixed height, and the card inside is absolutely positioned.
          Critical: if the card sat in normal flow, expanding it would grow the
          page by ~650px, shifting the very spacer the scroll trigger measures
          — progress would drop back under the threshold, collapse, and
          oscillate. Out of flow, the layout is identical open or closed. */}
      <div
        className="sticky z-30 px-4"
        style={{ top: STICK_TOP, height: PILL_H }}
      >
        {/* Unclipped wrapper. The cords hang off the card's edges, so they
            can't live inside it — the card needs overflow-hidden (and
            contain: paint) for the morph, which would clip them away. The
            wrapper carries the width animation; the card carries the rest. */}
        <motion.div
          style={{ maxWidth }}
          className="absolute top-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2"
        >
          <motion.span aria-hidden {...cord("left")} />
          <motion.span aria-hidden {...cord("right")} />

          {/* No backdrop-blur here on purpose: `backdrop-filter` on an element
              whose box changes every frame forces the browser to re-sample and
              re-blur the backdrop continuously, which is what made scrolling
              back out of Contact stutter. Plain translucent fill instead. */}
          <motion.div
            style={{
              maxHeight,
              borderRadius: radius,
              willChange: "max-height",
              contain: "layout paint",
            }}
            className="w-full overflow-hidden border border-black/[0.1] bg-white/85 shadow-lg shadow-black/[0.05] dark:border-white/12 dark:bg-zinc-900/85"
          >

            {/* Label row. Fixed height so it defines the collapsed pill. */}
            <motion.div
              style={{ opacity: labelOpacity, height: PILL_H }}
              className="flex items-center justify-center overflow-hidden font-mono text-[clamp(1.1rem,3.2vw,1.75rem)] font-semibold tracking-[0.14em] text-accent-700 uppercase dark:text-accent-300"
            >
              {labelSwap}
            </motion.div>

            {/* Revealed as the box grows past the pill height. */}
            <ContactPanel progress={progress} />
          </motion.div>
        </motion.div>
      </div>

      {children}

      {/* Trigger runway. Short on purpose: the morph is a tween, so this only
          needs enough scroll to cross the threshold. */}
      <div ref={mergeRef} aria-hidden className="h-[22vh] w-full" />

      {/* Room for the expanded panel. The card is out of flow, so nothing else
          reserves space for it — without this the footer would sit underneath.
          Also the #contact target: by here the morph has already fired, so
          links land on the open panel. */}
      <div id="contact" aria-hidden className="h-[55vh] w-full" />
    </div>
  );
}
