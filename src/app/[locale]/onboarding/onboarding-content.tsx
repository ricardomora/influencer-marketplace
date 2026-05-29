"use client";

import { useAuth } from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConvexAuthStatus } from "@/components/convex-auth-status";
import { dashboardPathForRole, type UserRole } from "@/lib/dashboard-path";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../../convex/_generated/api";

export function OnboardingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params.locale as Locale) ?? "es";
  const { t } = useDictionary(locale);
  const router = useRouter();
  const roleParam = searchParams.get("role");
  const initialRole: UserRole | null =
    roleParam === "brand" || roleParam === "influencer" ? roleParam : null;
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const { isLoading: convexAuthLoading, isAuthenticated: convexAuthenticated } =
    useConvexAuth();
  const convexUser = useQuery(api.users.current);
  const finishOnboarding = useMutation(api.users.finishOnboarding);
  const bootstrapCurrentUser = useMutation(api.users.bootstrapCurrentUser);
  const [selected, setSelected] = useState<UserRole | null>(initialRole);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialRole) setSelected(initialRole);
  }, [initialRole]);

  useEffect(() => {
    if (!clerkLoaded) return;
    if (!isSignedIn) {
      router.replace(`/${locale}/login`);
    }
  }, [clerkLoaded, isSignedIn, locale, router]);

  useEffect(() => {
    if (convexAuthenticated && convexUser === null) {
      bootstrapCurrentUser().catch(() => {
        /* retry on Continue */
      });
    }
  }, [convexAuthenticated, convexUser, bootstrapCurrentUser]);

  useEffect(() => {
    if (convexUser?.onboardingCompleted) {
      router.replace(dashboardPathForRole(convexUser.role, locale));
    }
  }, [convexUser, locale, router]);

  async function handleContinue() {
    if (!selected) return;
    if (!convexAuthenticated) {
      toast.error(
        locale === "es"
          ? "Espera un momento: Convex aún no validó tu sesión. Revisa CLERK_JWT_ISSUER_DOMAIN en el dashboard de Convex."
          : "Wait a moment: Convex has not validated your session yet. Check CLERK_JWT_ISSUER_DOMAIN in the Convex dashboard.",
      );
      return;
    }
    setLoading(true);
    try {
      await finishOnboarding({ role: selected });
      router.push(dashboardPathForRole(selected, locale));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const authReady = clerkLoaded && !convexAuthLoading && convexAuthenticated;

  if (!t || !clerkLoaded || convexAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>{t?.("common.loading") ?? "…"}</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold">{t("onboarding.title")}</h1>
      <p className="mt-2 text-gray-600">{t("onboarding.subtitle")}</p>
      {!authReady && <ConvexAuthStatus locale={locale} />}
      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={() => setSelected("influencer")}
          className="w-full text-left"
        >
          <Card
            className={
              selected === "influencer" ? "ring-2 ring-indigo-600" : ""
            }
          >
            <h2 className="font-semibold">{t("onboarding.roleInfluencer")}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {t("onboarding.roleInfluencerDesc")}
            </p>
          </Card>
        </button>
        <button
          type="button"
          onClick={() => setSelected("brand")}
          className="w-full text-left"
        >
          <Card className={selected === "brand" ? "ring-2 ring-indigo-600" : ""}>
            <h2 className="font-semibold">{t("onboarding.roleBrand")}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {t("onboarding.roleBrandDesc")}
            </p>
          </Card>
        </button>
      </div>
      <Button
        className="mt-8 w-full"
        disabled={!selected || loading || !authReady}
        onClick={handleContinue}
      >
        {t("onboarding.continue")}
      </Button>
    </div>
  );
}
