import Link from "next/link";
import { DemoCampaignList } from "@/components/demo/demo-campaign-list";
import { Button } from "@/components/ui/button";
import { DEMO_CAMPAIGNS } from "@/lib/demo/panel-fixtures";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

export function DemoPanelOverview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);
  const active = DEMO_CAMPAIGNS.filter((c) => c.status === "active");
  const openProposals = DEMO_CAMPAIGNS.reduce((n, c) => n + c.proposals, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          [String(active.length), t("demo.panelActiveCampaigns")],
          [String(openProposals), t("demo.panelOpenProposals")],
          ["2.1M", t("demo.panelTotalReach")],
        ].map(([v, l]) => (
          <div
            key={l}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-2xl font-bold text-indigo-600">{v}</p>
            <p className="text-sm text-gray-500">{l}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`/${locale}/demo/campaigns`}>
          <Button>{t("demo.panelCreateCampaign")}</Button>
        </Link>
        <Link href={`/${locale}/demo/discover`}>
          <Button variant="outline">{t("demo.navDiscover")}</Button>
        </Link>
      </div>

      <DemoCampaignList locale={locale} dict={dict} />
    </div>
  );
}
