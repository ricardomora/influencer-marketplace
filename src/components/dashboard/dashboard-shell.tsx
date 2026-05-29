"use client";

import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
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
  subtitle,
  children,
}: {
  locale: Locale;
  role: "influencer" | "brand" | "admin";
  navItems: NavItem[];
  title: string;
  subtitle?: string;
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
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href={`/${locale}`} className="font-semibold text-indigo-600">
            {BRAND.name}
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:inline">{roleLabel}</span>
            <span className="hidden max-w-[200px] truncate text-sm text-gray-500 md:inline">
              {user?.email}
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-1">
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
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-200",
                )}
              >
                <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </aside>

        <main>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          <div className="mt-8">{!t ? <p className="text-gray-500">…</p> : children}</div>
        </main>
      </div>
    </div>
  );
}

export const influencerNavIcons = {
  overview: LayoutDashboard,
  profile: User,
  social: Share2,
  proposals: FileText,
} as const;

export const adminNavIcons = {
  overview: Shield,
} as const;
