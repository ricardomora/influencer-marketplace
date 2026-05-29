"use client";

import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import { type Locale, useDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

type NavItem = { href: string; label: string };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href={`/${locale}`} className="font-semibold text-indigo-600">
            {BRAND.name}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user?.email}</span>
            <UserButton afterSignOutUrl={`/${locale}`} />
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {role}
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              {item.label}
            </Link>
          ))}
        </aside>
        <main>
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h1>
          {!t ? <p className="text-gray-500">…</p> : children}
        </main>
      </div>
    </div>
  );
}
