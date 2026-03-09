import { Button } from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { api, setApiToken } from "@/lib/api";
import { useAuth } from "@/context/useAuth";
import { DailyChallengeCard } from "@/components/Activity/DailyChallengeCard";

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <DailyChallengeCard />
    </div>
  );
}