import { Link } from "react-router-dom";
import { FaCheck, FaFire } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { cn } from "@/utils/cn";
import type { DailyChallengeCardProps } from "@/components/home/type";

export function DailyChallengeCard({
  activities,
  completedIds,
  isLoading,
  error,
  hasNoChallenge,
  completingId,
  completedCount,
  totalActivities,
  progressPercentage,
  streak,
  completedToday,
  onRetry,
  onMarkComplete,
}: DailyChallengeCardProps) {
  return (
    <div className="space-y-6">
      {!isLoading && !error && streak >= 1 && (
        <div className="flex items-center justify-between rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
              <FaFire className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                {streak} day{streak > 1 ? "s" : ""} streak
              </p>
              <p className="text-xs text-muted-foreground">
                {completedToday
                  ? "You’ve already kept it going today."
                  : "Complete one activity today to keep it alive."}
              </p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && !hasNoChallenge && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">
              Today&apos;s Progress
            </h3>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalActivities} completed ({progressPercentage}
              %)
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full border border-border/30 bg-muted/50">
            <div
              className="h-full bg-primary transition-all duration-600 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading today&apos;s activities...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <p className="mb-4 font-medium text-destructive">{error}</p>
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      ) : hasNoChallenge ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-foreground">
            You do not have an active challenge yet.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first challenge to start tracking your daily progress.
          </p>

          <Link
            to="/create"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Create Challenge
          </Link>
        </div>
      ) : activities.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No activities found for this challenge.
        </div>
      ) : (
        <ul role="list" className="space-y-4">
          {activities.map((activity) => {
            const isCompleted = completedIds.has(activity.id);
            const isCompleting = completingId === activity.id;

            return (
              <li key={activity.id}>
                <div
                  onClick={() =>
                    !isCompleted &&
                    !isCompleting &&
                    onMarkComplete(activity.id)
                  }
                  className={cn(
                    "group flex cursor-pointer items-center gap-4 rounded-xl border border-border/60 p-4 transition-all duration-200",
                    isCompleted && "border-primary/30 bg-primary/5 opacity-90",
                    isCompleting && "animate-pulse bg-primary/5 opacity-70",
                    !isCompleted &&
                      "hover:border-primary/40 hover:bg-primary/5 active:bg-primary/10",
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`${activity.name} - ${activity.duration_minutes} minutes - ${
                    isCompleted ? "Completed" : "Mark as complete"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();

                      if (!isCompleted && !isCompleting) {
                        onMarkComplete(activity.id);
                      }
                    }
                  }}
                >
                  <div className="shrink-0">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isCompleted
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-muted-foreground bg-transparent group-hover:border-primary group-hover:bg-primary/5",
                      )}
                    >
                      {isCompleted && <FaCheck className="h-5 w-5" />}
                      {isCompleting && (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-base font-medium text-foreground",
                        isCompleted && "line-through text-muted-foreground",
                      )}
                    >
                      {activity.name}
                    </p>
                  </div>

                  <div className="shrink-0 text-sm font-medium text-primary/80">
                    {activity.duration_minutes} min
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}