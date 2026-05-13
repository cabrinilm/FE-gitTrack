export type Challenge = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  isActive?: boolean;
};

export type Activity = {
  id: string;
  name: string;
  duration_minutes: number;
};

export type ChallengeCardProps = {
  challenge: Challenge;
  onRemove?: () => void;
  onToggleActive?: () => void;
  onEdit?: () => void;
};

export type AllChallengesListProps = {
  challenges: Challenge[];
  isLoading: boolean;
  error: string | null;
  hasNoChallenges: boolean;
  onRetry: () => void;
  onActivate: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
};