import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";

type ChallengeCardProps = {
  challenge: {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    isActive?: boolean;
  };
  onRemove?: () => void;
  onToggleActive?: () => void;
};

export function ChallengeCard({
  challenge,
  onRemove,
  onToggleActive,
}: ChallengeCardProps) {
  console.log(challenge);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden w-full sm:w-72 flex flex-col justify-between">
      
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2">
        
        {/* Status */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded text-white ${
            challenge.isActive ? "bg-green-600" : "bg-gray-500"
          }`}
        >
          {challenge.isActive ? "Active" : "Inactive"}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-3 text-lg">
          
          {/* Activate */}
          {onToggleActive && (
            <button
              onClick={onToggleActive}
              className="text-white hover:text-green-400 transition"
              title="Set as active"
            >
              {challenge.isActive ? <FaCheckCircle /> : <FaRegCircle />}
            </button>
          )}

          {/* Delete */}
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-white hover:text-red-400 transition"
              title="Delete challenge"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-foreground mb-2">
          {challenge.name}
        </h2>

        {challenge.description && (
          <p className="text-muted-foreground text-sm">
            {challenge.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 text-xs text-muted-foreground">
        Created: {new Date(challenge.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}