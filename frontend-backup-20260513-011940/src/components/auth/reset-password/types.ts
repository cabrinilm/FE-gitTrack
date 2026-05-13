import type { FormEvent } from "react";

export type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordFormProps = {
  formValues: ResetPasswordFormValues;
  error: string | null;
  successMessage: string | null;
  isLoading: boolean;
  canSubmit: boolean;
  updateField: (
    field: keyof ResetPasswordFormValues,
    value: string,
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};