"use client";

import { useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function InfluencerProposalsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const proposals = useQuery(api.proposals.listIncoming, useAuthSkip());
  const accept = useMutation(api.proposals.accept);
  const reject = useMutation(api.proposals.reject);

  if (!t) return null;

  return (
    <Card>
      <CardTitle>{t("dashboard.incomingProposals")}</CardTitle>
      {!proposals?.length ? (
        <p className="mt-4 text-sm text-gray-500">{t("dashboard.noProposals")}</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {proposals.map(({ proposal, campaign, brand }) => (
            <li
              key={proposal._id}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{campaign.title}</span>
                <Badge>{proposal.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{brand?.companyName}</p>
              <p className="mt-2 text-sm">${proposal.rate} USD</p>
              {proposal.status === "PENDING" && (
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    onClick={async () => {
                      await accept({ proposalId: proposal._id });
                      toast.success(t("common.accept"));
                    }}
                  >
                    {t("common.accept")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await reject({ proposalId: proposal._id });
                      toast.success(t("common.reject"));
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
