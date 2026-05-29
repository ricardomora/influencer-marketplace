import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Megaphone,
  Radar,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

const TOOLS = [
  { icon: Search, titleKey: "toolDiscoverTitle", descKey: "toolDiscoverDesc", statusKey: "toolStatusLive" },
  { icon: BarChart3, titleKey: "toolAnalyzerTitle", descKey: "toolAnalyzerDesc", statusKey: "toolStatusLive" },
  { icon: Megaphone, titleKey: "toolCampaignTitle", descKey: "toolCampaignDesc", statusKey: "toolStatusLive" },
  { icon: Send, titleKey: "toolProposalsTitle", descKey: "toolProposalsDesc", statusKey: "toolStatusLive" },
  { icon: Sparkles, titleKey: "toolAiAvatarTitle", descKey: "toolAiAvatarDesc", statusKey: "toolStatusVision" },
  { icon: Bot, titleKey: "toolAiAgentTitle", descKey: "toolAiAgentDesc", statusKey: "toolStatusVision" },
  { icon: LayoutDashboard, titleKey: "toolPanelTitle", descKey: "toolPanelDesc", statusKey: "toolStatusSoon" },
  { icon: Radar, titleKey: "toolReportsTitle", descKey: "toolReportsDesc", statusKey: "toolStatusSoon" },
] as const;

export function MarketingToolsSection({
  locale: _locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <section
      id="herramientas"
      className="scroll-mt-24 border-b border-gray-100 bg-white py-20 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            {t("marketing.toolsEyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("marketing.toolsTitle")}
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {t("marketing.toolsSubtitle")}
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ icon: Icon, titleKey, descKey, statusKey }) => {
            const isSoon = statusKey === "toolStatusSoon";
            const isVision = statusKey === "toolStatusVision";
            return (
              <article
                key={titleKey}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-indigo-50/50 p-6 transition-shadow hover:shadow-lg hover:shadow-indigo-100/50 dark:border-gray-800 dark:from-gray-900 dark:to-indigo-950/20"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-105 ${
                    isVision
                      ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-violet-600/30"
                      : "bg-indigo-600 shadow-indigo-600/30"
                  }`}
                >
                  <Icon className="size-5" aria-hidden />
                </div>
                <span
                  className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    isVision
                      ? "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200"
                      : isSoon
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                  }`}
                >
                  {t(`marketing.${statusKey}`)}
                </span>
                <h3 className="mt-4 text-lg font-semibold">
                  {t(`marketing.${titleKey}`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {t(`marketing.${descKey}`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
