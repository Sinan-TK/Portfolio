"use client";

import { useEffect, useState } from "react";

/**
 * Gate for the page-load sequence.
 *
 * The hero's entrance runs on mount, which would otherwise play out *behind*
 * the preloader and be finished before the curtain lifts. The preloader calls
 * `markIntroReady()` when it leaves (or immediately, if it never shows), and
 * everything sequenced off `useIntroReady()` starts from there.
 */

export const INTRO_EVENT = "portfolio:intro-ready";

// Module-level, so components mounting after the signal still see it.
let ready = false;

export function markIntroReady() {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function useIntroReady() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (ready) {
      setValue(true);
      return;
    }

    const onReady = () => setValue(true);
    window.addEventListener(INTRO_EVENT, onReady);

    /* Failsafe: if the preloader is ever removed from the tree, nothing would
       fire the signal and the hero would stay invisible. */
    const timer = window.setTimeout(() => setValue(true), 4000);

    return () => {
      window.removeEventListener(INTRO_EVENT, onReady);
      window.clearTimeout(timer);
    };
  }, []);

  return value;
}
