"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import {
  ListRow,
  Panel,
  PanelBody,
  PanelHeader,
  StatCard,
} from "@/components/dashboard/dashboard-primitives";
import { Button } from "@/components/ui/button";
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
        <StatCard value={String(activeCampaigns)} label={t("dashboard.statActiveCampaigns")} />
        <StatCard value={String(pendingProposals)} label={t("dashboard.statPendingProposals")} />
        <StatCard
          value={String(campaigns?.length ?? 0)}
          label={t("dashboard.statTotalCampaigns")}
        />
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
        <Panel>
          <PanelHeader title={t("dashboard.recentCampaigns")} />
          <PanelBody>
            {!recentCampaigns.length ? (
              <p className="text-sm text-gray-500">{t("dashboard.noCampaigns")}</p>
            ) : (
              <ul className="space-y-2">
                {recentCampaigns.map((c) => (
                  <ListRow
                    key={c._id}
                    title={c.title}
                    meta={`${campaignStatusLabel(t, c.status)} · $${c.budget}`}
                  />
                ))}
              </ul>
            )}
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title={t("dashboard.recentProposals")} />
          <PanelBody>
            {!recentProposals.length ? (
              <p className="text-sm text-gray-500">{t("dashboard.noProposals")}</p>
            ) : (
              <ul className="space-y-2">
                {recentProposals.map(({ proposal, campaign, influencer }) => (
                  <ListRow
                    key={proposal._id}
                    title={influencer?.displayName ?? "—"}
                    meta={`${campaign.title} · ${proposalStatusLabel(t, proposal.status)}`}
                    trailing={
                      <span className="text-sm font-medium text-gray-900">
                        ${proposal.rate}
                      </span>
                    }
                  />
                ))}
              </ul>
            )}
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}
