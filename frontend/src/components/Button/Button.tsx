// src/components/Button/Button.tsx
import type { ButtonProps } from "./types";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  isLoading = false,
  type = "button",
  disabled = false,
  className = "",          
}: ButtonProps) => {
  const baseClasses = "rounded-lg font-semibold transition";

const variantClasses = {
  primary: "bg-primary hover:bg-primary/90 text-text-primary",   
  secondary: "bg-secondary hover:bg-secondary/80 text-white",
  destructive: "bg-error hover:bg-error/90 text-white",
}[variant];


  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }[size];

  const stateClasses =
    isLoading || disabled
      ? "opacity-60 cursor-not-allowed"
      : "cursor-pointer hover:opacity-90 active:opacity-80";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${className}`}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
};