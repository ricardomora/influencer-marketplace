import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { createTranslator, getDictionary, isLocale } from "@/lib/i18n";

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const dict = await getDictionary(localeParam);
  const t = createTranslator(dict);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <span className="text-xl font-bold text-indigo-600">{BRAND.name}</span>
        <div className="flex gap-3">
          <Link href={`/${localeParam}/login`}>
            <Button variant="ghost">{t("marketing.ctaLogin")}</Button>
          </Link>
          <Link href={`/${localeParam}/signup`}>
            <Button>{t("marketing.ctaSignup")}</Button>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {t("marketing.heroTitle")}
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
          {t("marketing.heroSubtitle")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href={`/${localeParam}/signup`}>
            <Button size="default">{t("marketing.ctaSignup")}</Button>
          </Link>
        </div>
        <div className="mt-16 grid gap-6 text-left sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-semibold">{t("marketing.forBrands")}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("marketing.heroSubtitle")}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-semibold">{t("marketing.forInfluencers")}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("onboarding.roleInfluencerDesc")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
