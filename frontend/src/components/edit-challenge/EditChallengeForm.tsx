import { Button } from "@/components/Button/Button";
import type { EditChallengeFormProps } from "@/components/edit-challenge/types";

export function EditChallengeForm({
  challengeName,
  challengeDescription,
  onChallengeNameChange,
  onChallengeDescriptionChange,
  onSave,
  isSaving,
  canSave,
  saved,
  error,
}: EditChallengeFormProps) {
  const showNameError = challengeName.trim().length === 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          Challenge Name
        </label>
        <input
          type="text"
          value={challengeName}
          onChange={(e) => onChallengeNameChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {showNameError && (
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
          onChange={(e) => onChallengeDescriptionChange(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          isLoading={isSaving}
          size="sm"
          variant="primary"
          className="rounded-xl"
        >
          Save Challenge
        </Button>

        {saved && <p className="text-sm text-green-400">Saved ✓</p>}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}