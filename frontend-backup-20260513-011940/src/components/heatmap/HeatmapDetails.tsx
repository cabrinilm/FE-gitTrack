import type { HeatmapDetailsProps } from "@/components/heatmap/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { StatusMessage } from "@/components/ui/StatusMessage";

export function HeatmapDetails({
  selectedDate,
  fulfillments,
  detailsLoading,
  detailsError,
}: HeatmapDetailsProps) {
  if (!selectedDate) return null;

  return (
    <ListItemCard className="space-y-4 p-4">
      <h3 className="text-lg font-semibold text-text-primary">
        Activities for {selectedDate}
      </h3>

      {detailsLoading && (
        <LoadingState
          message="Loading activities..."
          className="py-6"
        />
      )}

      {detailsError && (
        <StatusMessage type="error" message={detailsError} />
      )}

      {!detailsLoading && !detailsError && fulfillments.length === 0 && (
        <EmptyState
          title="No completed activities for this day."
          className="py-6"
        />
      )}

      {!detailsLoading && !detailsError && fulfillments.length > 0 && (
        <ul className="space-y-2">
          {fulfillments.map((item) => (
            <li key={item.id}>
              <ListItemCard className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="font-medium text-text-primary">
                  {item.activity_name}
                </span>

                <span className="text-xs text-text-muted">
                  {item.planned_duration_minutes} min
                </span>
              </ListItemCard>
            </li>
          ))}
        </ul>
      )}
    </ListItemCard>
  );
}