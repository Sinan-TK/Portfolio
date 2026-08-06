/**
 * An infinitely scrolling row.
 *
 * The list is rendered twice and translated by exactly -50%, which makes the
 * loop seamless. CSS-only, so it costs no JavaScript and pauses automatically
 * under `prefers-reduced-motion` (see globals.css).
 */
export function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div className="mask-fade-x group relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-3 pr-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-black/[0.07] bg-white/50 px-5 py-2.5 text-sm font-medium text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
