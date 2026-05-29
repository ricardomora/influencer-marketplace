import { notFound } from "next/navigation";
import { DemoPanelOverview } from "@/components/demo/demo-panel-overview";
import { DemoShell } from "@/components/demo/demo-shell";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function DemoPanelPage({
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
      segment="panel"
      title={t("demo.panelTitle")}
      subtitle={t("demo.panelSubtitle")}
    >
      <DemoPanelOverview locale={locale} dict={dict} />
    </DemoShell>
  );
}
