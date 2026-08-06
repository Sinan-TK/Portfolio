"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

// react-bits component (JSX, no "use client" of its own — it only ever gets
// imported from here, which is a client component, so that's fine).
import Ferrofluid from "./Ferrofluid";

/* The component defaults to pure white, which is invisible on the light
   theme, so each theme gets its own ramp. */
const PALETTE = {
  dark: ["#f4f4f5", "#a1a1aa", "#ffffff"],
  light: ["#52525b", "#18181b", "#a1a1aa"],
};

/**
 * Ferrofluid as the hero backdrop.
 *
 * A full-screen fragment shader isn't cheap, so it's paused whenever the hero
 * scrolls out of view — `paused` stops the render loop while keeping the WebGL
 * context alive, so coming back doesn't cost a full re-init.
 */
export function FerrofluidBackground() {
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dark = resolvedTheme === "dark";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {mounted && (
        <Ferrofluid
          colors={dark ? PALETTE.dark : PALETTE.light}
          paused={!inView || !!reduce}
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          // Slightly stronger now that it sits on a plain background rather
          // than over an image + scrim.
          opacity={dark ? 0.8 : 0.55}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
          mouseDampening={0.15}
          // Cap DPR: the shader is per-pixel, so retina doubles the cost.
          dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1}
        />
      )}
    </div>
  );
}
