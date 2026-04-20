import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type {
  Activity,
  ActivityMeta,
  Challenge,
} from "@/components/edit-challenge/types";

const MAX_ACTIVITIES = 4;

function sanitizeDurationInput(value: string): string {
  if (value === "") return "";

  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly === "") return "";

  return String(Number(digitsOnly));
}

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
  const [originalChallengeDescription, setOriginalChallengeDescription] =
    useState("");

  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDuration, setNewActivityDuration] = useState("");

  const [isSavingChallenge, setIsSavingChallenge] = useState(false);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [savingActivityId, setSavingActivityId] = useState<string | null>(null);
  const [deletingActivityId, setDeletingActivityId] = useState<string | null>(
    null,
  );

  const [savedChallenge, setSavedChallenge] = useState(false);
  const [savedActivityId, setSavedActivityId] = useState<string | null>(null);
  const [addedActivity, setAddedActivity] = useState(false);

  const [saveChallengeError, setSaveChallengeError] = useState<string | null>(
    null,
  );
  const [saveActivityError, setSaveActivityError] = useState<string | null>(
    null,
  );
  const [addActivityError, setAddActivityError] = useState<string | null>(null);

  const challengeSavedTimeoutRef = useRef<number | null>(null);
  const activitySavedTimeoutRef = useRef<number | null>(null);
  const addedActivityTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (challengeSavedTimeoutRef.current) {
        window.clearTimeout(challengeSavedTimeoutRef.current);
      }
      if (activitySavedTimeoutRef.current) {
        window.clearTimeout(activitySavedTimeoutRef.current);
      }
      if (addedActivityTimeoutRef.current) {
        window.clearTimeout(addedActivityTimeoutRef.current);
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

  const hasReachedActivityLimit = useMemo(() => {
    return activities.length >= MAX_ACTIVITIES;
  }, [activities.length]);

  const canAddActivity = useMemo(() => {
    return (
      newActivityName.trim().length > 0 &&
      Number(newActivityDuration) > 0 &&
      !isAddingActivity &&
      !hasReachedActivityLimit
    );
  }, [
    newActivityName,
    newActivityDuration,
    isAddingActivity,
    hasReachedActivityLimit,
  ]);

  const activityMeta = useMemo(() => {
    const originalMap = new Map(
      originalActivities.map((item) => [item.id, item]),
    );

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
        canSave:
          isValid &&
          hasChanges &&
          savingActivityId !== activity.id &&
          deletingActivityId !== activity.id,
      });
    }

    return map;
  }, [activities, originalActivities, savingActivityId, deletingActivityId]);

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

        await api.patch(
          `/api/challenges/${challengeId}/activities/${activityId}`,
          {
            name: trimmedName,
            duration_minutes: activity.duration_minutes,
          },
        );

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
          setSavedActivityId((current) =>
            current === activityId ? null : current,
          );
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

  const handleDeleteActivity = useCallback(
    async (activityId: string) => {
      if (!challengeId) return;

      const confirmed = window.confirm(
        "Are you sure you want to delete this activity?",
      );

      if (!confirmed) return;

      try {
        setDeletingActivityId(activityId);
        setSaveActivityError(null);
        setSavedActivityId(null);
        setAddActivityError(null);

        await api.delete(
          `/api/challenges/${challengeId}/activities/${activityId}`,
        );

        setActivities((prev) => prev.filter((item) => item.id !== activityId));
        setOriginalActivities((prev) =>
          prev.filter((item) => item.id !== activityId),
        );
      } catch (err) {
        console.error("Failed to delete activity:", err);
        setSaveActivityError("Failed to delete activity");
      } finally {
        setDeletingActivityId(null);
      }
    },
    [challengeId],
  );

  const handleAddActivity = useCallback(async () => {
    if (!challengeId) return;

    if (activities.length >= MAX_ACTIVITIES) {
      setAddActivityError("You can add up to 4 activities per challenge.");
      return;
    }

    const trimmedName = newActivityName.trim();
    const duration = Number(newActivityDuration);

    if (!trimmedName || duration <= 0 || isAddingActivity) return;

    try {
      setIsAddingActivity(true);
      setAddActivityError(null);
      setAddedActivity(false);

      const { data } = await api.post<Activity>(
        `/api/challenges/${challengeId}/activities`,
        {
          name: trimmedName,
          duration_minutes: duration,
        },
      );

      setActivities((prev) => [...prev, data]);
      setOriginalActivities((prev) => [...prev, data]);

      setNewActivityName("");
      setNewActivityDuration("");
      setAddedActivity(true);

      if (addedActivityTimeoutRef.current) {
        window.clearTimeout(addedActivityTimeoutRef.current);
      }

      addedActivityTimeoutRef.current = window.setTimeout(() => {
        setAddedActivity(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to add activity:", err);
      setAddActivityError("Failed to add activity");
    } finally {
      setIsAddingActivity(false);
    }
  }, [
    challengeId,
    activities.length,
    newActivityName,
    newActivityDuration,
    isAddingActivity,
  ]);

  const resetAddActivityForm = useCallback(() => {
    setNewActivityName("");
    setNewActivityDuration("");
    setAddActivityError(null);
    setAddedActivity(false);
  }, []);

  const handleNewActivityDurationChange = useCallback((value: string) => {
    setNewActivityDuration(sanitizeDurationInput(value));
  }, []);

  return {
    challengeName,
    challengeDescription,
    activities,
    activityMeta,
    isLoading,
    error,
    isSavingChallenge,
    isAddingActivity,
    savingActivityId,
    deletingActivityId,
    savedChallenge,
    savedActivityId,
    addedActivity,
    saveChallengeError,
    saveActivityError,
    addActivityError,
    canSaveChallenge,
    canAddActivity,
    hasReachedActivityLimit,
    maxActivities: MAX_ACTIVITIES,
    newActivityName,
    newActivityDuration,
    setChallengeName,
    setChallengeDescription,
    setNewActivityName,
    setNewActivityDuration: handleNewActivityDurationChange,
    handleActivityChange,
    handleSaveChallenge,
    handleSaveActivity,
    handleDeleteActivity,
    handleAddActivity,
    resetAddActivityForm,
    reloadEditChallenge: loadEditChallenge,
  };
}