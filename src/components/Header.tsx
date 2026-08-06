"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { useIntroReady } from "@/lib/intro";
import { ThemeToggle } from "./ThemeToggle";
import { SocialIcon } from "./SocialIcon";
import { MenuIcon } from "./ui/menu-icon";

/**
 * Two floating sections, spanning the full viewport width:
 *
 *   [ dp · name ]                              [ theme · connect · menu ]
 *
 * The menu button opens a full-height drawer down the right side, inset by the
 * same gap the header uses. The island deliberately sits *above* the drawer so
 * the close button and theme toggle stay reachable while it's open.
 */
export function Header() {
  const reduce = useReducedMotion();
  const introReady = useIntroReady();
  const play = introReady || !!reduce;
  const [scrolled, setScrolled] = useState(false);

  /* Off the home page (a project detail, say) the sections don't exist, so a
     bare "#about" resolves to nothing. Prefix with "/" there so the link
     navigates home and then jumps to the section. */
  const pathname = usePathname();
  const isHome = pathname === "/";
  const to = (hash: string) => (isHome ? hash : `/${hash}`);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  /* Condense once the user leaves the very top. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: highlight whichever section is currently in view. */
  useEffect(() => {
    const sections = site.nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Lock the page behind the drawer, and close on Escape. */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const surface = scrolled
    ? "glass border-black/[0.08] shadow-lg shadow-black/[0.04] dark:border-white/12"
    : "border-black/[0.06] bg-white/50 dark:border-white/10 dark:bg-white/[0.04] backdrop-blur-md";

  return (
    <>
      {/* Above the drawer, so the island stays usable while it's open. */}
      <header className="no-print fixed inset-x-0 top-0 z-[60]">
        {/* Arrives after the hero's name and photo have landed. */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.45, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex w-full items-start justify-between gap-3 px-3 py-3 sm:px-5 sm:py-4"
        >
          {/* ── 1. Avatar + name ────────────────────────────────────── */}
          <div
            className={`shrink-0 overflow-hidden rounded-3xl border transition-colors duration-300 ${surface}`}
          >
            {/* next/link, not <a>: off the home page these are real route
                changes, and a bare anchor full-loads the document — which
                remounts the app and replays the preloader. */}
            <Link
              href={isHome ? "#top" : "/"}
              aria-label={
                isHome ? `${site.name} — back to top` : `${site.name} — home`
              }
              /* Phone: avatar only, so the pill stays square. */
              className="group flex items-center gap-2.5 p-1.5 sm:pr-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.avatarUrl}
                  alt=""
                  width={44}
                  height={44}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="hidden text-sm font-semibold tracking-tight whitespace-nowrap sm:inline">
                {site.name}
              </span>
            </Link>
          </div>

          {/* ── 2. Island: theme · connect · menu ───────────────────── */}
          {/* `layout` so the island shrinks smoothly when its options collapse
              on open, leaving just the close button. */}
          <motion.div
            layout={!reduce}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className={`shrink-0 overflow-hidden rounded-3xl border transition-colors duration-300 ${surface}`}
          >
            <div className="flex items-center gap-1 p-1.5">
              <AnimatePresence initial={false}>
                {!open && (
                  <motion.div
                    key="island-options"
                    initial={reduce ? false : { opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, width: 0 }}
                    transition={{ duration: 0.24, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    <ThemeToggle className="border-transparent dark:border-transparent" />

                    <Link
                      href={to("#contact")}
                      /* Hidden on phones — the drawer already has Contact. */
                      className="group hidden h-11 items-center overflow-hidden rounded-full px-3 text-sm font-medium transition-colors hover:bg-black/5 sm:inline-flex sm:px-4 dark:hover:bg-white/10"
                    >
                      <span className="relative block h-5 overflow-hidden">
                        <span className="block leading-5 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                          Connect
                        </span>
                        <span className="absolute inset-x-0 top-0 block translate-y-full whitespace-nowrap leading-5 text-accent-600 transition-transform duration-300 ease-out group-hover:translate-y-0 dark:text-accent-400">
                          Let&apos;s talk
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="nav-drawer"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-black/70 transition-colors hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
              >
                <MenuIcon open={open} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ── Drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="no-print fixed inset-0 z-[54] bg-black/25 backdrop-blur-sm dark:bg-black/50"
            />

            <motion.aside
              id="nav-drawer"
              aria-label="Primary"
              initial={reduce ? { opacity: 0 } : { x: "110%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "110%" }}
              transition={
                reduce
                  ? { duration: 0.2 }
                  : { type: "spring", stiffness: 320, damping: 36 }
              }
              /* Same insets as the header, so it reads as part of the same
                 floating system rather than a panel glued to the edge. */
              className="no-print glass fixed top-3 right-3 bottom-3 z-[55] flex w-[min(86vw,23rem)] flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.08] shadow-2xl shadow-black/10 sm:top-4 sm:right-5 sm:bottom-4 dark:border-white/12 dark:shadow-black/40"
            >
              {/* Top padding clears the island floating above it. */}
              <nav className="flex-1 overflow-y-auto px-7 pt-24 pb-6">
                <ul className="space-y-1">
                  {site.nav.map((item, i) => {
                    const isActive = active === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={reduce ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.055, duration: 0.35 }}
                      >
                        <Link
                          href={to(item.href)}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "true" : undefined}
                          className={`group flex items-center justify-between gap-4 border-b border-black/[0.06] py-4 text-3xl font-semibold tracking-[-0.03em] transition-colors sm:text-4xl dark:border-white/[0.08] ${
                            isActive
                              ? "text-accent-600 dark:text-accent-400"
                              : "hover:text-accent-600 dark:hover:text-accent-400"
                          }`}
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="font-mono text-[11px] text-accent-500">
                              0{i + 1}
                            </span>
                            {item.label}
                          </span>

                          <ArrowUpRight
                            size={24}
                            aria-hidden
                            className="shrink-0 text-black/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-500 dark:text-white/25"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Socials, pinned to the bottom. */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + site.nav.length * 0.055, duration: 0.35 }}
                className="border-t border-black/[0.07] px-7 py-5 dark:border-white/10"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/35 dark:text-white/35">
                  Elsewhere
                </p>
                <ul className="flex flex-wrap items-center gap-2">
                  {site.socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target={social.url.startsWith("http") ? "_blank" : undefined}
                        rel={
                          social.url.startsWith("http")
                            ? "noreferrer noopener"
                            : undefined
                        }
                        aria-label={social.name}
                        title={social.name}
                        className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-black/55 transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:text-accent-600 dark:border-white/12 dark:text-white/55 dark:hover:text-accent-400"
                      >
                        <SocialIcon name={social.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
