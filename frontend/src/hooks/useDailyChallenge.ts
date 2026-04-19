import { useCallback, useEffect, useMemo, useState } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type {
  Activity,
  Challenge,
  FulfillmentsResponse,
} from "@/components/home/type";

export function useDailyChallenge() {
  const { token, user } = useAuth();

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasNoChallenge, setHasNoChallenge] = useState(false);

  const loadDailyChallenge = useCallback(async () => {
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

      const { data: challengeActivities } = await api.get<Activity[]>(
        `/api/challenges/${challenge.id}/activities`,
      );
      setActivities(challengeActivities ?? []);

      const today = new Date().toISOString().split("T")[0];

      const { data: response } = await api.get<FulfillmentsResponse>(
        `/api/progress/${today}/fulfillments`,
      );

      const fulfillments = response?.fulfillments ?? [];
      const ids = new Set<number>(fulfillments.map((item) => item.activity_id));

      setCompletedIds(ids);
    } catch (err) {
      console.error("Failed to load daily challenge data:", err);
      setError("Failed to load today's activities");
      setActiveChallenge(null);
      setActivities([]);
      setCompletedIds(new Set());
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    loadDailyChallenge();
  }, [loadDailyChallenge]);

  const handleMarkComplete = useCallback(
    async (activityId: number) => {
      if (completedIds.has(activityId) || completingId !== null) return;

      if (!token || !user) {
        setError("Authentication required");
        return;
      }

      setApiToken(token);
      setCompletingId(activityId);
      setError(null);

      try {
        await api.post("/api/progress/fulfillments", { activityId });

        setCompletedIds((prev) => new Set([...prev, activityId]));
      } catch (err) {
        console.error("Failed to complete activity:", err);
        setError("Could not mark activity as completed");
      } finally {
        setCompletingId(null);
      }
    },
    [completedIds, completingId, token, user],
  );

  const completedCount = useMemo(() => completedIds.size, [completedIds]);

  const totalActivities = useMemo(() => activities.length, [activities]);

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
    reloadDailyChallenge: loadDailyChallenge,
    handleMarkComplete,
  };
}