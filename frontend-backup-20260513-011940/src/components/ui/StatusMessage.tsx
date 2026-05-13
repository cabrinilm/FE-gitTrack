import { cn } from "@/utils/cn";

type StatusMessageProps = {
  type: "error" | "success";
  message: string;
  className?: string;
};

export function StatusMessage({
  type,
  message,
  className,
}: StatusMessageProps) {
  if (!message) return null;

  return (
    <p
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "text-sm font-medium",
        type === "error" && "text-error",
        type === "success" && "text-success",
        className,
      )}
    >
      {message}
    </p>
  );
}