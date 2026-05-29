"use client";

import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Megaphone,
  Search,
  Share2,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { isDashboardNavActive } from "@/lib/dashboard/nav-active";
import { type Locale, useDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  icon?: LucideIcon;
};

export function DashboardShell({
  locale,
  role,
  navItems,
  title,
  children,
}: {
  locale: Locale;
  role: "influencer" | "brand" | "admin";
  navItems: NavItem[];
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useDictionary(locale);
  const authSkip = useAuthSkip();
  const user = useQuery(api.users.current, authSkip);

  const roleLabel =
    role === "brand"
      ? t?.("dashboard.brandTitle")
      : role === "influencer"
        ? t?.("dashboard.influencerTitle")
        : t?.("dashboard.adminTitle");

  return (
    <div className="flex min-h-screen bg-[#eef0f3]">
      <aside className="flex w-[240px] shrink-0 flex-col bg-[#1b1f24] text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <Link
            href={`/${locale}`}
            className="text-lg font-semibold tracking-tight text-white hover:text-indigo-200"
          >
            {BRAND.name}
          </Link>
          <p className="mt-1 text-xs text-white/50">{roleLabel ?? role}</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {navItems.map((item) => {
            const active = isDashboardNavActive(
              pathname,
              item.href,
              item.exact ?? false,
            );
            const Icon = item.icon ?? LayoutDashboard;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/12 text-white"
                    : "text-white/70 hover:bg-white/8 hover:text-white",
                )}
              >
                <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-5 py-4 text-xs text-white/40">
          LATAM · POC
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200/80 bg-white px-6 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate text-sm text-gray-500 sm:inline">
              {user?.email}
            </span>
            <UserButton />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {!t ? <p className="text-gray-500">…</p> : children}
        </main>
      </div>
    </div>
  );
}

export const brandNavIcons = {
  overview: LayoutDashboard,
  profile: User,
  search: Search,
  campaigns: Megaphone,
  proposals: FileText,
} as const;

export const influencerNavIcons = {
  overview: LayoutDashboard,
  profile: User,
  social: Share2,
  proposals: FileText,
} as const;

export const adminNavIcons = {
  overview: Shield,
} as const;
