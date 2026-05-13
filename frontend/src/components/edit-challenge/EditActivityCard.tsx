import { Loader2 } from "lucide-react";
import { Button } from "@/components/base-button/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { StatusMessage } from "@/components/ui/StatusMessage";
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
    <ListItemCard className="space-y-4 p-4">
      <FormField
        label="Activity Name"
        error={showNameError ? "Activity name cannot be empty." : undefined}
      >
        <Input
          type="text"
          value={activity.name}
          onChange={(e) => onChange({ ...activity, name: e.target.value })}
        />
      </FormField>

      <FormField
        label="Duration (minutes)"
        error={
          showDurationError ? "Duration must be greater than 0." : undefined
        }
      >
        <Input
          type="number"
          min={1}
          value={activity.duration_minutes}
          onChange={(e) =>
            onChange({
              ...activity,
              duration_minutes: Number(e.target.value),
            })
          }
        />
      </FormField>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onSave}
          disabled={!meta?.canSave || isDeleting}
          isLoading={isSaving}
          size="sm"
          variant="primary"
        >
          Save
        </Button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isSaving || isDeleting}
          className="inline-flex items-center justify-center rounded-xl border border-error/40 px-4 py-2 text-sm font-medium text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-50"
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

        {isSaved && <StatusMessage type="success" message="Saved ✓" />}
      </div>
    </ListItemCard>
  );
}