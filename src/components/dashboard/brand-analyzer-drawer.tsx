"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Button } from "@/components/ui/button";
import { summarizeDemographics } from "@/lib/dashboard/format-demographics";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function BrandAnalyzerDrawer({
  locale,
  profileId,
  hasCampaign,
  onClose,
  onSendProposal,
}: {
  locale: Locale;
  profileId: Id<"influencerProfiles">;
  hasCampaign: boolean;
  onClose: () => void;
  onSendProposal: () => void;
}) {
  const { t } = useDictionary(locale);
  const data = useQuery(
    api.influencers.getProfileById,
    useAuthSkip() === "skip" ? "skip" : { profileId },
  );

  if (!t) return null;

  const profile = data?.profile;
  const primary = data?.primaryAccount ?? data?.socialAccounts?.[0];
  const audience = summarizeDemographics(data?.demographics ?? []);
  const base = `/${locale}/dashboard/brand`;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/40"
      role="dialog"
      aria-modal
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold">{t("dashboard.analyzerTitle")}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            {t("dashboard.analyzerClose")}
          </Button>
        </div>

        {!profile ? (
          <p className="mt-6 text-sm text-gray-500">{t("common.loading")}</p>
        ) : (
          <>
            <div className="mt-6 flex gap-4">
              <div className="size-14 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600" />
              <div>
                <p className="font-semibold">{profile.displayName}</p>
                <p className="text-sm text-gray-500">
                  {profile.city}, {profile.country} · {profile.category}
                </p>
                <p className="mt-2 text-sm text-gray-600">{profile.bio}</p>
              </div>
            </div>

            {primary && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  [formatCount(primary.followers), t("common.followers")],
                  [`${primary.engagementRate}%`, t("common.engagement")],
                  [formatCount(primary.avgViews), t("dashboard.analyzerReach")],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    className="rounded-lg bg-gray-50 py-3 text-center dark:bg-gray-800"
                  >
                    <p className="text-lg font-bold">{v}</p>
                    <p className="text-xs text-gray-500">{l}</p>
                  </div>
                ))}
              </div>
            )}

            {audience && (
              <div className="mt-6 rounded-lg border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-sm font-semibold">{t("dashboard.analyzerAudience")}</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {audience.womenPct !== undefined && (
                    <li>
                      {t("dashboard.audienceWomen", { pct: String(audience.womenPct) })}
                    </li>
                  )}
                  {audience.menPct !== undefined && (
                    <li>
                      {t("dashboard.audienceMen", { pct: String(audience.menPct) })}
                    </li>
                  )}
                  {audience.topAge && (
                    <li>
                      {t("dashboard.audienceAge", { range: audience.topAge })}
                    </li>
                  )}
                  {audience.topCountry && (
                    <li>
                      {t("dashboard.audienceCountry", { country: audience.topCountry })}
                    </li>
                  )}
                </ul>
                {!data?.demographics?.length && (
                  <p className="mt-2 text-xs text-gray-400">
                    {t("dashboard.audienceNoData")}
                  </p>
                )}
              </div>
            )}

            {data?.socialAccounts && data.socialAccounts.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold">{t("dashboard.analyzerNetworks")}</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  {data.socialAccounts.map((acc) => (
                    <li key={acc._id}>
                      {acc.platform} · @{acc.username} ·{" "}
                      {formatCount(acc.followers)} {t("common.followers")}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 space-y-3">
              {!hasCampaign && (
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {t("dashboard.selectCampaignFirst")}{" "}
                  <Link href={`${base}/campaigns`} className="font-medium underline">
                    {t("workspace.navCampaigns")}
                  </Link>
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button onClick={onSendProposal} disabled={!hasCampaign}>
                  {t("common.sendProposal")}
                </Button>
                <Link href={`${base}/proposals`}>
                  <Button variant="outline">{t("workspace.navProposals")}</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
