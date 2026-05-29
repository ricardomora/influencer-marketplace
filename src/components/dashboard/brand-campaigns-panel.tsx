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
import { campaignStatusLabel } from "@/lib/dashboard/proposal-status";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

const WIZARD_STEPS = ["wizardStepBrief", "wizardStepBudget", "wizardStepReview"] as const;

export function BrandCampaignsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const campaigns = useQuery(api.campaigns.listMine, useAuthSkip());
  const create = useMutation(api.campaigns.create);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [briefText, setBriefText] = useState("");
  const [budget, setBudget] = useState("1000");
  const [platform, setPlatform] = useState("INSTAGRAM");

  async function handleCreate() {
    try {
      await create({
        title,
        briefText,
        budget: Number(budget) || 0,
        requirementsJson: JSON.stringify({ platforms: [platform] }),
        status: "active",
      });
      setTitle("");
      setBriefText("");
      setStep(0);
      toast.success(t?.("dashboard.campaignCreated") ?? "Created");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  if (!t) return null;

  const isLast = step === WIZARD_STEPS.length - 1;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>{t("dashboard.campaignWizardTitle")}</CardTitle>
        <ol className="mt-4 flex flex-wrap gap-2">
          {WIZARD_STEPS.map((key, i) => (
            <li
              key={key}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                i === step
                  ? "bg-indigo-600 text-white"
                  : i < step
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {i + 1}. {t(`dashboard.${key}`)}
            </li>
          ))}
        </ol>

        <div className="mt-6 space-y-4">
          {step === 0 && (
            <>
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
            </>
          )}
          {step === 1 && (
            <>
              <div>
                <Label>{t("dashboard.campaignBudget")}</Label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <div>
                <Label>{t("dashboard.platform")}</Label>
                <Input value={platform} onChange={(e) => setPlatform(e.target.value)} />
              </div>
            </>
          )}
          {step === 2 && (
            <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-4 text-sm dark:border-indigo-900 dark:bg-indigo-950/30">
              <p className="font-semibold">{title || "—"}</p>
              <p className="mt-2 text-gray-600">{briefText || "—"}</p>
              <p className="mt-2">
                ${budget} · {platform}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              {t("dashboard.wizardBack")}
            </Button>
          )}
          {!isLast ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 && !title.trim()}
            >
              {t("dashboard.wizardNext")}
            </Button>
          ) : (
            <Button onClick={handleCreate} disabled={!title.trim()}>
              {t("common.create")}
            </Button>
          )}
        </div>
      </Card>

      <ul className="space-y-3">
        {(campaigns ?? []).map((c) => (
          <li key={c._id}>
            <Card>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{c.title}</span>
                <Badge>{campaignStatusLabel(t, c.status)}</Badge>
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
