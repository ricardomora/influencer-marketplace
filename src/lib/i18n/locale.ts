export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function resolveLocaleFromHeaders(headers: Headers): Locale {
  const acceptLanguage = headers.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}
