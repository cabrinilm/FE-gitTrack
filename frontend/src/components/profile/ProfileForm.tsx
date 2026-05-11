import { Button } from "@/components/button/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { StatusMessage } from "@/components/ui/StatusMessage";
import type { ProfileFormProps } from "@/components/profile/type";

export function ProfileForm({
  profile,
  formValues,
  isLoading,
  isSaving,
  error,
  saved,
  canSave,
  updateField,
  handleSave,
}: ProfileFormProps) {
  return (
    <div className="space-y-6">
      <FormField label="Name">
        <Input
          type="text"
          value={formValues.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter your name"
          disabled={isLoading || isSaving}
        />
      </FormField>

      <FormField label="Email">
        <Input
          type="email"
          value={profile?.email ?? ""}
          disabled
        />
      </FormField>

      {error && <StatusMessage type="error" message={error} />}

      {saved && !error && (
        <StatusMessage
          type="success"
          message="Profile updated successfully."
        />
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSave}
          disabled={!canSave || isLoading}
          isLoading={isSaving}
          size="sm"
          variant="outline"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}