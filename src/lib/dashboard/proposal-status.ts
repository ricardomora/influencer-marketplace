import type { createTranslator } from "@/lib/i18n";

type T = ReturnType<typeof createTranslator>;

export function proposalStatusLabel(t: T, status: string) {
  switch (status) {
    case "PENDING":
      return t("dashboard.statusPending");
    case "ACCEPTED":
      return t("dashboard.statusAccepted");
    case "REJECTED":
      return t("dashboard.statusRejected");
    case "COMPLETED":
      return t("dashboard.statusCompleted");
    default:
      return status;
  }
}

export function campaignStatusLabel(t: T, status: string) {
  switch (status) {
    case "active":
      return t("dashboard.campaignActive");
    case "draft":
      return t("dashboard.campaignDraft");
    case "completed":
      return t("dashboard.campaignCompleted");
    case "cancelled":
      return t("dashboard.campaignCancelled");
    default:
      return status;
  }
}
