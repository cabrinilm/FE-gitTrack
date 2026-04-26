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
        "flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-surface transition-all duration-200",
        "hover:border-primary/40 hover:bg-primary/5",
      )}
    >

      <div className="flex items-center justify-between px-4 py-3">
        <span
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium text-white",
            challenge.isActive ? "bg-success" : "bg-text-muted",
          )}
        >
          {challenge.isActive ? "Active" : "Inactive"}
        </span>

        <div className="flex items-center gap-3 text-base">
          {onToggleActive && (
            <button
              type="button"
              onClick={onToggleActive}
              className="text-text-muted transition hover:text-success"
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
              className="text-text-muted transition hover:text-primary"
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
              className="text-text-muted transition hover:text-error"
              title="Delete challenge"
              aria-label="Delete challenge"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>


      <div className="flex flex-1 flex-col justify-center px-4 pb-4">
        <h3 className="mb-1 text-lg font-semibold text-text-primary">
          {challenge.name}
        </h3>

        {challenge.description && (
          <p className="line-clamp-2 text-sm text-text-muted">
            {challenge.description}
          </p>
        )}
      </div>


      <div className="px-4 pb-4 text-xs text-text-muted">
        Created: {new Date(challenge.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}