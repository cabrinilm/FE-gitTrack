import { useAuth } from "@/context/useAuth";
import type { SignupFormProps } from "./type";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const SignupForm = (props: SignupFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState<string>("");

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
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await signUp(email, password, username);
      if (response.error) {
        setError(response.error.message);
      } else {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      <Input
        label="Password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="••••••••"
      />

      <Input
        label="Name"
        type="text"
        value={username}
        onChange={setUserName}
        placeholder="name"
      />
      {error && <p className="text-error text-sm text-center mt-2">{error}</p>}

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Sign Up
      </Button>
    </form>
  );
};
