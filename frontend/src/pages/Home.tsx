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

  const { token } = useAuth();
    setApiToken(token);




  useEffect(() => {
    
   
  }, [token]);

  const handleCompletedActivity = async (activityId: number) => {




  };

  //   const progres =
  //   activechallenge
  //   ? (activeChallenge.activities.filter(a => a.completed). length / activeChallenge.activties.lengt) * 100 : 0;

  return (
    <div>
      <h1>{activeChallenge?.name}</h1>
      <p>Progress: {progress}%</p>
      {activeChallenge?.activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onComplete={() => handleCompleteActivity(activity.id)}
        />
      ))}
    </div>
  );
}
