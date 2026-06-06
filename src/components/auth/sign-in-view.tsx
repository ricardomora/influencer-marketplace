import { SignIn } from "@clerk/nextjs";
import { ClerkSetupNotice } from "@/components/clerk-setup-notice";
import { isClerkPublishableKeyValid } from "@/lib/clerk-config";
import { createTranslator, getDictionary, type Locale } from "@/lib/i18n";

export async function SignInView({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);
  const afterAuthUrl = `/${locale}/onboarding`;

  const clerkOk = isClerkPublishableKeyValid(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{t("auth.loginTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.loginDescription")}</p>
      </div>
      {!clerkOk ? (
        <ClerkSetupNotice
          locale={locale}
          title={t("auth.clerkSetupTitle")}
          body={t("auth.clerkSetupBody")}
          backLabel={t("auth.backToHome")}
        />
      ) : (
        <SignIn
          routing="path"
          path={`/${locale}/login`}
          signUpUrl={`/${locale}/signup`}
          forceRedirectUrl={afterAuthUrl}
          fallbackRedirectUrl={afterAuthUrl}
        />
      )}
    </div>
  );
}
