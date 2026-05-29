"use client";

import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function BrandProposalsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const sent = useQuery(api.proposals.listSent, useAuthSkip());

  if (!t) return null;

  return (
    <Card>
      <CardTitle>{t("dashboard.sentProposals")}</CardTitle>
      {!sent?.length ? (
        <p className="mt-4 text-sm text-gray-500">{t("dashboard.noProposals")}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {sent.map(({ proposal, campaign, influencer }) => (
            <li
              key={proposal._id}
              className="rounded-lg border p-4 dark:border-gray-800"
            >
              <div className="flex gap-2">
                <span className="font-medium">{influencer?.displayName}</span>
                <Badge>{proposal.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{campaign.title}</p>
              <p className="text-sm">${proposal.rate}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
