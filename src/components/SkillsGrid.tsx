"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { site } from "@/config/site";
import { toolLogo } from "@/lib/tool-logos";
import InteractiveGrid from "./InteractiveGrid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

/** Grid shape per breakpoint — cols × rows must cover the tool count. */
function layoutFor(width: number, count: number) {
  const columns = width < 480 ? 3 : width < 768 ? 4 : 5;
  return { columns, rows: Math.ceil(count / columns) };
}

export function SkillsGrid() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    setMounted(true);

    const sync = () => setWidth(window.innerWidth);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* Craft items ("Web Performance", "System Design", …) aren't tools and have
     no logo, so the grid is built from the tooling groups only. */
  const tools = site.skills
    .filter((group) => group.group.toLowerCase() !== "craft")
    .flatMap((group) => group.items);

  const dark = resolvedTheme === "dark";
  const { columns, rows } = layoutFor(width, tools.length);

  const images = tools.map((name) => ({
    src: toolLogo(name, dark ? "fafafa" : "18181b"),
    label: name,
  }));

  return (
    <TooltipProvider delayDuration={120} skipDelayDuration={300}>
    <div
      /* The grid sizes to its container, so the height has to be explicit. */
      className="h-[26rem] w-full sm:h-[30rem] lg:h-[34rem]"
      // Held back until mounted so the logo colour matches the resolved theme
      // rather than flashing the wrong one.
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 300ms" }}
    >
      <InteractiveGrid
        images={images}
        /* asChild so the trigger *is* the card — wrapping it in another
           element would break the grid placement and the hover handlers. */
        wrapTile={(card, item, i) => (
          <Tooltip>
            <TooltipTrigger asChild>{card}</TooltipTrigger>
            <TooltipContent side="top" sideOffset={6}>
              {tools[i] ?? (typeof item === "string" ? "" : item.label)}
            </TooltipContent>
          </Tooltip>
        )}
        columns={columns}
        rows={rows}
        gap={10}
        rounded={16}
        padding="0px"
        logoScale={2}
        cardFill={dark ? "#0c0c0e" : "#ffffff"}
        cardBorder={dark ? "#232326" : "#e6e6e9"}
        shadow
        cardShadow={dark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.07)"}
        glow
        glowStart={dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)"}
        glowEnd={dark ? "#ffffff" : "#18181b"}
        glowIntensity={45}
        perspective={1600}
      />
    </div>
    </TooltipProvider>
  );
}
