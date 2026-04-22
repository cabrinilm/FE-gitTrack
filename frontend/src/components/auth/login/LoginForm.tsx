import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Link } from "react-router-dom";
import type { LoginFormProps } from "./types";

export default function LoginForm({
  formValues,
  error,
  isLoading,
  canSubmit,
  updateField,
  handleSubmit,
}: LoginFormProps) {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
        <p className="mt-2 text-text-secondary">Sign in to your account</p>
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
          label="Password"
          type="password"
          value={formValues.password}
          onChange={(value) => updateField("password", value)}
          placeholder="••••••••"
        />

        {error && (
          <p className="mt-2 text-center text-sm text-error">{error}</p>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
          disabled={!canSubmit}
          className="w-full"
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-text-secondary">
        <Link to="/auth/forgot" className="text-primary-400 hover:underline">
          Forgot password?
        </Link>
        <span className="mx-3">•</span>

        <Link to="/auth/signup" className="text-primary-400 hover:underline">
          Create account
        </Link>
      </div>
    </>
  );
}