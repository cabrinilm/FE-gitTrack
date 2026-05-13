import type { FormEvent } from "react";


export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  formValues: LoginFormValues;
  error: string | null;
  isLoading: boolean;
  canSubmit: boolean;
  updateField: (field: keyof LoginFormValues, value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};