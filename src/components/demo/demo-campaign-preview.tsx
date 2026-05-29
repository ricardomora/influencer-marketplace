import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

const STEP_KEYS = [
  "stepObjective",
  "stepAudience",
  "stepBudget",
  "stepDates",
  "stepFormat",
] as const;

export function DemoCampaignPreview({
  locale: _locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm font-medium text-indigo-600">
        {t("demo.campaignNetwork")}
      </p>
      <ol className="mt-6 flex flex-wrap gap-2">
        {STEP_KEYS.map((key, i) => (
          <li
            key={key}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              i === 0
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {i + 1}. {t(`demo.${key}`)}
          </li>
        ))}
      </ol>
      <div className="mt-8 space-y-4">
        <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="h-10 w-2/3 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
          <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
