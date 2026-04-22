import { Heatmap } from "../ui/Heatmap";
import { HeatmapDetails } from "@/components/heatmap/HeatmapDetails";
import { StandardCard } from "@/components/layout/shell/StandardCard";
import { useHeatmap } from "@/hooks/useHeatmap";

export function HeatmapPageContent() {
  const {
    data,
    isLoading,
    error,
    selectedDate,
    fulfillments,
    detailsLoading,
    detailsError,
    handleDayClick,
  } = useHeatmap();

  if (isLoading) {
    return (
      <StandardCard
        title="Progress Heatmap"
        description="View your activity history and daily completions"
      >
        <p className="text-muted-foreground">Loading heatmap...</p>
      </StandardCard>
    );
  }

  if (error) {
    return (
      <StandardCard
        title="Progress Heatmap"
        description="View your activity history and daily completions"
      >
        <p className="text-red-500">{error}</p>
      </StandardCard>
    );
  }

  return (
    <StandardCard
      title="Progress Heatmap"
      description="View your activity history and daily completions"
      contentClassName="space-y-6 p-6"
    >
      <Heatmap data={data} onDayClick={handleDayClick} />

      <HeatmapDetails
        selectedDate={selectedDate}
        fulfillments={fulfillments}
        detailsLoading={detailsLoading}
        detailsError={detailsError}
      />
    </StandardCard>
  );
}