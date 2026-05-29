import { notFound } from "next/navigation";
import { DemoCampaignPreview } from "@/components/demo/demo-campaign-preview";
import { DemoShell } from "@/components/demo/demo-shell";
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

  return (
    <DemoShell
      locale={locale}
      dict={dict}
      segment="campaigns"
      title={t("demo.campaignsTitle")}
      subtitle={t("demo.campaignsSubtitle")}
    >
      <DemoCampaignPreview locale={locale} dict={dict} />
    </DemoShell>
  );
}
