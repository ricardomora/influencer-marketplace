export { createTranslator, type Translator } from "./create-translator";
export { getDictionary } from "./get-dictionary";
export {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  resolveLocaleFromHeaders,
  type Locale,
} from "./locale";
export type { Dictionary, DictionaryNamespace } from "./types";
export { useDictionary } from "./use-dictionary";
