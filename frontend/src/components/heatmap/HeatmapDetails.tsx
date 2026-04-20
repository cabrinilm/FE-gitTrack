import type { HeatmapDetailsProps } from "@/components/heatmap/types";

export function HeatmapDetails({
  selectedDate,
  fulfillments,
  detailsLoading,
  detailsError,
}: HeatmapDetailsProps) {
  if (!selectedDate) return null;

  return (
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
  );
}