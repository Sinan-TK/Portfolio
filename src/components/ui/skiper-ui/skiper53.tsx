"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// The upstream file imported "swiper/css" (and effect-creative / pagination /
// autoplay). Nothing here uses Swiper — they're leftovers from another demo —
// and the package isn't installed, so the imports are removed.

import { cn } from "@/lib/utils";

export type HoverExpandItem = {
  src: string;
  alt: string;
  code: string;
  /** Added: caption shown over the expanded row. */
  title?: string;
  description?: string;
  tags?: string[];
  /** Added: makes the whole row a link. */
  href?: string;
};

const HoverExpand_002 = ({
  images,
  className,
  onActiveChange,
}: {
  images: HoverExpandItem[];
  className?: string;
  /** Added: lets a parent mirror the open row. */
  onActiveChange?: (index: number) => void;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  /* Touch devices have no hover, so a tap would open *and* follow the link in
     one go. There, the first tap opens the row and only a second one navigates.
     Hover-to-open is also disabled on coarse pointers, otherwise a synthetic
     hover on tap would mark the row active before the click is handled — and
     the very first tap would navigate after all. */
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const select = (index: number) => {
    setActiveImage(index);
    onActiveChange?.(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn("relative mx-auto w-full max-w-6xl", className)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {images.map((image, index) => {
          const isActive = activeImage === index;

          return (
            <motion.div
              key={index}
              className="group relative w-full cursor-pointer overflow-hidden rounded-3xl"
              /* Width is 100% rather than the upstream fixed 24rem, which
                 overflowed on phones. Only the height animates. */
              initial={{ height: "3.25rem" }}
              animate={{ height: isActive ? "24rem" : "3.25rem" }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              onClick={() => select(index)}
              onHoverStart={() => {
                if (!coarse) select(index);
              }}
            >
              <img
                src={image.src}
                className="absolute inset-0 size-full object-cover"
                alt={image.alt}
                draggable={false}
              />

              {/* Collapsed rows are a 3.25rem sliver of artwork — without a
                  label they're indistinguishable from each other. */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-between gap-4 bg-black/45 px-5"
                  >
                    <span className="truncate text-sm font-medium text-white">
                      {image.title}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-white/55">
                      {image.code}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrim + caption for the open row. */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.28, delay: 0.06 }}
                    className="absolute inset-x-0 bottom-0 flex flex-col items-start px-6 pb-6 sm:px-8 sm:pb-7"
                  >
                    <p className="font-mono text-[11px] tracking-[0.16em] text-white/55 uppercase">
                      {image.code}
                    </p>

                    {image.title && (
                      <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {image.title}
                      </h3>
                    )}

                    {image.description && (
                      <p className="mt-2 line-clamp-2 max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-sm">
                        {image.description}
                      </p>
                    )}

                    {image.tags?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {image.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-white/20 px-2 py-0.5 font-mono text-[10px] text-white/70"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real link over the row: keyboard reachable and crawlable.
                  next/link rather than a bare <a>, which would full-load the
                  document and replay the preloader. */}
              {image.href && (
                <Link
                  href={image.href}
                  aria-label={image.title ?? image.alt}
                  className="absolute inset-0 z-10 rounded-3xl"
                  onFocus={() => select(index)}
                  onClick={(e) => {
                    // First tap on a closed row: open it instead of following.
                    if (coarse && !isActive) {
                      e.preventDefault();
                      select(index);
                    }
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export { HoverExpand_002 };

/**
 * Skiper 53 HoverExpand_002 — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * Author: @gurvinder-singh02 — https://gxuri.me
 */
