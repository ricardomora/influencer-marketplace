import { SignUp } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { createTranslator, getDictionary, isLocale } from "@/lib/i18n";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{t("auth.signupTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.signupDescription")}</p>
      </div>
      <SignUp
        routing="path"
        path={`/${locale}/signup`}
        signInUrl={`/${locale}/login`}
        forceRedirectUrl={`/${locale}/onboarding`}
      />
    </div>
  );
}
