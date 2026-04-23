import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 -right-15 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] opacity-40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Build momentum daily
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Track your progress.
            <br />
            <span className="text-primary">Complete with consistency.</span>
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            GitTrack helps you turn goals into daily action. Create challenges,
            complete activities, and visualize your consistency over time in one
            clean workflow.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/auth/signup">
              <Button variant="secondary" size="lg">
                Get started
              </Button>
            </Link>

            <Link to="/auth/login">
              <Button variant="outline" size="lg">
                Log in
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Daily Challenge
                </span>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  Active
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                30-Day Fitness Reset
              </h3>

              <p className="mb-4 text-sm text-muted-foreground">
                Complete your core habits and keep your streak alive.
              </p>

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Today’s progress</span>
                <span className="font-semibold text-foreground">3/5</span>
              </div>

              <div className="h-2 rounded-full bg-background">
                <div className="h-2 w-3/5 rounded-full bg-primary" />
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg sm:translate-y-8">
              <div className="mb-4 text-sm font-medium text-muted-foreground">
                Weekly Consistency
              </div>

              <div className="mb-4 text-3xl font-bold text-foreground">
                82%
              </div>

              <div className="grid grid-cols-7 gap-2">
                <div className="h-10 rounded-lg bg-primary/20" />
                <div className="h-10 rounded-lg bg-primary/40" />
                <div className="h-10 rounded-lg bg-primary/60" />
                <div className="h-10 rounded-lg bg-primary/80" />
                <div className="h-10 rounded-lg bg-primary" />
                <div className="h-10 rounded-lg bg-primary/50" />
                <div className="h-10 rounded-lg bg-background border border-border" />
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                A simple snapshot of how consistently you’ve shown up this week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}