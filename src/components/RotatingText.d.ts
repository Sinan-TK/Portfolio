import type { ReactElement, Ref } from "react";

/** Types for the react-bits RotatingText (`RotatingText.jsx`). */
export interface RotatingTextProps {
  texts: string[];
  transition?: Record<string, unknown>;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  animatePresenceMode?: "wait" | "sync" | "popLayout";
  animatePresenceInitial?: boolean;
  /** ms between rotations. */
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  ref?: Ref<{ next: () => void; previous: () => void; jumpTo: (i: number) => void; reset: () => void }>;
  [key: string]: unknown;
}

declare function RotatingText(props: RotatingTextProps): ReactElement;

export default RotatingText;
