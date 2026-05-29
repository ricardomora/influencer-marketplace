"use client";

import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Button } from "@/components/ui/button";
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
  onClose,
  onSendProposal,
}: {
  locale: Locale;
  profileId: Id<"influencerProfiles">;
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
  const primary = data?.socialAccounts?.[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/40"
      role="dialog"
      aria-modal
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl dark:bg-gray-900"
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

            <div className="mt-8">
              <Button onClick={onSendProposal}>{t("common.sendProposal")}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
