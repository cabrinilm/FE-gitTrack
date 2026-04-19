import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { ChallengeCard } from "./ChallengeCard";
import type { Challenge } from "./types";
import { BackButton } from "../ui/BackButton";
import { StandardCard } from "@/components/layout/Shell/StandardCard";

export function AllChallengesSection() {
  const { token, user } = useAuth();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);
    fetchChallenges();
  }, [token, user]);

  const fetchChallenges = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: allChallenges } =
        await api.get<Challenge[]>("/api/challenges");

      if (allChallenges.length === 0) {
        setChallenges([]);
        return;
      }

      const { data: activeChallenge } = await api.get<Challenge | null>(
        "/api/active-challenge",
      );

      const challengesWithStatus = allChallenges.map((c) => ({
        ...c,
        isActive: activeChallenge?.id === c.id,
      }));

      setChallenges(challengesWithStatus);
    } catch (err) {
      console.error(err);
      setError("Failed to load challenges");
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await api.post(`/api/challenges/${id}/activate`);
      await fetchChallenges();
    } catch (error) {
      console.error(error);
      alert("Failed to activate challenge");
    }
  };

  const handleRemove = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this challenge?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/challenges/${id}`);
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete challenge");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/challenges/${id}/edit`);
  };

  if (isLoading) {
    return (
      <StandardCard
        title="All Challenges"
        description="View, edit, and manage your challenges"
      >
        <p className="text-muted-foreground">Loading challenges...</p>
      </StandardCard>
    );
  }

  if (error) {
    return (
      <StandardCard
        title="All Challenges"
        description="View, edit, and manage your challenges"
      >
        <p className="text-red-500">{error}</p>
      </StandardCard>
    );
  }

  return (
    <StandardCard
      title="All Challenges"
      description="View, edit, and manage your challenges"
    >
      {challenges.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onRemove={() => handleRemove(challenge.id)}
              onToggleActive={() => handleActivate(challenge.id)}
              onEdit={() => handleEdit(challenge.id)}
            />
          ))}
        </div>
      )}
    </StandardCard>
  );
}