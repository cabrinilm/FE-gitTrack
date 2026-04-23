import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { FaFire } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[32px_32px] opacity-60" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Build momentum daily
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Track your progress.
            <br />
            <span className="text-primary">Complete with consistency.</span>
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            GitTrack helps you turn goals into daily action. Create challenges,
            complete activities, and visualise your progress over time in one
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
            <div className="rounded-3xl border border-border/80 bg-surface p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-text-secondary">
                  Daily Challenge
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  Active
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                30-Day Fitness Reset
              </h3>

              <p className="mb-4 text-sm leading-6 text-text-secondary">
                Complete your core habits and keep your streak alive.
              </p>

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-text-secondary">Today’s progress</span>
                <span className="font-semibold text-text-primary">3/5</span>
              </div>

              <div className="h-2 rounded-full bg-background">
                <div className="h-2 w-3/5 rounded-full bg-primary" />
              </div>
            </div>

            <div className="rounded-3xl border border-orange-500/25 bg-orange-500/8 p-5 shadow-[0_10px_30px_rgba(249,115,22,0.10)] sm:translate-y-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-orange-700">
                  Current Streak
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/12 text-orange-500">
                  <FaFire className="h-4 w-4" />
                </div>
              </div>

              <div className="mb-2 text-3xl font-bold text-text-primary">
                7 days
              </div>

              <p className="mb-4 text-sm leading-6 text-text-secondary">
                Keep your momentum going by completing at least one activity
                today.
              </p>

              <div className="flex gap-2">
                <div className="h-9 flex-1 rounded-lg bg-orange-500/25" />
                <div className="h-9 flex-1 rounded-lg bg-orange-500/40" />
                <div className="h-9 flex-1 rounded-lg bg-orange-500/55" />
                <div className="h-9 flex-1 rounded-lg bg-orange-500/70" />
                <div className="h-9 flex-1 rounded-lg bg-orange-500/90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}