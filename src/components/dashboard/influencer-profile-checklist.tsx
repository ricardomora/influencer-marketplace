"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Panel, PanelBody, PanelHeader } from "@/components/dashboard/dashboard-primitives";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

export function InfluencerProfileChecklist({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const profile = useQuery(api.influencers.getMyProfile, useAuthSkip());
  const accounts = useQuery(api.socialAccounts.listMine, useAuthSkip());

  if (!t) return null;

  const items = [
    {
      done: Boolean(profile?.displayName?.trim()),
      label: t("dashboard.checkDisplayName"),
    },
    {
      done: Boolean(profile?.bio?.trim()),
      label: t("dashboard.checkBio"),
    },
    {
      done: Boolean(profile?.country && profile?.city),
      label: t("dashboard.checkLocation"),
    },
    {
      done: (accounts?.length ?? 0) > 0,
      label: t("dashboard.checkSocial"),
      href: `/${locale}/dashboard/influencer/social`,
    },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const pct = Math.round((doneCount / items.length) * 100);

  return (
    <Panel>
      <PanelHeader
        title={t("dashboard.profileChecklistTitle")}
        subtitle={t("dashboard.profileChecklistSubtitle", { pct: String(pct) })}
      />
      <PanelBody>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.label}
            className={cn(
              "flex items-center gap-2 text-sm",
              item.done ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600",
            )}
          >
            <span aria-hidden>{item.done ? "✓" : "○"}</span>
            {item.href && !item.done ? (
              <Link href={item.href} className="text-indigo-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </PanelBody>
    </Panel>
  );
}
