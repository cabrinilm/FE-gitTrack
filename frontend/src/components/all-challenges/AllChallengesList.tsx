import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { ChallengeCard } from "@/components/all-challenges/ChallengeCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import type { AllChallengesListProps } from "./types";

export function AllChallengesList({
  challenges,
  isLoading,
  error,
  hasNoChallenges,
  onRetry,
  onActivate,
  onRemove,
  onEdit,
}: AllChallengesListProps) {
  if (isLoading) {
    return <LoadingState message="Loading challenges..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description={error}
        action={
          <Button type="button" variant="primary" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        }
      />
    );
  }

  if (hasNoChallenges) {
    return (
      <EmptyState
        title="You do not have any challenges yet"
        description="Create your first challenge to start tracking your progress."
        action={
          <Link
            to="/app/create"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Create Challenge
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onRemove={() => onRemove(challenge.id)}
          onToggleActive={() => onActivate(challenge.id)}
          onEdit={() => onEdit(challenge.id)}
        />
      ))}
    </div>
  );
}