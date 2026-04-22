import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useNavigate, Link } from "react-router-dom";
import { mapAuthError } from "@/utils/authErrors";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { recoverPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 
    if (!email) {
      setError("Please type your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await recoverPassword(email);
      if (response.error) {
        const friendlyMessage = mapAuthError(response.error);
        setError(friendlyMessage);
        console.error("Password recovery failed:", { email, error: response.error });
      } else {
        setSuccessMessage(
          "If an account with this email exists, a reset link has been sent. Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
   
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">
          Recover Your Password
        </h1>
        <p className="text-text-secondary mt-2">Enter your email to reset your password</p>
      </div>

     
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="your@email.com"
        />

        {error && (
          <p className="text-error text-sm text-center mt-2">{error}</p>
        )}
        {successMessage && (
          <p className="text-success text-sm text-center mt-2">{successMessage}</p>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
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