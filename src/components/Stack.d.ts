import type { ReactElement, ReactNode } from "react";

/** Types for the react-bits Stack (`Stack.jsx`). */
export interface StackProps {
  randomRotation?: boolean;
  /** Drag distance (px) needed to send the top card to the back. */
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  /** ms between automatic advances. */
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

declare function Stack(props: StackProps): ReactElement;

export default Stack;
