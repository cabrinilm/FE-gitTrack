import type { ActivityCardProps } from "./type"
import { FaCheck } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";


export function ActivityCard({
  name,
  duration,
  completed = false,
  loading = false,
  onClick,
  children,
}: ActivityCardProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border border-border/50 transition-all duration-200",
        completed && "bg-primary/5 opacity-90",
        loading && "opacity-70 animate-pulse",
        !completed && onClick && "cursor-pointer hover:bg-primary/5 hover:border-primary/30 active:bg-primary/10"
      )}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Status Circle */}
      <div className="shrink-0">
        <div
          className={cn(
            "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors",
            completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground bg-transparent hover:border-primary"
          )}
        >
          {completed && <FaCheck className="w-4 h-4" />}
          {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        </div>
      </div>

      {/* Activity Name */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-base font-medium text-foreground",
            completed && "line-through text-muted-foreground"
          )}
        >
          {name}
        </p>
      </div>

      {/* Duration */}
      <div className="shrink-0 text-sm text-muted-foreground">{duration} min</div>

      {/* Slot para children */}
      {children}
    </div>
  );
}