"use client";

import { useParams, usePathname } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BrandCampaignsPanel } from "@/components/dashboard/brand-campaigns-panel";
import { BrandProfileForm } from "@/components/dashboard/brand-profile-form";
import { BrandProposalsPanel } from "@/components/dashboard/brand-proposals-panel";
import { BrandSearchPanel } from "@/components/dashboard/brand-search-panel";
import { type Locale, useDictionary } from "@/lib/i18n";

export default function BrandDashboardPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as Locale) ?? "es";
  const { t } = useDictionary(locale);

  const base = `/${locale}/dashboard/brand`;
  const nav = [
    { href: base, label: t?.("dashboard.navProfile") ?? "Profile" },
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

  const isSearch = pathname.includes("/search");
  const isCampaigns = pathname.includes("/campaigns");
  const isProposals = pathname.includes("/proposals");

  return (
    <DashboardShell
      locale={locale}
      role="brand"
      title={t?.("dashboard.brandTitle") ?? ""}
      navItems={nav}
    >
      {isSearch ? (
        <BrandSearchPanel locale={locale} />
      ) : isCampaigns ? (
        <BrandCampaignsPanel locale={locale} />
      ) : isProposals ? (
        <BrandProposalsPanel locale={locale} />
      ) : (
        <div className="space-y-8">
          <BrandProfileForm locale={locale} />
          <BrandSearchPanel locale={locale} />
        </div>
      )}
    </DashboardShell>
  );
}
