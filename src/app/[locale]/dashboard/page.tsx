"use client";

import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { type Locale } from "@/lib/i18n";
import { dashboardPathForRole } from "@/lib/dashboard-path";
import { api } from "../../../../convex/_generated/api";

export default function DashboardRedirectPage() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "es";
  const router = useRouter();
  const user = useQuery(api.users.current, useAuthSkip());

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      router.replace(`/${locale}/login`);
      return;
    }
    if (!user.onboardingCompleted) {
      router.replace(`/${locale}/onboarding`);
      return;
    }
    router.replace(dashboardPathForRole(user.role, locale));
  }, [user, locale, router]);

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-500">
      …
    </div>
  );
}
