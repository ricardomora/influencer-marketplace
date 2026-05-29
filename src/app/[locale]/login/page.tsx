import { SignIn } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { createTranslator, getDictionary, isLocale } from "@/lib/i18n";

export default async function LoginPage({
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
        <h1 className="text-2xl font-bold">{t("auth.loginTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.loginDescription")}</p>
      </div>
      <SignIn
        routing="path"
        path={`/${locale}/login`}
        signUpUrl={`/${locale}/signup`}
        forceRedirectUrl={`/${locale}/onboarding`}
      />
    </div>
  );
}
