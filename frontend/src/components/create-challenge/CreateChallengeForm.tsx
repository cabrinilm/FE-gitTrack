import { Button } from "@/components/Button/Button";
import type { CreateChallengeFormProps } from "@/components/create-challenge/type";
import { FormField } from "@/components/ui/FormField";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Textarea } from "@/components/ui/Textarea";
import { ListItemCard } from "@/components/ui/ListItemCard";

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
      <FormField label="Title">
        <Input
          type="text"
          value={formValues.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter challenge title"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Description">
        <Textarea
          value={formValues.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Optional description"
          disabled={isSubmitting}
        />
      </FormField>

      <FormSection
        title="Activities"
        action={
          <Button
            type="button"
            size="sm"
            variant="primary"
            onClick={addActivity}
            disabled={isSubmitting}
          >
            + Add Activity
          </Button>
        }
      >
        {activities.map((activity, index) => (
          <ListItemCard
            key={activity.id}
            className="flex flex-wrap items-center gap-3 p-3"
          >
            <Input
              type="text"
              className="min-w-30 flex-1"
              placeholder="Activity name"
              value={activity.name}
              onChange={(e) => updateActivity(index, "name", e.target.value)}
              disabled={isSubmitting}
            />

            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Input
                type="number"
                min={0}
                max={23}
                className="w-20 sm:w-24"
                placeholder="h"
                value={activity.hours}
                onChange={(e) =>
                  updateActivity(
                    index,
                    "hours",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                disabled={isSubmitting}
              />
              <span className="text-sm text-text-muted">h</span>

              <Input
                type="number"
                min={0}
                max={59}
                className="w-20 sm:w-24"
                placeholder="min"
                value={activity.minutes}
                onChange={(e) =>
                  updateActivity(
                    index,
                    "minutes",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                disabled={isSubmitting}
              />
              <span className="text-sm text-text-muted">min</span>
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
          </ListItemCard>
        ))}
      </FormSection>

      {error && <StatusMessage type="error" message={error} />}

      {success && !error && (
        <StatusMessage
          type="success"
          message="Challenge created successfully."
        />
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