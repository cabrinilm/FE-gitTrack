import { useCallback, useEffect, useMemo, useState } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type {
  ChallengeActivityDraft,
  CreateChallengeFormValues,
} from "@/components/create-challenge/type";

export function useCreateChallenge() {
  const { token, user } = useAuth();

  const [formValues, setFormValues] = useState<CreateChallengeFormValues>({
    name: "",
    description: "",
  });

  const [activities, setActivities] = useState<ChallengeActivityDraft[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      return;
    }

    setError(null);
    setApiToken(token);
  }, [token, user]);

  const updateField = useCallback(
    (field: keyof CreateChallengeFormValues, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
      setSuccess(false);
      setError(null);
    },
    [],
  );

  const addActivity = useCallback(() => {
    if (activities.length >= 4) {
      setError("You can only add up to 4 activities per challenge");
      return;
    }

    const newActivity: ChallengeActivityDraft = {
      id: crypto.randomUUID(),
      name: "",
      hours: "",
      minutes: "",
    };

    setActivities((prev) => [...prev, newActivity]);
    setSuccess(false);
    setError(null);
  }, [activities.length]);

  const updateActivity = useCallback(
    (
      index: number,
      field: "name" | "hours" | "minutes",
      value: string | number,
    ) => {
      setActivities((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          [field]: value,
        };
        return updated;
      });

      setSuccess(false);
      setError(null);
    },
    [],
  );

  const removeActivity = useCallback((index: number) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
    setSuccess(false);
    setError(null);
  }, []);

  const hasValidTitle = useMemo(() => formValues.name.trim().length > 0, [formValues.name]);

  const hasActivities = useMemo(() => activities.length > 0, [activities]);

  const allActivitiesHaveName = useMemo(() => {
    return activities.every((activity) => activity.name.trim().length > 0);
  }, [activities]);

  const allActivitiesHaveDuration = useMemo(() => {
    return activities.every(
      (activity) =>
        (Number(activity.hours) || 0) * 60 + (Number(activity.minutes) || 0) > 0,
    );
  }, [activities]);

  const canSubmit = useMemo(() => {
    return (
      !!token &&
      !!user &&
      hasValidTitle &&
      hasActivities &&
      allActivitiesHaveName &&
      allActivitiesHaveDuration &&
      !isSubmitting
    );
  }, [
    token,
    user,
    hasValidTitle,
    hasActivities,
    allActivitiesHaveName,
    allActivitiesHaveDuration,
    isSubmitting,
  ]);

  const handleSubmit = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      return;
    }

    if (!formValues.name.trim()) {
      setError("Title is required");
      return;
    }

    if (activities.length === 0) {
      setError("Add at least one activity");
      return;
    }

    if (activities.some((activity) => !activity.name.trim())) {
      setError("All activities must have a name");
      return;
    }

    if (
      activities.some(
        (activity) =>
          (Number(activity.hours) || 0) * 60 +
            (Number(activity.minutes) || 0) ===
          0,
      )
    ) {
      setError("Activities must have a duration greater than 0");
      return;
    }

    setApiToken(token);
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formattedActivities = activities.map((activity) => ({
        name: activity.name.trim(),
        duration_minutes:
          (Number(activity.hours) || 0) * 60 + (Number(activity.minutes) || 0),
      }));

      const { data: challenge } = await api.post("/api/challenges", {
        name: formValues.name.trim(),
        description: formValues.description.trim() || null,
      });

      if (!challenge?.id) {
        throw new Error("Challenge creation failed");
      }

      const challengeId = challenge.id;

      await Promise.all(
        formattedActivities.map((activity) =>
          api.post(`/api/challenges/${challengeId}/activities`, activity),
        ),
      );

      setFormValues({
        name: "",
        description: "",
      });
      setActivities([]);
      setSuccess(true);
    } catch (err) {
      console.error("Failed to create challenge:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create challenge");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [token, user, formValues, activities]);

  return {
    formValues,
    activities,
    isSubmitting,
    error,
    success,
    canSubmit,
    updateField,
    addActivity,
    updateActivity,
    removeActivity,
    handleSubmit,
  };
}