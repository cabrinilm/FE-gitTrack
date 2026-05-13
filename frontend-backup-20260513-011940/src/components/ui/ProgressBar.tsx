// import type { ReactNode } from "react";
// import { cn } from "@/utils/cn";

// type FormSectionProps = {
//   title: string;
//   description?: string;
//   action?: ReactNode;
//   children: ReactNode;
//   className?: string;
// };

// export function FormSection({
//   title,
//   description,
//   action,
//   children,
//   className,
// }: FormSectionProps) {
//   return (
//     <section className={cn("space-y-4", className)}>
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h3 className="text-lg font-medium text-text-primary">{title}</h3>

//           {description && (
//             <p className="mt-1 text-sm text-text-muted">{description}</p>
//           )}
//         </div>

//         {action && <div className="shrink-0">{action}</div>}
//       </div>

//       <div className="space-y-3">{children}</div>
//     </section>
//   );
// }



import { cn } from "@/utils/cn";

type ProgressBarProps = {
  value: number; // 0–100
  className?: string;
};

export function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div
      className={cn(
        "h-3 w-full overflow-hidden rounded-full border border-border/30 bg-surface-elevated",
        className,
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}