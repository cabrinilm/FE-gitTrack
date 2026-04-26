import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Link } from "react-router-dom";
import type { SignupFormProps } from "./types";

export const SignupForm = ({
  formValues,
  error,
  successMessage,
  isLoading,
  canSubmit,
  updateField,
  handleSubmit,
}: SignupFormProps) => {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Create your account
        </h1>
        <p className="mt-2 text-text-secondary">Sign up to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Email">
          <Input
            type="email"
            value={formValues.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
          />
        </FormField>

        <FormField label="Username">
          <Input
            type="text"
            value={formValues.username}
            onChange={(e) => updateField("username", e.target.value)}
            placeholder="yourusername"
          />
        </FormField>

        <FormField label="Password">
          <Input
            type="password"
            value={formValues.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="••••••••"
          />
        </FormField>

        <FormField label="Confirm Password">
          <Input
            type="password"
            value={formValues.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            placeholder="••••••••"
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
          Sign up
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-text-secondary">
        <span>Already have an account?</span>{" "}
        <Link to="/auth/login" className="text-primary-400 hover:underline">
          Log in
        </Link>
      </div>
    </>
  );
};