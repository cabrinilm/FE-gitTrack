import { useAuth } from "@/context/useAuth";

import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { mapAuthError } from "@/utils/authErrors";
import { Link } from "react-router-dom";

export const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email, password, confirmPassword, username]);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !username || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validação extra: senha mínima 6 caracteres
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Validação simples de email (regex básica)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await signUp(email, password, username);
      if (response.error) {
        const friendlyMessage = mapAuthError(response.error);
        setError(friendlyMessage);
        console.error("Signup failed:", { email, error: response.error });
      } else {
        setSuccessMessage("Account created! Redirecting to login...");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">
          Create your account
        </h1>
        <p className="text-text-secondary mt-2">Sign up to get started</p>
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
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="yourusername"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="••••••••"
        />

        {error && (
          <p className="text-error text-sm text-center mt-2">{error}</p>
        )}
        {successMessage && (
          <p className="text-success text-sm text-center mt-2">
            {successMessage}
          </p>
        )}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
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
