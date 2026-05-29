"use client";

import type { Locale } from "@/lib/i18n";
import { useDictionary } from "@/lib/i18n";

/** Static discover UI for public demo (no auth). */
export function DemoDiscoverPreview({ locale }: { locale: Locale }) {
  const { t } = useDictionary(locale);
  const rows = [
    { name: "Valentina López", handle: "@valentinalopez", followers: "2.4M", er: "4.8%" },
    { name: "Carlos Méndez", handle: "@carlosmendez", followers: "1.8M", er: "5.2%" },
    { name: "María García", handle: "@mariagarcia", followers: "310K", er: "6.1%" },
  ];

  if (!t) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="grid lg:grid-cols-[180px_1fr]">
        <div className="border-b border-gray-100 bg-gray-50 p-4 lg:border-b-0 lg:border-r dark:border-gray-800 dark:bg-gray-900/80">
          <p className="text-xs font-semibold uppercase text-gray-500">
            {t("demo.filterLabel")}
          </p>
          <div className="mt-3 space-y-2">
            {[
              t("demo.filterCountry"),
              t("demo.filterEr"),
              t("demo.filterCategory"),
            ].map((f) => (
              <div
                key={f}
                className="rounded-md bg-white px-2 py-1.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-gray-500">
                <th className="pb-2">{t("demo.colCreator")}</th>
                <th className="pb-2">{t("demo.colFollowers")}</th>
                <th className="pb-2">{t("demo.colEr")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.handle}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="py-3">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.handle}</p>
                  </td>
                  <td className="py-3 tabular-nums">{r.followers}</td>
                  <td className="py-3 tabular-nums text-emerald-600">{r.er}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
