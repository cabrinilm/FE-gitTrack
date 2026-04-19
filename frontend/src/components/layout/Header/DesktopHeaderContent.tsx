import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

type DesktopHeaderContentProps = {
  appName: string;
  showProfileButton: boolean;
  profileHref: string;
};

export function DesktopHeaderContent({
  appName,
  showProfileButton,
  profileHref,
}: DesktopHeaderContentProps) {
  return (
    <div className="hidden h-16 items-center justify-between px-6 md:flex">
      <div className="text-lg font-semibold text-foreground">
        {appName}
      </div>

      <div className="flex items-center gap-3">
        {showProfileButton && (
          <Link
            to={profileHref}
            aria-label="Go to profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
          >
            <FaUser className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}