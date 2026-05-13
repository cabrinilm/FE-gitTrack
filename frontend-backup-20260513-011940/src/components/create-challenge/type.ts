export type CreateChallengeFormValues = {
  name: string;
  description: string;
};

export type ChallengeActivityDraft = {
  id: string;
  name: string;
  hours: number | "";
  minutes: number | "";
};

export type CreateChallengeFormProps = {
  formValues: CreateChallengeFormValues;
  activities: ChallengeActivityDraft[];
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  canSubmit: boolean;
  updateField: (
    field: keyof CreateChallengeFormValues,
    value: string,
  ) => void;
  addActivity: () => void;
  updateActivity: (
    index: number,
    field: "name" | "hours" | "minutes",
    value: string | number,
  ) => void;
  removeActivity: (index: number) => void;
  handleSubmit: () => Promise<void>;
};