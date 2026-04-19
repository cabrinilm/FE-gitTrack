import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

type MobileHeaderContentProps = {
  appName: string;
  showProfileButton: boolean;
  profileHref: string;
};

export function MobileHeaderContent({
  appName,
  showProfileButton,
  profileHref,
}: MobileHeaderContentProps) {
  return (
    <div className="flex h-16 items-center justify-between px-4 md:hidden">
      <div className="w-10" />

      <div className="text-base font-semibold text-foreground">
        {appName}
      </div>

      <div className="flex w-10 justify-end">
        {showProfileButton && (
          <Link
            to={profileHref}
            aria-label="Go to profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
          >
          <FaUser className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}