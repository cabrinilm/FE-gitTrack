import { useState, useEffect, useCallback, useMemo } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { FulfillmentsResponse, StreakResponse, Challenge, Activity } from "@/components/home/type";



export function useDailyChallenge() {
  const { token, user } = useAuth();

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNoChallenge, setHasNoChallenge] = useState(false);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const [streak, setStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);

  const loadDailyChallenge = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    try {
      setIsLoading(true);
      setError(null);
      setHasNoChallenge(false);

      const today = new Date().toISOString().split("T")[0];

      try {
        const { data: streakData } = await api.get<StreakResponse>(
          "/api/progress/streak",
        );

        setStreak(streakData?.streak ?? 0);
        setCompletedToday(streakData?.completedToday ?? false);
      } catch (streakError) {
        console.error("Failed to load streak:", streakError);
        setStreak(0);
        setCompletedToday(false);
      }

      const { data: challenge } = await api.get<Challenge | null>(
        "/api/active-challenge",
      );

      if (!challenge) {
        setActiveChallenge(null);
        setActivities([]);
        setCompletedIds(new Set());
        setHasNoChallenge(true);
        return;
      }

      setActiveChallenge(challenge);

      const { data: activitiesData } = await api.get<Activity[]>(
        `/api/challenges/${challenge.id}/activities`,
      );

      const { data: fulfillmentsData } = await api.get<FulfillmentsResponse>(
        `/api/progress/${today}/fulfillments`,
      );

      const safeActivities = activitiesData ?? [];
      const safeFulfillments = fulfillmentsData?.fulfillments ?? [];

      setActivities(safeActivities);
      setCompletedIds(
        new Set(safeFulfillments.map((fulfillment) => fulfillment.activity_id)),
      );
    } catch (err) {
      console.error("Failed to load daily challenge:", err);
      setError("Failed to load daily challenge");
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    loadDailyChallenge();
  }, [loadDailyChallenge]);

  const handleMarkComplete = useCallback(
    async (activityId: number) => {
      if (completedIds.has(activityId)) return;

      try {
        setCompletingId(activityId);
        setError(null);

        await api.post("/api/progress/fulfillments", {
          activityId,
        });

        setCompletedIds((prev) => new Set(prev).add(activityId));

        try {
          const { data: streakData } = await api.get<StreakResponse>(
            "/api/progress/streak",
          );

          setStreak(streakData?.streak ?? 0);
          setCompletedToday(streakData?.completedToday ?? false);
        } catch (streakError) {
          console.error("Failed to refresh streak:", streakError);
        }
      } catch (err) {
        console.error("Failed to mark activity as complete:", err);
        setError("Failed to mark activity as complete");
      } finally {
        setCompletingId(null);
      }
    },
    [completedIds],
  );

  const completedCount = useMemo(() => {
    return completedIds.size;
  }, [completedIds]);

  const totalActivities = useMemo(() => {
    return activities.length;
  }, [activities]);

  const progressPercentage = useMemo(() => {
    if (totalActivities === 0) return 0;
    return Math.round((completedCount / totalActivities) * 100);
  }, [completedCount, totalActivities]);

  return {
    activeChallenge,
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
    reloadDailyChallenge: loadDailyChallenge,
    handleMarkComplete,
  };
}