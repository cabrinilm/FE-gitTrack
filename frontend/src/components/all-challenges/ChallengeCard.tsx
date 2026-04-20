import {
  FaCheckCircle,
  FaEdit,
  FaRegCircle,
  FaTrash,
} from "react-icons/fa";
import { cn } from "@/utils/cn";
import type { ChallengeCardProps } from "./types";

export function ChallengeCard({
  challenge,
  onRemove,
  onToggleActive,
  onEdit,
}: ChallengeCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card transition-all duration-200",
        "hover:border-primary/40 hover:bg-primary/5"
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <span
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium text-white",
            challenge.isActive ? "bg-green-600" : "bg-muted-foreground"
          )}
        >
          {challenge.isActive ? "Active" : "Inactive"}
        </span>

        <div className="flex items-center gap-3 text-base">
          {onToggleActive && (
            <button
              type="button"
              onClick={onToggleActive}
              className="text-muted-foreground transition hover:text-green-400"
              title="Set as active"
              aria-label="Set as active"
            >
              {challenge.isActive ? <FaCheckCircle /> : <FaRegCircle />}
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="text-muted-foreground transition hover:text-blue-400"
              title="Edit challenge"
              aria-label="Edit challenge"
            >
              <FaEdit />
            </button>
          )}

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-muted-foreground transition hover:text-red-400"
              title="Delete challenge"
              aria-label="Delete challenge"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center px-4 pb-4">
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {challenge.name}
        </h3>

        {challenge.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {challenge.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 text-xs text-muted-foreground">
        Created:{" "}
        {new Date(challenge.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}