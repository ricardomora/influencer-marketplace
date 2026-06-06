import { notFound } from "next/navigation";
import { SignUpView } from "@/components/auth/sign-up-view";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function SignUpCatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; rest?: string[] }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { locale } = await params;
  const { role } = await searchParams;
  if (!isLocale(locale)) notFound();

  return <SignUpView locale={locale as Locale} role={role} />;
}
