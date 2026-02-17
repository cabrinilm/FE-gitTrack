// src/components/Button/Button.tsx
import type { ButtonProps } from "./types"

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  isLoading = false
}: ButtonProps) => {


  const baseClasses = "rounded-lg font-semibold transition"


  const variantClasses = {
    primary: "bg-primary hover:bg-primary-400 text-text-primary",
    secondary: "bg-secondary hover:bg-secondary-hover text-text-primary",
    destructive: "bg-error hover:bg-error-hover text-text-primary"
  }[variant]

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }[size]


  const loadingClasses = isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${loadingClasses}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  )
}
