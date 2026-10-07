"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { tileFor } from "@/lib/project-art";
import { useIntroReady } from "@/lib/intro";
import { LEDBanner } from "./LEDBanner";
import { SocialIcon } from "./SocialIcon";
import Stack from "./Stack";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* Load sequence, in seconds: name letters, then the photo, then everything
   else. All measured from when the preloader lets go. */
const NAME_DELAY = 0.1;
const LETTER_STAGGER = 0.042;
const PHOTO_DELAY = 0.95;
const REST_DELAY = 1.45;

/**
 * Reveals text one letter at a time, each rising from just below.
 *
 * Split by word first so lines still wrap normally, and the gradient stays
 * continuous because `background-clip: text` on the parent clips across all
 * descendant glyphs.
 */
function LetterReveal({
  text,
  play,
  delay = 0,
  className,
}: {
  text: string;
  play: boolean;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let letter = 0;

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => {
            const index = letter++;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: "0.4em", opacity: 0 }}
                animate={play ? { y: 0, opacity: 1 } : undefined}
                transition={{
                  delay: delay + index * LETTER_STAGGER,
                  duration: 0.55,
                  ease: EASE,
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  /* Held until the preloader lifts, so the sequence is actually seen.
     Under reduced motion everything appears at once. */
  const introReady = useIntroReady();
  const play = introReady || !!reduce;

  /* Memoised: Stack resets its internal order whenever the `cards` array
     identity changes, so a fresh array each render would loop forever. */
  const projectCards = useMemo(
    () =>
      site.projects.map((project) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={project.title}
          src={tileFor(project)}
          alt={project.title}
          className="card-image"
          draggable={false}
        />
      )),
    [],
  );

  /* The stack is draggable, so a pointer-up only counts as a click when the
     pointer barely moved — otherwise flicking a card away would navigate. */
  const pressRef = useRef<{ x: number; y: number } | null>(null);

  const handleStackDown = (e: React.PointerEvent) => {
    pressRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleStackUp = (e: React.PointerEvent) => {
    const start = pressRef.current;
    pressRef.current = null;
    if (!start) return;

    const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y);
    if (moved > 8) return;

    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white py-28 dark:bg-zinc-950"
    >

      {/* Tech ticker, centred in the hero and layered behind the photo and
          name (they sit in the transformed container below, which paints
          after this). Purely decorative here, so it ignores the pointer. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
        <LEDBanner />
      </div>

      {/* translate rather than margin: the section centres its content, so a
          transform shifts the block down without the centring cancelling it. */}
      <div /* --photo is the portrait's width: capped by the viewport width, an absolute
          maximum, and the viewport *height* (less the section padding and the
          translate below), so on short screens the photo can't push everything
          else off the fold. The name scales from it too. */
      className="container-page pointer-events-none relative flex translate-y-6 flex-col items-center text-center [--photo:min(95vw,47rem,max(14rem,calc(100svh_-_16rem)))] sm:translate-y-10">
        {/* Photo, in normal flow, so it sets the height of this block. The name
            below is positioned against the block's bottom edge, so it stays on
            the lower part of the portrait whatever the screen size. */}
        {site.heroPhoto && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={play ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ delay: PHOTO_DELAY, duration: 1, ease: EASE }}
            className="pointer-events-none relative w-[var(--photo)] select-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.heroPhoto} alt="" className="w-full grayscale" />
          </motion.div>
        )}

        {/* Name, pinned to the bottom of the photo. z-10 keeps it above the
            portrait. */}
        <h1
          className={`z-10 text-[max(1.25rem,calc(var(--photo)*0.093))] font-semibold leading-[1.02] tracking-[-0.04em] ${
            site.heroPhoto
              ? "absolute inset-x-0 bottom-[-2%] flex justify-center"
              : "relative"
          }`}
        >
          {/* Solid fill, not `text-gradient`: that clips a background to the
              text, and every letter here carries its own transform from the
              reveal. A transformed child can't inherit the clipped background,
              so the letters render transparent with nothing behind them. */}
          {/* Same surface as the header pills, so the name stays legible over
              the photo. */}
          <span className="inline-block whitespace-nowrap rounded-3xl border border-black/[0.06] bg-white/50 px-[max(1rem,calc(var(--photo)*0.055))] py-[max(0.5rem,calc(var(--photo)*0.016))] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
            <LetterReveal
              text={site.name}
              play={play}
              delay={NAME_DELAY}
              className="text-fg dark:text-white"
            />
          </span>
        </h1>

      </div>

      {/* Socials, bottom-right. */}
      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: REST_DELAY + 0.12, duration: 0.7, ease: EASE }}
        className="absolute right-6 bottom-8 z-10 flex items-center gap-2 sm:right-8 sm:bottom-10 lg:flex-col xl:right-12"
      >
        {site.socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.url}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel={social.url.startsWith("http") ? "noreferrer noopener" : undefined}
              aria-label={social.name}
              title={social.name}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/40 text-black/55 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:text-accent-600 dark:border-white/12 dark:bg-white/[0.06] dark:text-white/55 dark:hover:text-accent-400"
            >
              <SocialIcon name={social.icon} />
            </a>
          </li>
        ))}
      </motion.ul>

      {/* Project stack, bottom-left. Hidden below lg, where it would collide
          with the centred column. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: REST_DELAY + 0.24, duration: 0.7, ease: EASE }}
        className="absolute bottom-10 left-8 z-10 hidden lg:block xl:left-12"
      >
        <div className="group relative w-[135px]">
          {/* Stack.css sizes itself to 100%, so the box has to be explicit.
              `randomRotation` is deliberately off: it calls Math.random()
              during render, so server and client pick different angles and
              React reports a hydration mismatch.
              `sendToBackOnClick` is off too — a click navigates now, and
              autoplay plus dragging still cycle the cards. */}
          <div
            role="presentation"
            onPointerDown={handleStackDown}
            onPointerUp={handleStackUp}
            className="h-[170px] w-[135px] cursor-pointer"
          >
            <Stack
              cards={projectCards}
              autoplay={!reduce}
              autoplayDelay={2800}
              pauseOnHover
              sensitivity={140}
              animationConfig={{ stiffness: 240, damping: 22 }}
            />
          </div>

          {/* Label sits over the stack. Also the keyboard-reachable link —
              the div above is pointer-only. */}
          <a
            href="#projects"
            className="glass absolute -bottom-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap shadow-lg shadow-black/10 transition-colors hover:text-accent-600 dark:border-white/15 dark:hover:text-accent-400"
          >
            Projects
            <ArrowUpRight
              size={13}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
