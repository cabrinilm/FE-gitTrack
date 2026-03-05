import { Button } from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Activity, Challenge } from "./types";
import { cn } from "@/utils/cn";
import { FaCheck } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null,
  );
  const [challengeActivities, setChallengeActivities] = useState<
    (Activity & { completed?: boolean })[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [completingActivityId, setCompletingActivityId] = useState<
    number | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: challenge } = await api.get<Challenge>(
          "/api/active-challenge",
        );

        if (!challenge || !challenge.id) {
          setError("No active challenge found");
          return;
        }

        setActiveChallenge(challenge);

        const { data: activities } = await api.get<Activity[]>(
          `/api/challenges/${challenge.id}/activities`,
        );

        setChallengeActivities(
          activities.map((act) => ({ ...act, completed: false })),
        );
      } catch (err: any) {
        console.error("Error fetching home data:", err);
        setError("Failed to load challenge data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  const handleCompleteActivity = async (activityId: number) => {
    if (!activityId) {
      setError("Invalid activity");
      return;
    }

    setError(null);
    setCompletingActivityId(activityId);

    try {
      const response = await api.post("/api/progress/fulfillments", {
        activity_id: activityId,
      });

      // Atualiza UI localmente
      setChallengeActivities((prev) =>
        prev.map((act) =>
          act.id === activityId ? { ...act, completed: true } : act,
        ),
      );
    } catch (err: any) {
      console.error("Error completing activity:", err);
      setError("Failed to complete activity. Please try again.");
    } finally {
      setCompletingActivityId(null);
    }
  };

  // Calcular progresso
  const completedCount = challengeActivities.filter(
    (act) => act.completed,
  ).length;
  const totalActivities = challengeActivities.length;
  const progressPercentage =
    totalActivities > 0
      ? Math.round((completedCount / totalActivities) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-lg">
          Loading your challenge...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
        <h2 className="text-2xl font-semibold text-destructive">
          Something went wrong
        </h2>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            setError(null);
            setIsLoading(true);
            window.location.reload();
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!activeChallenge) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
        <h2 className="text-3xl font-bold text-foreground">
          No Active Challenge
        </h2>
        <p className="text-muted-foreground max-w-md text-lg">
          You don't have an ongoing challenge yet. Start one now to begin your
          progress!
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => (window.location.href = "/create")}
        >
          Create a Challenge
        </Button>
      </div>
    );
  }
 return (
  <div className="container mx-auto max-w-4xl px-4 py-8 space-y-10">
    {/* Container 1: Today's Progress */}
    <section className="bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 shadow-md p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Today's Progress
        </h1>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-foreground">Progress</h3>
          <span className="text-sm text-muted-foreground">
            {completedCount} of {totalActivities} completed ({progressPercentage}%)
          </span>
        </div>

        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </section>

    {/* Container 2: Challenge + Activities */}
    <section className="bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 shadow-md p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        {activeChallenge.name}
      </h2>

      {challengeActivities.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No activities found for this challenge.
        </p>
      ) : (
        <ul role="list" className="space-y-4">
          {challengeActivities.map((act) => (
            <li key={act.id}>
              <div
                onClick={() => !act.completed && !completingActivityId && handleCompleteActivity(act.id)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border border-border/50",
                  "transition-all duration-200 cursor-pointer",
                  act.completed && "bg-primary/5 opacity-90",
                  completingActivityId === act.id && "opacity-70 animate-pulse",
                  !act.completed && "hover:bg-primary/5 hover:border-primary/30"
                )}
                role="button"
                tabIndex={0}
                aria-label={`${act.name} - ${act.duration_minutes} minutes - ${
                  act.completed ? "Completed" : "Mark as complete"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    !act.completed && !completingActivityId && handleCompleteActivity(act.id);
                  }
                }}
              >
                {/* Círculo / checkbox */}
                <div className="shrink-0">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors",
                      act.completed
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground bg-transparent hover:border-primary"
                    )}
                  >
                    {act.completed && <FaCheck className="w-4 h-4" />}
                    {completingActivityId === act.id && (
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-base font-medium text-foreground",
                      act.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {act.name}
                  </p>
                </div>

                <div className="shrink-0 text-sm text-muted-foreground">
                  {act.duration_minutes} min
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  </div>
);
}
