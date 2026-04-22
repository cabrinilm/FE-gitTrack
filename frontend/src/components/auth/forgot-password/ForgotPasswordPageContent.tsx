import { ForgotPasswordForm } from "@/components/auth/forgot-password/ForgotPasswordForm";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export function ForgotPasswordPageContent() {
  const {
    formValues,
    error,
    successMessage,
    isLoading,
    canSubmit,
    updateField,
    handleSubmit,
  } = useForgotPassword();

  return (
    <ForgotPasswordForm
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