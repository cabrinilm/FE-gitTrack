import { cn } from "@/utils/cn";
import type { PageShellProps } from "./types";
import { AppHeader } from "@/components/layout/header/AppHeader";

export function PageShell({
  children,
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <AppHeader />

      <main className="w-full px-4 py-6 md:px-6 md:py-8">
        <div
          className={cn(
            "mx-auto w-full max-w-4xl space-y-6",
            contentClassName,
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}