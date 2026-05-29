"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  DEMO_INFLUENCERS,
  type DemoInfluencerRow,
  type DemoNetwork,
} from "@/lib/demo/discover-fixtures";
import type { Locale } from "@/lib/i18n";
import { useDictionary } from "@/lib/i18n";

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function DemoDiscoverPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const [network, setNetwork] = useState("");
  const [country, setCountry] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [minEngagement, setMinEngagement] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<DemoInfluencerRow | null>(null);

  const filtered = useMemo(() => {
    return DEMO_INFLUENCERS.filter((row) => {
      if (network && !row.networks.includes(network as DemoNetwork)) return false;
      if (country && row.country !== country) return false;
      if (category && row.category !== category) return false;
      if (minFollowers && row.followers < Number(minFollowers)) return false;
      if (minEngagement && row.engagementRate < Number(minEngagement)) return false;
      return true;
    });
  }, [network, country, category, minFollowers, minEngagement]);

  if (!t) return null;

  function clearFilters() {
    setNetwork("");
    setCountry("");
    setMinFollowers("");
    setMinEngagement("");
    setCategory("");
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="grid lg:grid-cols-[220px_1fr]">
          <aside className="border-b border-gray-100 bg-gray-50 p-4 lg:border-b-0 lg:border-r dark:border-gray-800 dark:bg-gray-900/80">
            <p className="text-xs font-semibold uppercase text-gray-500">
              {t("demo.filterLabel")}
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <Label className="text-xs">{t("demo.filterNetwork")}</Label>
                <Select
                  className="mt-1"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option value="">{t("demo.networkAll")}</option>
                  <option value="instagram">{t("demo.networkInstagram")}</option>
                  <option value="tiktok">{t("demo.networkTiktok")}</option>
                  <option value="youtube">{t("demo.networkYoutube")}</option>
                </Select>
              </div>
              <div>
                <Label className="text-xs">{t("demo.filterCountry")}</Label>
                <Select
                  className="mt-1"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">{t("demo.countryAll")}</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Venezuela">Venezuela</option>
                </Select>
              </div>
              <div>
                <Label className="text-xs">{t("demo.filterMinFollowers")}</Label>
                <Input
                  type="number"
                  className="mt-1"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">{t("demo.filterMinEngagement")}</Label>
                <Input
                  type="number"
                  step="0.1"
                  className="mt-1"
                  value={minEngagement}
                  onChange={(e) => setMinEngagement(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">{t("demo.filterCategory")}</Label>
                <Select
                  className="mt-1"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">{t("demo.categoryAll")}</option>
                  {["MICRO", "MACRO", "CREATOR", "UGC"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                {t("demo.filterClear")}
              </Button>
            </div>
          </aside>

          <div className="min-w-0 p-4">
            <p className="mb-3 text-sm font-semibold">
              {t("demo.resultsTitle")}{" "}
              <span className="font-normal text-gray-500">({filtered.length})</span>
            </p>
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                {t("demo.noResults")}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase text-gray-500">
                      <th className="pb-2 pr-4">{t("demo.colCreator")}</th>
                      <th className="pb-2 pr-4">{t("demo.colFollowers")}</th>
                      <th className="pb-2 pr-4">{t("demo.colEr")}</th>
                      <th className="pb-2">{t("demo.colActions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr
                        key={row.id}
                        className="cursor-pointer border-t border-gray-100 hover:bg-indigo-50/50 dark:border-gray-800 dark:hover:bg-indigo-950/30"
                        onClick={() => setSelected(row)}
                      >
                        <td className="py-3 pr-4">
                          <p className="font-medium">{row.displayName}</p>
                          <p className="text-xs text-gray-500">
                            {row.handle} · {row.city}
                          </p>
                        </td>
                        <td className="py-3 pr-4 tabular-nums">
                          {formatCount(row.followers)}
                        </td>
                        <td className="py-3 pr-4 tabular-nums text-emerald-600">
                          {row.engagementRate}%
                        </td>
                        <td className="py-3">
                          <Link
                            href={`/${locale}/demo/analyzer?creator=${row.id}`}
                            className="text-xs font-medium text-indigo-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("demo.viewAnalyzer")}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal
        >
          <div className="max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <h3 className="text-lg font-semibold">{t("demo.modalTitle")}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("demo.modalBody")}
            </p>
            <p className="mt-2 font-medium text-indigo-600">
              {selected.displayName} · {selected.handle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${locale}/demo/analyzer?creator=${selected.id}`}>
                <Button variant="outline">{t("demo.viewAnalyzer")}</Button>
              </Link>
              <Link href={`/${locale}/signup?role=brand`}>
                <Button>{t("demo.modalCta")}</Button>
              </Link>
              <Button variant="outline" onClick={() => setSelected(null)}>
                {t("demo.modalDismiss")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
