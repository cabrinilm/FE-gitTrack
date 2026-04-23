import { Link } from "react-router-dom";
import type { LandingFooterLinkGroup } from "@/components/landing/types";

const footerLinks: LandingFooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Stats", href: "#stats" },
      { label: "Get Started", href: "#cta" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/auth/login" },
      { label: "Sign up", href: "/auth/signup" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3 text-base font-semibold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-white">
                G
              </span>
              <span>GitTrack</span>
            </div>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              A simple way to build consistency, complete daily activities, and
              make your progress visible over time.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => {
                  const isInternalRoute = link.href.startsWith("/");

                  return (
                    <li key={link.label}>
                      {isInternalRoute ? (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground transition hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GitTrack. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Built for consistency.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}