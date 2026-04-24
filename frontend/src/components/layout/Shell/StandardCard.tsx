import { cn } from "@/utils/cn";
import type { StandardCardProps } from "./types";

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
  const isCentered = !actions;

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
            "border-b border-border bg-primary/10 px-6 py-5",
            isCentered
              ? "flex flex-col items-center text-center"
              : "flex items-start justify-between gap-4",
            headerClassName,
          )}
        >
          <div className={cn("min-w-0", isCentered && "text-center")}>
            {title && (
              <h2 className="text-2xl font-bold text-primary">
                {title}
              </h2>
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

      <div className={cn("space-y-10 p-6", contentClassName)}>
        {children}
      </div>
    </div>
  );
}