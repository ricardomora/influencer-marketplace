import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { socialPlatform } from "./schema";
import { requireRole } from "./lib";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const listByInfluencer = query({
  args: { influencerId: v.id("influencerProfiles") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("socialAccounts")
      .withIndex("by_influencerId", (q) => q.eq("influencerId", args.influencerId))
      .collect();
  },
});

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireRole(ctx, ["influencer"]);
    const profile = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile) return [];

    return await ctx.db
      .query("socialAccounts")
      .withIndex("by_influencerId", (q) => q.eq("influencerId", profile._id))
      .collect();
  },
});

export const connectAccount = mutation({
  args: {
    platform: socialPlatform,
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["influencer"]);
    const profile = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile) throw new Error("Create influencer profile first");

    const existing = await ctx.db
      .query("socialAccounts")
      .withIndex("by_influencer_platform", (q) =>
        q.eq("influencerId", profile._id).eq("platform", args.platform),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { username: args.username });
      return existing._id;
    }

    const accountId = await ctx.db.insert("socialAccounts", {
      influencerId: profile._id,
      platform: args.platform,
      username: args.username,
      followers: 0,
      avgViews: 0,
      engagementRate: 0,
      lastSyncedAt: 0,
      isMock: true,
    });

    return accountId;
  },
});

export const applyMockMetrics = internalMutation({
  args: { socialAccountId: v.id("socialAccounts") },
  handler: async (ctx, args) => {
    const account = await ctx.db.get(args.socialAccountId);
    if (!account) return;

    const followers = randomInt(5_000, 500_000);
    const engagementRate = Number((Math.random() * 8 + 1).toFixed(2));
    const avgViews = Math.round(followers * (0.05 + Math.random() * 0.25));
    const now = Date.now();

    await ctx.db.patch(account._id, {
      followers,
      avgViews,
      engagementRate,
      lastSyncedAt: now,
      isMock: true,
    });

    const existingDemo = await ctx.db
      .query("audienceDemographics")
      .withIndex("by_socialAccountId", (q) =>
        q.eq("socialAccountId", account._id),
      )
      .collect();

    for (const row of existingDemo) {
      await ctx.db.delete(row._id);
    }

    const ageRanges = ["18-24", "25-34", "35-44"] as const;
    const countries = ["Colombia", "Venezuela"];
    for (const ageRange of ageRanges) {
      const male = randomInt(30, 55);
      await ctx.db.insert("audienceDemographics", {
        socialAccountId: account._id,
        country: countries[randomInt(0, 1)]!,
        ageRange,
        genderMalePct: male,
        genderFemalePct: 100 - male,
        language: "es",
      });
    }

    const profile = await ctx.db.get(account.influencerId);
    if (!profile) return;

    const accounts = await ctx.db
      .query("socialAccounts")
      .withIndex("by_influencerId", (q) => q.eq("influencerId", profile._id))
      .collect();

    const primary = accounts.reduce((best, current) =>
      current.followers > best.followers ? current : best,
    );

    await ctx.db.patch(profile._id, {
      primarySocialAccountId: primary._id,
      maxFollowers: primary.followers,
      maxEngagementRate: primary.engagementRate,
      updatedAt: now,
    });
  },
});

export const syncSocialMetricsMock = action({
  args: { socialAccountId: v.id("socialAccounts") },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.socialAccounts.applyMockMetrics, {
      socialAccountId: args.socialAccountId,
    });
  },
});
