import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { Button } from "./Button/Button";
import { FaCheck } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Challenge, Activity } from "@/pages/types";

export function DailyChallengeCard() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null,
  );
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    const fetchDailyData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Desafio ativo (objeto único)
        const { data: challenge } = await api.get("/api/active-challenge");
        if (!challenge?.id) {
          setError("No active challenge found");
          return;
        }
        setActiveChallenge(challenge);

        // 2. Todas as atividades do desafio (fixas)
        const { data: allActivities } = await api.get<Activity[]>(
          `/api/challenges/${challenge.id}/activities`,
        );
        setActivities(allActivities);

        // 3. Fulfillments do dia atual (quais já foram marcadas hoje)
        const today = new Date().toISOString().split("T")[0];
        const { data: response } = await api.get<any>(
          `/api/progress/${today}/fulfillments`,
        );

        const fulfillmentsArray = response?.fulfillments || [];

        // Tipamos o array explicitamente
        const fulfillments: { activity_id: number | string }[] =
          fulfillmentsArray;

        const ids = new Set<number>(
          fulfillments
            .filter((f) => f.activity_id != null)
            .map((f) => Number(f.activity_id)),
        );

        setCompletedIds(ids);
      } catch (err: any) {
        console.error("Failed to load daily challenge data:", err);
        setError("Failed to load today's activities");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyData();
  }, [token, user]);

  const handleMarkComplete = async (activityId: number) => {
    if (completedIds.has(activityId) || completingId !== null) return;

    setCompletingId(activityId);
    setError(null);

    try {
      await api.post("/api/progress/fulfillments", { activityId: activityId });

      // Atualização otimista
      setCompletedIds((prev) => new Set([...prev, activityId]));
    } catch (err: any) {
      console.error("Failed to complete activity:", err);
      setError("Could not mark activity as completed");
    } finally {
      setCompletingId(null);
    }
  };

  const completedCount = completedIds.size; // número de ids únicos marcados hoje
  const totalActivities = activities.length; // total de atividades fixas do desafio
  const progressPercentage =
    totalActivities > 0
      ? Math.round((completedCount / totalActivities) * 100)
      : 0;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
     
      <div className="bg-primary/10 px-6 py-5 border-b border-border">
        <h2 className="text-2xl font-bold text-primary">
          {activeChallenge?.name || "Daily Challenge"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark the activities you completed today
        </p>
      </div>

      <div className="p-6 space-y-10">
       
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-foreground">
              Today's Progress
            </h3>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalActivities} completed (
              {progressPercentage}%)
            </span>
          </div>

          <div className="h-3 w-full bg-muted/50 rounded-full overflow-hidden border border-border/30">
            <div
              className="h-full bg-primary transition-all duration-600 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Lista de atividades */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">
              Loading today's activities...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive font-medium mb-4">{error}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setError(null);
                setIsLoading(true);
                window.location.reload();
              }}
            >
              Try Again
            </Button>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
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
                      "flex items-center gap-4 p-4 rounded-xl border border-border/60",
                      "transition-all duration-200 cursor-pointer group",
                      isCompleted &&
                        "bg-primary/5 border-primary/30 opacity-90",
                      isCompleting && "opacity-70 animate-pulse bg-primary/5",
                      !isCompleted &&
                        "hover:bg-primary/5 hover:border-primary/40 active:bg-primary/10",
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
                    {/* Círculo */}
                    <div className="shrink-0">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                          isCompleted
                            ? "bg-primary border-primary text-primary-foreground shadow-sm"
                            : "border-muted-foreground bg-transparent group-hover:border-primary group-hover:bg-primary/5",
                        )}
                      >
                        {isCompleted && <FaCheck className="w-5 h-5" />}
                        {isCompleting && (
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        )}
                      </div>
                    </div>

                    {/* Nome */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-base font-medium text-foreground",
                          isCompleted && "line-through text-muted-foreground",
                        )}
                      >
                        {act.name}
                      </p>
                    </div>

                    {/* Duração */}
                    <div className="shrink-0 text-sm font-medium text-primary/80">
                      {act.duration_minutes} min
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
