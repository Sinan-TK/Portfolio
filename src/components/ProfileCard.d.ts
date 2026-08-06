import type { ReactElement } from "react";

/**
 * Types for the react-bits ProfileCard (`ProfileCard.jsx`).
 *
 * Same reason as Ferrofluid.d.ts: props destructured without a default
 * (`innerGradient`, `miniAvatarUrl`, `onContactClick`, …) get inferred as
 * required, so TypeScript rejects any usage that omits them.
 */
export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string | number;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

declare function ProfileCard(props: ProfileCardProps): ReactElement;

export default ProfileCard;
