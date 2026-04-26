import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  helperText?: string;
  error?: string;
  className?: string;
};

export function FormField({
  label,
  children,
  helperText,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-text-primary">
        {label}
      </label>

      {children}

      {error ? (
        <p className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}