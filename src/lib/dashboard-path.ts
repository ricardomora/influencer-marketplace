export type UserRole = "influencer" | "brand" | "admin";

export function dashboardPathForRole(role: UserRole, locale: string): string {
  switch (role) {
    case "influencer":
      return `/${locale}/dashboard/influencer`;
    case "brand":
      return `/${locale}/dashboard/brand`;
    case "admin":
      return `/${locale}/dashboard/admin`;
    default:
      return `/${locale}/onboarding`;
  }
}
