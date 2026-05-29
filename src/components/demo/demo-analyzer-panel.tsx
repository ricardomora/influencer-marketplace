"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getDemoInfluencer } from "@/lib/demo/discover-fixtures";
import type { Locale } from "@/lib/i18n";
import { useDictionary } from "@/lib/i18n";

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function DemoAnalyzerPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const searchParams = useSearchParams();
  const creatorId = searchParams.get("creator") ?? "valentina";
  const row = useMemo(() => getDemoInfluencer(creatorId), [creatorId]);

  if (!t) return null;

  if (!row) {
    return (
      <p className="text-sm text-gray-500">
        <Link href={`/${locale}/demo/discover`} className="text-indigo-600 hover:underline">
          {t("demo.navDiscover")}
        </Link>
      </p>
    );
  }

  const reach =
    row.followers >= 1_000_000
      ? `${Math.round(row.followers * 0.37 / 1_000)}K`
      : formatCount(Math.round(row.followers * 0.37));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex gap-4">
        <div className="size-16 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600" />
        <div>
          <p className="text-lg font-bold">{row.displayName}</p>
          <p className="text-sm text-gray-500">
            {row.handle} · {row.city}, {row.country}
          </p>
          <p className="mt-1 text-xs text-gray-400">{row.category}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          [formatCount(row.followers), t("demo.analyzerFollowers")],
          [`${row.engagementRate}%`, t("demo.analyzerEr")],
          [reach, t("demo.analyzerReach")],
        ].map(([v, l]) => (
          <div
            key={l}
            className="rounded-lg bg-gray-50 py-3 text-center dark:bg-gray-800"
          >
            <p className="text-xl font-bold">{v}</p>
            <p className="text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-24 items-end gap-2">
        {[40, 70, 55, 85, 60, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-indigo-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-gray-100 p-4 dark:border-gray-800">
        <p className="text-sm font-semibold">{t("demo.analyzerAudience")}</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>{t("demo.audienceFemale")}</li>
          <li>{t("demo.audienceAge")}</li>
          <li>{t("demo.audienceCountry")}</li>
        </ul>
      </div>
    </div>
  );
}
