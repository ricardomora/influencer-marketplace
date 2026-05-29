"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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
        {[
          [String(pending), t("dashboard.statPendingIncoming")],
          [String(accounts?.length ?? 0), t("dashboard.statConnectedAccounts")],
          [`${profileComplete}%`, t("dashboard.statProfileComplete")],
        ].map(([value, label]) => (
          <Card key={label}>
            <p className="text-3xl font-bold text-indigo-600">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </Card>
        ))}
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

      <Card>
        <CardTitle>{t("dashboard.incomingProposals")}</CardTitle>
        {!recent.length ? (
          <p className="mt-4 text-sm text-gray-500">{t("dashboard.noProposals")}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recent.map(({ proposal, campaign, brand }) => (
              <li
                key={proposal._id}
                className="rounded-lg border border-gray-100 p-3 dark:border-gray-800"
              >
                <p className="font-medium">{campaign.title}</p>
                <p className="text-xs text-gray-500">{brand?.companyName}</p>
                <p className="text-xs text-indigo-600">
                  {proposalStatusLabel(t, proposal.status)} · ${proposal.rate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
