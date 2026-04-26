import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { StatusMessage } from "@/components/ui/StatusMessage";
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
    <ListItemCard className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          Add Activity
        </h2>

        <p className="text-sm text-text-muted">
          Create a new activity for this challenge
        </p>

        <p className="mt-1 text-sm text-text-muted">
          {activityCount}/{maxActivities} activities used
        </p>
      </div>

      <FormField
        label="Activity Name"
        error={showNameError ? "Activity name cannot be empty." : undefined}
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={hasReachedLimit}
        />
      </FormField>

      <FormField
        label="Duration (minutes)"
        error={
          showDurationError
            ? "Duration must be greater than 0."
            : undefined
        }
      >
        <Input
          type="number"
          min={1}
          inputMode="numeric"
          value={durationMinutes}
          onChange={(e) => onDurationChange(e.target.value)}
          disabled={hasReachedLimit}
        />
      </FormField>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          isLoading={isAdding}
          size="sm"
          variant="primary"
        >
          Add Activity
        </Button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isAdding}
          className="text-sm text-text-muted transition hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        {added && (
          <StatusMessage
            type="success"
            message="Activity added ✓"
          />
        )}
      </div>

      {hasReachedLimit && (
        <StatusMessage
          type="error"
          message={`You can add up to ${maxActivities} activities per challenge.`}
        />
      )}

      {error && <StatusMessage type="error" message={error} />}
    </ListItemCard>
  );
}