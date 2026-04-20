export type HeatmapDay = {
  date: string;
  count: number;
};

export type Fulfillment = {
  id: number;
  progress_entry_id: number;
  activity_id: number;
  activity_name: string;
  planned_duration_minutes: number;
};

export type FulfillmentsResponse = {
  fulfillments: Fulfillment[];
};

export type HeatmapDetailsProps = {
  selectedDate: string | null;
  fulfillments: Fulfillment[];
  detailsLoading: boolean;
  detailsError: string | null;
};