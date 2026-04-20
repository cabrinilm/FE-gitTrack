import { Button } from "@/components/Button/Button";
import type { CreateChallengeFormProps } from "@/components/create-challenge/type";

export function CreateChallengeForm({
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
}: CreateChallengeFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6 p-6"
    >
      <div>
        <label className="block text-sm font-medium text-foreground">
          Title
        </label>
        <input
          type="text"
          className="mt-2 w-full rounded-xl border border-border bg-gray-900 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={formValues.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter challenge title"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          className="mt-2 w-full rounded-xl border border-border bg-gray-900 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={formValues.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Optional description"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Activities</h3>
          <Button
            type="button"
            size="sm"
            variant="primary"
            onClick={addActivity}
            disabled={isSubmitting}
          >
            + Add Activity
          </Button>
        </div>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 p-3"
            >
              <input
                type="text"
                className="min-w-30 flex-1 rounded-xl border border-border bg-gray-900 p-2 outline-none focus:ring-1 focus:ring-primary"
                placeholder="Activity name"
                value={activity.name}
                onChange={(e) => updateActivity(index, "name", e.target.value)}
                disabled={isSubmitting}
              />

              <div className="flex w-full items-center gap-2 sm:w-auto">
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
                  className="w-20 rounded-xl border border-border bg-gray-900 p-2 outline-none focus:ring-1 focus:ring-primary sm:w-24"
                  disabled={isSubmitting}
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
                  className="w-20 rounded-xl border border-border bg-gray-900 p-2 outline-none focus:ring-1 focus:ring-primary sm:w-24"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-muted-foreground">min</span>
              </div>

              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="ml-auto mt-2 sm:mt-0"
                onClick={() => removeActivity(index)}
                disabled={isSubmitting}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      {success && !error && (
        <p className="text-sm font-medium text-green-600" role="status">
          Challenge created successfully.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isSubmitting}
        disabled={!canSubmit}
      >
        Create Challenge
      </Button>
    </form>
  );
}