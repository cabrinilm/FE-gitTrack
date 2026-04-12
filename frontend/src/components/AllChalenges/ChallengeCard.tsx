import { FaCheckCircle, FaEdit, FaRegCircle, FaTrash } from "react-icons/fa";
import type { ChallengeCardProps } from "./types";

export function ChallengeCard({
  challenge,
  onRemove,
  onToggleActive,
  onEdit,
}: ChallengeCardProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <span
          className={`rounded px-2 py-1 text-xs font-semibold text-white ${
            challenge.isActive ? "bg-green-600" : "bg-gray-500"
          }`}
        >
          {challenge.isActive ? "Active" : "Inactive"}
        </span>

        <div className="flex items-center gap-3 text-lg">
          {onToggleActive && (
            <button
              type="button"
              onClick={onToggleActive}
              className="text-white transition hover:text-green-400"
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
              className="text-white transition hover:text-blue-400"
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
              className="text-white transition hover:text-red-400"
              title="Delete challenge"
              aria-label="Delete challenge"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-4">
        <h2 className="mb-2 text-xl font-bold text-foreground">
          {challenge.name}
        </h2>

        {challenge.description && (
          <p className="text-sm text-muted-foreground">
            {challenge.description}
          </p>
        )}
      </div>

      <div className="px-4 pb-4 text-xs text-muted-foreground">
        Created: {new Date(challenge.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}