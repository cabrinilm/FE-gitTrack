import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { Button } from "./Button/Button";

type Activity = {
  id: string;
  name: string;
  hours: number | "";
  minutes: number | "";
};

export function CreateChallengeCard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      setAuthError("Authentication required");
      return;
    }

    setAuthError(null);
    setApiToken(token);
  }, [token, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !user) {
      alert("Authentication required");
      return;
    }

    if (!name.trim()) {
      alert("Title is required");
      return;
    }

    if (activities.length === 0) {
      alert("Add at least one activity");
      return;
    }

    if (activities.some((a) => !a.name.trim())) {
      alert("All activities must have a name");
      return;
    }

    // 🔴 validação de duração (evita erro no backend)
    if (
      activities.some(
        (a) =>
          (Number(a.hours) || 0) * 60 +
            (Number(a.minutes) || 0) === 0
      )
    ) {
      alert("Activities must have a duration greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      const activitiesFormatted = activities.map((a) => ({
        name: a.name,
        duration_minutes:
          (Number(a.hours) || 0) * 60 +
          (Number(a.minutes) || 0),
      }));

      // 1️⃣ create challenge
      console.log("1")
      const { data: challenge } = await api.post("/api/challenges", {
        name,
        description: description || null,
      });
   
      if (!challenge?.id) {
        throw new Error("Challenge creation failed");
      }

      const challengeId = challenge.id;

      // 2️⃣ create activities (paralelo)
      await Promise.all(
        activitiesFormatted.map((activity) =>
          api.post(`/api/challenges/${challengeId}/activities`, activity)
        )
      );

      // reset
      setName("");
      setDescription("");
      setActivities([]);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to create challenge");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addActivity = () => {
    if (activities.length >= 4) {
      alert("You can only add up to 4 activities per challenge");
      return;
    }

    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name: "",
      hours: "",
      minutes: "",
    };

    setActivities([...activities, newActivity]);
  };

  const updateActivity = (
    index: number,
    field: "name" | "hours" | "minutes",
    value: string | number,
  ) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    };
    setActivities(updatedActivities);
  };

  const removeActivity = (index: number) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary/10 px-6 py-5 border-b border-border">
        <h2 className="text-2xl font-bold text-primary">
          Create a Challenge
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details and add activities
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-border rounded-xl p-3 mt-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter challenge title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            className="w-full border border-border rounded-xl p-3 mt-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        {/* Activities */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-foreground">
              Activities
            </h3>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={addActivity}
            >
              + Add Activity
            </Button>
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex flex-wrap gap-3 items-center border border-border/60 rounded-xl p-3"
              >
                {/* Name */}
                <input
                  type="text"
                  className="flex-1 min-w-[120px] border border-border rounded-xl p-2 focus:ring-1 focus:ring-primary outline-none bg-gray-900"
                  placeholder="Activity name"
                  value={activity.name}
                  onChange={(e) =>
                    updateActivity(index, "name", e.target.value)
                  }
                />

                {/* Duration */}
                <div className="flex gap-2 items-center w-full sm:w-auto">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    placeholder="h"
                    value={activity.hours}
                    onChange={(e) =>
                      updateActivity(
                        index,
                        "hours",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-20 sm:w-24 border border-border rounded-xl p-2 focus:ring-1 focus:ring-primary outline-none bg-gray-900"
                  />
                  <span className="text-sm text-muted-foreground">h</span>

                  <input
                    type="number"
                    min={0}
                    max={59}
                    placeholder="min"
                    value={activity.minutes}
                    onChange={(e) =>
                      updateActivity(
                        index,
                        "minutes",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-20 sm:w-24 border border-border rounded-xl p-2 focus:ring-1 focus:ring-primary outline-none bg-gray-900"
                  />
                  <span className="text-sm text-muted-foreground">min</span>
                </div>

                {/* Remove */}
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="ml-auto mt-2 sm:mt-0"
                  onClick={() => removeActivity(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Challenge
        </Button>
      </form>
    </div>
  );
}