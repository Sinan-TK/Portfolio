"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { site } from "@/config/site";
import { markIntroReady } from "@/lib/intro";

/** How long the first greeting holds — long enough to actually read it. */
const FIRST_MS = 420;

/** Each subsequent greeting. */
const STEP_MS = 155;

/** Beat between the last greeting and the curtain lifting. */
const HOLD_MS = 280;

/** If `load` never fires (stalled image, dead third party), leave anyway. */
const FAILSAFE = 6000;

const EASE = [0.76, 0, 0.24, 1] as const;

/* Latin webfont first, then broad OS fallbacks so Cyrillic, CJK, Devanagari
   and Arabic all render. Browsers pick a fallback per glyph, so a missing
   family here is harmless. */
const FONT_STACK = [
  "var(--font-display)",
  "'Segoe UI'",
  "'Noto Sans'",
  "'Noto Sans JP'",
  "'Noto Sans KR'",
  "'Noto Sans SC'",
  "'Noto Sans Devanagari'",
  "'Noto Sans Arabic'",
  "system-ui",
  "sans-serif",
].join(", ");

export function Preloader() {
  /* Home page only. Landing on (or refreshing) a project page shouldn't be
     gated behind a greeting sequence. Client-side navigation keeps this
     component mounted, so moving between pages never replays it either. */
  const pathname = usePathname();
  const isHome = pathname === "/";

  /* Seeded from `isHome` on the server as well, so the overlay is in the first
     paint on the home page and never flashes anywhere else. */
  const [active, setActive] = useState(isHome);
  const [index, setIndex] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    // Effects run twice in StrictMode; only arm the sequence once.
    if (startedRef.current) return;
    startedRef.current = true;

    if (!isHome) {
      // Nothing to wait for — release the header/hero entrance immediately.
      markIntroReady();
      return;
    }

    // Read the query directly — framer's useReducedMotion returns null first,
    // then updates, which would re-run this effect.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
      markIntroReady();
      return;
    }

    const greetings = site.greetings;
    if (!greetings.length) {
      setActive(false);
      markIntroReady();
      return;
    }

    document.body.style.overflow = "hidden";

    let loaded = document.readyState === "complete";
    let cycleDone = false;
    let dismissing = false;

    let stepTimer = 0;
    let liftTimer = 0;

    /* Leave only when the greetings have all shown *and* the page is ready —
       whichever finishes last. */
    const maybeDismiss = () => {
      if (dismissing || !loaded || !cycleDone) return;
      dismissing = true;

      liftTimer = window.setTimeout(() => {
        setActive(false);
        document.body.style.overflow = "";
        // Curtain is lifting — release the hero's entrance sequence.
        markIntroReady();
      }, HOLD_MS);
    };

    const advance = (i: number) => {
      if (i >= greetings.length) {
        cycleDone = true;
        maybeDismiss();
        return;
      }

      setIndex(i);
      stepTimer = window.setTimeout(
        () => advance(i + 1),
        i === 0 ? FIRST_MS : STEP_MS,
      );
    };

    advance(0);

    const onLoad = () => {
      loaded = true;
      maybeDismiss();
    };

    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const failsafe = window.setTimeout(() => {
      loaded = true;
      cycleDone = true;
      maybeDismiss();
    }, FAILSAFE);

    return () => {
      window.clearTimeout(stepTimer);
      window.clearTimeout(liftTimer);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
    // `startedRef` guards against re-running; isHome is read on first mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  const greeting = site.greetings[index] ?? site.greetings[0] ?? "Hello";

  return (
    <>
      {/* With JS off nothing dismisses the overlay, so the page would stay
          permanently covered. */}
      <noscript>
        <style>{`#preloader{display:none!important}`}</style>
      </noscript>

      <AnimatePresence>
        {active && (
          <motion.div
            id="preloader"
            aria-hidden
            /* Inverted against the site theme on purpose: ink on the light
               theme, paper on the dark one. The curtain lifting then reveals
               the page as a contrast flip rather than a same-colour fade. */
            className="no-print fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.85, ease: EASE },
            }}
          >
            {/* dir="auto" so Arabic renders right-to-left. */}
            <span
              dir="auto"
              style={{ fontFamily: FONT_STACK }}
              className="px-6 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl"
            >
              {greeting}
            </span>

            {/* Thin progress of the greeting cycle itself. */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-white/15 dark:bg-black/10">
              <motion.div
                className="h-full origin-left bg-white dark:bg-zinc-950"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (index + 1) / site.greetings.length }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
