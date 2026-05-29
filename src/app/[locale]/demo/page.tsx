import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Search,
  BarChart3,
  Megaphone,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { DemoShell } from "@/components/demo/demo-shell";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

const CARDS = [
  { href: "panel", icon: LayoutDashboard, titleKey: "navPanel", descKey: "cardPanelDesc" },
  { href: "discover", icon: Search, titleKey: "navDiscover", descKey: "cardDiscoverDesc" },
  { href: "analyzer", icon: BarChart3, titleKey: "navAnalyzer", descKey: "cardAnalyzerDesc" },
  { href: "campaigns", icon: Megaphone, titleKey: "navCampaigns", descKey: "cardCampaignsDesc" },
  { href: "proposals", icon: FileText, titleKey: "navProposals", descKey: "cardProposalsDesc" },
] as const;

export default async function DemoHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  return (
    <DemoShell
      locale={locale}
      dict={dict}
      segment=""
      title={t("demo.hubTitle")}
      subtitle={t("demo.hubSubtitle")}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ href, icon: Icon, titleKey, descKey }) => (
          <Link
            key={href}
            href={`/${locale}/demo/${href}`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Icon className="size-5" aria-hidden />
            </div>
            <h2 className="mt-4 font-semibold">{t(`demo.${titleKey}`)}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t(`demo.${descKey}`)}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:underline">
              {t("demo.openTool")} →
            </span>
          </Link>
        ))}
      </div>
    </DemoShell>
  );
}
