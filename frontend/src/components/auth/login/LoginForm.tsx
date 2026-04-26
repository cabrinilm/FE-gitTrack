import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { StatusMessage } from "@/components/ui/StatusMessage";
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
        <FormField label="Email">
          <Input
            type="email"
            value={formValues.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
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

        {error && <StatusMessage type="error" message={error} />}

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