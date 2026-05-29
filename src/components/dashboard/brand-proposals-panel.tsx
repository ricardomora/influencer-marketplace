"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { proposalStatusLabel } from "@/lib/dashboard/proposal-status";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

type Filter = "all" | "PENDING" | "ACCEPTED" | "REJECTED";

export function BrandProposalsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const sent = useQuery(api.proposals.listSent, useAuthSkip());
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (!sent) return [];
    if (filter === "all") return sent;
    return sent.filter((p) => p.proposal.status === filter);
  }, [sent, filter]);

  if (!t) return null;

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: t("dashboard.filterAll") },
    { id: "PENDING", label: t("dashboard.statusPending") },
    { id: "ACCEPTED", label: t("dashboard.statusAccepted") },
    { id: "REJECTED", label: t("dashboard.statusRejected") },
  ];

  return (
    <Card>
      <CardTitle>{t("dashboard.sentProposals")}</CardTitle>
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            size="sm"
            variant={filter === tab.id ? "default" : "outline"}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      {!filtered.length ? (
        <p className="mt-4 text-sm text-gray-500">{t("dashboard.noProposals")}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {filtered.map(({ proposal, campaign, influencer }) => (
            <li
              key={proposal._id}
              className="rounded-lg border p-4 dark:border-gray-800"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{influencer?.displayName}</span>
                <Badge
                  className={cn(
                    proposal.status === "ACCEPTED" && "bg-emerald-600",
                    proposal.status === "REJECTED" && "bg-red-600",
                    proposal.status === "PENDING" && "bg-amber-600",
                  )}
                >
                  {proposalStatusLabel(t, proposal.status)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{campaign.title}</p>
              <p className="text-sm font-medium">${proposal.rate} USD</p>
              {proposal.message && (
                <p className="mt-2 text-sm text-gray-500">{proposal.message}</p>
              )}
              <p className="mt-2 text-xs text-gray-400">
                {new Date(proposal.createdAt).toLocaleDateString(locale)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
