import { PageShell } from "@/components/layout/Shell/PageShell";
import { EditChallengePageContent } from "@/components/edit-challenge/EditChallengePageContent";

export default function EditChallengePage() {
  return (
    <PageShell contentClassName="max-w-2xl space-y-6">
      <EditChallengePageContent />
    </PageShell>
  );
}