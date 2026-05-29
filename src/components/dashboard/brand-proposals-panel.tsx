"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { BrandFlowStrip } from "@/components/dashboard/brand-flow-strip";
import { Button } from "@/components/ui/button";
import { proposalStatusLabel } from "@/lib/dashboard/proposal-status";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

type Filter = "all" | "PENDING" | "ACCEPTED" | "REJECTED";

function statusBadgeClass(status: string) {
  if (status === "ACCEPTED") {
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
  }
  if (status === "REJECTED") {
    return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
  }
  return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200";
}

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
    <>
      <BrandFlowStrip locale={locale} active="proposal" />
      <div className="mb-4 flex flex-wrap gap-2">
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
        <p className="py-8 text-center text-sm text-gray-500">
          {t("dashboard.noProposals")}
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 dark:border-gray-800">
                <th className="p-4">{t("dashboard.colCampaign")}</th>
                <th className="p-4">{t("dashboard.colInfluencer")}</th>
                <th className="p-4">{t("dashboard.colRate")}</th>
                <th className="p-4">{t("dashboard.colStatus")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ proposal, campaign, influencer }) => (
                <tr
                  key={proposal._id}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="p-4 font-medium">{campaign.title}</td>
                  <td className="p-4">{influencer?.displayName ?? "—"}</td>
                  <td className="p-4 tabular-nums">
                    ${proposal.rate.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(proposal.status)}`}
                    >
                      {proposalStatusLabel(t, proposal.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
