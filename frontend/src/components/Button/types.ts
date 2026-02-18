export interface ButtonProps {
  children: React.ReactNode;           // ou ReactNode se já tiver o import
  onClick?: () => void;                // ou com MouseEvent se preferir
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;

  // ── adicione essa linha ────────
  className?: string;
}