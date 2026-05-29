import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "", labelKey: "navHub", icon: "⌂" },
  { href: "/panel", labelKey: "navPanel", icon: "▦" },
  { href: "/discover", labelKey: "navDiscover", icon: "◎" },
  { href: "/analyzer", labelKey: "navAnalyzer", icon: "◈" },
  { href: "/campaigns", labelKey: "navCampaigns", icon: "▣" },
  { href: "/proposals", labelKey: "navProposals", icon: "◇" },
] as const;

export function DemoShell({
  locale,
  dict,
  segment,
  title,
  subtitle,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  segment: "" | "panel" | "discover" | "analyzer" | "campaigns" | "proposals";
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const t = createTranslator(dict);
  const base = `/${locale}/demo`;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="font-semibold text-indigo-600">
              {BRAND.name}
            </Link>
            <Badge>{t("demo.badge")}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}`}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              {t("demo.backToSite")}
            </Link>
            <Link href={`/${locale}/signup?role=brand`}>
              <Button size="sm">{t("demo.ctaSignup")}</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-1">
          {NAV.map((item) => {
            const href = `${base}${item.href}`;
            const active =
              item.href === "" ? segment === "" : segment === item.href.slice(1);
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800",
                )}
              >
                <span aria-hidden className="opacity-70">
                  {item.icon}
                </span>
                {t(`demo.${item.labelKey}`)}
              </Link>
            );
          })}
          <p className="mt-4 px-3 text-xs text-gray-500">{t("demo.disclaimer")}</p>
        </aside>

        <main>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
