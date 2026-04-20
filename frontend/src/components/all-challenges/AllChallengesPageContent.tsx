import { AllChallengesList } from "@/components/all-challenges/AllChallengesList";
import { StandardCard } from "@/components/layout/Shell/StandardCard";
import { useAllChallenges } from "@/hooks/useAllChallenges";

export function AllChallengesPageContent() {
  const {
    challenges,
    isLoading,
    error,
    hasNoChallenges,
    reloadChallenges,
    handleActivate,
    handleRemove,
    handleEdit,
  } = useAllChallenges();

  return (
    <StandardCard
      title="All Challenges"
      description="View, edit, and manage your challenges"
    >
      <AllChallengesList
        challenges={challenges}
        isLoading={isLoading}
        error={error}
        hasNoChallenges={hasNoChallenges}
        onRetry={reloadChallenges}
        onActivate={handleActivate}
        onRemove={handleRemove}
        onEdit={handleEdit}
      />
    </StandardCard>
  );
}