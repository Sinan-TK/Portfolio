"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

import ClickEffects from "./ClickEffects";

/**
 * Full-viewport overlay that draws a flourish wherever you click.
 *
 * ClickEffects listens on `document` and positions each effect relative to its
 * own container, so that container has to be a fixed, inset-0 layer — then the
 * click's viewport coordinates line up exactly, at any scroll position.
 *
 * `pointer-events: none` is essential: the layer sits above the whole page, so
 * without it nothing underneath would be clickable.
 */
export function ClickEffectsOverlay() {
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Nothing to draw before hydration, and nothing at all if motion is reduced.
  if (!mounted || reduce) return null;

  const dark = resolvedTheme === "dark";

  return (
    <div
      aria-hidden
      className="no-print pointer-events-none fixed inset-0 z-[90]"
    >
      <ClickEffects
        interactionMode="sniper"
        color={dark ? "#ffffff" : "#18181b"}
        duration={0.45}
        strokeWidth={2}
        effectSize={90}
        showLabel={false}
      />
    </div>
  );
}
