"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ScrollTrigger measures start/end once, at creation. Re-measure whenever the
   page height changes (fonts, preloader, hero resize, breakpoint flips) so the
   positions never go stale. Installed once. */
let watching = false;
function watchLayout() {
    if (watching || typeof window === "undefined") return;
    watching = true;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
        clearTimeout(timer);
        timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    new ResizeObserver(refresh).observe(document.body);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
}

const WORD_STAGGER = 0.1;

/**
 * Several paragraphs filled by ONE scroll trigger, so they light up strictly
 * in order: the second paragraph can't start until the first has finished.
 * (Separate triggers per paragraph each begin as their own top enters the
 * viewport, so neighbours inevitably fill at the same time.)
 *
 * Words are tweened in document order with a stagger, which spreads the whole
 * set evenly across the scroll range.
 */
export default function ScrollHighlightGroup({
    texts,
    className,
    paragraphClassName,
    dimColor,
    highlightColor,
    font,
    scrollStart = "top 75%",
    scrollEnd = "bottom 45%",
}: {
    texts: string[];
    className?: string;
    paragraphClassName?: string;
    dimColor: string;
    highlightColor: string;
    font?: React.CSSProperties;
    scrollStart?: string;
    scrollEnd?: string;
}) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        watchLayout();

        const ctx = gsap.context(() => {
            const words = root.querySelectorAll(".word");
            gsap.set(words, { color: dimColor });
            gsap.to(words, {
                color: highlightColor,
                stagger: WORD_STAGGER,
                ease: "none",
                scrollTrigger: {
                    trigger: root,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        }, root);

        return () => ctx.revert();
    }, [texts, dimColor, highlightColor, scrollStart, scrollEnd]);

    return (
        <div ref={rootRef} className={className}>
            {texts.map((text, i) => {
                const words = text.trim().split(/\s+/).filter(Boolean);
                return (
                    <p
                        key={i}
                        className={paragraphClassName}
                        style={{ margin: 0, color: dimColor, ...font }}
                    >
                        {words.map((word, wi) => (
                            <React.Fragment key={`${word}-${wi}`}>
                                <span
                                    className="word"
                                    style={{ display: "inline-block", color: dimColor }}
                                >
                                    {word}
                                </span>
                                {wi < words.length - 1 ? " " : null}
                            </React.Fragment>
                        ))}
                    </p>
                );
            })}
        </div>
    );
}
