import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DemoAnalyzerPanel } from "@/components/demo/demo-analyzer-panel";
import { DemoShell } from "@/components/demo/demo-shell";
import { brandPageCopy } from "@/lib/brand-workspace/config";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function DemoAnalyzerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);
  const copy = brandPageCopy("analyzer");

  return (
    <DemoShell
      locale={locale}
      dict={dict}
      segment="analyzer"
      title={t(`workspace.${copy.titleKey}`)}
      subtitle={t(`workspace.${copy.subtitleKey}`)}
    >
      <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-gray-100" />}>
        <DemoAnalyzerPanel locale={locale} />
      </Suspense>
    </DemoShell>
  );
}
