import { Link } from "react-router-dom";
import { FaCheck, FaFire } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/button/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { NoticeCard } from "@/components/ui/NoticeCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
        <NoticeCard
          variant="streak"
          icon={<FaFire className="h-4 w-4" />}
          title={`${streak} day${streak > 1 ? "s" : ""} streak`}
          description={
            completedToday
              ? "You’ve already kept it going today."
              : "Complete one activity today to keep it alive."
          }
        />
      )}

      {!isLoading && !error && !hasNoChallenge && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-primary">
              Today&apos;s Progress
            </h3>

            <span className="text-sm text-text-muted">
              {completedCount} of {totalActivities} completed (
              {progressPercentage}%)
            </span>
          </div>

          <ProgressBar value={progressPercentage} />
        </div>
      )}

      {isLoading ? (
        <LoadingState message="Loading today's activities..." />
      ) : error ? (
        <EmptyState
          title={error}
          action={
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try Again
            </Button>
          }
        />
      ) : hasNoChallenge ? (
        <EmptyState
          title="You do not have an active challenge yet."
          description="Create your first challenge to start tracking your daily progress."
          action={
            <Link
              to="/app/create"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Create Challenge
            </Link>
          }
        />
      ) : activities.length === 0 ? (
        <EmptyState title="No activities found for this challenge." />
      ) : (
        <ul role="list" className="space-y-4">
          {activities.map((activity) => {
            const isCompleted = completedIds.has(activity.id);
            const isCompleting = completingId === activity.id;

            return (
              <li key={activity.id}>
                <ListItemCard
                  interactive={!isCompleted && !isCompleting}
                  isActive={isCompleted}
                  isLoading={isCompleting}
                  onClick={() =>
                    !isCompleted &&
                    !isCompleting &&
                    onMarkComplete(activity.id)
                  }
                  className="group flex items-center gap-4"
                  role="button"
                  tabIndex={0}
                  aria-label={`${activity.name} - ${
                    activity.duration_minutes
                  } minutes - ${
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
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-text-muted bg-transparent group-hover:border-primary group-hover:bg-primary/5",
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
                        "text-base font-medium text-text-primary",
                        isCompleted && "line-through text-text-muted",
                      )}
                    >
                      {activity.name}
                    </p>
                  </div>

                  <div className="shrink-0 text-sm font-medium text-primary/80">
                    {activity.duration_minutes} min
                  </div>
                </ListItemCard>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}