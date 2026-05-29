"use client";

import { useMutation, useQuery } from "convex/react";
import { useAuthSkip } from "@/hooks/use-auth-skip";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Locale, useDictionary } from "@/lib/i18n";
import { api } from "../../../convex/_generated/api";

export function BrandProfileForm({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const brand = useQuery(api.brands.getMyBrand, useAuthSkip());
  const create = useMutation(api.brands.create);
  const update = useMutation(api.brands.update);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (brand && !initialized) {
    setCompanyName(brand.companyName);
    setIndustry(brand.industry);
    setInitialized(true);
  }

  async function handleSave() {
    try {
      if (brand) {
        await update({ companyName, industry });
      } else {
        await create({ companyName, industry });
      }
      toast.success(t?.("common.save") ?? "Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  }

  if (!t) return null;

  return (
    <Card>
      <CardTitle>{t("dashboard.brandSection")}</CardTitle>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>{t("dashboard.companyName")}</Label>
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <Label>{t("dashboard.industry")}</Label>
          <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </div>
      </div>
      <Button className="mt-4" onClick={handleSave}>
        {t("common.save")}
      </Button>
    </Card>
  );
}
