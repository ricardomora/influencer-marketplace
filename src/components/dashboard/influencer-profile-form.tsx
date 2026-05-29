"use client";

import { useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

const CATEGORIES = [
  "MICRO",
  "MACRO",
  "CELEBRITY",
  "CREATOR",
  "UGC",
  "AI_AVATAR",
] as const;

const COUNTRIES = ["Colombia", "Venezuela"] as const;
const CITIES: Record<string, string[]> = {
  Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
  Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"],
};

export function InfluencerProfileForm({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const profile = useQuery(api.influencers.getMyProfile, useAuthSkip());
  const createProfile = useMutation(api.influencers.createProfile);
  const updateProfile = useMutation(api.influencers.updateProfile);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("MICRO");
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("Colombia");
  const [city, setCity] = useState("Bogotá");
  const [initialized, setInitialized] = useState(false);

  if (profile && !initialized) {
    setDisplayName(profile.displayName);
    setBio(profile.bio);
    setCategory(profile.category);
    setCountry(profile.country as (typeof COUNTRIES)[number]);
    setCity(profile.city);
    setInitialized(true);
  }

  async function handleSave() {
    try {
      if (profile) {
        await updateProfile({ displayName, bio, category, country, city });
      } else {
        await createProfile({ displayName, bio, category, country, city });
      }
      toast.success(t?.("common.save") ?? "Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  if (!t) return null;

  return (
    <Card>
      <CardTitle>{t("dashboard.profileSection")}</CardTitle>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>{t("dashboard.displayName")}</Label>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div>
          <Label>{t("dashboard.category")}</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>{t("dashboard.bio")}</Label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
        </div>
        <div>
          <Label>{t("dashboard.country")}</Label>
          <Select
            value={country}
            onChange={(e) => {
              const c = e.target.value as typeof country;
              setCountry(c);
              setCity(CITIES[c]?.[0] ?? "");
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>{t("dashboard.city")}</Label>
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            {(CITIES[country] ?? []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Button className="mt-4" onClick={handleSave}>
        {t("common.save")}
      </Button>
    </Card>
  );
}
