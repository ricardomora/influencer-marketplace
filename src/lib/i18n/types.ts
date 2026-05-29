export type DictionaryNamespace =
  | "common"
  | "marketing"
  | "dashboard"
  | "onboarding"
  | "auth"
  | "metadata"
  | "demo";

export type Dictionary = Record<DictionaryNamespace, Record<string, unknown>>;
