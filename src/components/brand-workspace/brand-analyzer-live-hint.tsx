import Link from "next/link";
import { Panel, PanelBody } from "@/components/dashboard/dashboard-primitives";
import { Button } from "@/components/ui/button";
import { brandWorkspaceHref } from "@/lib/brand-workspace/config";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

export function BrandAnalyzerLiveHint({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <Panel>
      <PanelBody className="text-center">
        <p className="text-sm text-gray-600">{t("workspace.analyzerLiveHint")}</p>
        <Link href={brandWorkspaceHref(locale, "live", "discover")} className="mt-6 inline-block">
          <Button>{t("workspace.navDiscover")}</Button>
        </Link>
      </PanelBody>
    </Panel>
  );
}
