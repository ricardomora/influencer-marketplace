import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

export function DemoAnalyzerPreview({
  locale: _locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex gap-4">
        <div className="size-16 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600" />
        <div>
          <p className="text-lg font-bold">Valentina López</p>
          <p className="text-sm text-gray-500">@valentinalopez · Bogotá, Colombia</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          ["2.4M", t("demo.analyzerFollowers")],
          ["4.8%", t("demo.analyzerEr")],
          ["890K", t("demo.analyzerReach")],
        ].map(([v, l]) => (
          <div
            key={l}
            className="rounded-lg bg-gray-50 py-3 text-center dark:bg-gray-800"
          >
            <p className="text-xl font-bold">{v}</p>
            <p className="text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-24 items-end gap-2">
        {[40, 70, 55, 85, 60, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-indigo-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
