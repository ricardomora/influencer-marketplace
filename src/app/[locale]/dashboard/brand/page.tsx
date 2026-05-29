"use client";

import { useQuery } from "convex/react";
import { useParams, usePathname } from "next/navigation";
import { BrandAnalyzerLiveHint } from "@/components/brand-workspace/brand-analyzer-live-hint";
import { BrandHubCards } from "@/components/brand-workspace/brand-hub-cards";
import { BrandWorkspaceShell } from "@/components/brand-workspace/brand-workspace-shell";
import { BrandCampaignsPanel } from "@/components/dashboard/brand-campaigns-panel";
import { BrandOverviewPanel } from "@/components/dashboard/brand-overview-panel";
import { BrandProfileForm } from "@/components/dashboard/brand-profile-form";
import { BrandProposalsPanel } from "@/components/dashboard/brand-proposals-panel";
import { BrandSearchPanel } from "@/components/dashboard/brand-search-panel";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import {
  brandPageCopy,
  resolveBrandSegment,
} from "@/lib/brand-workspace/config";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../../../convex/_generated/api";

export default function BrandDashboardPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as Locale) ?? "es";
  const { dict, t } = useDictionary(locale);
  const authSkip = useAuthSkip();
  const user = useQuery(api.users.current, authSkip);

  const segment = resolveBrandSegment(pathname, "live");
  const copy = brandPageCopy(segment);

  if (!dict || !t) return null;

  let content: React.ReactNode;
  if (segment === "discover") {
    content = <BrandSearchPanel locale={locale} />;
  } else if (segment === "campaigns") {
    content = <BrandCampaignsPanel locale={locale} />;
  } else if (segment === "proposals") {
    content = <BrandProposalsPanel locale={locale} />;
  } else if (segment === "profile") {
    content = <BrandProfileForm locale={locale} />;
  } else if (segment === "panel") {
    content = <BrandOverviewPanel locale={locale} />;
  } else if (segment === "analyzer") {
    content = <BrandAnalyzerLiveHint locale={locale} dict={dict} />;
  } else {
    content = <BrandHubCards locale={locale} mode="live" dict={dict} />;
  }

  return (
    <BrandWorkspaceShell
      locale={locale}
      mode="live"
      segment={segment}
      dict={dict}
      title={t(`workspace.${copy.titleKey}`)}
      subtitle={t(`workspace.${copy.subtitleKey}`)}
      userEmail={user?.email}
    >
      {content}
    </BrandWorkspaceShell>
  );
}
