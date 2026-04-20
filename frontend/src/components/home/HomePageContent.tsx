import { DailyChallengeCard } from "@/components/home/DailyChallengeCard";
import { StandardCard } from "@/components/layout/shell/StandardCard";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";

export function HomePageContent() {
  const {
    activeChallenge,
    activities,
    completedIds,
    isLoading,
    error,
    hasNoChallenge,
    completingId,
    completedCount,
    totalActivities,
    progressPercentage,
    reloadDailyChallenge,
    handleMarkComplete,
  } = useDailyChallenge();

  return (
    <StandardCard
      title={activeChallenge?.name || "Daily Challenge"}
      description="Mark the activities you completed today"
    >
      <DailyChallengeCard
        activities={activities}
        completedIds={completedIds}
        isLoading={isLoading}
        error={error}
        hasNoChallenge={hasNoChallenge}
        completingId={completingId}
        completedCount={completedCount}
        totalActivities={totalActivities}
        progressPercentage={progressPercentage}
        onRetry={reloadDailyChallenge}
        onMarkComplete={handleMarkComplete}
      />
    </StandardCard>
  );
}