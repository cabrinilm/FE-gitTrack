import { useCallback, useEffect, useState } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import type {
  Fulfillment,
  FulfillmentsResponse,
  HeatmapDay,
} from "@/components/heatmap/types";

export function useHeatmap() {
  const { token, user } = useAuth();

  const [data, setData] = useState<HeatmapDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [fulfillments, setFulfillments] = useState<Fulfillment[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const loadHeatmap = useCallback(async () => {
    if (!token || !user) {
      setError("Authentication required");
      setIsLoading(false);
      return;
    }

    setApiToken(token);
    setIsLoading(true);
    setError(null);

    try {
      const { data: heatmapData } = await api.get<HeatmapDay[]>(
        "/api/progress/heatmap",
      );

      setData(heatmapData ?? []);
    } catch (err) {
      console.error("Failed to load heatmap:", err);
      setError("Failed to load heatmap");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    loadHeatmap();
  }, [loadHeatmap]);

  const handleDayClick = useCallback(
    async (date: string) => {
      if (!token || !user) {
        setDetailsError("Authentication required");
        return;
      }

      setApiToken(token);
      setSelectedDate(date);
      setDetailsLoading(true);
      setDetailsError(null);

      try {
        const { data: response } = await api.get<FulfillmentsResponse>(
          `/api/progress/${date}/fulfillments`,
        );

        setFulfillments(response?.fulfillments ?? []);
      } catch (err) {
        console.error("Failed to load fulfillments for selected day:", err);
        setDetailsError("Failed to load activities for this day.");
        setFulfillments([]);
      } finally {
        setDetailsLoading(false);
      }
    },
    [token, user],
  );

  return {
    data,
    isLoading,
    error,
    selectedDate,
    fulfillments,
    detailsLoading,
    detailsError,
    handleDayClick,
    reloadHeatmap: loadHeatmap,
  };
}