import { Loader2 } from "lucide-react";
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
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formValues.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter your name"
          disabled={isLoading || isSaving}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={profile?.email ?? ""}
          disabled
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground outline-none disabled:cursor-not-allowed"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {saved && !error && (
        <p className="text-sm text-green-600" role="status">
          Profile updated successfully.
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave || isLoading || isSaving}
          className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}