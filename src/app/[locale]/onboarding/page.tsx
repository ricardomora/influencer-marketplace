import { Suspense } from "react";
import { OnboardingContent } from "./onboarding-content";

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">…</div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
