"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before animating in. */
  delay?: number;
  direction?: Direction;
  className?: string;
  /** Replay the animation each time it scrolls into view. */
  repeat?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * Scroll-triggered entrance animation.
 * Collapses to a plain fade-free render when the user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  repeat = false,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const { x, y } = OFFSET[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x, y, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px 0px -80px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wrap a list to cascade its children in. Each child must be a `<RevealItem>`
 * (or any motion element using the `hidden`/`visible` variant names).
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
