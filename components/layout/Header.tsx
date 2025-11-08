"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold transition-colors hover:text-primary"
          onClick={handleLinkClick}
        >
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4">
            <ul className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "block px-4 py-2 text-sm font-medium transition-colors rounded-md",
                      "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
