"use client";

import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { InfluencerProfileForm } from "@/components/dashboard/influencer-profile-form";
import { InfluencerProposalsPanel } from "@/components/dashboard/influencer-proposals-panel";
import { SocialAccountsPanel } from "@/components/dashboard/social-accounts-panel";
import { type Locale, useDictionary } from "@/lib/i18n";

export default function InfluencerDashboardPage() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "es";
  const { t } = useDictionary(locale);

  const base = `/${locale}/dashboard/influencer`;
  const nav = [
    { href: base, label: t?.("dashboard.navProfile") ?? "Profile" },
    { href: `${base}/social`, label: t?.("dashboard.navSocial") ?? "Social" },
    {
      href: `${base}/proposals`,
      label: t?.("dashboard.navProposals") ?? "Proposals",
    },
  ];

  return (
    <DashboardShell
      locale={locale}
      role="influencer"
      title={t?.("dashboard.influencerTitle") ?? ""}
      navItems={nav}
    >
      <div className="space-y-8">
        <InfluencerProfileForm locale={locale} />
        <SocialAccountsPanel locale={locale} />
        <InfluencerProposalsPanel locale={locale} />
      </div>
    </DashboardShell>
  );
}
