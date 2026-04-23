export type LandingNavLink = {
  label: string;
  href: string;
};

export type LandingStatItem = {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
};

export type LandingFeatureItem = {
  title: string;
  description: string;
  tag?: string;
  accent?: "primary" | "secondary" | "success" | "muted";
};

export type LandingFooterLinkGroup = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type DemoActivity = {
  name: string;
  status: "completed" | "pending";
};

export type DemoDayDetail = {
  date: string;
  completed: number;
  total: number;
  activities: DemoActivity[];
};