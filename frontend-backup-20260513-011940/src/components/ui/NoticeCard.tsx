import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type NoticeCardVariant = "info" | "success" | "warning" | "streak";

type NoticeCardProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  variant?: NoticeCardVariant;
  className?: string;
};

const variantClasses: Record<NoticeCardVariant, string> = {
  info: "border-primary/25 bg-primary/10 text-primary",
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/25 bg-warning/10 text-warning",
  streak: "border-orange-500/25 bg-orange-500/10 text-orange-400",
};

export function NoticeCard({
  title,
  description,
  icon,
  variant = "info",
  className,
}: NoticeCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border px-4 py-3",
        variantClasses[variant],
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-current/10">
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-text-primary">{title}</p>

          {description && (
            <p className="text-xs text-text-muted">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}