import { notFound } from "next/navigation";
import { DemoCampaignWizard } from "@/components/demo/demo-campaign-wizard";
import { DemoShell } from "@/components/demo/demo-shell";
import { brandPageCopy } from "@/lib/brand-workspace/config";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function DemoCampaignsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);
  const copy = brandPageCopy("campaigns");

  return (
    <DemoShell
      locale={locale}
      dict={dict}
      segment="campaigns"
      title={t(`workspace.${copy.titleKey}`)}
      subtitle={t(`workspace.${copy.subtitleKey}`)}
    >
      <DemoCampaignWizard locale={locale} />
    </DemoShell>
  );
}
