import { Heatmap } from "@/components/ui/heatmap";
import { useEffect, useState } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { StandardCard } from "@/components/layout/StandardCard";
import { PageShell } from "@/components/layout/PageShell";

type HeatmapDay = {
  date: string;
  count: number;
};

type Fulfillment = {
  id: number;
  progress_entry_id: number;
  activity_id: number;
  activity_name: string;
  planned_duration_minutes: number;
};

type FulfillmentsResponse = {
  fulfillments: Fulfillment[];
};

export default function HeatmapPage() {
  const { token, user } = useAuth();

  const [data, setData] = useState<HeatmapDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [fulfillments, setFulfillments] = useState<Fulfillment[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !user) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    setApiToken(token);

    const loadHeatmap = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: heatmapData } = await api.get<HeatmapDay[]>(
          "/api/progress/heatmap",
        );

        setData(heatmapData);
      } catch (err) {
        console.error("Failed to load heatmap:", err);
        setError("Failed to load heatmap");
      } finally {
        setLoading(false);
      }
    };

    loadHeatmap();
  }, [token, user]);

  const handleDayClick = async (date: string) => {
    setSelectedDate(date);
    setDetailsLoading(true);
    setDetailsError(null);

    try {
      const { data: response } = await api.get<FulfillmentsResponse>(
        `/api/progress/${date}/fulfillments`,
      );

      setFulfillments(response.fulfillments || []);
    } catch (err) {
      console.error("Failed to load fulfillments for selected day:", err);
      setDetailsError("Failed to load activities for this day.");
      setFulfillments([]);
    } finally {
      setDetailsLoading(false);
    }
  };
  if (loading) {
    return (
      <PageShell>
        <p>Loading heatmap...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <p className="text-red-500">{error}</p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <StandardCard
        title="Progress Heatmap"
        description="View your activity history and daily completions"
        contentClassName="space-y-6 p-6"
      >
        <Heatmap data={data} onDayClick={handleDayClick} />

        {selectedDate && (
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <h3 className="text-lg font-semibold text-foreground">
              Activities for {selectedDate}
            </h3>

            {detailsLoading && (
              <p className="mt-2 text-sm text-muted-foreground">
                Loading activities...
              </p>
            )}

            {detailsError && (
              <p className="mt-2 text-sm text-red-400">{detailsError}</p>
            )}

            {!detailsLoading && !detailsError && fulfillments.length === 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                No completed activities for this day.
              </p>
            )}

            {!detailsLoading && !detailsError && fulfillments.length > 0 && (
              <ul className="mt-3 space-y-2">
                {fulfillments.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm text-foreground"
                  >
                    <span className="font-medium">{item.activity_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.planned_duration_minutes} min
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </StandardCard>
    </PageShell>
  );
}
