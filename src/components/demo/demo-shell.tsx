import { BrandWorkspaceShell } from "@/components/brand-workspace/brand-workspace-shell";
import type { BrandWorkspaceSegment } from "@/lib/brand-workspace/config";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

/** @deprecated Use BrandWorkspaceShell — kept for gradual migration */
export function DemoShell({
  locale,
  dict,
  segment,
  title,
  subtitle,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  segment: BrandWorkspaceSegment;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <BrandWorkspaceShell
      locale={locale}
      mode="demo"
      segment={segment}
      dict={dict}
      title={title}
      subtitle={subtitle}
    >
      {children}
    </BrandWorkspaceShell>
  );
}
