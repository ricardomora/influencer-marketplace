import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

export function PlatformPreviewMockups({
  locale: _locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <div className="relative mx-auto mt-12 max-w-4xl lg:mt-0">
      <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-3xl" aria-hidden />
      <div className="relative space-y-4">
        <MockDiscover t={t} />
        <div className="grid gap-4 sm:grid-cols-2">
          <MockAnalyzer t={t} />
          <MockCampaign t={t} />
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-indigo-200/70">
        {t("marketing.previewDisclaimer")}
      </p>
    </div>
  );
}

function MockChrome({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-indigo-500/10 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-rose-400/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] font-medium text-slate-400">{title}</span>
        <span className="rounded bg-indigo-500/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-indigo-200">
          {badge}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function MockDiscover({ t }: { t: ReturnType<typeof createTranslator> }) {
  return (
    <MockChrome title={t("marketing.previewDiscoverTitle")} badge="UI">
      <div className="flex gap-3">
        <div className="hidden w-24 shrink-0 space-y-1 sm:block">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 rounded bg-white/5"
              style={{ width: `${70 + i * 8}%` }}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {[92, 78, 65].map((w) => (
            <div
              key={w}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-2"
            >
              <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600" />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="h-2 rounded bg-white/10" style={{ width: `${w}%` }} />
                <div className="h-1.5 w-1/2 rounded bg-white/5" />
              </div>
              <div className="hidden text-[10px] tabular-nums text-emerald-400 sm:block">
                4.{w % 10}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockChrome>
  );
}

function MockAnalyzer({ t }: { t: ReturnType<typeof createTranslator> }) {
  return (
    <MockChrome title={t("marketing.previewAnalyzerTitle")} badge="KPI">
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          t("marketing.previewKpiFollowers"),
          t("marketing.previewKpiEr"),
          t("marketing.previewKpiReach"),
        ].map((label, i) => (
          <div key={label} className="rounded-lg bg-white/5 py-2">
            <p className="text-sm font-bold text-white">
              {["2.4M", "4.8%", "890K"][i]}
            </p>
            <p className="text-[9px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-16 items-end gap-1">
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-indigo-600 to-violet-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </MockChrome>
  );
}

function MockCampaign({ t }: { t: ReturnType<typeof createTranslator> }) {
  return (
    <MockChrome title={t("marketing.previewCampaignTitle")} badge="CM">
      <div className="space-y-2">
        <div className="h-2 w-3/4 rounded bg-white/10" />
        <div className="h-2 w-1/2 rounded bg-white/5" />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="h-8 rounded-lg border border-dashed border-indigo-400/40 bg-indigo-500/10" />
          <div className="h-8 rounded-lg bg-white/5" />
        </div>
        <div className="mt-2 h-6 w-24 rounded-md bg-indigo-600/80" />
      </div>
    </MockChrome>
  );
}
