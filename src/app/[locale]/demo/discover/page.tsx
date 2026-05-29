import { notFound } from "next/navigation";
import { DemoShell } from "@/components/demo/demo-shell";
import { DemoDiscoverPanel } from "@/components/demo/demo-discover-panel";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function DemoDiscoverPage({
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
      segment="discover"
      title={t("demo.discoverTitle")}
      subtitle={t("demo.discoverSubtitle")}
    >
      <DemoDiscoverPanel locale={locale} />
    </DemoShell>
  );
}
