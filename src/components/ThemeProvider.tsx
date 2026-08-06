"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * next-themes handles the no-flash script, system-preference syncing and
 * localStorage persistence. The canvas- and GSAP-driven pieces (ferrofluid,
 * LED ticker, scroll highlight, click effects) read `resolvedTheme` from here
 * to pick their colors, since none of them can use CSS variables.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
