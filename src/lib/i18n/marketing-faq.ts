import type { Dictionary } from "./types";
import type { FaqItem } from "@/components/marketing/marketing-faq-section";

export function getMarketingFaqItems(dict: Dictionary): FaqItem[] {
  const raw = dict.marketing.faqItems;
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (item): item is FaqItem =>
      typeof item === "object" &&
      item !== null &&
      "question" in item &&
      "answer" in item &&
      typeof (item as FaqItem).question === "string" &&
      typeof (item as FaqItem).answer === "string",
  );
}
