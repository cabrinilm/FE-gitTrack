import { cn } from "@/utils/cn";
import type { PageShellProps } from "./type";
import { AppHeader } from "../Header/AppHeader";


export function PageShell({
  children,
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
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