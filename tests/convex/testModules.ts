export const testModules: Record<string, () => Promise<unknown>> = {
  "./_generated/api.js": () => import("../../convex/_generated/api.js"),
  "./_generated/server.js": () => import("../../convex/_generated/server.js"),
  "./admin.ts": () => import("../../convex/admin.ts"),
  "./brands.ts": () => import("../../convex/brands.ts"),
  "./campaigns.ts": () => import("../../convex/campaigns.ts"),
  "./influencers.ts": () => import("../../convex/influencers.ts"),
  "./proposals.ts": () => import("../../convex/proposals.ts"),
  "./search.ts": () => import("../../convex/search.ts"),
  "./seed.ts": () => import("../../convex/seed.ts"),
  "./socialAccounts.ts": () => import("../../convex/socialAccounts.ts"),
  "./users.ts": () => import("../../convex/users.ts"),
};
