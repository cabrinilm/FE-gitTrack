import { AllChallengesList } from "@/components/AllChalenges/AllChallengesList";

export default function AllChallengesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Challenges</h1>
      <AllChallengesList />
    </div>
  );
}