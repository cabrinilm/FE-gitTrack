import { Heatmap } from "@/components/ui/heatmap";
import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";

type HeatmapDay = {
  date: string;
  count: number;
};



export default function HeatmapPage() {

   const { token, user } = useAuth();

  const [data, setData] = useState<HeatmapDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    setApiToken(token);

    const loadHeatmap = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: heatmapData } =
          await api.get<HeatmapDay[]>("/api/progress/heatmap");

        console.log("heatmap response:", heatmapData);
        setData(heatmapData);
      } catch (err) {
        console.error("Failed to load heatmap:", err);
        setError("Failed to load heatmap");
      } finally {
        setLoading(false);
      }
    };

    loadHeatmap();
  }, [token, user]);

    
  const handleDayClick = (date: string) => {
    console.log("Clicou no dia:", date);

  
  };

  if (loading) return <div className="p-6">Carregando heatmap...</div>;

  return (
    <div className="p-6">
      <Heatmap data={data} onDayClick={handleDayClick} />
    </div>
  );
}