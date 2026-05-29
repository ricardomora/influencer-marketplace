import { notFound } from "next/navigation";
import { BrandHubCards } from "@/components/brand-workspace/brand-hub-cards";
import { BrandWorkspaceShell } from "@/components/brand-workspace/brand-workspace-shell";
import { brandPageCopy } from "@/lib/brand-workspace/config";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

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
  const copy = brandPageCopy("");

  return (
    <BrandWorkspaceShell
      locale={locale}
      mode="demo"
      segment=""
      dict={dict}
      title={t(`workspace.${copy.titleKey}`)}
      subtitle={t(`workspace.${copy.subtitleKey}`)}
    >
      <BrandHubCards locale={locale} mode="demo" dict={dict} />
    </BrandWorkspaceShell>
  );
}
