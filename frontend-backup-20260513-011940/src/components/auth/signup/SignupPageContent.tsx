import { SignupForm } from "@/components/auth/signup/SignupForm";
import { useSignup } from "@/hooks/useSignup";

export function SignupPageContent() {
  const {
    formValues,
    error,
    successMessage,
    isLoading,
    canSubmit,
    updateField,
    handleSubmit,
  } = useSignup();

  return (
    <SignupForm
      formValues={formValues}
      error={error}
      successMessage={successMessage}
      isLoading={isLoading}
      canSubmit={canSubmit}
      updateField={updateField}
      handleSubmit={handleSubmit}
    />
  );
}