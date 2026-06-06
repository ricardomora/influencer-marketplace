import { notFound } from "next/navigation";
import { SignInView } from "@/components/auth/sign-in-view";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function LoginCatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; rest?: string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SignInView locale={locale as Locale} />;
}
