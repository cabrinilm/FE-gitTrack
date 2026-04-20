import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { AddActivityForm } from "@/components/edit-challenge/AddActivityForm";
import { EditActivityCard } from "@/components/edit-challenge/EditActivityCard";
import { EditChallengeForm } from "@/components/edit-challenge/EditChallengeForm";
import { StandardCard } from "@/components/layout/shell/StandardCard";
import { useEditChallenge } from "@/hooks/useEditChallenge";

export function EditChallengePageContent() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const {
    challengeName,
    challengeDescription,
    activities,
    activityMeta,
    isLoading,
    error,
    isSavingChallenge,
    isAddingActivity,
    savingActivityId,
    deletingActivityId,
    savedChallenge,
    savedActivityId,
    addedActivity,
    saveChallengeError,
    saveActivityError,
    addActivityError,
    canSaveChallenge,
    canAddActivity,
    hasReachedActivityLimit,
    maxActivities,
    newActivityName,
    newActivityDuration,
    setChallengeName,
    setChallengeDescription,
    setNewActivityName,
    setNewActivityDuration,
    handleActivityChange,
    handleSaveChallenge,
    handleSaveActivity,
    handleDeleteActivity,
    handleAddActivity,
    resetAddActivityForm,
  } = useEditChallenge();

  useEffect(() => {
    if (addedActivity) {
      setIsAddFormOpen(false);
    }
  }, [addedActivity]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading challenge...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <StandardCard
      title="Edit Challenge"
      description="Update the challenge details and activities"
      contentClassName="space-y-6 p-6"
    >
      <EditChallengeForm
        challengeName={challengeName}
        challengeDescription={challengeDescription}
        onChallengeNameChange={setChallengeName}
        onChallengeDescriptionChange={setChallengeDescription}
        onSave={handleSaveChallenge}
        isSaving={isSavingChallenge}
        canSave={canSaveChallenge}
        saved={savedChallenge}
        error={saveChallengeError}
      />

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-foreground">Activities</h2>

          {!isAddFormOpen && (
            <button
              type="button"
              onClick={() => setIsAddFormOpen(true)}
              disabled={hasReachedActivityLimit}
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaPlus className="h-4 w-4" />
              Add Activity
            </button>
          )}
        </div>

        {hasReachedActivityLimit && !isAddFormOpen && (
          <p className="mb-3 text-sm text-amber-400">
            You can add up to {maxActivities} activities per challenge.
          </p>
        )}

        {isAddFormOpen && (
          <div className="mb-4">
            <AddActivityForm
              activityCount={activities.length}
              maxActivities={maxActivities}
              name={newActivityName}
              durationMinutes={newActivityDuration}
              isAdding={isAddingActivity}
              added={addedActivity}
              error={addActivityError}
              canAdd={canAddActivity}
              hasReachedLimit={hasReachedActivityLimit}
              onNameChange={setNewActivityName}
              onDurationChange={setNewActivityDuration}
              onAdd={handleAddActivity}
              onCancel={() => {
                resetAddActivityForm();
                setIsAddFormOpen(false);
              }}
            />
          </div>
        )}

        {saveActivityError && (
          <p className="mb-3 text-sm text-red-400">{saveActivityError}</p>
        )}

        <div className="space-y-4">
          {activities.map((activity) => (
            <EditActivityCard
              key={activity.id}
              activity={activity}
              meta={activityMeta.get(activity.id)}
              isSaving={savingActivityId === activity.id}
              isSaved={savedActivityId === activity.id}
              isDeleting={deletingActivityId === activity.id}
              onChange={handleActivityChange}
              onSave={() => handleSaveActivity(activity.id)}
              onDelete={() => handleDeleteActivity(activity.id)}
            />
          ))}
        </div>
      </div>
    </StandardCard>
  );
}