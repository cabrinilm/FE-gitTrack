export type ChallengeCardProps = {
  challenge: {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    isActive?: boolean;
    
  };
  onRemove?: () => void;
  onToggleActive?: () => void;
  onEdit?: () => void;
};

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