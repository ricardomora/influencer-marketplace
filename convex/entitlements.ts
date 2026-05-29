export type SubscriptionPlan = "FREE" | "PRO_MONTHLY" | "PRO_ANNUAL";

export function getEntitlements(subscription: {
  plan: SubscriptionPlan;
  status: "active" | "inactive";
}) {
  const isPro =
    subscription.status === "active" &&
    (subscription.plan === "PRO_MONTHLY" ||
      subscription.plan === "PRO_ANNUAL");

  return {
    isPro,
    canSearchAdvanced: isPro,
    bypassCommission: isPro,
  };
}
