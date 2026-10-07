"use client";

import { useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Check, Copy, ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { Magnetic } from "./Magnetic";
import { SocialIcon } from "./SocialIcon";
import ProfileCard from "./ProfileCard";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard denied — the mailto link next to this still works. */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black/12 px-6 text-[15px] font-medium transition-colors hover:bg-black/[0.04] dark:border-white/18 dark:hover:bg-white/[0.06]"
    >
      {copied ? (
        <>
          <Check size={16} aria-hidden className="text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} aria-hidden />
          Copy email
        </>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

/** One reveal window per element, so they arrive in sequence with the scroll. */
const WINDOWS = {
  card: [0.34, 0.6],
  eyebrow: [0.38, 0.56],
  heading: [0.44, 0.64],
  lede: [0.52, 0.72],
  actions: [0.6, 0.8],
  socials: [0.68, 0.88],
} as const;

/**
 * Contact content, revealed piece by piece as the section indicator's card
 * expands into it. `progress` runs 0 → 1 across the merge.
 */
export function ContactPanel({ progress }: { progress: MotionValue<number> }) {
  // Fixed set of windows, so the hook order never changes between renders.
  const cardY = useTransform(progress, [...WINDOWS.card], [26, 0]);
  const cardO = useTransform(progress, [...WINDOWS.card], [0, 1]);
  const eyebrowY = useTransform(progress, [...WINDOWS.eyebrow], [26, 0]);
  const eyebrowO = useTransform(progress, [...WINDOWS.eyebrow], [0, 1]);
  const headingY = useTransform(progress, [...WINDOWS.heading], [26, 0]);
  const headingO = useTransform(progress, [...WINDOWS.heading], [0, 1]);
  const ledeY = useTransform(progress, [...WINDOWS.lede], [26, 0]);
  const ledeO = useTransform(progress, [...WINDOWS.lede], [0, 1]);
  const actionsY = useTransform(progress, [...WINDOWS.actions], [26, 0]);
  const actionsO = useTransform(progress, [...WINDOWS.actions], [0, 1]);
  const socialsY = useTransform(progress, [...WINDOWS.socials], [26, 0]);
  const socialsO = useTransform(progress, [...WINDOWS.socials], [0, 1]);

  return (
    <div className="grid items-center gap-12 px-6 pt-8 pb-14 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-14 lg:text-left">
      {/* min-w-0 on both columns: a grid item defaults to `min-width: auto`,
          so anything with a wide min-content — the email pill below — would
          otherwise set a floor on the column and push it past the card. */}
      <motion.div
        style={{ opacity: cardO, y: cardY }}
        className="flex min-w-0 justify-center lg:justify-start"
      >
        <ProfileCard
          avatarUrl={site.heroPhoto}
          miniAvatarUrl={site.avatarUrl}
          name={site.name}
          title={site.role}
          handle={site.handle}
          status={site.available ? "Available" : "Busy"}
          contactText="Get in touch"
          showUserInfo
          enableTilt
          enableMobileTilt
          behindGlowEnabled={false}
          innerGradient="linear-gradient(145deg,#3f3f4699 0%,#a1a1aa33 100%)"
          onContactClick={() => {
            window.location.href = `mailto:${site.email}`;
          }}
        />
      </motion.div>

      <div className="min-w-0 text-center lg:text-left">
        <motion.p
          style={{ opacity: eyebrowO, y: eyebrowY }}
          className="flex items-center justify-center gap-3.5 font-mono text-sm font-medium tracking-[0.16em] text-accent-600 uppercase sm:text-base lg:justify-start dark:text-accent-400"
        >
          <span aria-hidden className="h-px w-8 bg-accent-500/60" />
          Contact
        </motion.p>

        <motion.h2
          style={{ opacity: headingO, y: headingY }}
          className="mx-auto mt-5 max-w-3xl text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] lg:mx-0"
        >
          Let&apos;s build something{" "}
          <span className="text-gradient">worth shipping</span>
        </motion.h2>

        <motion.p
          style={{ opacity: ledeO, y: ledeY }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg lg:mx-0 dark:text-white/60"
        >
          {site.available
            ? "I'm currently open to new roles and select freelance work. Tell me what you're working on — I read every message."
            : "My calendar is full right now, but I'm always happy to talk about interesting problems."}
        </motion.p>

        <motion.div
          style={{ opacity: actionsO, y: actionsY }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
        >
          <Magnetic className="w-full min-w-0 max-sm:[container-type:inline-size] sm:w-auto">
            {/* The address must stay on one line. Below sm the wrapper is a size
                container and the text is sized from ITS width (cqw), minus the
                pill's padding, arrow and gap — so it fits however much room the
                card and page gutters leave, instead of guessing from the
                viewport. */}
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 max-sm:text-[clamp(9px,calc((100cqw-4.5rem)/17.5),15px)] sm:text-[15px] font-medium text-white shadow-xl shadow-black/15 transition-shadow hover:shadow-2xl sm:w-auto sm:px-8 dark:bg-white dark:text-black dark:shadow-white/10"
            >
              <span className="min-w-0 whitespace-nowrap">{site.email}</span>
              <ArrowUpRight
                size={17}
                aria-hidden
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>

          <CopyEmail />
        </motion.div>

        <motion.ul
          style={{ opacity: socialsO, y: socialsY }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
        >
          {site.socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noreferrer noopener" : undefined}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 px-4 text-sm text-black/60 transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:text-accent-600 dark:border-white/12 dark:text-white/60 dark:hover:text-accent-400"
              >
                <SocialIcon name={social.icon} size={15} />
                {social.name}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
