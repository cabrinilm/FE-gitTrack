import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Challenge, Activity } from "@/pages/types";

export function EditChallengePage() {
  const { challengeId } = useParams();
  const { token, user } = useAuth();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!challengeId) {
      setError("Challenge ID is missing");
      setIsLoading(false);
      return;
    }

    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: challengeData } = await api.get<Challenge>(
          `/api/challenges/${challengeId}`
        );

        const { data: activitiesData } = await api.get<Activity[]>(
          `/api/challenges/${challengeId}/activities`
        );

        setChallenge(challengeData);
        setActivities(activitiesData);
      } catch (err) {
        console.error("Failed to load challenge data:", err);
        setError("Failed to load challenge data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [challengeId, token, user]);

  if (isLoading) return <div className="p-6">Loading challenge...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Edit Challenge: {challenge?.name}
      </h1>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Activities</h2>
        <ul className="mt-2 space-y-2">
          {activities.map((activity) => (
            <li key={activity.id} className="rounded border p-3">
              {activity.name} - {activity.duration_minutes} min
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}