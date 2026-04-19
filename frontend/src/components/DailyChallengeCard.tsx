import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { Button } from "./Button/Button";
import { FaCheck } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Challenge, Activity } from "@/pages/types";
import { StandardCard } from "./layout/Shell/StandardCard";

type Fulfillment = {
  id: number;
  progress_entry_id: number;
  activity_id: number;
  activity_name: string;
  planned_duration_minutes: number;
};

type FulfillmentsResponse = {
  fulfillments: Fulfillment[];
};

export function DailyChallengeCard() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasNoChallenge, setHasNoChallenge] = useState(false);

  const { token, user } = useAuth();

  const fetchDailyData = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    setIsLoading(true);
    setError(null);
    setHasNoChallenge(false);

    try {
      const { data: challenge } = await api.get<Challenge | null>(
        "/api/active-challenge",
      );

      if (!challenge?.id) {
        setActiveChallenge(null);
        setActivities([]);
        setCompletedIds(new Set());
        setHasNoChallenge(true);
        return;
      }

      setActiveChallenge(challenge);

      const { data: allActivities } = await api.get<Activity[]>(
        `/api/challenges/${challenge.id}/activities`,
      );
      setActivities(allActivities);

      const today = new Date().toISOString().split("T")[0];
     const { data: response } = await api.get<FulfillmentsResponse>(
  `/api/progress/${today}/fulfillments`,
);

const fulfillments = response.fulfillments;

  const ids = new Set<number>(
  fulfillments.map((f) => f.activity_id)
);

      setCompletedIds(ids);
    } catch (err: any) {
      console.error("Failed to load daily challenge data:", err);
      setError("Failed to load today's activities");
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchDailyData();
  }, [fetchDailyData]);

  const handleMarkComplete = async (activityId: number) => {
    if (completedIds.has(activityId) || completingId !== null) return;

    setCompletingId(activityId);
    setError(null);

    try {
      await api.post("/api/progress/fulfillments", { activityId });

      setCompletedIds((prev) => new Set([...prev, activityId]));
    } catch (err: any) {
      console.error("Failed to complete activity:", err);
      setError("Could not mark activity as completed");
    } finally {
      setCompletingId(null);
    }
  };

  const completedCount = completedIds.size;
  const totalActivities = activities.length;
  const progressPercentage =
    totalActivities > 0
      ? Math.round((completedCount / totalActivities) * 100)
      : 0;

  return (
  <StandardCard
    title={activeChallenge?.name || "Daily Challenge"}
    description="Mark the activities you completed today"
  >
    {!isLoading && !error && !hasNoChallenge && (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">
            Today's Progress
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
        <p className="text-muted-foreground">Loading today's activities...</p>
      </div>
    ) : error ? (
      <div className="py-12 text-center">
        <p className="mb-4 font-medium text-destructive">{error}</p>
        <Button variant="secondary" size="sm" onClick={fetchDailyData}>
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
        {activities.map((act) => {
          const isCompleted = completedIds.has(act.id);
          const isCompleting = completingId === act.id;

          return (
            <li key={act.id}>
              <div
                onClick={() =>
                  !isCompleted &&
                  !isCompleting &&
                  handleMarkComplete(act.id)
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
                aria-label={`${act.name} - ${act.duration_minutes} minutes - ${
                  isCompleted ? "Completed" : "Mark as complete"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    !isCompleted &&
                      !isCompleting &&
                      handleMarkComplete(act.id);
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
                    {act.name}
                  </p>
                </div>

                <div className="shrink-0 text-sm font-medium text-primary/80">
                  {act.duration_minutes} min
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </StandardCard>
);
}