import Link from "next/link";
import {
  brandWorkspaceHref,
  BRAND_HUB_CARDS,
  type BrandWorkspaceMode,
} from "@/lib/brand-workspace/config";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

export function BrandHubCards({
  locale,
  mode,
  dict,
}: {
  locale: Locale;
  mode: BrandWorkspaceMode;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {BRAND_HUB_CARDS.map(({ segment, icon: Icon, titleKey, descKey }) => (
        <Link
          key={segment}
          href={brandWorkspaceHref(locale, mode, segment)}
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Icon className="size-5" aria-hidden />
          </div>
          <h2 className="mt-4 font-semibold text-gray-900">
            {t(`workspace.${titleKey}`)}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{t(`workspace.${descKey}`)}</p>
          <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:underline">
            {t(mode === "demo" ? "workspace.openDemo" : "workspace.openLive")} →
          </span>
        </Link>
      ))}
    </div>
  );
}
