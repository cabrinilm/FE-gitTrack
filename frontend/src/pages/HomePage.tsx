import { PageShell } from "@/components/layout/Shell/PageShell";
import { DailyChallengeCard } from "@/components/DailyChallengeCard";

export default function Home() {
  return (
    <PageShell>
      <DailyChallengeCard />
    </PageShell>
  );
}