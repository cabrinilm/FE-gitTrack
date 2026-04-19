import { MobileHeaderContent } from "./MobileHeaderContent";
import { useHeader } from "@/hooks/useHeader";

export function AppHeader() {
  const { appName, profileHref, showProfileButton } = useHeader();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blursupports-backdrop-filter:bg-background/80 md:hidden">
      <MobileHeaderContent
        appName={appName}
        showProfileButton={showProfileButton}
        profileHref={profileHref}
      />
    </header>
  );
}