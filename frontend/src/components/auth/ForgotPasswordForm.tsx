import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Link } from "react-router-dom";
import type { ForgotPasswordFormProps } from "@/components/auth/types";

export const ForgotPasswordForm = ({
  formValues,
  error,
  successMessage,
  isLoading,
  canSubmit,
  updateField,
  handleSubmit,
}: ForgotPasswordFormProps) => {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Recover Your Password
        </h1>
        <p className="mt-2 text-text-secondary">
          Enter your email to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={formValues.email}
          onChange={(value) => updateField("email", value)}
          placeholder="your@email.com"
        />

        {error && (
          <p className="mt-2 text-center text-sm text-error">{error}</p>
        )}

        {successMessage && (
          <p className="mt-2 text-center text-sm text-success">
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
          disabled={!canSubmit}
          className="w-full"
        >
          Send reset link
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-text-secondary">
        <span>Remembered your password?</span>{" "}
        <Link to="/auth/login" className="text-primary-400 hover:underline">
          Log in
        </Link>
      </div>
    </>
  );
};