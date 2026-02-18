// src/pages/Login.tsx   (ou src/routes/Login.tsx)

import { useState } from "react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
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
        // Erro: mostra mensagem no formulário
        setError(
          response.error.message ||
            "Credenciais inválidas. Verifique email e senha.",
        );
      } else {
        // Sucesso: redireciona para a home (ou dashboard)
        navigate("/"); // ou '/dashboard', '/challenges', o que fizer sentido no seu app
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
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
