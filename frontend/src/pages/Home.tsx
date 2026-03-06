import { Button } from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Activity, Challenge } from "./types";

import type { ActivityWithProgress } from "@/components/Activity/type";
import { HomeActivityCard } from "@/components/Activity/HomeActivityCard";
export default function Home() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [challengeActivities, setChallengeActivities] = useState<ActivityWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token, user } = useAuth();

  // -----------------------------
  // FETCH INICIAL DE DADOS
  // -----------------------------
  useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1️⃣ Pega o desafio ativo
        const { data: challenge } = await api.get<Challenge>("/api/active-challenge");
        if (!challenge || !challenge.id) {
          setError("No active challenge found");
          return;
        }
        setActiveChallenge(challenge);

        // 2️⃣ Pega as atividades do desafio
        const { data: activities } = await api.get<Activity[]>(`/api/challenges/${challenge.id}/activities`);

        // 3️⃣ Inicializa as activities com completed=false
        setChallengeActivities(
          activities.map((act) => ({ ...act, completed: false }))
        );

      } catch (err: any) {
        console.error("Error fetching home data:", err);
        setError("Failed to load challenge data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  // -----------------------------
  // ATUALIZA UMA ATIVIDADE
  // -----------------------------
  const handleActivityUpdated = (updatedActivity: ActivityWithProgress) => {
    setChallengeActivities((prev) =>
      prev.map((act) =>
        act.id === updatedActivity.id ? updatedActivity : act
      )
    );
  };

  // -----------------------------
  // CALCULA PROGRESSO
  // -----------------------------
  const completedCount = challengeActivities.filter((act) => act.completed).length;
  const totalActivities = challengeActivities.length;
  const progressPercentage = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  // -----------------------------
  // RENDER LOADING / ERROR / NO CHALLENGE
  // -----------------------------
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading your challenge...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
        <h2 className="text-2xl font-semibold text-destructive">Something went wrong</h2>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <Button variant="secondary" size="lg" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (!activeChallenge) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
        <h2 className="text-3xl font-bold text-foreground">No Active Challenge</h2>
        <p className="text-muted-foreground max-w-md text-lg">
          You don't have an ongoing challenge yet. Start one now to begin your progress!
        </p>
        <Button variant="primary" size="lg" onClick={() => (window.location.href = "/create")}>Create a Challenge</Button>
      </div>
    );
  }

  // -----------------------------
  // RENDER HOME COM PROGRESSO + ATIVIDADES
  // -----------------------------
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-10">

      {/* --- PROGRESSO --- */}
      <section className="bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Today's Progress</h1>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-foreground">Progress</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalActivities} completed ({progressPercentage}%)
            </span>
          </div>

          <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* --- ATIVIDADES --- */}
      <section className="bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 shadow-md p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-6">{activeChallenge.name}</h2>

        {challengeActivities.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No activities found for this challenge.</p>
        ) : (
          <ul role="list" className="space-y-4">
            {challengeActivities.map((act) => (
              <li key={act.id}>
                <HomeActivityCard
                  activity={act}
                  onActivityUpdated={handleActivityUpdated}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}