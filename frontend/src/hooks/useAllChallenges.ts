import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type { Challenge } from "@/components/all-challenges/types";

export function useAllChallenges() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loadChallenges = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);
    setIsLoading(true);
    setError(null);

    try {
      const { data: allChallenges } =
        await api.get<Challenge[]>("/api/challenges");

      if (!allChallenges || allChallenges.length === 0) {
        setChallenges([]);
        return;
      }

      const { data: activeChallenge } = await api.get<Challenge | null>(
        "/api/active-challenge",
      );

      const challengesWithStatus = allChallenges.map((challenge) => ({
        ...challenge,
        isActive: activeChallenge?.id === challenge.id,
      }));

      setChallenges(challengesWithStatus);
    } catch (err) {
      console.error("Failed to load challenges:", err);
      setError("Failed to load challenges");
      setChallenges([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  const handleActivate = useCallback(
    async (id: string) => {
      if (!token || !user) {
        setError("Authentication required");
        return;
      }

      setApiToken(token);
      setActivatingId(id);
      setError(null);

      try {
        await api.post(`/api/challenges/${id}/activate`);
        await loadChallenges();
      } catch (err) {
        console.error("Failed to activate challenge:", err);
        setError("Failed to activate challenge");
      } finally {
        setActivatingId(null);
      }
    },
    [token, user, loadChallenges],
  );

  const handleRemove = useCallback(
    async (id: string) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this challenge?",
      );

      if (!confirmDelete) return;

      if (!token || !user) {
        setError("Authentication required");
        return;
      }

      setApiToken(token);
      setRemovingId(id);
      setError(null);

      try {
        await api.delete(`/api/challenges/${id}`);
        setChallenges((prev) => prev.filter((challenge) => challenge.id !== id));
      } catch (err) {
        console.error("Failed to delete challenge:", err);
        setError("Failed to delete challenge");
      } finally {
        setRemovingId(null);
      }
    },
    [token, user],
  );

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/app/challenges/${id}/edit`);
    },
    [navigate],
  );

  const hasNoChallenges = useMemo(
    () => !isLoading && challenges.length === 0,
    [isLoading, challenges],
  );

  return {
    challenges,
    isLoading,
    error,
    hasNoChallenges,
    activatingId,
    removingId,
    reloadChallenges: loadChallenges,
    handleActivate,
    handleRemove,
    handleEdit,
  };
}