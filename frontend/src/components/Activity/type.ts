import type { ReactNode } from "react";


export interface ActivityCardProps {
  name: string;              // Nome da atividade
  duration: number;          // Duração da atividade em minutos
  completed?: boolean;       // Se a atividade já está concluída (opcional)
  loading?: boolean;         // Se a atividade está em processo de marcação (opcional)
  onClick?: () => void;      // Função de callback ao clicar no card (opcional)
  children?: ReactNode;      // Permite injetar elementos extras, como botões
}

export interface Activity {
    id: number;
    name:string,
    duration_minutes: number;
}

export interface ActivityWithProgress extends Activity {
  completed: boolean;
}

export interface HomeActivityCardProps {
    activity: ActivityWithProgress;
    onComplete: (activityId: number) => void;
    isLoading?: boolean;
}

export interface ChallengeActivityCardProps {
  activity: Activity;
  onUpdate: (activity: Activity) => void;
  onDelete: (activityId: number) => void;
}