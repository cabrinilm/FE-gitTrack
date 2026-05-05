import { useEffect } from "react";
import { LandingPageContent } from "@/components/landing/LandingPageContent";

export function LandingPage() {
  useEffect(() => {
    document.body.classList.add("landing-body");

    return () => {
      document.body.classList.remove("landing-body");
    };
  }, []);

  return (
    <div className="landing-theme min-h-screen bg-background text-text-primary">
      <LandingPageContent />
    </div>
  );
}