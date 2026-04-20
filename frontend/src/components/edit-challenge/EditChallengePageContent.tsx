import { Loader2 } from "lucide-react";
import { EditActivityCard } from "@/components/edit-challenge/EditActivityCard";
import { EditChallengeForm } from "@/components/edit-challenge/EditChallengeForm";
import { StandardCard } from "@/components/layout/shell/StandardCard";
import { useEditChallenge } from "@/hooks/useEditChallenge";

export function EditChallengePageContent() {
  const {
    challengeName,
    challengeDescription,
    activities,
    activityMeta,
    isLoading,
    error,
    isSavingChallenge,
    savingActivityId,
    savedChallenge,
    savedActivityId,
    saveChallengeError,
    saveActivityError,
    canSaveChallenge,
    setChallengeName,
    setChallengeDescription,
    handleActivityChange,
    handleSaveChallenge,
    handleSaveActivity,
  } = useEditChallenge();

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
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Activities
        </h2>

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
              onChange={handleActivityChange}
              onSave={() => handleSaveActivity(activity.id)}
            />
          ))}
        </div>
      </div>
    </StandardCard>
  );
}