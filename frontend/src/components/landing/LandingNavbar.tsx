import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import type { LandingNavLink } from "@/components/landing/types";

const navLinks: LandingNavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Stats", href: "#stats" },
  { label: "Get Started", href: "#heatmap-showcase" },
];

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-base font-semibold tracking-wide text-text-primary"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white shadow-sm">
            G
          </span>
          <span className="text-text-primary">GitTrack</span>
        </Link>

        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="Landing navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition hover:bg-primary/8 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>

          <Link to="/auth/signup">
            <Button variant="secondary" size="sm">
              Get started
            </Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-primary shadow-sm transition hover:bg-primary/10 md:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="text-lg">{isMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8"
            aria-label="Mobile landing navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-xl px-3 py-3 text-sm font-medium text-text-secondary transition hover:bg-primary/10 hover:text-text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-3">
              <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Log in
                </Button>
              </Link>

              <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">
                  Get started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}