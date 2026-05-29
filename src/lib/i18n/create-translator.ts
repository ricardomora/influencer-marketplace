import type { Dictionary } from "./types";

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export type Translator = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export function createTranslator(dict: Dictionary): Translator {
  return function t(key, params) {
    const value = getNestedValue(dict, key);
    if (typeof value !== "string") return key;
    return interpolate(value, params);
  };
}
