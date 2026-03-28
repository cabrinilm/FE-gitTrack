import { Heatmap } from "@/components/ui/heatmap";
import { useState, useEffect } from "react";

export default function HeatmapPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress/heatmap")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

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