import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { BottomNav } from "@/components/layout/navigation/BottomNav";
import { Sidebar } from "@/components/layout/navigation/Sidebar";

export function ProtectedLayout() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="relative min-h-screen bg-background text-text-primary">
      {!isMobile && <Sidebar />}

      <main
        className={cn(
          "min-h-screen",
          "transition-all duration-300 ease-in-out",
          !isMobile && "md:pl-64",
          isMobile && "pb-16",
        )}
      >
        <Outlet />
      </main>

      {isMobile && <BottomNav />}
    </div>
  );
}