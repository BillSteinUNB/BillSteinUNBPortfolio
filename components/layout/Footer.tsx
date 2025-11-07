import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.name}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
