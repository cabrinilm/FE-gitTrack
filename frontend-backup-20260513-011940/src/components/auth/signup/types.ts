import type { FormEvent } from "react";

export type SignupFormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type SignupFormProps = {
  formValues: SignupFormValues;
  error: string | null;
  successMessage: string | null;
  isLoading: boolean;
  canSubmit: boolean;
  updateField: (field: keyof SignupFormValues, value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};