import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Activity, ActivityMeta, Challenge } from "@/components/edit-challenge/types";

export function useEditChallenge() {
  const { challengeId } = useParams();
  const { token, user } = useAuth();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [originalActivities, setOriginalActivities] = useState<Activity[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [challengeName, setChallengeName] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [originalChallengeName, setOriginalChallengeName] = useState("");
  const [originalChallengeDescription, setOriginalChallengeDescription] = useState("");

  const [isSavingChallenge, setIsSavingChallenge] = useState(false);
  const [savingActivityId, setSavingActivityId] = useState<string | null>(null);

  const [savedChallenge, setSavedChallenge] = useState(false);
  const [savedActivityId, setSavedActivityId] = useState<string | null>(null);

  const [saveChallengeError, setSaveChallengeError] = useState<string | null>(null);
  const [saveActivityError, setSaveActivityError] = useState<string | null>(null);

  const challengeSavedTimeoutRef = useRef<number | null>(null);
  const activitySavedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (challengeSavedTimeoutRef.current) {
        window.clearTimeout(challengeSavedTimeoutRef.current);
      }
      if (activitySavedTimeoutRef.current) {
        window.clearTimeout(activitySavedTimeoutRef.current);
      }
    };
  }, []);

  const loadEditChallenge = useCallback(async () => {
    if (!challengeId) {
      setError("Challenge ID is missing");
      setIsLoading(false);
      return;
    }

    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    try {
      setIsLoading(true);
      setError(null);

      const { data: challengeData } = await api.get<Challenge>(
        `/api/challenges/${challengeId}`,
      );

      const { data: activitiesData } = await api.get<Activity[]>(
        `/api/challenges/${challengeId}/activities`,
      );

      setChallenge(challengeData);
      setActivities(activitiesData ?? []);
      setOriginalActivities(activitiesData ?? []);
    } catch (err) {
      console.error("Failed to load challenge data:", err);
      setError("Failed to load challenge data");
    } finally {
      setIsLoading(false);
    }
  }, [challengeId, token, user]);

  useEffect(() => {
    loadEditChallenge();
  }, [loadEditChallenge]);

  useEffect(() => {
    if (!challenge) return;

    const safeName = challenge.name || "";
    const safeDescription =
      typeof challenge.description === "string" ? challenge.description : "";

    setChallengeName(safeName);
    setChallengeDescription(safeDescription);
    setOriginalChallengeName(safeName);
    setOriginalChallengeDescription(safeDescription);
  }, [challenge]);

  const isChallengeValid = useMemo(() => {
    return challengeName.trim().length > 0;
  }, [challengeName]);

  const hasChallengeChanges = useMemo(() => {
    return (
      challengeName !== originalChallengeName ||
      challengeDescription !== originalChallengeDescription
    );
  }, [
    challengeName,
    challengeDescription,
    originalChallengeName,
    originalChallengeDescription,
  ]);

  const canSaveChallenge = useMemo(() => {
    return isChallengeValid && hasChallengeChanges && !isSavingChallenge;
  }, [isChallengeValid, hasChallengeChanges, isSavingChallenge]);

  const activityMeta = useMemo(() => {
    const originalMap = new Map(originalActivities.map((item) => [item.id, item]));

    const map = new Map<string, ActivityMeta>();

    for (const activity of activities) {
      const original = originalMap.get(activity.id);

      const isValid =
        activity.name.trim().length > 0 &&
        Number(activity.duration_minutes) > 0;

      const hasChanges =
        !!original &&
        (activity.name !== original.name ||
          activity.duration_minutes !== original.duration_minutes);

      map.set(activity.id, {
        isValid,
        hasChanges,
        canSave: isValid && hasChanges && savingActivityId !== activity.id,
      });
    }

    return map;
  }, [activities, originalActivities, savingActivityId]);

  const handleSaveChallenge = useCallback(async () => {
    if (!challengeId || !canSaveChallenge) return;

    try {
      setIsSavingChallenge(true);
      setSavedChallenge(false);
      setSaveChallengeError(null);

      const trimmedName = challengeName.trim();
      const trimmedDescription = challengeDescription.trim();

      await api.patch(`/api/challenges/${challengeId}`, {
        name: trimmedName,
        description: trimmedDescription,
      });

      setChallenge((prev) =>
        prev
          ? {
              ...prev,
              name: trimmedName,
              description: trimmedDescription,
            }
          : prev,
      );

      setChallengeName(trimmedName);
      setChallengeDescription(trimmedDescription);
      setOriginalChallengeName(trimmedName);
      setOriginalChallengeDescription(trimmedDescription);

      setSavedChallenge(true);

      if (challengeSavedTimeoutRef.current) {
        window.clearTimeout(challengeSavedTimeoutRef.current);
      }

      challengeSavedTimeoutRef.current = window.setTimeout(() => {
        setSavedChallenge(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to save challenge:", err);
      setSaveChallengeError("Failed to save challenge");
    } finally {
      setIsSavingChallenge(false);
    }
  }, [challengeId, canSaveChallenge, challengeName, challengeDescription]);

  const handleActivityChange = useCallback((updated: Activity) => {
    setActivities((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );
    setSavedActivityId(null);
    setSaveActivityError(null);
  }, []);

  const handleSaveActivity = useCallback(
    async (activityId: string) => {
      if (!challengeId) return;

      const activity = activities.find((item) => item.id === activityId);
      const meta = activityMeta.get(activityId);

      if (!activity || !meta?.canSave) return;

      try {
        setSavingActivityId(activityId);
        setSavedActivityId(null);
        setSaveActivityError(null);

        const trimmedName = activity.name.trim();

        await api.patch(`/api/challenges/${challengeId}/activities/${activityId}`, {
          name: trimmedName,
          duration_minutes: activity.duration_minutes,
        });

        setActivities((prev) =>
          prev.map((item) =>
            item.id === activityId
              ? {
                  ...item,
                  name: trimmedName,
                  duration_minutes: activity.duration_minutes,
                }
              : item,
          ),
        );

        setOriginalActivities((prev) =>
          prev.map((item) =>
            item.id === activityId
              ? {
                  ...item,
                  name: trimmedName,
                  duration_minutes: activity.duration_minutes,
                }
              : item,
          ),
        );

        setSavedActivityId(activityId);

        if (activitySavedTimeoutRef.current) {
          window.clearTimeout(activitySavedTimeoutRef.current);
        }

        activitySavedTimeoutRef.current = window.setTimeout(() => {
          setSavedActivityId((current) => (current === activityId ? null : current));
        }, 2000);
      } catch (err) {
        console.error("Failed to save activity:", err);
        setSaveActivityError("Failed to save activity");
      } finally {
        setSavingActivityId(null);
      }
    },
    [challengeId, activities, activityMeta],
  );

  return {
    challengeName,
    challengeDescription,
    activities,
    activityMeta,
    isLoading,
    error,
    isSavingChallenge,
    savingActivityId,
    savedChallenge,
    savedActivityId,
    saveChallengeError,
    saveActivityError,
    canSaveChallenge,
    setChallengeName,
    setChallengeDescription,
    handleActivityChange,
    handleSaveChallenge,
    handleSaveActivity,
    reloadEditChallenge: loadEditChallenge,
  };
}