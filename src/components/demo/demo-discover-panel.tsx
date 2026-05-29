"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DiscoverCreatorCard } from "@/components/brand-workspace/discover-creator-card";
import { Panel, PanelBody, PanelHeader } from "@/components/dashboard/dashboard-primitives";
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

function estimatedReach(followers: number) {
  return formatCount(Math.round(followers * 0.12));
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
      <Panel>
        <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
          <aside className="border-b border-gray-100 bg-[#f8f9fb] p-5 lg:border-b-0 lg:border-r dark:border-gray-800 dark:bg-gray-900/80">
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

          <div className="min-w-0 p-5">
            <PanelHeader
              title={t("demo.resultsTitle")}
              subtitle={t("dashboard.resultsCount", {
                count: String(filtered.length),
              })}
            />
            <PanelBody className="pt-0">
              {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm text-gray-500">
                  {t("demo.noResults")}
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {filtered.map((row) => (
                    <DiscoverCreatorCard
                      key={row.id}
                      displayName={row.displayName}
                      subtitle={`${row.handle} · ${row.city}`}
                      category={row.category}
                      followers={formatCount(row.followers)}
                      reach={estimatedReach(row.followers)}
                      engagementRate={`${row.engagementRate}%`}
                      followersLabel={t("demo.colFollowers")}
                      reachLabel={t("demo.analyzerReach")}
                      engagementLabel={t("demo.colEr")}
                      onClick={() => setSelected(row)}
                      footer={
                        <Link
                          href={`/${locale}/demo/analyzer?creator=${row.id}`}
                          className="block"
                        >
                          <Button size="sm" className="w-full" variant="outline">
                            {t("demo.viewAnalyzer")}
                          </Button>
                        </Link>
                      }
                    />
                  ))}
                </div>
              )}
            </PanelBody>
          </div>
        </div>
      </Panel>

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
