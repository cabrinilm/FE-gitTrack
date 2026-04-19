export type Profile = {
    name: string;
    email?: string;
}
 
export type ProfileFormValues = {
  name: string;
};

export type ProfileFormProps = {
  profile: Profile | null;
  formValues: ProfileFormValues;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  saved: boolean;
  canSave: boolean;
  updateField: (field: keyof ProfileFormValues, value: string) => void;
  handleSave: () => void;
};
