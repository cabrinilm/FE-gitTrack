import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

type ListItemCardProps = ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
};

export function ListItemCard({
  children,
  className,
  interactive = false,
  isActive = false,
  isLoading = false,
  ...props
}: ListItemCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-surface p-4 transition-all duration-200",
        interactive &&
          "cursor-pointer hover:border-primary/40 hover:bg-primary/5 active:bg-primary/10",
        isActive && "border-primary/30 bg-primary/5",
        isLoading && "animate-pulse opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}