import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { mapAuthError } from "@/utils/authErrors";
import type { SignupFormValues } from "@/components/auth/signup/types";

export function useSignup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: "",
    username: "",
    password: "",
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
    (field: keyof SignupFormValues, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    [],
  );

  const isValid = useMemo(() => {
    const email = formValues.email.trim();
    const username = formValues.username.trim();
    const password = formValues.password;
    const confirmPassword = formValues.confirmPassword;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      email.length > 0 &&
      username.length > 0 &&
      password.length >= 6 &&
      confirmPassword.length > 0 &&
      password === confirmPassword &&
      emailRegex.test(email)
    );
  }, [
    formValues.email,
    formValues.username,
    formValues.password,
    formValues.confirmPassword,
  ]);

  const canSubmit = useMemo(() => {
    return isValid && !isLoading;
  }, [isValid, isLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = formValues.email.trim();
      const username = formValues.username.trim();
      const password = formValues.password;
      const confirmPassword = formValues.confirmPassword;

      if (!email || !password || !username || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
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
        const response = await signUp(email, password, username);

        if (response.error) {
          const friendlyMessage = mapAuthError(response.error);
          setError(friendlyMessage);
          console.error("Signup failed:", { email, error: response.error });
          return;
        }

        setSuccessMessage("Account created! Redirecting to login...");

        redirectTimeoutRef.current = window.setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    },
    [
      formValues.email,
      formValues.username,
      formValues.password,
      formValues.confirmPassword,
      navigate,
      signUp,
    ],
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