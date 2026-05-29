import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const userRole = v.union(
  v.literal("influencer"),
  v.literal("brand"),
  v.literal("admin"),
);

export const influencerCategory = v.union(
  v.literal("MICRO"),
  v.literal("MACRO"),
  v.literal("CELEBRITY"),
  v.literal("CREATOR"),
  v.literal("UGC"),
  v.literal("AI_AVATAR"),
);

export const socialPlatform = v.union(
  v.literal("INSTAGRAM"),
  v.literal("TIKTOK"),
  v.literal("YOUTUBE"),
  v.literal("TWITTER"),
  v.literal("FACEBOOK"),
);

export const campaignStatus = v.union(
  v.literal("draft"),
  v.literal("active"),
  v.literal("completed"),
  v.literal("cancelled"),
);

export const proposalStatus = v.union(
  v.literal("PENDING"),
  v.literal("ACCEPTED"),
  v.literal("REJECTED"),
  v.literal("COMPLETED"),
);

export const transactionStatus = v.union(
  v.literal("pending"),
  v.literal("paid"),
  v.literal("failed"),
  v.literal("refunded"),
);

export const subscriptionPlan = v.union(
  v.literal("FREE"),
  v.literal("PRO_MONTHLY"),
  v.literal("PRO_ANNUAL"),
);

export const ageRange = v.union(
  v.literal("13-17"),
  v.literal("18-24"),
  v.literal("25-34"),
  v.literal("35-44"),
  v.literal("45+"),
);

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    role: userRole,
    locale: v.union(v.literal("es"), v.literal("en")),
    onboardingCompleted: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  influencerProfiles: defineTable({
    userId: v.id("users"),
    displayName: v.string(),
    bio: v.string(),
    category: influencerCategory,
    country: v.string(),
    city: v.string(),
    primarySocialAccountId: v.optional(v.id("socialAccounts")),
    maxFollowers: v.optional(v.number()),
    maxEngagementRate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_country", ["country"])
    .index("by_country_city", ["country", "city"])
    .index("by_category", ["category"]),

  socialAccounts: defineTable({
    influencerId: v.id("influencerProfiles"),
    platform: socialPlatform,
    username: v.string(),
    accessToken: v.optional(v.string()),
    followers: v.number(),
    avgViews: v.number(),
    engagementRate: v.number(),
    lastSyncedAt: v.number(),
    isMock: v.boolean(),
  })
    .index("by_influencerId", ["influencerId"])
    .index("by_influencer_platform", ["influencerId", "platform"]),

  audienceDemographics: defineTable({
    socialAccountId: v.id("socialAccounts"),
    country: v.string(),
    ageRange: ageRange,
    genderMalePct: v.number(),
    genderFemalePct: v.number(),
    language: v.string(),
  })
    .index("by_socialAccountId", ["socialAccountId"])
    .index("by_country", ["country"])
    .index("by_ageRange", ["ageRange"]),

  brands: defineTable({
    userId: v.id("users"),
    companyName: v.string(),
    industry: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  campaigns: defineTable({
    brandId: v.id("brands"),
    title: v.string(),
    briefText: v.string(),
    budget: v.number(),
    requirementsJson: v.string(),
    status: campaignStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_brandId", ["brandId"])
    .index("by_status", ["status"]),

  searchQueries: defineTable({
    brandId: v.id("brands"),
    promptText: v.optional(v.string()),
    parsedFiltersJson: v.string(),
    createdAt: v.number(),
  }).index("by_brandId", ["brandId"]),

  proposals: defineTable({
    campaignId: v.id("campaigns"),
    influencerId: v.id("influencerProfiles"),
    status: proposalStatus,
    rate: v.number(),
    message: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_campaignId", ["campaignId"])
    .index("by_influencerId", ["influencerId"])
    .index("by_campaign_influencer", ["campaignId", "influencerId"])
    .index("by_status", ["status"]),

  transactions: defineTable({
    proposalId: v.id("proposals"),
    amount: v.number(),
    commissionAmount: v.number(),
    status: transactionStatus,
    createdAt: v.number(),
  }).index("by_proposalId", ["proposalId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    plan: subscriptionPlan,
    expiresAt: v.optional(v.number()),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
