// src/components/Input/InputForm.tsx  (ou Input.tsx, você decide o nome)

import type { InputProps } from "./types";

export const Input = ({
  value,
  onChange,
  placeholder = "",
  label = "",
  error,
  disabled = false,
  size = "md",
  required = false,
  className = "",
  type = "text",
}: InputProps) => {

  // ────────────────────────────────────────────────
  // 1. Classes base (todo input tem isso)
  // ────────────────────────────────────────────────
  const baseClasses = 
    "w-full rounded-lg font-normal transition-all duration-200 " +
    "bg-surface border border-border " +
    "text-text-primary placeholder:text-text-muted " +
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  // ────────────────────────────────────────────────
  // 2. Classes por tamanho (igual ao Button)
  // ────────────────────────────────────────────────
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-5 py-3 text-lg h-12",
  }[size];

  // ────────────────────────────────────────────────
  // 3. Classes de erro (sobrescreve border e focus)
  // ────────────────────────────────────────────────
  const errorClasses = error
    ? "border-error focus:border-error focus:ring-error/30"
    : "";

  // ────────────────────────────────────────────────
  // 4. Classes de disabled
  // ────────────────────────────────────────────────
  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed"
    : "";

  // ────────────────────────────────────────────────
  // 5. Junta tudo + className do usuário
  // ────────────────────────────────────────────────
  const inputClasses = [
    baseClasses,
    sizeClasses,
    errorClasses,
    disabledClasses,
    className,
  ].filter(Boolean).join(" ");

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label + required indicator */}
      {label && (
        <label className="text-sm font-medium text-text-primary flex items-center gap-1">
          {label}
          {required && <span className="text-error text-xs">*</span>}
        </label>
      )}

      {/* O input em si */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
      />

      {/* Mensagem de erro (abaixo) */}
      {error && (
        <span className="text-sm text-error mt-1">{error}</span>
      )}
    </div>
  );
};