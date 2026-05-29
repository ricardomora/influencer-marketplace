"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { useDictionary } from "@/lib/i18n";

const STEP_KEYS = [
  "stepObjective",
  "stepAudience",
  "stepBudget",
  "stepDates",
  "stepFormat",
] as const;

export function DemoCampaignWizard({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const [step, setStep] = useState(0);

  if (!t) return null;

  const isLast = step === STEP_KEYS.length - 1;

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
              i === step
                ? "bg-indigo-600 text-white"
                : i < step
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {i + 1}. {t(`demo.${key}`)}
          </li>
        ))}
      </ol>

      {isLast ? (
        <div className="mt-8 rounded-lg border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <p className="font-semibold text-indigo-900 dark:text-indigo-100">
            {t("demo.wizardSummary")}
          </p>
          <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>· Awareness · LATAM 18–34</li>
            <li>· USD 12,000 · Q2 2026</li>
            <li>· Reels + Stories · Instagram</li>
          </ul>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
          <div className="h-10 w-2/3 rounded-lg bg-gray-100 dark:bg-gray-800" />
          {step >= 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
              <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
            {t("demo.wizardBack")}
          </Button>
        )}
        <Button
          onClick={() => {
            if (!isLast) setStep((s) => s + 1);
          }}
          disabled={isLast}
        >
          {t("demo.wizardNext")}
        </Button>
      </div>
    </div>
  );
}
