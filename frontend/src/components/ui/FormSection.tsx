import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type FormSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function FormSection({
  title,
  description,
  action,
  children,
  className,
}: FormSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-text-primary">{title}</h3>

          {description && (
            <p className="mt-1 text-sm text-text-muted">{description}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
}