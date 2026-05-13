import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted",
        "transition outline-none",
        "focus:border-primary focus:ring-2 focus:ring-primary/25",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}