"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Three bars that converge and cross into an X.
 *
 * Controlled rather than self-toggling like the original: the header already
 * owns the drawer's open state, and two sources of truth would let the icon
 * drift out of sync with the drawer (closing via Escape or the backdrop).
 */
export function MenuIcon({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : undefined;

  return (
    <span
      className={cn(
        "relative grid size-4 items-center justify-center",
        className,
      )}
    >
      <motion.span
        animate={{ y: open ? 0 : "-5px", rotate: open ? 45 : 0 }}
        transition={transition}
        className="absolute h-0.5 w-full rounded-full bg-current"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.1 }}
        className="absolute h-0.5 w-full rounded-full bg-current"
      />
      <motion.span
        animate={{ y: open ? 0 : "5px", rotate: open ? -45 : 0 }}
        transition={transition}
        className="absolute h-0.5 w-full rounded-full bg-current"
      />
    </span>
  );
}
