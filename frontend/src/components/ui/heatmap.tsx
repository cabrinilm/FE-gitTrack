import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type HeatmapDay = {
  date: string;        // formato "YYYY-MM-DD"
  count: number;       // quantidade de activities concluídas naquele dia
};

interface HeatmapProps {
  data: HeatmapDay[];
  onDayClick?: (date: string) => void;
  className?: string;
}

const LEVEL_COLORS = {
  0: "bg-gray-200 dark:bg-gray-800",
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
  // Gera os últimos 12 meses (aprox 365 dias)
  const generateLast12Months = React.useMemo(() => {
    const days: HeatmapDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
      
      const dayData = data.find(d => d.date === dateStr);
      
      days.push({
        date: dateStr,
        count: dayData?.count || 0,
      });
    }
    return days;
  }, [data]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Seu progresso anual</h2>
        <p className="text-sm text-muted-foreground">
          Últimos 12 meses
        </p>
      </div>

      <TooltipProvider>
        <div className="grid grid-cols-53 gap-1 p-3 bg-muted/50 rounded-xl border">
          {generateLast12Months.map((day) => {
            const level = getIntensityLevel(day.count);
            
            return (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-125",
                      LEVEL_COLORS[level]
                    )}
                    onClick={() => onDayClick?.(day.date)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {day.count} {day.count === 1 ? "atividade" : "atividades"} concluídas
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      {/* Legenda */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Menos</span>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn("w-3 h-3 rounded-sm", LEVEL_COLORS[i as keyof typeof LEVEL_COLORS])}
            />
          ))}
        </div>
        <span>Mais</span>
      </div>
    </div>
  );
}