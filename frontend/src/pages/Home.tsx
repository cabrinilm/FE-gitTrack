import { Button } from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Activity, Challenge, ActiveChallenge } from "./types";

export default function Home() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null,
  );
  const [challengeActivities, setChallengeActivities] = useState<any[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token, user } = useAuth();

  useEffect(() => {
    // Só dispara se tiver token
    if (!token || !user) return;
    setApiToken(token);
    const fetchData = async () => {
      try {
        // 1️⃣ Buscar active challenge
        const { data: activeData } = await api.get("/api/active-challenge");

        if (!activeData || activeData.length === 0) return;
        setActiveChallenge(activeData);

        const challengeId = activeData.id;

        // 3️⃣ Buscar activities do challenge
        const { data: challengeActivities } = await api.get(
          `/api/challenges/${challengeId}/activities`,
        );
          setChallengeActivities(challengeActivities);
        console.log(challengeActivities);
        //   // Adicionar campo `completed` se precisar para controlar localmente
        //   const activitiesWithState = challengeActivities.map((act: any) => ({
        //     ...act,
        //     completed: false,
        //   }));

        //   setActivities(activitiesWithState);
      } catch (err) {
        console.error("Error fetching home data:", err);
        // toast.error("Failed to load challenge data");
      }
    };

    fetchData();
  }, [token]);

  //   const handleCompletedActivity = async (activityId: number) => {

  //   };

  //   const progres =
  //   activechallenge
  //   ? (activeChallenge.activities.filter(a => a.completed). length / activeChallenge.activties.lengt) * 100 : 0;

  return (
  <div>
    <h2>{activeChallenge?.name}</h2>
    <ul>
      {challengeActivities.map((act) => (
        <li key={act.id}>
          {act.name} - {act.duration_minutes} min
        </li>
      ))}
    </ul>
  </div>
);
}
