"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BRAND_WORKSPACE_NAV,
  brandWorkspaceHref,
  type BrandWorkspaceMode,
  type BrandWorkspaceSegment,
} from "@/lib/brand-workspace/config";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

function SidebarNav({
  locale,
  mode,
  segment,
  dict,
  collapsed,
  onNavigate,
}: {
  locale: Locale;
  mode: BrandWorkspaceMode;
  segment: BrandWorkspaceSegment;
  dict: Dictionary;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const t = createTranslator(dict);
  const navItems = BRAND_WORKSPACE_NAV.filter(
    (item) => !item.liveOnly || mode === "live",
  );

  return (
    <nav className="space-y-1 p-2">
      {navItems.map((item) => {
        const href = brandWorkspaceHref(locale, mode, item.segment);
        const active = segment === item.segment;
        const Icon = item.icon;
        const label = t(`workspace.${item.labelKey}`);

        return (
          <Link
            key={item.segment || "hub"}
            href={href}
            title={collapsed ? label : undefined}
            aria-label={label}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              collapsed && "justify-center px-2",
              active
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarDisclaimer({
  mode,
  dict,
}: {
  mode: BrandWorkspaceMode;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <p className="border-t border-gray-100 p-4 text-xs leading-relaxed text-gray-500">
      {t(
        mode === "demo"
          ? "workspace.disclaimerDemo"
          : "workspace.disclaimerLive",
      )}
    </p>
  );
}

/** Persistent rail below the header — desktop only. */
export function BrandWorkspaceSidebar({
  locale,
  mode,
  segment,
  dict,
  collapsed,
}: {
  locale: Locale;
  mode: BrandWorkspaceMode;
  segment: BrandWorkspaceSegment;
  dict: Dictionary;
  collapsed: boolean;
}) {
  return (
    <aside
      className={cn(
        "sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-gray-200 bg-white transition-[width] duration-200 lg:flex",
        collapsed ? "w-[4.5rem]" : "w-56",
      )}
    >
      <div className="flex-1 overflow-y-auto">
        <SidebarNav
          locale={locale}
          mode={mode}
          segment={segment}
          dict={dict}
          collapsed={collapsed}
        />
      </div>
      {!collapsed && <SidebarDisclaimer mode={mode} dict={dict} />}
    </aside>
  );
}

/** Slide-over sheet below the header — mobile only. */
export function BrandWorkspaceMobileDrawer({
  locale,
  mode,
  segment,
  dict,
  open,
  onClose,
}: {
  locale: Locale;
  mode: BrandWorkspaceMode;
  segment: BrandWorkspaceSegment;
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
}) {
  const t = createTranslator(dict);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 top-14 z-30 bg-black/40 lg:hidden"
        aria-label={t("workspace.sidebarClose")}
        onClick={onClose}
      />
      <aside
        className="fixed bottom-0 left-0 top-14 z-40 flex w-72 max-w-[85vw] flex-col border-r border-gray-200 bg-white shadow-xl lg:hidden"
        role="dialog"
        aria-modal
        aria-label={t("workspace.sidebarMenu")}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <p className="text-sm font-semibold text-gray-900">
            {t("workspace.sidebarMenu")}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="size-9 p-0"
            aria-label={t("workspace.sidebarClose")}
            onClick={onClose}
          >
            <X className="size-5" aria-hidden />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav
            locale={locale}
            mode={mode}
            segment={segment}
            dict={dict}
            collapsed={false}
            onNavigate={onClose}
          />
        </div>
        <SidebarDisclaimer mode={mode} dict={dict} />
      </aside>
    </>
  );
}
