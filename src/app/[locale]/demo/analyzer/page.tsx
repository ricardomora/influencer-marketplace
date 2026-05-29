import { notFound } from "next/navigation";
import { DemoAnalyzerPreview } from "@/components/demo/demo-analyzer-preview";
import { DemoShell } from "@/components/demo/demo-shell";
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

  return (
    <DemoShell
      locale={locale}
      dict={dict}
      segment="analyzer"
      title={t("demo.analyzerTitle")}
      subtitle={t("demo.analyzerSubtitle")}
    >
      <DemoAnalyzerPreview locale={locale} dict={dict} />
    </DemoShell>
  );
}
