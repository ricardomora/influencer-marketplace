"use client";

import { useParams, usePathname } from "next/navigation";
import { BrandCampaignsPanel } from "@/components/dashboard/brand-campaigns-panel";
import { BrandOverviewPanel } from "@/components/dashboard/brand-overview-panel";
import { BrandProfileForm } from "@/components/dashboard/brand-profile-form";
import { BrandProposalsPanel } from "@/components/dashboard/brand-proposals-panel";
import { BrandSearchPanel } from "@/components/dashboard/brand-search-panel";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { type Locale, useDictionary } from "@/lib/i18n";

export default function BrandDashboardPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as Locale) ?? "es";
  const { t } = useDictionary(locale);

  const base = `/${locale}/dashboard/brand`;
  const nav = [
    { href: base, label: t?.("dashboard.navOverview") ?? "Overview" },
    { href: `${base}/profile`, label: t?.("dashboard.navProfile") ?? "Profile" },
    { href: `${base}/search`, label: t?.("dashboard.navSearch") ?? "Search" },
    {
      href: `${base}/campaigns`,
      label: t?.("dashboard.navCampaigns") ?? "Campaigns",
    },
    {
      href: `${base}/proposals`,
      label: t?.("dashboard.navProposals") ?? "Proposals",
    },
  ];

  const isProfile = pathname.includes("/profile");
  const isSearch = pathname.includes("/search");
  const isCampaigns = pathname.includes("/campaigns");
  const isProposals = pathname.includes("/proposals");

  const pageTitle = isSearch
    ? t?.("dashboard.navSearch")
    : isCampaigns
      ? t?.("dashboard.navCampaigns")
      : isProposals
        ? t?.("dashboard.navProposals")
        : isProfile
          ? t?.("dashboard.brandSection")
          : t?.("dashboard.navOverview");

  return (
    <DashboardShell
      locale={locale}
      role="brand"
      title={pageTitle ?? ""}
      navItems={nav}
    >
      {isSearch ? (
        <BrandSearchPanel locale={locale} />
      ) : isCampaigns ? (
        <BrandCampaignsPanel locale={locale} />
      ) : isProposals ? (
        <BrandProposalsPanel locale={locale} />
      ) : isProfile ? (
        <BrandProfileForm locale={locale} />
      ) : (
        <BrandOverviewPanel locale={locale} />
      )}
    </DashboardShell>
  );
}
