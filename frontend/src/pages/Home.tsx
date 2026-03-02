import { Button } from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Activity, Challenge, ActiveChallenge } from "./types";

export default function Home() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null,
  );
  const [activities, setActivities] = useState<Activity[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token, user } = useAuth();

  
useEffect(() => {
  // Só dispara se tiver token
  if (!token || !user) return;
console.log(user.id)
  const fetchData = async () => {
    try {
      // 1️⃣ Buscar active challenge
      const { data: activeData } = await api.get("/active-challenge", {
        params: { user_id: user.id }, // depende de como você identifica o user
      });

      if (!activeData || activeData.length === 0) return;

      const challengeId = activeData[0].challenge_id;

      // 2️⃣ Buscar detalhes do challenge
      const { data: challengeDetails } = await api.get("/challenges", {
        params: { id: challengeId },
      });

      setActiveChallenge(challengeDetails[0]);

      // 3️⃣ Buscar activities do challenge
      const { data: challengeActivities } = await api.get(`/challenges/${challengeId}/activities`, {
        params: { challenge_id: challengeId },
      });

      // Adicionar campo `completed` se precisar para controlar localmente
      const activitiesWithState = challengeActivities.map((act: any) => ({
        ...act,
        completed: false,
      }));

      setActivities(activitiesWithState);

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
    <h1>Home - Test Fetch</h1>
    <pre>{JSON.stringify(activities, null, 2)}</pre>
  </div>
);
};
