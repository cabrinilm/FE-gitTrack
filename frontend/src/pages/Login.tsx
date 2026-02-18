// src/pages/Login.tsx   (ou src/routes/Login.tsx)

import { useState } from "react";
import { Input } from "@/components/Input/Input"; // ajuste o caminho conforme seu projeto
import { Button } from "@/components/Button/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simple simulation — later replaced with real fetch/axios
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    // fake delay
    setTimeout(() => {
      setIsLoading(false);
      // here would come the real login logic
      alert("Simulated login successful!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-xl border border-border p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-text-secondary mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
            required
            error={error && !email ? "Required field" : undefined}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
            error={error && !password ? "Required field" : undefined}
          />




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
          <a href="#" className="text-primary hover:underline">
            Forgot password?
          </a>
          <span className="mx-3">•</span>
          <a href="/signup" className="text-primary hover:underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
}
