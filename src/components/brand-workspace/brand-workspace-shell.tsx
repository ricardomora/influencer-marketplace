"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { PanelLeft } from "lucide-react";
import {
  BrandWorkspaceMobileDrawer,
  BrandWorkspaceSidebar,
} from "@/components/brand-workspace/brand-workspace-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import {
  brandWorkspaceHref,
  type BrandWorkspaceMode,
  type BrandWorkspaceSegment,
} from "@/lib/brand-workspace/config";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

const SIDEBAR_COLLAPSED_KEY = "brand-workspace-sidebar-collapsed";

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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  function handleCollapsedChange(next: boolean) {
    setCollapsed(next);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
  }

  function handleSidebarToggle() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      handleCollapsedChange(!collapsed);
      return;
    }
    setMobileOpen((open) => !open);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="size-9 shrink-0 p-0"
              aria-expanded={mobileOpen || !collapsed}
              aria-label={t("workspace.sidebarToggle")}
              onClick={handleSidebarToggle}
            >
              <PanelLeft className="size-5" aria-hidden />
            </Button>
            <Link
              href={`/${locale}`}
              className="truncate font-semibold text-indigo-600"
            >
              {BRAND.name}
            </Link>
            <Badge className="hidden border border-indigo-200 bg-indigo-50 text-indigo-700 sm:inline-flex">
              {t(mode === "demo" ? "workspace.badgeDemo" : "workspace.badgeLive")}
            </Badge>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={
                mode === "demo"
                  ? brandWorkspaceHref(locale, "live", "")
                  : `/${locale}/demo`
              }
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

      <BrandWorkspaceMobileDrawer
        locale={locale}
        mode={mode}
        segment={segment}
        dict={dict}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex">
        <BrandWorkspaceSidebar
          locale={locale}
          mode={mode}
          segment={segment}
          dict={dict}
          collapsed={collapsed}
        />

        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8 xl:px-10">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          <div className="mt-6 lg:mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
