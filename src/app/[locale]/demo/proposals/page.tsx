import { notFound } from "next/navigation";
import { DemoProposalsList } from "@/components/demo/demo-proposals-list";
import { DemoShell } from "@/components/demo/demo-shell";
import { createTranslator, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function DemoProposalsPage({
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
      segment="proposals"
      title={t("demo.proposalsTitle")}
      subtitle={t("demo.proposalsSubtitle")}
    >
      <DemoProposalsList locale={locale} dict={dict} />
    </DemoShell>
  );
}
