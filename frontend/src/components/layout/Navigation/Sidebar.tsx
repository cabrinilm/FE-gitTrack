import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "@/context/useAuth";
import { cn } from "@/utils/cn";
import { navItems } from "./navItems";
import { useHeader } from "@/hooks/useHeader";
import { DesktopHeaderContent } from "@/components/layout/header/DesktopHeaderContent";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const { appName, profileHref, showProfileButton } = useHeader();

  return (
    <aside
      className="
        hidden md:flex md:flex-col
        fixed inset-y-0 left-0 z-40
        w-64 bg-background border-r border-border shadow-sm
      "
    >
      <div className="border-b border-border">
        <DesktopHeaderContent
          appName={appName}
          showProfileButton={showProfileButton}
          profileHref={profileHref}
        />
      </div>

      <Toaster
        containerStyle={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        toastOptions={{
          style: { minWidth: "200px", textAlign: "center" },
          duration: 4000,
        }}
      />

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = !item.isLogout && location.pathname === item.path;
          const isLogoutItem = item.isLogout;

          const handleClick = async () => {
            if (isLogoutItem) {
              try {
                await signOut();
                navigate("/auth/login");
              } catch (err) {
                console.error("Logout failed:", err);
                toast.error("Logout failed. Please try again.");
              }
            } else {
              navigate(item.path);
            }
          };

          return (
            <button
              key={item.label}
              onClick={handleClick}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left transition-colors duration-200",
                isActive
                  ? "border-l-4 border-primary bg-accent pl-3 font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isLogoutItem &&
                  "text-destructive hover:bg-destructive/10 hover:text-destructive",
              )}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};