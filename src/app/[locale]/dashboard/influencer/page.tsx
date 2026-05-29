"use client";

import { useParams, usePathname } from "next/navigation";
import {
  DashboardShell,
  influencerNavIcons,
} from "@/components/dashboard/dashboard-shell";
import { InfluencerOverviewPanel } from "@/components/dashboard/influencer-overview-panel";
import { InfluencerProfileForm } from "@/components/dashboard/influencer-profile-form";
import { InfluencerProposalsPanel } from "@/components/dashboard/influencer-proposals-panel";
import { SocialAccountsPanel } from "@/components/dashboard/social-accounts-panel";
import { type Locale, useDictionary } from "@/lib/i18n";

export default function InfluencerDashboardPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as Locale) ?? "es";
  const { t } = useDictionary(locale);

  const base = `/${locale}/dashboard/influencer`;
  const nav = [
    {
      href: base,
      label: t?.("dashboard.navOverview") ?? "Overview",
      exact: true,
      icon: influencerNavIcons.overview,
    },
    {
      href: `${base}/profile`,
      label: t?.("dashboard.navProfile") ?? "Profile",
      icon: influencerNavIcons.profile,
    },
    {
      href: `${base}/social`,
      label: t?.("dashboard.navSocial") ?? "Social",
      icon: influencerNavIcons.social,
    },
    {
      href: `${base}/proposals`,
      label: t?.("dashboard.navProposals") ?? "Proposals",
      icon: influencerNavIcons.proposals,
    },
  ];

  const isProfile = pathname.includes("/profile");
  const isSocial = pathname.includes("/social");
  const isProposals = pathname.includes("/proposals");

  const pageTitle = isSocial
    ? t?.("dashboard.navSocial")
    : isProposals
      ? t?.("dashboard.navProposals")
      : isProfile
        ? t?.("dashboard.profileSection")
        : t?.("dashboard.navOverview");

  return (
    <DashboardShell
      locale={locale}
      role="influencer"
      title={pageTitle ?? ""}
      navItems={nav}
    >
      {isSocial ? (
        <SocialAccountsPanel locale={locale} />
      ) : isProposals ? (
        <InfluencerProposalsPanel locale={locale} />
      ) : isProfile ? (
        <InfluencerProfileForm locale={locale} />
      ) : (
        <InfluencerOverviewPanel locale={locale} />
      )}
    </DashboardShell>
  );
}
