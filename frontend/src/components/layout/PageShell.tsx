import { cn } from "@/utils/cn";
import type { PageShellProps } from "./type";

export function PageShell({
  children,
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <main className={cn("w-full px-4 py-8 md:px-6", className)}>
      <div className={cn("mx-auto w-full max-w-4xl space-y-6", contentClassName)}>
        {children}
      </div>
    </main>
  );
}