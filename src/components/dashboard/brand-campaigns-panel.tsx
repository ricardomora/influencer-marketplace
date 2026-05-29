"use client";

import { useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function BrandCampaignsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const campaigns = useQuery(api.campaigns.listMine, useAuthSkip());
  const create = useMutation(api.campaigns.create);
  const [title, setTitle] = useState("");
  const [briefText, setBriefText] = useState("");
  const [budget, setBudget] = useState("1000");

  async function handleCreate() {
    try {
      await create({
        title,
        briefText,
        budget: Number(budget) || 0,
        requirementsJson: JSON.stringify({ platforms: ["INSTAGRAM"] }),
        status: "active",
      });
      setTitle("");
      setBriefText("");
      toast.success(t?.("common.create") ?? "Created");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  if (!t) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>{t("dashboard.navCampaigns")}</CardTitle>
        <div className="mt-4 space-y-4">
          <div>
            <Label>{t("dashboard.campaignTitle")}</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>{t("dashboard.campaignBrief")}</Label>
            <Textarea
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label>{t("dashboard.campaignBudget")}</Label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <Button onClick={handleCreate}>{t("common.create")}</Button>
        </div>
      </Card>

      <ul className="space-y-3">
        {(campaigns ?? []).map((c) => (
          <li key={c._id}>
            <Card>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{c.title}</span>
                <Badge>{c.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-gray-600">{c.briefText}</p>
              <p className="mt-1 text-sm">${c.budget} USD</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
