import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { StatusMessage } from "@/components/ui/StatusMessage";
import type { ResetPasswordFormProps } from "./types";

export const ResetPasswordForm = ({
  formValues,
  error,
  successMessage,
  isLoading,
  canSubmit,
  updateField,
  handleSubmit,
}: ResetPasswordFormProps) => {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Reset your password
        </h1>
        <p className="mt-2 text-text-secondary">
          Type your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="New Password">
          <Input
            type="password"
            value={formValues.newPassword}
            onChange={(e) => updateField("newPassword", e.target.value)}
            placeholder="Enter new password"
          />
        </FormField>

        <FormField label="Confirm Password">
          <Input
            type="password"
            value={formValues.confirmPassword}
            onChange={(e) =>
              updateField("confirmPassword", e.target.value)
            }
            placeholder="Confirm new password"
          />
        </FormField>

        {error && <StatusMessage type="error" message={error} />}

        {successMessage && (
          <StatusMessage type="success" message={successMessage} />
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
          disabled={!canSubmit}
          className="w-full"
        >
          Update Password
        </Button>
      </form>
    </>
  );
};