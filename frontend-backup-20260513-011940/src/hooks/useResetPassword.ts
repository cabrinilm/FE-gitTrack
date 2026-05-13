import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import type { ResetPasswordFormValues } from "@/components/auth/reset-password/types";

export function useResetPassword() {
  const navigate = useNavigate();
  const { resetPasswordWithToken } = useAuth();

  const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
    newPassword: "",
    confirmPassword: "",
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
    (field: keyof ResetPasswordFormValues, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    [],
  );

  const isValid = useMemo(() => {
    const { newPassword, confirmPassword } = formValues;

    return (
      newPassword.length >= 6 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword
    );
  }, [formValues]);

  const canSubmit = useMemo(() => {
    return isValid && !isLoading;
  }, [isValid, isLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      const { newPassword, confirmPassword } = formValues;

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

      try {
        const response = await resetPasswordWithToken(newPassword);

        if (response.error) {
          setError(response.error.message || "Invalid or expired recovery link");
          return;
        }

        setSuccessMessage("Password updated successfully! Redirecting...");

        redirectTimeoutRef.current = window.setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    },
    [formValues, navigate, resetPasswordWithToken],
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