import { ArrowUpRight } from "lucide-react";

import { site } from "@/config/site";
import { RevealGroup, RevealItem } from "./Reveal";

/**
 * Editorial index of the roles you take on.
 *
 * Each row fills from the bottom on hover and the type inverts against it —
 * a monochrome effect that needs no colour to read as a state change, which
 * suits the black-and-white palette better than a tinted highlight would.
 */
export function Positions() {
  return (
    <RevealGroup as="ul" className="w-full" stagger={0.07}>
      {site.positions.map((position, i) => (
        <RevealItem
          key={position.title}
          as="li"
          className="group relative isolate overflow-hidden border-t border-black/[0.09] last:border-b dark:border-white/12"
        >
          {/* Fill layer. Scales from the bottom edge so the row "loads" upward
              rather than fading. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100 dark:bg-white"
          />

          <div className="flex items-center gap-5 px-1 py-6 transition-colors duration-500 group-hover:text-white sm:gap-8 sm:px-4 sm:py-7 dark:group-hover:text-black">
            <span className="font-mono text-[11px] tabular-nums text-accent-500 transition-colors duration-500 group-hover:text-white/60 dark:group-hover:text-black/60">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="text-xl font-semibold tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1.5 sm:text-3xl lg:text-[2.25rem]">
              {position.title}
            </h3>

            <span className="ml-auto hidden max-w-[18rem] text-right text-sm text-black/45 transition-colors duration-500 group-hover:text-white/70 md:block dark:text-white/45 dark:group-hover:text-black/60">
              {position.focus}
            </span>

            <ArrowUpRight
              size={22}
              aria-hidden
              className="shrink-0 text-black/20 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white dark:text-white/20 dark:group-hover:text-black"
            />
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
