import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[75svh] items-center py-24">
      <div className="container-page text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
          404
        </p>
        <h1 className="mt-5 text-[clamp(2rem,7vw,4rem)] font-semibold leading-tight tracking-[-0.03em]">
          This page went <span className="text-gradient">missing</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-black/60 sm:text-lg dark:text-white/60">
          The link may be broken, or the page may have been moved.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex h-14 items-center justify-center rounded-full bg-fg text-white shadow-xl shadow-black/15 dark:bg-white dark:text-black dark:shadow-white/10 px-8 text-[15px] font-medium"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
