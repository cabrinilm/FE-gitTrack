import type { InputProps } from "./types";

export const Input = ({
  value,
  onChange,
  placeholder = "",
  label = "",
  error,
  disabled = false,
  size = "md",
  className = "",
  type = "text",
}: InputProps) => {
  const baseClasses =
    "w-full rounded-lg font-normal transition-all duration-200 " +
    "bg-surface border border-border " +
    "text-text-primary placeholder:text-text-muted " +
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-5 py-3 text-lg h-12",
  }[size];

  const errorClasses = error
    ? "border-error focus:border-error focus:ring-error/30"
    : "";

  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "";

  const inputClasses = [
    baseClasses,
    sizeClasses,
    errorClasses,
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary flex items-center gap-1">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
      />

      {error && <span className="text-sm text-error mt-1">{error}</span>}
    </div>
  );
};
