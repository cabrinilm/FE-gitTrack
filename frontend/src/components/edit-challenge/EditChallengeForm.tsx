import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Textarea } from "@/components/ui/Textarea";
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
      <FormField
        label="Challenge Name"
        error={showNameError ? "Challenge name cannot be empty." : undefined}
      >
        <Input
          type="text"
          value={challengeName}
          onChange={(e) => onChallengeNameChange(e.target.value)}
        />
      </FormField>

      <FormField label="Description">
        <Textarea
          value={challengeDescription}
          onChange={(e) => onChallengeDescriptionChange(e.target.value)}
          rows={4}
        />
      </FormField>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          isLoading={isSaving}
          size="sm"
          variant="primary"
        >
          Save Challenge
        </Button>

        {saved && <StatusMessage type="success" message="Saved ✓" />}
      </div>

      {error && <StatusMessage type="error" message={error} />}
    </div>
  );
}