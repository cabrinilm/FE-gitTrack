import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { mapAuthError } from "@/utils/authErrors";
import type { ForgotPasswordFormValues } from "@/components/auth/forgot-password/types";

export function useForgotPassword() {
  const navigate = useNavigate();
  const { recoverPassword } = useAuth();

  const [formValues, setFormValues] = useState<ForgotPasswordFormValues>({
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const redirectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const updateField = useCallback(
    (field: keyof ForgotPasswordFormValues, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      setError(null);
      setSuccessMessage(null);
    },
    [],
  );

  const isValidEmail = useMemo(() => {
    const email = formValues.email.trim();

    if (!email) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [formValues.email]);

  const canSubmit = useMemo(() => {
    return isValidEmail && !isLoading;
  }, [isValidEmail, isLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = formValues.email.trim();

      if (!email) {
        setError("Please type your email");
        setSuccessMessage(null);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setSuccessMessage(null);
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
          console.error("Password recovery failed:", {
            email,
            error: response.error,
          });
          return;
        }

        setSuccessMessage(
          "If an account with this email exists, a reset link has been sent. Redirecting to login...",
        );

        redirectTimeoutRef.current = window.setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } catch (err) {
        console.error("Unexpected password recovery error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [formValues.email, navigate, recoverPassword],
  );

  return {
    formValues,
    error,
    successMessage,
    isLoading,
    canSubmit,
    updateField,
    handleSubmit,
  };
}