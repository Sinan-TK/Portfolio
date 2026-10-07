import { Github, Linkedin, Mail, Globe, Dribbble, Youtube, Instagram } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Lucide has no X logo, so this is the official glyph as a filled icon. */
const XIcon = (({
  size = 24,
  className,
}: {
  size?: number | string;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)) as unknown as LucideIcon;

const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: XIcon,
  x: XIcon,
  mail: Mail,
  email: Mail,
  website: Globe,
  dribbble: Dribbble,
  youtube: Youtube,
  instagram: Instagram,
};

/** Maps the `icon` string in site.socials to a Lucide component. */
export function SocialIcon({
  name,
  size = 18,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name.toLowerCase()] ?? Globe;
  return <Icon size={size} className={className} aria-hidden />;
}
