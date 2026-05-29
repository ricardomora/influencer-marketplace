import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Megaphone,
  Search,
  User,
  type LucideIcon,
} from "lucide-react";

export type BrandWorkspaceSegment =
  | ""
  | "panel"
  | "discover"
  | "analyzer"
  | "campaigns"
  | "proposals"
  | "profile";

export type BrandWorkspaceMode = "demo" | "live";

export const BRAND_HUB_CARDS = [
  { segment: "panel" as const, icon: LayoutDashboard, titleKey: "navPanel", descKey: "cardPanelDesc" },
  { segment: "discover" as const, icon: Search, titleKey: "navDiscover", descKey: "cardDiscoverDesc" },
  { segment: "analyzer" as const, icon: BarChart3, titleKey: "navAnalyzer", descKey: "cardAnalyzerDesc" },
  { segment: "campaigns" as const, icon: Megaphone, titleKey: "navCampaigns", descKey: "cardCampaignsDesc" },
  { segment: "proposals" as const, icon: FileText, titleKey: "navProposals", descKey: "cardProposalsDesc" },
] as const;

const SEGMENT_PATH: Record<BrandWorkspaceMode, Record<Exclude<BrandWorkspaceSegment, "">, string>> = {
  demo: {
    panel: "/panel",
    discover: "/discover",
    analyzer: "/analyzer",
    campaigns: "/campaigns",
    proposals: "/proposals",
    profile: "/profile",
  },
  live: {
    panel: "/panel",
    discover: "/search",
    analyzer: "/analyzer",
    campaigns: "/campaigns",
    proposals: "/proposals",
    profile: "/profile",
  },
};

export function brandWorkspaceBase(locale: string, mode: BrandWorkspaceMode) {
  return mode === "demo" ? `/${locale}/demo` : `/${locale}/dashboard/brand`;
}

export function brandWorkspaceHref(
  locale: string,
  mode: BrandWorkspaceMode,
  segment: BrandWorkspaceSegment,
) {
  const base = brandWorkspaceBase(locale, mode);
  if (segment === "") return base;
  return `${base}${SEGMENT_PATH[mode][segment]}`;
}

export const BRAND_WORKSPACE_NAV: {
  segment: BrandWorkspaceSegment;
  labelKey: string;
  icon: LucideIcon;
  exact?: boolean;
  liveOnly?: boolean;
}[] = [
  { segment: "", labelKey: "navHub", icon: LayoutDashboard, exact: true },
  { segment: "panel", labelKey: "navPanel", icon: LayoutDashboard },
  { segment: "discover", labelKey: "navDiscover", icon: Search },
  { segment: "analyzer", labelKey: "navAnalyzer", icon: BarChart3 },
  { segment: "campaigns", labelKey: "navCampaigns", icon: Megaphone },
  { segment: "proposals", labelKey: "navProposals", icon: FileText },
  { segment: "profile", labelKey: "navProfile", icon: User, liveOnly: true },
];

export function resolveBrandSegment(
  pathname: string,
  mode: BrandWorkspaceMode,
): BrandWorkspaceSegment {
  if (mode === "demo") {
    if (pathname.includes("/panel")) return "panel";
    if (pathname.includes("/discover")) return "discover";
    if (pathname.includes("/analyzer")) return "analyzer";
    if (pathname.includes("/campaigns")) return "campaigns";
    if (pathname.includes("/proposals")) return "proposals";
    return "";
  }
  if (pathname.includes("/profile")) return "profile";
  if (pathname.includes("/panel")) return "panel";
  if (pathname.includes("/search")) return "discover";
  if (pathname.includes("/analyzer")) return "analyzer";
  if (pathname.includes("/campaigns")) return "campaigns";
  if (pathname.includes("/proposals")) return "proposals";
  return "";
}

export function brandPageCopy(segment: BrandWorkspaceSegment): {
  titleKey: string;
  subtitleKey: string;
} {
  switch (segment) {
    case "panel":
      return { titleKey: "panelPageTitle", subtitleKey: "panelPageSubtitle" };
    case "discover":
      return { titleKey: "discoverPageTitle", subtitleKey: "discoverPageSubtitle" };
    case "analyzer":
      return { titleKey: "analyzerPageTitle", subtitleKey: "analyzerPageSubtitle" };
    case "campaigns":
      return { titleKey: "campaignsPageTitle", subtitleKey: "campaignsPageSubtitle" };
    case "proposals":
      return { titleKey: "proposalsPageTitle", subtitleKey: "proposalsPageSubtitle" };
    case "profile":
      return { titleKey: "profilePageTitle", subtitleKey: "profilePageSubtitle" };
    default:
      return { titleKey: "brandTitle", subtitleKey: "hubSubtitle" };
  }
}
