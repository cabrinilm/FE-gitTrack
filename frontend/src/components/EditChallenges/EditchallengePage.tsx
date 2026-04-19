import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Activity, Challenge } from "./type";

import { EditChallengeForm } from "./EditChallengeForm";
import { EditActivityCard } from "./EditActivityCard";
import { StandardCard } from "../layout/StandardCard";
import { PageShell } from "../layout/PageShell";

export function EditChallengePage() {
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

  const [isSavingChallenge, setIsSavingChallenge] = useState(false);
  const [savingActivityId, setSavingActivityId] = useState<string | null>(null);

  const [savedChallenge, setSavedChallenge] = useState(false);
  const [savedActivityId, setSavedActivityId] = useState<string | null>(null);

  const [saveChallengeError, setSaveChallengeError] = useState<string | null>(
    null,
  );
  const [saveActivityError, setSaveActivityError] = useState<string | null>(
    null,
  );

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

  useEffect(() => {
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

    const fetchData = async () => {
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
        setActivities(activitiesData);
        setOriginalActivities(activitiesData);
      } catch (err) {
        console.error("Failed to load challenge data:", err);
        setError("Failed to load challenge data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [challengeId, token, user]);

  useEffect(() => {
    if (challenge) {
      const safeName = challenge.name || "";
      const safeDescription =
        typeof challenge.description === "string" ? challenge.description : "";

      setChallengeName(safeName);
      setChallengeDescription(safeDescription);
      setOriginalChallengeName(safeName);
      setOriginalChallengeDescription(safeDescription);
    }
  }, [challenge]);

  const isChallengeValid = challengeName.trim().length > 0;

  const hasChallengeChanges =
    challengeName !== originalChallengeName ||
    challengeDescription !== originalChallengeDescription;

  const canSaveChallenge =
    isChallengeValid && hasChallengeChanges && !isSavingChallenge;

  const activityMeta = useMemo(() => {
    const originalMap = new Map(
      originalActivities.map((item) => [item.id, item]),
    );

    const map = new Map<
      string,
      { isValid: boolean; hasChanges: boolean; canSave: boolean }
    >();

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

  const handleSaveChallenge = async () => {
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
      console.error(err);
      setSaveChallengeError("Failed to save challenge");
    } finally {
      setIsSavingChallenge(false);
    }
  };

  const handleActivityChange = (updated: Activity) => {
    setActivities((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );
  };

  const handleSaveActivity = async (activityId: string) => {
    if (!challengeId) return;

    const activity = activities.find((a) => a.id === activityId);
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
      console.error(err);
      setSaveActivityError("Failed to save activity");
    } finally {
      setSavingActivityId(null);
    }
  };

  if (isLoading) {
    return (
      <PageShell contentClassName="max-w-2xl space-y-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading challenge...</span>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell contentClassName="max-w-2xl space-y-6">
        <p className="text-red-500">{error}</p>
      </PageShell>
    );
  }

  return (
    <PageShell contentClassName="max-w-2xl space-y-6">
      <StandardCard
        title="Edit Challenge"
        description="Update the challenge details and activities"
        contentClassName="space-y-6 p-6"
      >
        <EditChallengeForm
          challengeName={challengeName}
          challengeDescription={challengeDescription}
          onChallengeNameChange={setChallengeName}
          onChallengeDescriptionChange={setChallengeDescription}
          onSave={handleSaveChallenge}
          isSaving={isSavingChallenge}
          canSave={canSaveChallenge}
          saved={savedChallenge}
          error={saveChallengeError}
        />

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Activities
          </h2>

          {saveActivityError && (
            <p className="mb-3 text-sm text-red-400">{saveActivityError}</p>
          )}

          <div className="space-y-4">
            {activities.map((activity) => (
              <EditActivityCard
                key={activity.id}
                activity={activity}
                meta={activityMeta.get(activity.id)}
                isSaving={savingActivityId === activity.id}
                isSaved={savedActivityId === activity.id}
                onChange={handleActivityChange}
                onSave={() => handleSaveActivity(activity.id)}
              />
            ))}
          </div>
        </div>
      </StandardCard>
    </PageShell>
  );
}