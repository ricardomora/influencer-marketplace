"use client";

import { useAuth } from "@clerk/nextjs";
import { Authenticated, AuthLoading } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

function RedirectToLogin() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as Locale) ?? "es";

  useEffect(() => {
    router.replace(`/${locale}/login`);
  }, [locale, router]);

  return null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const locale = (typeof window !== "undefined"
        ? window.location.pathname.split("/")[1]
        : "es") as Locale;
      window.location.href = `/${locale}/login`;
    }
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center text-gray-500">
          …
        </div>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      {!isSignedIn && isLoaded ? <RedirectToLogin /> : null}
    </>
  );
}
