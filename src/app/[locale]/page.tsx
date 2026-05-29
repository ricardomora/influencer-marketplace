import { notFound } from "next/navigation";
import { MarketingHome } from "@/components/marketing/marketing-home";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return <MarketingHome locale={locale} dict={dict} />;
}
