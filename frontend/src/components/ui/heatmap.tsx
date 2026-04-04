import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type HeatmapDay = {
  date: string;        // "YYYY-MM-DD"
  count: number;       // quantidade de atividades concluídas
};

interface HeatmapProps {
  data: HeatmapDay[];
  onDayClick?: (date: string) => void;
  className?: string;
}

const LEVEL_COLORS = {
  0: "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700",
  1: "bg-emerald-300 hover:bg-emerald-400",
  2: "bg-emerald-500 hover:bg-emerald-600",
  3: "bg-emerald-700 hover:bg-emerald-800",
} as const;

function getIntensityLevel(count: number): 0 | 1 | 2 | 3 {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  return 3; // 4 ou mais
}

export function Heatmap({ data = [], onDayClick, className }: HeatmapProps) {
  // Gera os últimos 12 meses (~365 dias)
  const heatmapDays = React.useMemo(() => {
    const days: HeatmapDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const dayData = data.find((d) => d.date === dateStr);

      days.push({
        date: dateStr,
        count: dayData?.count || 0,
      });
    }
    return days;
  }, [data]);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Heatmap de Progresso</h2>
        <p className="text-sm text-muted-foreground">Últimos 12 meses</p>
      </div>

      <TooltipProvider>
        <div className="grid grid-cols-53 gap-1 p-4 bg-muted/50 rounded-2xl border">
          {heatmapDays.map((day) => {
            const level = getIntensityLevel(day.count);

            return (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-3 h-3 rounded-sm cursor-pointer transition-all active:scale-90",
                      LEVEL_COLORS[level]
                    )}
                    onClick={() => onDayClick?.(day.date)}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-center">
                  <p className="font-medium">{day.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {day.count} {day.count === 1 ? "atividade concluída" : "atividades concluídas"}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

    
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>Menos</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((level) => (
            <div
              key={level}
              className={cn("w-3 h-3 rounded-sm", LEVEL_COLORS[level as keyof typeof LEVEL_COLORS])}
            />
          ))}
        </div>
        <span>Mais</span>
      </div>
    </div>
  );
}