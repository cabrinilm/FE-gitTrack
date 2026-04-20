export interface Challenge {
  id: number;
  challenge_id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Activity {
  id: number;
  challenge_id: number;
  name: string;
  duration_minutes: number;
  order_num: number;
}

export interface ActiveChallenge {
  user_id: string;
  challenge_id: number;
  activated_at: string;
}

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


export type DailyChallengeCardProps = {
  activities: Activity[];
  completedIds: Set<number>;
  isLoading: boolean;
  error: string | null;
  hasNoChallenge: boolean;
  completingId: number | null;
  completedCount: number;
  totalActivities: number;
  progressPercentage: number;
  streak: number;
  completedToday: boolean;
  onRetry: () => void;
  onMarkComplete: (activityId: number) => void;
};

export type StreakResponse = {
  streak: number;
  completedToday: boolean;
};