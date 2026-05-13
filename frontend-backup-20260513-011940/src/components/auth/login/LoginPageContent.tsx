import LoginForm from "./LoginForm";
import { useLogin } from "@/hooks/useLogin";

export function LoginPageContent() {
  const {
    formValues,
    error,
    isLoading,
    canSubmit,
    updateField,
    handleSubmit,
  } = useLogin();

  return (
    <LoginForm
      formValues={formValues}
      error={error}
      isLoading={isLoading}
      canSubmit={canSubmit}
      updateField={updateField}
      handleSubmit={handleSubmit}
    />
  );
}