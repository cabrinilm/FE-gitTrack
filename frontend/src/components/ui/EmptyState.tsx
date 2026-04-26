import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("py-12 text-center", className)}>
      <p className="text-lg font-medium text-text-primary">{title}</p>

      {description && (
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}