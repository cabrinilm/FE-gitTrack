import type { LandingStatItem } from "@/components/landing/types";

const stats: LandingStatItem[] = [
  { label: "Current streak", value: "7 days", trend: "up" },
  { label: "Completed today", value: "3/5", trend: "up" },
  { label: "Weekly consistency", value: "82%", trend: "up" },
  { label: "Active challenges", value: "2", trend: "neutral" },
  { label: "Total completions", value: "148", trend: "up" },
];

export function StatsBar() {
  return (
    <section
      id="stats"
      className="border-y border-border/60 bg-surface"
      aria-label="GitTrack quick stats"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{stat.label}</span>
              <span className="font-semibold text-foreground">{stat.value}</span>

              {stat.trend === "up" && (
                <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-semibold text-secondary">
                  Up
                </span>
              )}

              {stat.trend === "down" && (
                <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
                  Down
                </span>
              )}

              {stat.trend === "neutral" && (
                <span className="rounded-full bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">
                  Stable
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}