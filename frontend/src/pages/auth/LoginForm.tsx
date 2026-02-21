import { useState } from "react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await signIn(email, password);
      if (response.error) {
        setError(response.error.message);
      } else {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
        <p className="text-text-secondary mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="your@email.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        {error && (
          <p className="text-error text-sm text-center mt-2">{error}</p>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Sign in
        </Button>
      </form>

      {/* Links below */}
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
