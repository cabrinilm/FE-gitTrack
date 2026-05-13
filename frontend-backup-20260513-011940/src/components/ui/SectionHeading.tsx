import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}