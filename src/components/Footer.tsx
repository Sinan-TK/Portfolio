import { ArrowUp } from "lucide-react";

import { site } from "@/config/site";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.07] py-10 dark:border-white/10">
      <div className="container-page">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1">
            {site.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={social.name}
                className="grid h-11 w-11 place-items-center rounded-full text-black/45 transition-colors hover:bg-black/5 hover:text-accent-600 dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-accent-400"
              >
                <SocialIcon name={social.icon} size={17} />
              </a>
            ))}

            <a
              href="#top"
              aria-label="Back to top"
              className="no-print ml-1 grid h-11 w-11 place-items-center rounded-full border border-black/10 text-black/45 transition-colors hover:text-accent-600 dark:border-white/12 dark:text-white/45 dark:hover:text-accent-400"
            >
              <ArrowUp size={17} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
