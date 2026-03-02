export interface Challenge {
  id: number;
  challenge_id: number;
  name: string;
  description?: boolean;
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