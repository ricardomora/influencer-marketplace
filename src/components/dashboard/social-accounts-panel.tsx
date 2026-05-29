"use client";

import { useAction, useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelHeader } from "@/components/dashboard/dashboard-primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

const PLATFORMS = [
  "INSTAGRAM",
  "TIKTOK",
  "YOUTUBE",
  "TWITTER",
  "FACEBOOK",
] as const;

export function SocialAccountsPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const accounts = useQuery(api.socialAccounts.listMine, useAuthSkip());
  const connectAccount = useMutation(api.socialAccounts.connectAccount);
  const syncMock = useAction(api.socialAccounts.syncSocialMetricsMock);
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("INSTAGRAM");
  const [username, setUsername] = useState("");

  async function handleConnect() {
    if (!username.trim()) return;
    try {
      const id = await connectAccount({ platform, username: username.trim() });
      await syncMock({ socialAccountId: id });
      setUsername("");
      toast.success(t?.("common.connect") ?? "Connected");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  async function handleSync(accountId: Id<"socialAccounts">) {
    try {
      await syncMock({ socialAccountId: accountId });
      toast.success(t?.("common.syncMetrics") ?? "Synced");
    } catch {
      toast.error("Sync failed");
    }
  }

  if (!t) return null;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("dashboard.socialConnectHint")}
      </p>
      <Panel>
        <PanelHeader title={t("dashboard.navSocial")} />
        <PanelBody className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>{t("dashboard.platform")}</Label>
            <Select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as typeof platform)}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>{t("dashboard.username")}</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@creator"
            />
          </div>
        <Button className="sm:col-span-3" onClick={handleConnect}>
          {t("common.connect")}
        </Button>
        </PanelBody>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        {(accounts ?? []).map((account) => (
          <Panel key={account._id}>
            <PanelBody>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{account.platform}</span>
              {account.isMock && <Badge>mock</Badge>}
            </div>
            <p className="text-sm text-gray-600">@{account.username}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-gray-500">{t("common.followers")}</dt>
                <dd className="font-medium">{account.followers.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-gray-500">{t("common.engagement")}</dt>
                <dd className="font-medium">{account.engagementRate}%</dd>
              </div>
            </dl>
            <Button
              variant="outline"
              className="mt-4"
              size="sm"
              onClick={() => handleSync(account._id)}
            >
              {t("common.syncMetrics")}
            </Button>
            </PanelBody>
          </Panel>
        ))}
      </div>
    </div>
  );
}
