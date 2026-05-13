import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

type LoadingStateProps = {
  message?: string;
  className?: string;
};

export function LoadingState({
  message = "Loading...",
  className,
}: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />

      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}