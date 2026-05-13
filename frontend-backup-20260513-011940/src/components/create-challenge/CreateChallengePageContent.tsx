import { CreateChallengeForm } from "@/components/create-challenge/CreateChallengeForm";
import { StandardCard } from "@/components/layout/shell/StandardCard";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";

export function CreateChallengePageContent() {
  const {
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
  } = useCreateChallenge();

  return (
    <StandardCard
      title="Create a Challenge"
      description="Fill in the details and add activities"
      contentClassName="p-0"
    >
      <CreateChallengeForm
        formValues={formValues}
        activities={activities}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
        canSubmit={canSubmit}
        updateField={updateField}
        addActivity={addActivity}
        updateActivity={updateActivity}
        removeActivity={removeActivity}
        handleSubmit={handleSubmit}
      />
    </StandardCard>
  );
}