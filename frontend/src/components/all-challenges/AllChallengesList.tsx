import { Link } from "react-router-dom";
import { ChallengeCard } from "@/components/all-challenges/ChallengeCard";
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
    return <p className="text-muted-foreground">Loading challenges...</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (hasNoChallenges) {
    return (
      <div className="py-6 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          You do not have any challenges yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your first challenge to start tracking your progress.
        </p>

        <Link
          to="/create"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Create Challenge
        </Link>
      </div>
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