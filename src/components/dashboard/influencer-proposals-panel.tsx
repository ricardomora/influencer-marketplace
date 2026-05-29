"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { proposalStatusLabel } from "@/lib/dashboard/proposal-status";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

type Filter = "all" | "PENDING" | "ACCEPTED" | "REJECTED";

export function InfluencerProposalsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const proposals = useQuery(api.proposals.listIncoming, useAuthSkip());
  const accept = useMutation(api.proposals.accept);
  const reject = useMutation(api.proposals.reject);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (!proposals) return [];
    if (filter === "all") return proposals;
    return proposals.filter((p) => p.proposal.status === filter);
  }, [proposals, filter]);

  if (!t) return null;

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: t("dashboard.filterAll") },
    { id: "PENDING", label: t("dashboard.statusPending") },
    { id: "ACCEPTED", label: t("dashboard.statusAccepted") },
    { id: "REJECTED", label: t("dashboard.statusRejected") },
  ];

  return (
    <Card>
      <CardTitle>{t("dashboard.incomingProposals")}</CardTitle>
      <p className="mt-1 text-sm text-gray-500">{t("dashboard.incomingProposalsHint")}</p>
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
        <ul className="mt-4 space-y-4">
          {filtered.map(({ proposal, campaign, brand }) => (
            <li
              key={proposal._id}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{campaign.title}</span>
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
              <p className="text-sm text-gray-600">{brand?.companyName}</p>
              <p className="mt-2 text-sm font-medium">${proposal.rate} USD</p>
              {proposal.message && (
                <p className="mt-2 text-sm text-gray-500">{proposal.message}</p>
              )}
              {proposal.status === "PENDING" && (
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    onClick={async () => {
                      try {
                        await accept({ proposalId: proposal._id });
                        toast.success(t?.("dashboard.proposalAccepted") ?? "");
                      } catch (e) {
                        toast.error(e instanceof Error ? e.message : "Error");
                      }
                    }}
                  >
                    {t("common.accept")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        await reject({ proposalId: proposal._id });
                        toast.success(t?.("dashboard.proposalRejected") ?? "");
                      } catch (e) {
                        toast.error(e instanceof Error ? e.message : "Error");
                      }
                    }}
                  >
                    {t("common.reject")}
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
