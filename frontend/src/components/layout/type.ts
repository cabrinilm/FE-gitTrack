import type { ReactNode } from "react";

export type StandardCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  actions?: ReactNode;
};


export type PageShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};
