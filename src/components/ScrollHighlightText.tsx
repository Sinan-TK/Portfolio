"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

import ScrollHighlight from "./ScrollHighlight";

const DIM = { light: "rgba(10, 10, 11, 0.18)", dark: "rgba(250, 250, 250, 0.16)" };
const LIT = { light: "#0a0a0b", dark: "#fafafa" };

/**
 * Theme-aware wrapper around the GSAP scroll-highlight.
 *
 * The underlying component takes plain color strings because GSAP tweens the
 * computed value — CSS custom properties don't interpolate reliably — so the
 * light/dark pair is resolved here in JS and re-applied when the theme changes.
 */
export function ScrollHighlightText({ text }: { text: string }) {
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const type =
    "text-pretty text-2xl leading-snug sm:text-3xl lg:text-[2.6rem] lg:leading-[1.22]";

  /* Before hydration and under reduced motion, render the finished state:
     fully legible text, no scrubbing. */
  if (!mounted || reduce) {
    return (
      <p className={`${type} font-semibold tracking-[-0.025em]`}>{text}</p>
    );
  }

  const mode = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ScrollHighlight
      text={text}
      className={type}
      dimColor={DIM[mode]}
      highlightColor={LIT[mode]}
      splitBy="words"
      scrollStart="top bottom"
      scrollEnd="bottom center"
      scrub
      font={{
        fontWeight: 600,
        letterSpacing: "-0.025em",
        textAlign: "left",
      }}
    />
  );
}
