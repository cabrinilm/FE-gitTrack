import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type StandardCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  actions?: ReactNode;
};

export function StandardCard({
  title,
  description,
  children,
  className,
  contentClassName,
  headerClassName,
  actions,
}: StandardCardProps) {
  const hasHeader = title || description || actions;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-lg",
        className,
      )}
    >
      {hasHeader && (
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b border-border bg-primary/10 px-6 py-5",
            headerClassName,
          )}
        >
          <div className="min-w-0">
            {title && (
              <h2 className="text-2xl font-bold text-primary">{title}</h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      <div className={cn("space-y-10 p-6", contentClassName)}>{children}</div>
    </div>
  );
}