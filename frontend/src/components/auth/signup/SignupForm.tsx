import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
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
        <Input
          label="Email"
          type="email"
          value={formValues.email}
          onChange={(value) => updateField("email", value)}
          placeholder="your@email.com"
        />

        <Input
          label="Username"
          type="text"
          value={formValues.username}
          onChange={(value) => updateField("username", value)}
          placeholder="yourusername"
        />

        <Input
          label="Password"
          type="password"
          value={formValues.password}
          onChange={(value) => updateField("password", value)}
          placeholder="••••••••"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={formValues.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
          placeholder="••••••••"
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