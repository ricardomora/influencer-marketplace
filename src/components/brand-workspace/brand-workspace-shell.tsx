"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import {
  BRAND_WORKSPACE_NAV,
  brandWorkspaceHref,
  type BrandWorkspaceMode,
  type BrandWorkspaceSegment,
} from "@/lib/brand-workspace/config";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function BrandWorkspaceShell({
  locale,
  mode,
  segment,
  dict,
  title,
  subtitle,
  userEmail,
  children,
}: {
  locale: Locale;
  mode: BrandWorkspaceMode;
  segment: BrandWorkspaceSegment;
  dict: Dictionary;
  title: string;
  subtitle?: string;
  userEmail?: string | null;
  children: React.ReactNode;
}) {
  const t = createTranslator(dict);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="font-semibold text-indigo-600">
              {BRAND.name}
            </Link>
            <Badge className="border border-indigo-200 bg-indigo-50 text-indigo-700">
              {t(mode === "demo" ? "workspace.badgeDemo" : "workspace.badgeLive")}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={mode === "demo" ? brandWorkspaceHref(locale, "live", "") : `/${locale}/demo`}
              className="hidden text-sm text-gray-500 hover:text-indigo-600 sm:inline"
            >
              {t(mode === "demo" ? "workspace.linkToLive" : "workspace.linkToDemo")}
            </Link>
            <Link
              href={`/${locale}`}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              {t("workspace.backToSite")}
            </Link>
            {mode === "demo" ? (
              <Link href={`/${locale}/signup?role=brand`}>
                <Button size="sm">{t("workspace.ctaSignup")}</Button>
              </Link>
            ) : (
              <>
                {userEmail && (
                  <span className="hidden max-w-[180px] truncate text-sm text-gray-500 md:inline">
                    {userEmail}
                  </span>
                )}
                <UserButton />
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-1">
          {BRAND_WORKSPACE_NAV.filter(
            (item) => !item.liveOnly || mode === "live",
          ).map((item) => {
            const href = brandWorkspaceHref(locale, mode, item.segment);
            const active = segment === item.segment;
            const Icon = item.icon;
            return (
              <Link
                key={item.segment || "hub"}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-200",
                )}
              >
                <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
                {t(`workspace.${item.labelKey}`)}
              </Link>
            );
          })}
          <p className="mt-4 px-3 text-xs leading-relaxed text-gray-500">
            {t(
              mode === "demo"
                ? "workspace.disclaimerDemo"
                : "workspace.disclaimerLive",
            )}
          </p>
        </aside>

        <main>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
