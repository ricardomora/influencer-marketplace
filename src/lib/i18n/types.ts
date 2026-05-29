export type DictionaryNamespace =
  | "common"
  | "marketing"
  | "dashboard"
  | "onboarding"
  | "auth"
  | "metadata";

export type Dictionary = Record<DictionaryNamespace, Record<string, unknown>>;
