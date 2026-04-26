import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ListItemCardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

export function ListItemCard({
  children,
  className,
  interactive = false,
  isActive = false,
  isLoading = false,
  onClick,
}: ListItemCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border/60 bg-surface p-4 transition-all duration-200",
        interactive &&
          "cursor-pointer hover:border-primary/40 hover:bg-primary/5 active:bg-primary/10",
        isActive && "border-primary/30 bg-primary/5",
        isLoading && "animate-pulse opacity-70",
        className,
      )}
    >
      {children}
    </div>
  );
}