import type { Dictionary, DictionaryNamespace } from "./types";
import type { Locale } from "./locale";
import { DEFAULT_LOCALE } from "./locale";

const NAMESPACES: DictionaryNamespace[] = [
  "common",
  "marketing",
  "dashboard",
  "onboarding",
  "auth",
  "metadata",
];

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const resolvedLocale = locale === "en" ? "en" : DEFAULT_LOCALE;
  const entries = await Promise.all(
    NAMESPACES.map(async (namespace) => {
      const module = await import(
        `./dictionaries/${resolvedLocale}/${namespace}.json`
      );
      return [namespace, module.default] as const;
    }),
  );
  return Object.fromEntries(entries) as Dictionary;
}
