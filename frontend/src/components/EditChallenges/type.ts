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

export type EditActivityCardProps = {
  activity: Activity;
  meta?: ActivityMeta;
  isSaving: boolean;
  isSaved: boolean;
  onChange: (updated: Activity) => void;
  onSave: () => void;
};

export type Challenge = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
};