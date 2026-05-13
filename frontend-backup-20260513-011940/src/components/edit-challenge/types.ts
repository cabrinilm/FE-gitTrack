export type Challenge = {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
};

export type Activity = {
  id: string;
  name: string;
  duration_minutes: number;
};

export type ActivityMeta = {
  isValid: boolean;
  hasChanges: boolean;
  canSave: boolean;
};

export type EditChallengeFormProps = {
  challengeName: string;
  challengeDescription: string;
  onChallengeNameChange: (value: string) => void;
  onChallengeDescriptionChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
  canSave: boolean;
  saved: boolean;
  error: string | null;
};

export type EditActivityCardProps = {
  activity: Activity;
  meta?: ActivityMeta;
  isSaving: boolean;
  isSaved: boolean;
  isDeleting: boolean;
  onChange: (updated: Activity) => void;
  onSave: () => void;
  onDelete: () => void;
};

export type AddActivityFormProps = {
  activityCount: number;
  maxActivities: number;
  name: string;
  durationMinutes: string;
  isAdding: boolean;
  added: boolean;
  error: string | null;
  canAdd: boolean;
  hasReachedLimit: boolean;
  onNameChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
};