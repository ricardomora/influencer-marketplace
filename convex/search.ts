import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { influencerCategory } from "./schema";
import { requireRole } from "./lib";

const genderFilter = v.optional(
  v.union(v.literal("male"), v.literal("female")),
);

export const searchInfluencers = query({
  args: {
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    minFollowers: v.optional(v.number()),
    maxFollowers: v.optional(v.number()),
    minEngagementRate: v.optional(v.number()),
    category: v.optional(influencerCategory),
    ageRange: v.optional(
      v.union(
        v.literal("13-17"),
        v.literal("18-24"),
        v.literal("25-34"),
        v.literal("35-44"),
        v.literal("45+"),
      ),
    ),
    gender: genderFilter,
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireRole(ctx, ["brand", "admin"]);

    let profiles = await ctx.db.query("influencerProfiles").collect();

    if (args.country) {
      profiles = profiles.filter((p) => p.country === args.country);
    }
    if (args.city) {
      profiles = profiles.filter((p) => p.city === args.city);
    }
    if (args.category) {
      profiles = profiles.filter((p) => p.category === args.category);
    }
    if (args.minFollowers !== undefined) {
      profiles = profiles.filter(
        (p) => (p.maxFollowers ?? 0) >= args.minFollowers!,
      );
    }
    if (args.maxFollowers !== undefined) {
      profiles = profiles.filter(
        (p) => (p.maxFollowers ?? 0) <= args.maxFollowers!,
      );
    }
    if (args.minEngagementRate !== undefined) {
      profiles = profiles.filter(
        (p) => (p.maxEngagementRate ?? 0) >= args.minEngagementRate!,
      );
    }

    const results = [];

    for (const profile of profiles) {
      const socialAccounts = await ctx.db
        .query("socialAccounts")
        .withIndex("by_influencerId", (q) => q.eq("influencerId", profile._id))
        .collect();

      if (socialAccounts.length === 0) continue;

      const primaryId = profile.primarySocialAccountId;
      const primary =
        socialAccounts.find((a) => a._id === primaryId) ?? socialAccounts[0];

      const demographics = await ctx.db
        .query("audienceDemographics")
        .withIndex("by_socialAccountId", (q) =>
          q.eq("socialAccountId", primary!._id),
        )
        .collect();

      if (args.ageRange) {
        const hasAge = demographics.some((d) => d.ageRange === args.ageRange);
        if (!hasAge) continue;
      }

      if (args.gender === "male") {
        const hasMale = demographics.some((d) => d.genderMalePct >= 40);
        if (!hasMale) continue;
      }
      if (args.gender === "female") {
        const hasFemale = demographics.some((d) => d.genderFemalePct >= 40);
        if (!hasFemale) continue;
      }

      results.push({
        profile,
        primaryAccount: primary,
        socialAccounts,
        demographics,
      });
    }

    const limit = args.limit ?? 50;
    return results.slice(0, limit);
  },
});

export const saveSearchQuery = mutation({
  args: {
    parsedFiltersJson: v.string(),
    promptText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["brand"]);
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) throw new Error("Brand profile required");

    return await ctx.db.insert("searchQueries", {
      brandId: brand._id,
      promptText: args.promptText,
      parsedFiltersJson: args.parsedFiltersJson,
      createdAt: Date.now(),
    });
  },
});

export const listSearchHistory = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireRole(ctx, ["brand"]);
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) return [];

    const queries = await ctx.db
      .query("searchQueries")
      .withIndex("by_brandId", (q) => q.eq("brandId", brand._id))
      .collect();

    return queries.sort((a, b) => b.createdAt - a.createdAt).slice(0, 20);
  },
});
