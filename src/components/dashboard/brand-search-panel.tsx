"use client";

import { useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { useState } from "react";
import { toast } from "sonner";
import { DiscoverCreatorCard } from "@/components/brand-workspace/discover-creator-card";
import { BrandAnalyzerDrawer } from "@/components/dashboard/brand-analyzer-drawer";
import { BrandFlowStrip } from "@/components/dashboard/brand-flow-strip";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "@/components/dashboard/dashboard-primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function BrandSearchPanel({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const saveSearch = useMutation(api.search.saveSearchQuery);
  const sendProposal = useMutation(api.proposals.send);
  const authSkip = useAuthSkip();

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [maxFollowers, setMaxFollowers] = useState("");
  const [minEngagement, setMinEngagement] = useState("");
  const [category, setCategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [analyzerId, setAnalyzerId] = useState<Id<"influencerProfiles"> | null>(
    null,
  );

  const results = useQuery(
    api.search.searchInfluencers,
    authSkip === "skip"
      ? "skip"
      : {
          country: country || undefined,
          city: city || undefined,
          minFollowers: minFollowers ? Number(minFollowers) : undefined,
          maxFollowers: maxFollowers ? Number(maxFollowers) : undefined,
          minEngagementRate: minEngagement ? Number(minEngagement) : undefined,
          category: category
            ? (category as
                | "MICRO"
                | "MACRO"
                | "CREATOR"
                | "UGC"
                | "CELEBRITY"
                | "AI_AVATAR")
            : undefined,
          ageRange: ageRange
            ? (ageRange as "13-17" | "18-24" | "25-34" | "35-44" | "45+")
            : undefined,
          gender: gender ? (gender as "male" | "female") : undefined,
        },
  );

  const campaigns = useQuery(api.campaigns.listMine, authSkip);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [proposalRate, setProposalRate] = useState("300");

  async function handleSearch() {
    const parsed = {
      country: country || null,
      city: city || null,
      minFollowers: minFollowers || null,
      maxFollowers: maxFollowers || null,
      minEngagement,
      category: category || null,
      ageRange: ageRange || null,
      gender: gender || null,
    };
    try {
      await saveSearch({ parsedFiltersJson: JSON.stringify(parsed) });
    } catch {
      /* brand profile may be missing */
    }
  }

  function clearFilters() {
    setCountry("");
    setCity("");
    setMinFollowers("");
    setMaxFollowers("");
    setMinEngagement("");
    setCategory("");
    setAgeRange("");
    setGender("");
  }

  async function handleProposal(influencerId: Id<"influencerProfiles">) {
    if (!selectedCampaign) {
      toast.error(t?.("dashboard.selectCampaignFirst") ?? "");
      return;
    }
    try {
      await sendProposal({
        campaignId: selectedCampaign as Id<"campaigns">,
        influencerId,
        rate: Number(proposalRate) || 0,
      });
      toast.success(t?.("common.sendProposal") ?? "");
      setAnalyzerId(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  if (!t) return null;

  const flowStep = analyzerId ? "analyzer" : "discover";

  return (
    <>
      <BrandFlowStrip locale={locale} active={flowStep} />
      <Panel className="mb-6">
        <PanelBody className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>{t("dashboard.campaigns")}</Label>
            <Select
              className="mt-1"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            >
              <option value="">—</option>
              {(campaigns ?? []).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>{t("dashboard.proposalRate")}</Label>
            <Input
              type="number"
              className="mt-1"
              value={proposalRate}
              onChange={(e) => setProposalRate(e.target.value)}
            />
          </div>
        </PanelBody>
      </Panel>

      <Panel>
        <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
          <aside className="border-b border-gray-100 bg-[#f8f9fb] p-5 lg:border-b-0 lg:border-r dark:border-gray-800 dark:bg-gray-900/80">
            <p className="text-xs font-semibold uppercase text-gray-500">
              {t("dashboard.searchFilters")}
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <Label className="text-xs">{t("dashboard.country")}</Label>
                <Select
                  className="mt-1"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">—</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Venezuela">Venezuela</option>
                </Select>
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.city")}</Label>
                <Input
                  className="mt-1"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.category")}</Label>
                <Select
                  className="mt-1"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">—</option>
                  {["MICRO", "MACRO", "CREATOR", "UGC", "CELEBRITY", "AI_AVATAR"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ),
                  )}
                </Select>
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.minFollowers")}</Label>
                <Input
                  type="number"
                  className="mt-1"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.maxFollowers")}</Label>
                <Input
                  type="number"
                  className="mt-1"
                  value={maxFollowers}
                  onChange={(e) => setMaxFollowers(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.minEngagement")}</Label>
                <Input
                  type="number"
                  step="0.1"
                  className="mt-1"
                  value={minEngagement}
                  onChange={(e) => setMinEngagement(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.ageRange")}</Label>
                <Select
                  className="mt-1"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                >
                  <option value="">—</option>
                  {["18-24", "25-34", "35-44", "45+"].map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label className="text-xs">{t("dashboard.gender")}</Label>
                <Select
                  className="mt-1"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">{t("dashboard.genderAny")}</option>
                  <option value="female">{t("dashboard.genderFemale")}</option>
                  <option value="male">{t("dashboard.genderMale")}</option>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSearch}>
                  {t("common.search")}
                </Button>
                <Button size="sm" variant="outline" onClick={clearFilters}>
                  {t("dashboard.filterClear")}
                </Button>
              </div>
            </div>
          </aside>

          <div className="min-w-0 p-5">
            <PanelHeader
              title={t("dashboard.results")}
              subtitle={t("dashboard.resultsCount", {
                count: String(results?.length ?? 0),
              })}
            />
            <PanelBody className="pt-0">
              {!results?.length ? (
                <p className="py-12 text-center text-sm text-gray-500">
                  {t("dashboard.noResults")}
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {results.map(({ profile, primaryAccount }) => (
                    <DiscoverCreatorCard
                      key={profile._id}
                      displayName={profile.displayName}
                      subtitle={`${profile.city}, ${profile.country}`}
                      category={profile.category}
                      followers={
                        primaryAccount
                          ? formatCount(primaryAccount.followers)
                          : "—"
                      }
                      reach={
                        primaryAccount
                          ? formatCount(primaryAccount.avgViews)
                          : "—"
                      }
                      engagementRate={
                        primaryAccount
                          ? `${primaryAccount.engagementRate}%`
                          : "—"
                      }
                      followersLabel={t("dashboard.colFollowers")}
                      reachLabel={t("dashboard.analyzerReach")}
                      engagementLabel={t("dashboard.colEr")}
                      onClick={() => setAnalyzerId(profile._id)}
                      footer={
                        <Button
                          size="sm"
                          className="w-full"
                          variant="outline"
                          onClick={() => void handleProposal(profile._id)}
                        >
                          {t("common.sendProposal")}
                        </Button>
                      }
                    />
                  ))}
                </div>
              )}
            </PanelBody>
          </div>
        </div>
      </Panel>

      {analyzerId && (
        <BrandAnalyzerDrawer
          locale={locale}
          profileId={analyzerId}
          hasCampaign={Boolean(selectedCampaign)}
          onClose={() => setAnalyzerId(null)}
          onSendProposal={() => void handleProposal(analyzerId)}
        />
      )}
    </>
  );
}
