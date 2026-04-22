import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

type HeatmapDay = {
  date: string;
  count: number;
};

interface HeatmapProps {
  data: HeatmapDay[];
  onDayClick?: (date: string) => void;
  className?: string;
}

const LEVEL_COLORS = {
  0: "bg-zinc-600/60 hover:bg-zinc-700/80",
  1: "bg-emerald-300 hover:bg-emerald-400",
  2: "bg-emerald-500 hover:bg-emerald-600",
  3: "bg-emerald-700 hover:bg-emerald-800",
} as const;

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getIntensityLevel(count: number): 0 | 1 | 2 | 3 {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  return 3;
}

function formatDateToLocalISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - day);
  result.setHours(0, 0, 0, 0);
  return result;
}

function endOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() + (6 - day));
  result.setHours(0, 0, 0, 0);
  return result;
}

export function Heatmap({ data = [], onDayClick, className }: HeatmapProps) {
  const weeks = React.useMemo(() => {
    const dataMap = new Map(data.map((item) => [item.date, item.count]));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rangeStart = new Date(today);
    rangeStart.setDate(today.getDate() - 364);

    const calendarStart = startOfWeek(rangeStart);
    const calendarEnd = endOfWeek(today);

    const days: HeatmapDay[] = [];
    const current = new Date(calendarStart);

    while (current <= calendarEnd) {
      const dateStr = formatDateToLocalISO(current);

      days.push({
        date: dateStr,
        count: dataMap.get(dateStr) || 0,
      });

      current.setDate(current.getDate() + 1);
    }

    const groupedWeeks: HeatmapDay[][] = [];

    for (let i = 0; i < days.length; i += 7) {
      groupedWeeks.push(days.slice(i, i + 7));
    }

    return groupedWeeks;
  }, [data]);

  const monthLabels = React.useMemo(() => {
    return weeks.map((week, weekIndex) => {
      const firstDay = week[0];
      if (!firstDay) return null;

      const date = new Date(`${firstDay.date}T00:00:00`);
      const month = date.getMonth();

      const previousWeek = weeks[weekIndex - 1];
      if (!previousWeek) {
        return {
          label: MONTH_LABELS[month],
          weekIndex,
        };
      }

      const previousDate = new Date(`${previousWeek[0].date}T00:00:00`);
      const previousMonth = previousDate.getMonth();

      if (month !== previousMonth) {
        return {
          label: MONTH_LABELS[month],
          weekIndex,
        };
      }

      return null;
    });
  }, [weeks]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-end">
        <p className="text-sm text-muted-foreground">Last 12 months</p>
      </div>

      <TooltipProvider>
        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card p-4">
          <div className="min-w-max">
            <div className="mb-2 flex">
              <div className="w-8 shrink-0" />
              <div className="flex gap-1">
                {monthLabels.map((item, index) => (
                  <div
                    key={index}
                    className="text-[11px] leading-3 text-muted-foreground"
                    style={{ width: "12px" }}
                  >
                    {item ? item.label : ""}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-1 text-[10px] leading-3 text-muted-foreground">
                {WEEKDAY_LABELS.map((dayLabel, index) => (
                  <div key={dayLabel} className="flex h-2.5 items-center">
                    {index === 1 || index === 3 || index === 5 ? dayLabel : ""}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day) => {
                      const level = getIntensityLevel(day.count);

                      return (
                        <Tooltip key={day.date}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              aria-label={`${day.date}: ${day.count} completed activities`}
                              className={cn(
                                "h-2.5 w-2.5 rounded-xs border border-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20",
                                LEVEL_COLORS[level],
                              )}
                              onClick={() => onDayClick?.(day.date)}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-center">
                            <p className="font-medium">{day.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {day.count}{" "}
                              {day.count === 1
                                ? "completed activity"
                                : "completed activities"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>

      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((level) => (
            <div
              key={level}
              className={cn(
                "h-2.5 w-2.5 rounded-xs border border-white/5",
                LEVEL_COLORS[level as keyof typeof LEVEL_COLORS],
              )}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}