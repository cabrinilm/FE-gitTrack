import { ResetPasswordForm } from "./ResetPasswordForm";
import { useResetPassword } from "@/hooks/useResetPassword";

export function ResetPasswordPageContent() {
  const {
    formValues,
    error,
    successMessage,
    isLoading,
    canSubmit,
    updateField,
    handleSubmit,
  } = useResetPassword();

  return (
    <ResetPasswordForm
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