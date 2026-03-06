import { useState } from "react";
import { ActivityCard } from "./ActivityCard"; // componente base
import type { HomeActivityCardProps } from "./type";
import { api } from "@/lib/api";


export function HomeActivityCard({
  activity,
  onActivityUpdated,
}: HomeActivityCardProps) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(activity.completed ?? false);

  const handleClick = async () => {
    // Evita clique duplicado se já estiver completado ou carregando
    if (completed || loading) return;

    setLoading(true);

    try {
      const response = await api.post("/api/progress/fulfillments", {
        activity_id: activity.id,
      });

      // Atualiza estado local do card
      setCompleted(true);

      // Atualiza o parent com os dados mais recentes
      onActivityUpdated({
        ...activity,
        completed: true,
        fulfillment: response.data.fulfillment, // opcional
      });
    } catch (err) {
      console.error("Error completing activity:", err);
      // Aqui você pode adicionar toast ou state de erro se quiser
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActivityCard
      name={activity.name}
      duration={activity.duration_minutes}
      completed={completed}
      loading={loading}
      onClick={handleClick}
    />
  );
}