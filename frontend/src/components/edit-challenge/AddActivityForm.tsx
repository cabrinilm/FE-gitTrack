import { Loader2 } from "lucide-react";
import type { AddActivityFormProps } from "@/components/edit-challenge/types";

export function AddActivityForm({
  activityCount,
  maxActivities,
  name,
  durationMinutes,
  isAdding,
  added,
  error,
  canAdd,
  hasReachedLimit,
  onNameChange,
  onDurationChange,
  onAdd,
  onCancel,
}: AddActivityFormProps) {
  const showNameError = name.length > 0 && name.trim().length === 0;
  const showDurationError =
    durationMinutes !== "" && Number(durationMinutes) <= 0;

  return (
    <div className="space-y-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Add Activity</h2>
        <p className="text-sm text-muted-foreground">
          Create a new activity for this challenge
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {activityCount}/{maxActivities} activities used
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          Activity Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={hasReachedLimit}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
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
          inputMode="numeric"
          value={durationMinutes}
          onChange={(e) => onDurationChange(e.target.value)}
          disabled={hasReachedLimit}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
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
          onClick={onAdd}
          disabled={!canAdd}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Activity"
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isAdding}
          className="text-sm text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        {added && <p className="text-sm text-green-400">Activity added ✓</p>}
      </div>

      {hasReachedLimit && (
        <p className="text-sm text-amber-400">
          You can add up to {maxActivities} activities per challenge.
        </p>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}