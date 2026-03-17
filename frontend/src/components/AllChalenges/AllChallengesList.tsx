import { useEffect, useState } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { ChallengeCard } from "./ChallengeCard";

type Challenge = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  isActive?: boolean;
};

export function AllChallengesList() {
  const { token, user } = useAuth();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      // 1️⃣ Todos os challenges
      const { data: allChallenges } = await api.get<Challenge[]>("/api/challenges");

      // 2️⃣ Buscar challenge ativo
      const { data: activeChallenge } = await api.get<Challenge>("/api/active-challenge");

      // 3️⃣ Mesclar status de ativo
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

  // 🔥 ATIVAR
  const handleActivate = async (id: string) => {
    try {
      await api.post(`/api/challenges/${id}/activate`);
      // ✅ Refetch para atualizar o estado corretamente
      await fetchChallenges();
    } catch (error) {
      console.error(error);
      alert("Failed to activate challenge");
    }
  };

  // 🗑 REMOVER
  const handleRemove = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this challenge?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/challenges/${id}`);
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete challenge");
    }
  };

  if (isLoading) return <p>Loading challenges...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (challenges.length === 0) return <p>No challenges found</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onRemove={() => handleRemove(challenge.id)}
          onToggleActive={() => handleActivate(challenge.id)}
        />
      ))}
    </div>
  );
}