import type { CSSProperties, ReactElement } from "react";

/**
 * Types for the react-bits Ferrofluid (`Ferrofluid.jsx`).
 *
 * Without this, TypeScript infers the prop shape from the JS destructuring and
 * treats `className` / `mixBlendMode` as required, since they have no default.
 * Everything here is optional, matching the component's real behavior.
 */
export interface FerrofluidProps {
  className?: string;
  /** Device pixel ratio. Defaults to the window's; lower is cheaper. */
  dpr?: number;
  /** Stops the render loop without tearing down the WebGL context. */
  paused?: boolean;
  /** Up to 8 hex colors. */
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: "up" | "down" | "left" | "right";
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  mixBlendMode?: CSSProperties["mixBlendMode"];
}

declare function Ferrofluid(props: FerrofluidProps): ReactElement;

export default Ferrofluid;
