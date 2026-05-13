export type ForgotPasswordFormValues = {
  email: string;
};

export type ForgotPasswordFormProps = {
  formValues: ForgotPasswordFormValues;
  error: string | null;
  successMessage: string | null;
  isLoading: boolean;
  canSubmit: boolean;
  updateField: (
    field: keyof ForgotPasswordFormValues,
    value: string,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};