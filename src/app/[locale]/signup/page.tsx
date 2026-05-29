import { SignUp } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { ClerkSetupNotice } from "@/components/clerk-setup-notice";
import { isClerkPublishableKeyValid } from "@/lib/clerk-config";
import { createTranslator, getDictionary, isLocale } from "@/lib/i18n";

export default async function SignupPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { locale } = await params;
  const { role } = await searchParams;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  const onboardingUrl =
    role === "brand" || role === "influencer"
      ? `/${locale}/onboarding?role=${role}`
      : `/${locale}/onboarding`;

  const clerkOk = isClerkPublishableKeyValid(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{t("auth.signupTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.signupDescription")}</p>
      </div>
      {!clerkOk ? (
        <ClerkSetupNotice
          locale={locale}
          title={t("auth.clerkSetupTitle")}
          body={t("auth.clerkSetupBody")}
          backLabel={t("auth.backToHome")}
        />
      ) : (
        <SignUp
          routing="path"
          path={`/${locale}/signup`}
          signInUrl={`/${locale}/login`}
          forceRedirectUrl={onboardingUrl}
        />
      )}
    </div>
  );
}
