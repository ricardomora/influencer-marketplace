"use client";

import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Card, CardTitle } from "@/components/ui/card";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function AdminOverview({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const data = useQuery(api.admin.overview, useAuthSkip());

  if (!t || !data) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [t("dashboard.users"), data.userCount],
          [t("dashboard.influencers"), data.influencerCount],
          [t("dashboard.brands"), data.brandCount],
          [t("dashboard.campaigns"), data.campaignCount],
        ].map(([label, value]) => (
          <Card key={String(label)}>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <CardTitle>{t("dashboard.users")}</CardTitle>
        <ul className="mt-4 divide-y text-sm dark:divide-gray-800">
          {data.users.map((u) => (
            <li key={u._id} className="flex justify-between py-2">
              <span>{u.email}</span>
              <span className="text-gray-500">{u.role}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
