import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Challenge, Activity } from "./types";

export function EditChallengePage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();
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
        activity.name.trim().length > 0 && Number(activity.duration_minutes) > 0;

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
      console.error("Failed to update challenge:", err);
      setSaveChallengeError("Failed to save challenge");
    } finally {
      setIsSavingChallenge(false);
    }
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
      console.error("Failed to update activity:", err);
      setSaveActivityError("Failed to save activity");
    } finally {
      setSavingActivityId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading challenge...</span>
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Edit Challenge</h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-border px-4 py-2 text-sm text-foreground transition hover:bg-muted/40"
        >
          Back
        </button>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Challenge Name
          </label>
          <input
            type="text"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {challengeName.trim().length === 0 && (
            <p className="mt-1 text-sm text-red-400">
              Challenge name cannot be empty.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            Description
          </label>
          <textarea
            value={challengeDescription}
            onChange={(e) => setChallengeDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveChallenge}
            disabled={!canSaveChallenge}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSavingChallenge ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Challenge"
            )}
          </button>

          {savedChallenge && <p className="text-sm text-green-400">Saved ✓</p>}
        </div>

        {saveChallengeError && (
          <p className="text-sm text-red-400">{saveChallengeError}</p>
        )}
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-foreground">Activities</h2>

        {saveActivityError && (
          <p className="mb-3 text-sm text-red-400">{saveActivityError}</p>
        )}

        <div className="space-y-4">
          {activities.map((activity) => {
            const isSaving = savingActivityId === activity.id;
            const isSaved = savedActivityId === activity.id;
            const meta = activityMeta.get(activity.id);
            const showNameError = activity.name.trim().length === 0;
            const showDurationError = Number(activity.duration_minutes) <= 0;

            return (
              <div
                key={activity.id}
                className="space-y-3 rounded-xl border border-border bg-card p-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    value={activity.name}
                    onChange={(e) =>
                      setActivities((prev) =>
                        prev.map((item) =>
                          item.id === activity.id
                            ? { ...item, name: e.target.value }
                            : item,
                        ),
                      )
                    }
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {showNameError && (
                    <p className="mt-1 text-sm text-red-400">
                      Activity name cannot be empty.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={activity.duration_minutes}
                    onChange={(e) =>
                      setActivities((prev) =>
                        prev.map((item) =>
                          item.id === activity.id
                            ? {
                                ...item,
                                duration_minutes: Number(e.target.value),
                              }
                            : item,
                        ),
                      )
                    }
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {showDurationError && (
                    <p className="mt-1 text-sm text-red-400">
                      Duration must be greater than 0.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSaveActivity(activity.id)}
                    disabled={!meta?.canSave}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>

                  {isSaved && <p className="text-sm text-green-400">Saved ✓</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}