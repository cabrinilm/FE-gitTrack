import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button/Button";
import type { EditActivityCardProps } from "@/components/edit-challenge/types";

export function EditActivityCard({
  activity,
  meta,
  isSaving,
  isSaved,
  isDeleting,
  onChange,
  onSave,
  onDelete,
}: EditActivityCardProps) {
  const showNameError = activity.name.trim().length === 0;
  const showDurationError = Number(activity.duration_minutes) <= 0;

  return (
    <div className="space-y-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5">
      <div>
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          Activity Name
        </label>
        <input
          type="text"
          value={activity.name}
          onChange={(e) => onChange({ ...activity, name: e.target.value })}
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
            onChange({
              ...activity,
              duration_minutes: Number(e.target.value),
            })
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
        <Button
          type="button"
          onClick={onSave}
          disabled={!meta?.canSave || isDeleting}
          isLoading={isSaving}
          size="sm"
          variant="primary"
          className="rounded-xl"
        >
          Save
        </Button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isSaving || isDeleting}
          className="inline-flex items-center justify-center rounded-xl border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>

        {isSaved && <p className="text-sm text-green-400">Saved ✓</p>}
      </div>
    </div>
  );
}