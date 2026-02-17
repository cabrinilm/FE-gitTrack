import type { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    variant?: "primary" | "secondary" | "destructive"
    isLoading?: boolean
    size?: "sm" | "md" | "lg"
};