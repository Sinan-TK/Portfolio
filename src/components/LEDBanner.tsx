"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

import { site } from "@/config/site";
import LEDTicker from "./LEDTicker";

/** Dot columns scrolled per second. Lower is slower — 26 was the old pace. */
const SPEED = 9;

/** Glyph height as a fraction of the band height, leaving a little breathing room. */
const GLYPH_RATIO = 0.76;

/**
 * Dot-matrix marquee band sitting directly under the hero.
 *
 * The canvas runs a requestAnimationFrame loop, so it's mounted only while it's
 * actually near the viewport — scrolling past it stops the loop entirely rather
 * than burning battery for something nobody can see.
 */
export function LEDBanner() {
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [textSize, setTextSize] = useState(0);

  // resolvedTheme is undefined on the server; wait a tick so the colors are right.
  useEffect(() => setMounted(true), []);

  /* Derive the glyph size from the band's real height, which is set purely by
     the CSS classes below. Measuring instead of guessing from window.innerWidth
     means the server and client always agree — no layout shift on hydration. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () =>
      setTextSize(Math.round(el.clientHeight * GLYPH_RATIO));

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Mount/unmount around the viewport to start and stop the rAF loop. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: "250px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dark = resolvedTheme === "dark";

  // Dots sit on a grid of textSize/7 px; 0.82 leaves a visible gap between them.
  const dotSize = Math.max(2, Math.round((textSize / 7) * 0.82));

  return (
    <section
      aria-label="What I do"
      className="no-print relative overflow-hidden border-y border-black/[0.07] bg-black/[0.015] dark:border-white/10 dark:bg-white/[0.02]"
    >
      {/* Height lives in CSS so the space is reserved before the canvas mounts. */}
      <div ref={ref} className="mask-fade-x h-14 sm:h-16 lg:h-20">
        {mounted && nearViewport && textSize > 0 && (
          <LEDTicker
            items={site.ticker}
            separator={site.tickerSeparator}
            speed={reduce ? 0 : SPEED}
            direction="left"
            textSize={textSize}
            dotSize={dotSize}
            dotQuantity={10}
            spread={1}
            dotShape="round"
            onColor={dark ? "#fafafa" : "#18181b"}
            offColor={dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.055)"}
            glow={dark}
            glowOptions={{ strength: 55, size: 8 }}
            flicker={!reduce}
            flickerOptions={{ strength: 16, speed: 32 }}
          />
        )}
      </div>

      {/* The canvas is pixels only — this is what crawlers and screen readers
          actually get. */}
      <p className="sr-only">{site.ticker.join(" · ")}</p>
    </section>
  );
}
