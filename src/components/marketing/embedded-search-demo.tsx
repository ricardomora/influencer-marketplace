"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  DEMO_INFLUENCERS,
  type DemoInfluencerRow,
  type DemoNetwork,
} from "@/lib/demo/advertiser-search-fixtures";
import type { Locale } from "@/lib/i18n";

export type EmbeddedSearchDemoLabels = {
  demoBadge: string;
  demoDisclaimer: string;
  demoFiltersTitle: string;
  demoNetwork: string;
  demoCountry: string;
  demoMinFollowers: string;
  demoMinEngagement: string;
  demoCategory: string;
  demoClear: string;
  demoResultsTitle: string;
  demoColName: string;
  demoColFollowers: string;
  demoColEr: string;
  demoColEngagement: string;
  demoColNetworks: string;
  demoNoResults: string;
  demoLoginPromptTitle: string;
  demoLoginPromptBody: string;
  demoLoginPromptCta: string;
  demoLoginPromptDismiss: string;
  networkAll: string;
  networkInstagram: string;
  networkTiktok: string;
  networkYoutube: string;
  countryAll: string;
  categoryAll: string;
};

const NETWORK_LABELS: Record<DemoNetwork, string> = {
  instagram: "IG",
  tiktok: "TT",
  youtube: "YT",
};

function NetworkIcons({ networks }: { networks: DemoNetwork[] }) {
  return (
    <div className="flex gap-1">
      {networks.map((n) => (
        <span
          key={n}
          className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300"
        >
          {NETWORK_LABELS[n]}
        </span>
      ))}
    </div>
  );
}

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function EmbeddedSearchDemo({
  locale,
  labels,
}: {
  locale: Locale;
  labels: EmbeddedSearchDemoLabels;
}) {
  const [network, setNetwork] = useState("");
  const [country, setCountry] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [minEngagement, setMinEngagement] = useState("");
  const [category, setCategory] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);
  const [selected, setSelected] = useState<DemoInfluencerRow | null>(null);

  const filtered = useMemo(() => {
    return DEMO_INFLUENCERS.filter((row) => {
      if (network && !row.networks.includes(network as DemoNetwork)) {
        return false;
      }
      if (country && row.country !== country) return false;
      if (category && row.category !== category) return false;
      if (minFollowers && row.followers < Number(minFollowers)) return false;
      if (minEngagement && row.engagementRate < Number(minEngagement)) {
        return false;
      }
      return true;
    });
  }, [network, country, category, minFollowers, minEngagement]);

  function clearFilters() {
    setNetwork("");
    setCountry("");
    setMinFollowers("");
    setMinEngagement("");
    setCategory("");
  }

  function openRow(row: DemoInfluencerRow) {
    setSelected(row);
    setPromptOpen(true);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-indigo-100/40 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/80">
        <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
          {labels.demoBadge}
        </Badge>
        <p className="text-xs text-gray-500">{labels.demoDisclaimer}</p>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-gray-100 p-4 lg:border-b-0 lg:border-r dark:border-gray-800">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {labels.demoFiltersTitle}
          </p>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">{labels.demoNetwork}</Label>
              <Select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="mt-1"
              >
                <option value="">{labels.networkAll}</option>
                <option value="instagram">{labels.networkInstagram}</option>
                <option value="tiktok">{labels.networkTiktok}</option>
                <option value="youtube">{labels.networkYoutube}</option>
              </Select>
            </div>
            <div>
              <Label className="text-xs">{labels.demoCountry}</Label>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1"
              >
                <option value="">{labels.countryAll}</option>
                <option value="Colombia">Colombia</option>
                <option value="Venezuela">Venezuela</option>
              </Select>
            </div>
            <div>
              <Label className="text-xs">{labels.demoMinFollowers}</Label>
              <Input
                type="number"
                className="mt-1"
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
                placeholder="100000"
              />
            </div>
            <div>
              <Label className="text-xs">{labels.demoMinEngagement}</Label>
              <Input
                type="number"
                step="0.1"
                className="mt-1"
                value={minEngagement}
                onChange={(e) => setMinEngagement(e.target.value)}
                placeholder="4"
              />
            </div>
            <div>
              <Label className="text-xs">{labels.demoCategory}</Label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1"
              >
                <option value="">{labels.categoryAll}</option>
                {["MICRO", "MACRO", "CREATOR", "UGC"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {labels.demoClear}
            </Button>
          </div>
        </aside>

        <div className="min-w-0 p-4">
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
            {labels.demoResultsTitle}{" "}
            <span className="font-normal text-gray-500">({filtered.length})</span>
          </p>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase tracking-wide text-gray-500">
                  <th className="pb-2 pr-4">{labels.demoColName}</th>
                  <th className="pb-2 pr-4">{labels.demoColFollowers}</th>
                  <th className="pb-2 pr-4">{labels.demoColEr}</th>
                  <th className="pb-2 pr-4">{labels.demoColEngagement}</th>
                  <th className="pb-2">{labels.demoColNetworks}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-indigo-50/50 dark:border-gray-800 dark:hover:bg-indigo-950/30"
                    onClick={() => openRow(row)}
                  >
                    <td className="py-3 pr-4">
                      <p className="font-medium">{row.displayName}</p>
                      <p className="text-xs text-gray-500">{row.handle}</p>
                      <p className="text-xs text-gray-400">
                        {row.city}, {row.country} · {row.category}
                      </p>
                    </td>
                    <td className="py-3 pr-4 tabular-nums">
                      {formatCount(row.followers)}
                    </td>
                    <td className="py-3 pr-4 tabular-nums">
                      {row.engagementRate}%
                    </td>
                    <td className="py-3 pr-4 tabular-nums">
                      {formatCount(row.totalEngagement)}
                    </td>
                    <td className="py-3">
                      <NetworkIcons networks={row.networks} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 md:hidden">
            {filtered.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => openRow(row)}
                  className="w-full rounded-lg border border-gray-200 p-3 text-left hover:border-indigo-300 dark:border-gray-700"
                >
                  <p className="font-medium">{row.displayName}</p>
                  <p className="text-xs text-gray-500">{row.handle}</p>
                  <p className="mt-1 text-sm tabular-nums text-gray-600">
                    {formatCount(row.followers)} · {row.engagementRate}% ER
                  </p>
                </button>
              </li>
            ))}
          </ul>

          {!filtered.length && (
            <p className="py-8 text-center text-sm text-gray-500">
              {labels.demoNoResults}
            </p>
          )}
        </div>
      </div>

      {promptOpen && selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal
        >
          <div className="max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <h3 className="text-lg font-semibold">{labels.demoLoginPromptTitle}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {labels.demoLoginPromptBody}
            </p>
            <p className="mt-2 text-sm font-medium text-indigo-600">
              {selected.displayName} · {selected.handle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${locale}/signup?role=brand`}>
                <Button>{labels.demoLoginPromptCta}</Button>
              </Link>
              <Button variant="outline" onClick={() => setPromptOpen(false)}>
                {labels.demoLoginPromptDismiss}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
