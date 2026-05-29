import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DEMO_CAMPAIGNS } from "@/lib/demo/panel-fixtures";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

function statusLabel(t: ReturnType<typeof createTranslator>, status: string) {
  if (status === "active") return t("demo.statusActive");
  if (status === "draft") return t("demo.statusDraft");
  return t("demo.statusCompleted");
}

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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 dark:border-gray-800">
              <th className="p-4">{t("demo.colCampaign")}</th>
              <th className="p-4">{t("demo.colStatus")}</th>
              <th className="p-4">{t("demo.colRate")}</th>
              <th className="p-4">{t("demo.analyzerReach")}</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_CAMPAIGNS.map((c) => (
              <tr
                key={c.id}
                className="border-t border-gray-100 dark:border-gray-800"
              >
                <td className="p-4">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.network}</p>
                </td>
                <td className="p-4">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                    {statusLabel(t, c.status)}
                  </span>
                </td>
                <td className="p-4 tabular-nums">
                  ${c.budget.toLocaleString()}
                </td>
                <td className="p-4">{c.reach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
