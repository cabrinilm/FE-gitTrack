import { useState, useEffect } from "react";
import { Heatmap } from "@/components/ui/heatmap";

type HeatmapDay = {
  date: string;
  count: number;
};

export default function HeatmapPage() {
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/progress/heatmap");
        
        if (!res.ok) throw new Error("Failed to fetch heatmap data");
        
        const data: HeatmapDay[] = await res.json();
        setHeatmapData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar heatmap");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeatmapData();
  }, []);

  const handleDayClick = (date: string) => {
    console.log("Clicou no dia:", date);
    // Aqui depois vamos chamar o segundo endpoint: /api/progress/:date/fulfillments
  };

  if (isLoading) return <div className="p-6">Carregando heatmap...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Heatmap de Progresso</h1>
        <p className="text-muted-foreground">Últimos 12 meses • Atividades concluídas por dia</p>
      </div>

      <Heatmap 
        data={heatmapData} 
        onDayClick={handleDayClick} 
      />
    </div>
  );
}