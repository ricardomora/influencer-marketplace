import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);
  const title = dict.metadata.siteTitle as string;
  const description = dict.metadata.siteDescription as string;
  const ogTitle = (dict.metadata.ogTitle as string) || title;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      locale: localeParam === "es" ? "es_CO" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  return <>{children}</>;
}
