"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

// The upstream file imported "swiper/css" (and effect-creative / pagination /
// autoplay). Nothing here uses Swiper — they're leftovers from another demo —
// and the package isn't installed, so the imports are removed.

import { cn } from "@/lib/utils";

const Skiper52 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <HoverExpand_001 className="" images={images} />{" "}
    </div>
  );
};

export { Skiper52 };

const HoverExpand_001 = ({
  images,
  className,
  onActiveChange,
}: {
  images: {
    src: string;
    alt: string;
    code: string;
    /** Added: caption shown over the bottom of the expanded panel. */
    title?: string;
    description?: string;
    /** Added: makes the whole panel a link. */
    href?: string;
  }[];
  className?: string;
  /** Added: lets a parent mirror the highlighted item (project details, etc). */
  onActiveChange?: (index: number) => void;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  const select = (index: number) => {
    setActiveImage(index);
    onActiveChange?.(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {/* Scrolls horizontally below md — the expanded item plus the collapsed
            strip is far wider than a phone. */}
        <div className="flex w-full items-center justify-start gap-1 overflow-x-auto pb-2 md:justify-center md:overflow-x-visible md:pb-0">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "24rem" : "5rem",
                height: activeImage === index ? "24rem" : "24rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => select(index)}
              onHoverStart={() => select(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                  />
                )}
              </AnimatePresence>

              {/* Caption across the bottom of the expanded panel. */}
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, delay: 0.08 }}
                    className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end p-6"
                  >
                    <p className="font-mono text-[11px] tracking-[0.16em] text-white/55 uppercase">
                      {image.code}
                    </p>
                    {image.title && (
                      <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="mt-1.5 line-clamp-3 max-w-[20rem] text-[13px] leading-relaxed text-white/70">
                        {image.description}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />

              {/* Real link over the panel: keyboard reachable and crawlable,
                  rather than a click handler on a div. `next/link` rather than
                  a plain <a> — a bare anchor does a full document load, which
                  remounts the app and replays the preloader. */}
              {image.href && (
                <Link
                  href={image.href}
                  aria-label={image.title ?? image.alt}
                  className="absolute inset-0 z-10 rounded-3xl"
                  onFocus={() => select(index)}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };

/**
 * Skiper 52 HoverExpand_001 — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
