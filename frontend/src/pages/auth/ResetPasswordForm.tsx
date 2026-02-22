import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/context/useAuth";
import { supabase } from "@/lib/supabaseClient";

export const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { resetPasswordWithToken } = useAuth();
  const navigate = useNavigate();

  // Detecta se o usuário abriu a página com token de recuperação
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecoveryMode(true);
      }
    });

    // Cleanup
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const response = await resetPasswordWithToken(newPassword);

    if (response.error) {
      setError(response.error.message || "Failed to update password");
    } else {
      setSuccessMessage("Password updated successfully! Redirecting...");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
    setIsLoading(false);
  };

  if (!isRecoveryMode) {
    return (
      <div className="text-center mt-10">
        <p className="text-error text-sm">
          Invalid or expired recovery link.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">
          Reset your password
        </h1>
        <p className="mt-2 text-text-secondary">
          Type your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm new password"
        />

        {error && <p className="text-error text-sm text-center">{error}</p>}
        {successMessage && (
          <p className="text-success text-sm text-center">{successMessage}</p>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Update Password
        </Button>
      </form>
    </>
  );
};