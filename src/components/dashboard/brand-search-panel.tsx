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
import { Select } from "@/components/ui/select";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export function BrandSearchPanel({
  locale,
  onSelectInfluencer,
}: {
  locale: Locale;
  onSelectInfluencer?: (id: Id<"influencerProfiles">) => void;
}) {
  const { t } = useDictionary(locale);
  const saveSearch = useMutation(api.search.saveSearchQuery);
  const sendProposal = useMutation(api.proposals.send);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [maxFollowers, setMaxFollowers] = useState("");
  const [minEngagement, setMinEngagement] = useState("");
  const [category, setCategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");

  const searchSkip = useAuthSkip();
  const results = useQuery(
    api.search.searchInfluencers,
    searchSkip === "skip"
      ? "skip"
      : {
    country: country || undefined,
    city: city || undefined,
    minFollowers: minFollowers ? Number(minFollowers) : undefined,
    maxFollowers: maxFollowers ? Number(maxFollowers) : undefined,
    minEngagementRate: minEngagement ? Number(minEngagement) : undefined,
    category: category
      ? (category as "MICRO" | "MACRO" | "CREATOR" | "UGC" | "CELEBRITY" | "AI_AVATAR")
      : undefined,
    ageRange: ageRange
      ? (ageRange as "13-17" | "18-24" | "25-34" | "35-44" | "45+")
      : undefined,
    gender: gender ? (gender as "male" | "female") : undefined,
  },
  );

  const campaigns = useQuery(api.campaigns.listMine, searchSkip);
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

  async function handleProposal(influencerId: Id<"influencerProfiles">) {
    if (!selectedCampaign) {
      toast.error("Select a campaign first");
      return;
    }
    try {
      await sendProposal({
        campaignId: selectedCampaign as Id<"campaigns">,
        influencerId,
        rate: Number(proposalRate) || 0,
      });
      toast.success(t?.("common.sendProposal") ?? "Sent");
      onSelectInfluencer?.(influencerId);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  if (!t) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>{t("dashboard.searchFilters")}</CardTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <Label>{t("dashboard.country")}</Label>
            <Select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">—</option>
              <option value="Colombia">Colombia</option>
              <option value="Venezuela">Venezuela</option>
            </Select>
          </div>
          <div>
            <Label>{t("dashboard.city")}</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <Label>{t("dashboard.category")}</Label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            <Label>{t("dashboard.minFollowers")}</Label>
            <Input
              type="number"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
            />
          </div>
          <div>
            <Label>{t("dashboard.maxFollowers")}</Label>
            <Input
              type="number"
              value={maxFollowers}
              onChange={(e) => setMaxFollowers(e.target.value)}
            />
          </div>
          <div>
            <Label>{t("dashboard.minEngagement")}</Label>
            <Input
              type="number"
              step="0.1"
              value={minEngagement}
              onChange={(e) => setMinEngagement(e.target.value)}
            />
          </div>
          <div>
            <Label>{t("dashboard.ageRange")}</Label>
            <Select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
              <option value="">—</option>
              {["18-24", "25-34", "35-44", "45+"].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>{t("dashboard.gender")}</Label>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">{t("dashboard.genderAny")}</option>
              <option value="female">{t("dashboard.genderMale")}</option>
              <option value="male">{t("dashboard.genderFemale")}</option>
            </Select>
          </div>
        </div>
        <Button className="mt-4" onClick={handleSearch}>
          {t("common.search")}
        </Button>
      </Card>

      <Card>
        <CardTitle>{t("dashboard.results")}</CardTitle>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <Label>{t("dashboard.campaigns")}</Label>
            <Select
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
              value={proposalRate}
              onChange={(e) => setProposalRate(e.target.value)}
            />
          </div>
        </div>
        {!results?.length ? (
          <p className="mt-4 text-sm text-gray-500">{t("dashboard.noResults")}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {results.map(({ profile, primaryAccount }) => (
              <li
                key={profile._id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-4 dark:border-gray-800"
              >
                <div>
                  <p className="font-semibold">{profile.displayName}</p>
                  <p className="text-sm text-gray-600">
                    {profile.city}, {profile.country} · {profile.category}
                  </p>
                  {primaryAccount && (
                    <p className="text-sm">
                      {primaryAccount.followers.toLocaleString()}{" "}
                      {t("common.followers")} · {primaryAccount.engagementRate}%
                    </p>
                  )}
                </div>
                <Button size="sm" onClick={() => handleProposal(profile._id)}>
                  {t("common.sendProposal")}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
