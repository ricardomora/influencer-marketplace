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
import { proposalStatusLabel } from "@/lib/dashboard/proposal-status";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function InfluencerOverviewPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const authSkip = useAuthSkip();
  const profile = useQuery(api.influencers.getMyProfile, authSkip);
  const accounts = useQuery(api.socialAccounts.listMine, authSkip);
  const incoming = useQuery(api.proposals.listIncoming, authSkip);

  if (!t) return null;

  const pending =
    incoming?.filter((p) => p.proposal.status === "PENDING").length ?? 0;
  const profileFields = profile
    ? [
        profile.displayName,
        profile.bio,
        profile.country,
        profile.city,
        profile.category,
      ]
    : [];
  const profileComplete = profile
    ? Math.round(
        (profileFields.filter((f) => String(f).trim().length > 0).length /
          profileFields.length) *
          100,
      )
    : 0;
  const base = `/${locale}/dashboard/influencer`;
  const recent = (incoming ?? []).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          value={String(pending)}
          label={t("dashboard.statPendingIncoming")}
        />
        <StatCard
          value={String(accounts?.length ?? 0)}
          label={t("dashboard.statConnectedAccounts")}
        />
        <StatCard
          value={`${profileComplete}%`}
          label={t("dashboard.statProfileComplete")}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`${base}/proposals`}>
          <Button>{t("dashboard.ctaReviewProposals")}</Button>
        </Link>
        <Link href={`${base}/social`}>
          <Button variant="outline">{t("dashboard.ctaSyncMetrics")}</Button>
        </Link>
        <Link href={`${base}/profile`}>
          <Button variant="outline">{t("dashboard.ctaCompleteProfile")}</Button>
        </Link>
      </div>

      <Panel>
        <PanelHeader title={t("dashboard.incomingProposals")} />
        <PanelBody>
          {!recent.length ? (
            <p className="text-sm text-gray-500">{t("dashboard.noProposals")}</p>
          ) : (
            <ul className="space-y-2">
              {recent.map(({ proposal, campaign, brand }) => (
                <ListRow
                  key={proposal._id}
                  title={campaign.title}
                  meta={`${brand?.companyName} · ${proposalStatusLabel(t, proposal.status)}`}
                  trailing={
                    <span className="text-sm font-medium">${proposal.rate}</span>
                  }
                />
              ))}
            </ul>
          )}
        </PanelBody>
      </Panel>
    </div>
  );
}
