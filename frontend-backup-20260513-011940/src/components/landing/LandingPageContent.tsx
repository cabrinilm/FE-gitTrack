import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsBar } from "@/components/landing/StatsBar";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { HeatmapShowcaseSection } from "./HeatmapShowcaseSection";

export function LandingPageContent() {
  return (
    <>
      <LandingNavbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <HeatmapShowcaseSection />
      </main>
      <LandingFooter />
    </>
  );
}