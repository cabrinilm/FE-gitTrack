import type { LandingStatItem } from "@/components/landing/types";

const stats: LandingStatItem[] = [
  { label: "Current streak", value: "7 days", trend: "up" },
  { label: "Completed today", value: "3/5", trend: "up" },
  { label: "Active challenges", value: "2", trend: "neutral" },
  { label: "Total completions", value: "148", trend: "up" },
];

export function StatsBar() {
  return (
    <section
      id="stats"
      className="border-y border-border/70 bg-surface/70 backdrop-blur-sm"
      aria-label="GitTrack quick stats"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-sm">
              <span className="text-text-secondary">{stat.label}</span>

              <span className="font-semibold text-text-primary">
                {stat.value}
              </span>

              {stat.trend === "up" && (
                <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-semibold text-secondary">
                  ↑
                </span>
              )}

              {stat.trend === "down" && (
                <span className="rounded-full bg-error/10 px-2 py-1 text-xs font-semibold text-error">
                  ↓
                </span>
              )}

              {stat.trend === "neutral" && (
                <span className="rounded-full bg-surface-elevated/60 px-2 py-1 text-xs font-semibold text-text-secondary">
                  —
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}