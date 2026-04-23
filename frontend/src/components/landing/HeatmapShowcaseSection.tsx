import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { cn } from "@/lib/utils";

const MONTH_LABELS = ["Jan", "Feb", "Mar"];

const demoWeeks = [
  [0, 1, 0, 2, 3, 1, 0],
  [1, 2, 1, 3, 4, 2, 1],
  [0, 1, 2, 2, 3, 4, 2],
  [1, 0, 1, 3, 2, 3, 4],
  [2, 3, 2, 4, 3, 2, 1],
  [1, 2, 3, 4, 4, 3, 2],
  [0, 1, 2, 3, 2, 1, 0],
  [1, 2, 3, 4, 3, 2, 1],
  [2, 2, 1, 3, 4, 4, 2],
  [1, 0, 1, 2, 3, 2, 1],
  [0, 1, 2, 3, 4, 3, 2],
  [1, 2, 1, 2, 3, 4, 3],
] as const;

const LEVEL_STYLES = {
  0: { backgroundColor: "rgba(255,255,255,0.04)" },
  1: { backgroundColor: "rgba(2, 127, 233, 0.45)" },
  2: { backgroundColor: "rgba(2, 127, 233, 0.65)" },
  3: { backgroundColor: "rgba(2, 127, 233, 0.85)" },
  4: { backgroundColor: "var(--color-primary)" },
} as const;

type DemoActivity = {
  name: string;
  status: "completed" | "pending";
};

type DemoDayDetail = {
  date: string;
  completed: number;
  total: number;
  activities: DemoActivity[];
};

const demoDayDetails: Record<string, DemoDayDetail> = {
  "5-4": {
    date: "Mar 14, 2026",
    completed: 4,
    total: 4,
    activities: [
      { name: "Morning walk", status: "completed" },
      { name: "Read 20 pages", status: "completed" },
      { name: "Stretch for 10 min", status: "completed" },
      { name: "Drink 2L of water", status: "completed" },
    ],
  },
  "7-3": {
    date: "Mar 25, 2026",
    completed: 4,
    total: 4,
    activities: [
      { name: "Code for 30 minutes", status: "completed" },
      { name: "Review weekly goals", status: "completed" },
      { name: "Meditate 10 min", status: "completed" },
      { name: "Evening walk", status: "completed" },
    ],
  },
  "8-4": {
    date: "Apr 03, 2026",
    completed: 4,
    total: 4,
    activities: [
      { name: "Workout session", status: "completed" },
      { name: "Healthy lunch", status: "completed" },
      { name: "Track progress", status: "completed" },
      { name: "Sleep before 11pm", status: "completed" },
    ],
  },
  "10-4": {
    date: "Apr 18, 2026",
    completed: 4,
    total: 4,
    activities: [
      { name: "Morning run", status: "completed" },
      { name: "Journal entry", status: "completed" },
      { name: "Read 15 pages", status: "completed" },
      { name: "No social media after 9pm", status: "completed" },
    ],
  },
};

function getFallbackDetail(weekIndex: number, dayIndex: number, level: number): DemoDayDetail {
  const total = 4;
  const completed = Math.min(level, total);

  const activityPool = [
    "Morning walk",
    "Stretch for 10 min",
    "Read 20 pages",
    "Drink 2L of water",
  ];

  return {
    date: `Week ${weekIndex + 1} · Day ${dayIndex + 1}`,
    completed,
    total,
    activities: activityPool.map((name, index) => ({
      name,
      status: index < completed ? "completed" : "pending",
    })),
  };
}

export function HeatmapShowcaseSection() {
  const [selectedKey, setSelectedKey] = React.useState("10-4");

  const selectedDetail = React.useMemo(() => {
    const [weekIndexStr, dayIndexStr] = selectedKey.split("-");
    const weekIndex = Number(weekIndexStr);
    const dayIndex = Number(dayIndexStr);
    const level = demoWeeks[weekIndex]?.[dayIndex] ?? 0;

    return (
      demoDayDetails[selectedKey] ??
      getFallbackDetail(weekIndex, dayIndex, level)
    );
  }, [selectedKey]);

  return (
    <section
      id="heatmap-showcase"
      className="relative overflow-hidden border-t border-border/60 bg-background py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Signature feature
          </span>

          <h2 className="mb-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            See your progress
            <span className="text-primary"> in one glance</span>
          </h2>

          <p className="mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            GitTrack turns daily effort into a visual pattern. Click a day to
            preview how activity tracking becomes easier to understand over time.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/auth/signup">
              <Button variant="secondary" size="lg">
                Get started free
              </Button>
            </Link>

            <Link to="/auth/login">
              <Button variant="outline" size="lg">
                Log in
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Activity Heatmap
              </p>
              <p className="text-xs text-muted-foreground">
                Click a day to preview tracked activities
              </p>
            </div>

            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Demo
            </span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="mb-2 flex">
                <div className="w-8 shrink-0" />
                <div className="flex gap-1">
                  {MONTH_LABELS.map((label) => (
                    <div
                      key={label}
                      className="text-[11px] leading-3 text-muted-foreground"
                      style={{ width: "52px" }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col gap-1 text-[10px] leading-3 text-muted-foreground">
                  <div className="flex h-3 items-center" />
                  <div className="flex h-3 items-center">Mon</div>
                  <div className="flex h-3 items-center" />
                  <div className="flex h-3 items-center">Wed</div>
                  <div className="flex h-3 items-center" />
                  <div className="flex h-3 items-center">Fri</div>
                  <div className="flex h-3 items-center" />
                </div>

                <div className="flex gap-1">
                  {demoWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((level, dayIndex) => {
                        const key = `${weekIndex}-${dayIndex}`;
                        const isSelected = selectedKey === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            aria-label={`Preview activities for ${key}`}
                            onClick={() => setSelectedKey(key)}
                            className={cn(
                              "h-3 w-3 rounded-xs border border-white/5 transition-all",
                              "hover:scale-110 hover:opacity-90",
                              isSelected &&
                                "scale-110 ring-2 ring-white/40 ring-offset-2 ring-offset-surface",
                            )}
                            style={LEVEL_STYLES[level as keyof typeof LEVEL_STYLES]}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="h-3 w-3 rounded-xs border border-white/5"
                  style={LEVEL_STYLES[level as keyof typeof LEVEL_STYLES]}
                />
              ))}
            </div>
            <span>More</span>
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-background/60 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {selectedDetail.date}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedDetail.completed}/{selectedDetail.total} activities completed
                </p>
              </div>

              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Selected day
              </span>
            </div>

            <div className="space-y-2">
              {selectedDetail.activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-3 py-2"
                >
                  <span className="text-sm text-foreground">{activity.name}</span>

                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium",
                      activity.status === "completed"
                        ? "bg-primary/10 text-primary"
                        : "bg-background text-muted-foreground",
                    )}
                  >
                    {activity.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}