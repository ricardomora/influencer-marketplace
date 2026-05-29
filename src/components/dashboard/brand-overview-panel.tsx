"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { campaignStatusLabel, proposalStatusLabel } from "@/lib/dashboard/proposal-status";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function BrandOverviewPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const authSkip = useAuthSkip();
  const campaigns = useQuery(api.campaigns.listMine, authSkip);
  const sent = useQuery(api.proposals.listSent, authSkip);

  if (!t) return null;

  const activeCampaigns =
    campaigns?.filter((c) => c.status === "active").length ?? 0;
  const pendingProposals =
    sent?.filter((p) => p.proposal.status === "PENDING").length ?? 0;
  const recentProposals = (sent ?? []).slice(0, 4);
  const recentCampaigns = (campaigns ?? []).slice(0, 3);
  const base = `/${locale}/dashboard/brand`;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          [String(activeCampaigns), t("dashboard.statActiveCampaigns")],
          [String(pendingProposals), t("dashboard.statPendingProposals")],
          [String(campaigns?.length ?? 0), t("dashboard.statTotalCampaigns")],
        ].map(([value, label]) => (
          <Card key={label}>
            <p className="text-3xl font-bold text-indigo-600">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`${base}/search`}>
          <Button>{t("dashboard.ctaDiscover")}</Button>
        </Link>
        <Link href={`${base}/campaigns`}>
          <Button variant="outline">{t("dashboard.ctaNewCampaign")}</Button>
        </Link>
        <Link href={`${base}/proposals`}>
          <Button variant="outline">{t("dashboard.navProposals")}</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>{t("dashboard.recentCampaigns")}</CardTitle>
          {!recentCampaigns.length ? (
            <p className="mt-4 text-sm text-gray-500">{t("dashboard.noCampaigns")}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentCampaigns.map((c) => (
                <li
                  key={c._id}
                  className="rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                >
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-gray-500">
                    {campaignStatusLabel(t, c.status)} · ${c.budget}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardTitle>{t("dashboard.recentProposals")}</CardTitle>
          {!recentProposals.length ? (
            <p className="mt-4 text-sm text-gray-500">{t("dashboard.noProposals")}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentProposals.map(({ proposal, campaign, influencer }) => (
                <li
                  key={proposal._id}
                  className="rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                >
                  <p className="font-medium">{influencer?.displayName}</p>
                  <p className="text-xs text-gray-500">{campaign.title}</p>
                  <p className="text-xs text-indigo-600">
                    {proposalStatusLabel(t, proposal.status)} · ${proposal.rate}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
