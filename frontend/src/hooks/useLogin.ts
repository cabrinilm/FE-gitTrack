import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import type { LoginFormValues } from "@/components/auth/login/types";

export function useLogin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback(
    (field: keyof LoginFormValues, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    [],
  );

  const isValid = useMemo(() => {
    return (
      formValues.email.trim().length > 0 &&
      formValues.password.trim().length > 0
    );
  }, [formValues.email, formValues.password]);

  const canSubmit = useMemo(() => {
    return isValid && !isLoading;
  }, [isValid, isLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = formValues.email.trim();
      const password = formValues.password;

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
          return;
        }

        navigate("/");
      } finally {
        setIsLoading(false);
      }
    },
    [formValues.email, formValues.password, navigate, signIn],
  );

  return {
    formValues,
    error,
    isLoading,
    canSubmit,
    updateField,
    handleSubmit,
  };
}