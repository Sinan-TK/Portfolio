import { Github, Linkedin, Twitter, Mail, Globe, Dribbble, Youtube, Instagram } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
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
