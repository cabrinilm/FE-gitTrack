import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonProps = {
  label?: string;
};

export const BackButton = ({ label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-primary transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <FaArrowLeft className="text-text-secondary" />
      <span>{label}</span>
    </button>
  );
};