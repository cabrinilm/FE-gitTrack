import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
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
        <Input
          label="New Password"
          type="password"
          value={formValues.newPassword}
          onChange={(value) => updateField("newPassword", value)}
          placeholder="Enter new password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={formValues.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
          placeholder="Confirm new password"
        />

        {error && <p className="text-center text-sm text-error">{error}</p>}

        {successMessage && (
          <p className="text-center text-sm text-success">{successMessage}</p>
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