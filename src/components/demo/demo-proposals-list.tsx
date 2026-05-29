import { DEMO_PROPOSALS } from "@/lib/demo/panel-fixtures";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

function proposalStatus(
  t: ReturnType<typeof createTranslator>,
  status: (typeof DEMO_PROPOSALS)[number]["status"],
) {
  if (status === "sent") return t("demo.statusSent");
  if (status === "accepted") return t("demo.statusAccepted");
  return t("demo.statusRejected");
}

export function DemoProposalsList({
  locale: _locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 dark:border-gray-800">
            <th className="p-4">{t("demo.colCampaign")}</th>
            <th className="p-4">{t("demo.colInfluencer")}</th>
            <th className="p-4">{t("demo.colRate")}</th>
            <th className="p-4">{t("demo.colStatus")}</th>
          </tr>
        </thead>
        <tbody>
          {DEMO_PROPOSALS.map((p) => (
            <tr
              key={p.id}
              className="border-t border-gray-100 dark:border-gray-800"
            >
              <td className="p-4 font-medium">{p.campaign}</td>
              <td className="p-4">{p.influencer}</td>
              <td className="p-4 tabular-nums">${p.rate.toLocaleString()}</td>
              <td className="p-4">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.status === "accepted"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                      : p.status === "rejected"
                        ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                  }`}
                >
                  {proposalStatus(t, p.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
