"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

/** startViewTransition isn't in TypeScript's DOM lib yet. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

const SWEEP_MS = 650;
const ICON_EASE = { ease: "easeInOut" as const, duration: 0.35 };

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // resolvedTheme is undefined during SSR, so hold the icon back one tick to
  // keep server and client markup identical.
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  const toggle = async () => {
    const next = dark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Safari/Firefox don't have View Transitions yet — swap instantly there.
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    /* flushSync forces React to commit the theme class inside the callback.
       Without it the snapshot is taken before the DOM changes and nothing
       appears to animate. */
    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    try {
      await transition.ready;
    } catch {
      return; // Transition was skipped or interrupted; the theme still changed.
    }

    /* Anchor the circle on the button itself so the new theme appears to pour
       out of it. The radius has to reach the *furthest* viewport corner, not
       just the diagonal — the button is rarely centred, so picking the wrong
       corner would leave a wedge of the old theme behind. */
    const rect = buttonRef.current?.getBoundingClientRect();
    const w = window.innerWidth;
    const h = window.innerHeight;

    const x = rect ? rect.left + rect.width / 2 : w;
    const y = rect ? rect.top + rect.height / 2 : h;

    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(w - x, y),
      Math.hypot(x, h - y),
      Math.hypot(w - x, h - y),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: SWEEP_MS,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      // 44px hit area: the minimum comfortable touch target.
      className={`grid h-11 w-11 place-items-center rounded-full border border-black/10 text-black/70 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/10 ${className}`}
    >
      {/* Sun whose disc grows into a moon as a clip path slides across it.
          Kept on currentColor so it inherits the island's text colour rather
          than the original's hard black/white fills. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="size-[19px]"
      >
        <clipPath id="theme-toggle-clip">
          <motion.path
            animate={{ y: dark ? 10 : 0, x: dark ? -12 : 0 }}
            transition={ICON_EASE}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>

        <g clipPath="url(#theme-toggle-clip)">
          <motion.circle
            animate={{ r: dark ? 10 : 8 }}
            transition={ICON_EASE}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: dark ? -100 : 0,
              scale: dark ? 0.5 : 1,
              opacity: dark ? 0 : 1,
            }}
            transition={ICON_EASE}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
}
