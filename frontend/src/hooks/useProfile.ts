import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api, setApiToken } from "@/lib/api";
import type { Profile, ProfileFormValues } from "@/components/Profile/type";
import { useAuth } from "@/context/useAuth";

export function useProfile() {
  const { token, user } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [formValues, setFormValues] = useState<ProfileFormValues>({
    name: "",
  });

  const [originalValues, setOriginalValues] = useState<ProfileFormValues>({
    name: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const savedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimeoutRef.current) {
        window.clearTimeout(savedTimeoutRef.current);
      }
    };
  }, []);

  const loadProfile = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get<Profile>("/api/profile");

      const safeProfile: Profile = {
        name: data?.name ?? "",
        email: data?.email ?? "",
      };

      setProfile(safeProfile);
      setFormValues({
        name: safeProfile.name,
      });
      setOriginalValues({
        name: safeProfile.name,
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
      setError("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateField = useCallback(
    (field: keyof ProfileFormValues, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
      setSaved(false);
    },
    [],
  );

  const hasChanges = useMemo(() => {
    return formValues.name !== originalValues.name;
  }, [formValues, originalValues]);

  const isValid = useMemo(() => {
    return formValues.name.trim().length > 0;
  }, [formValues]);

  const canSave = isValid && hasChanges && !isSaving;

  const handleSave = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      return;
    }

    if (!canSave) return;

    setApiToken(token);
    setIsSaving(true);
    setSaved(false);
    setError(null);

    try {
      const payload = {
        name: formValues.name.trim(),
      };

      const { data } = await api.patch<Profile>("/api/profile", payload);

      const updatedProfile: Profile = {
        name: data?.name ?? payload.name,
        email: data?.email ?? profile?.email ?? "",
      };

      setProfile(updatedProfile);
      setFormValues({
        name: updatedProfile.name,
      });
      setOriginalValues({
        name: updatedProfile.name,
      });
      setSaved(true);

      if (savedTimeoutRef.current) {
        window.clearTimeout(savedTimeoutRef.current);
      }

      savedTimeoutRef.current = window.setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  }, [token, user, canSave, formValues, profile]);

  return {
    profile,
    formValues,
    isLoading,
    isSaving,
    saved,
    error,
    canSave,
    hasChanges,
    isValid,
    updateField,
    handleSave,
    reloadProfile: loadProfile,
  };
}
