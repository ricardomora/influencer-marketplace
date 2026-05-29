"use client";

import { useParams } from "next/navigation";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import {
  DashboardShell,
  adminNavIcons,
} from "@/components/dashboard/dashboard-shell";
import { type Locale, useDictionary } from "@/lib/i18n";

export default function AdminDashboardPage() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "es";
  const { t } = useDictionary(locale);

  return (
    <DashboardShell
      locale={locale}
      role="admin"
      title={t?.("dashboard.adminTitle") ?? ""}
      navItems={[
        {
          href: `/${locale}/dashboard/admin`,
          label: t?.("dashboard.navAdmin") ?? "Admin",
          exact: true,
          icon: adminNavIcons.overview,
        },
      ]}
    >
      <AdminOverview locale={locale} />
    </DashboardShell>
  );
}
