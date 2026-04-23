import { Link } from "react-router-dom";
import type { LandingFooterLinkGroup } from "@/components/landing/types";

const footerLinks: LandingFooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Stats", href: "#stats" },
      { label: "Heatmap Demo", href: "#heatmap-showcase" },
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
    <footer className="border-t border-border/70 bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10 md:grid md:grid-cols-[1.5fr_1fr_1fr] md:gap-8 md:space-y-0">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-3 text-base font-semibold text-text-primary">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-white shadow-sm">
                G
              </span>
              <span>GitTrack</span>
            </div>

            <p className="text-sm leading-7 text-text-secondary">
              A simple way to build consistency, complete daily activities, and
              make your progress visible over time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:contents">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
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
                            className="text-sm text-text-secondary transition hover:text-text-primary"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-sm text-text-secondary transition hover:text-text-primary"
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
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GitTrack. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Built for consistency.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}