import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";
import { Button } from "@/components/ui/button";

export function MarketingLayout({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const t = createTranslator(dict);
  const otherLocale = locale === "es" ? "en" : "es";

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href={`/${locale}`}
            className="text-lg font-bold tracking-tight text-indigo-300"
          >
            {BRAND.name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#plataforma" className="transition-colors hover:text-white">
              {t("marketing.navPlatform")}
            </a>
            <a href="#herramientas" className="transition-colors hover:text-white">
              {t("marketing.navTools")}
            </a>
            <a href="#como-funciona" className="transition-colors hover:text-white">
              {t("marketing.navHowItWorks")}
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              {t("marketing.navFaq")}
            </a>
            <Link
              href={`/${locale}/demo`}
              className="transition-colors hover:text-white"
            >
              {t("marketing.navDemo")}
            </Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/${otherLocale}`}
              className="hidden text-sm text-slate-400 transition-colors hover:text-white sm:inline"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link href={`/${locale}/login`}>
              <Button variant="ghost" size="sm">
                {t("marketing.ctaLogin")}
              </Button>
            </Link>
            <Link href={`/${locale}/signup`}>
              <Button size="sm">{t("marketing.ctaSignup")}</Button>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-indigo-600">{BRAND.name}</p>
            <p className="mt-1 max-w-sm text-sm text-gray-600 dark:text-gray-400">
              {t("marketing.footerTagline")}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href={`/${locale}/login`}
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              {t("marketing.footerLogin")}
            </Link>
            <Link
              href={`/${locale}/signup`}
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              {t("marketing.footerSignup")}
            </Link>
          </div>
        </div>
        <p className="border-t border-gray-200 px-4 py-4 text-center text-xs text-gray-500 dark:border-gray-800">
          {t("marketing.footerRights", { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
