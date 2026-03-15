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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!title) {
    alert("Title is required")
    return
  }

  if (activities.length === 0) {
    alert("Add at least one activity")
    return
  }

  setIsSubmitting(true)

  try {

    const activitiesFormatted = activities.map(a => ({
      name: a.name,
      duration_minutes:
        (Number(a.hours) || 0) * 60 +
        (Number(a.minutes) || 0)
    }))

    const data = {
      title,
      description: description || null,
      activities: activitiesFormatted
    }

    console.log("Submitting data:", data)

    setTitle("")
    setDescription("")
    setActivities([])

  } catch (error) {
    console.error(error)
    alert("There was an error submitting the form")
  } finally {
    setIsSubmitting(false)
  }
}

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
    // cria um novo array filtrando a activity que queremos remover
    const updatedActivities = activities.filter((_, i) => i !== index);

    // atualiza o state
    setActivities(updatedActivities);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-primary/10 px-6 py-5 border-b border-border">
        <h2 className="text-2xl font-bold text-primary">Create a Challenge</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details and add activities
        </p>
      </div>

      {/* Conteúdo do formulário */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Challenge Title */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-border rounded-xl p-3 mt-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none  bg-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter challenge title"
          />
        </div>

        {/* Challenge Description */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            className="w-full border border-border rounded-xl p-3 mt-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none  bg-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        {/* Activities */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-foreground">Activities</h3>
            <Button size="sm" variant="primary" onClick={addActivity}>
              + Add Activity
            </Button>
          </div>

          {/* Lista de activities */}
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex flex-wrap gap-3 items-center border border-border/60 rounded-xl p-3"
              >
                {/* Nome da activity */}
                <input
                  type="text"
                  className="flex-1 min-w-[120px] border border-border rounded-xl p-2 focus:ring-1 focus:ring-primary outline-none bg-gray-900"
                  placeholder="Activity name"
                  value={activity.name}
                  onChange={(e) =>
                    updateActivity(index, "name", e.target.value)
                  }
                />

                {/* Duração - horas/minutos */}
                <div className="flex gap-2 items-center w-full sm:w-auto">
                  <input
                    type="number"
                    className="w-20 sm:w-24 border border-border rounded-xl p-2 focus:ring-1 focus:ring-primary outline-none  bg-gray-900"
                    placeholder="h"
                    min={0}
                    value={activity.hours}
                    onChange={(e) =>
                      updateActivity(
                        index,
                        "hours",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                  />
                  <span className="text-sm text-muted-foreground">h</span>

                  <input
                    type="number"
                    className="w-20 sm:w-24 border border-border rounded-xl p-2 focus:ring-1 focus:ring-primary outline-none  bg-gray-900"
                    placeholder="min"
                    min={0}
                    max={59}
                    value={activity.minutes}
                    onChange={(e) =>
                      updateActivity(
                        index,
                        "minutes",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                  />
                  <span className="text-sm text-muted-foreground">min</span>
                </div>

                {/* Remove */}
                <Button
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
          size="lg"
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
        >
          Create Challenge
        </Button>
      </form>
    </div>
  );
}
