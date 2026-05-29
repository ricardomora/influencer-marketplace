"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { useDictionary } from "@/lib/i18n";

const STEPS = [
  { key: "flowDiscover" as const, suffix: "/search" },
  { key: "flowAnalyzer" as const, suffix: "/search" },
  { key: "flowProposal" as const, suffix: "/proposals" },
] as const;

export type BrandFlowStep = "discover" | "analyzer" | "proposal";

const ACTIVE_INDEX: Record<BrandFlowStep, number> = {
  discover: 0,
  analyzer: 1,
  proposal: 2,
};

export function BrandFlowStrip({
  locale,
  active,
}: {
  locale: Locale;
  active: BrandFlowStep;
}) {
  const { t } = useDictionary(locale);
  if (!t) return null;

  const base = `/${locale}/dashboard/brand`;
  const activeIndex = ACTIVE_INDEX[active];

  return (
    <div className="mb-6 rounded-xl border border-gray-200/80 bg-white px-4 py-3 shadow-sm">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {STEPS.map((step, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <li key={step.key} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300" aria-hidden>→</span>}
              <Link
                href={`${base}${step.suffix}`}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition-colors",
                  isActive && "bg-indigo-600 text-white",
                  isDone &&
                    !isActive &&
                    "bg-indigo-50 text-indigo-800",
                  !isActive &&
                    !isDone &&
                    "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                {i + 1}. {t(`dashboard.${step.key}`)}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
