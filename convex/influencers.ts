import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { influencerCategory } from "./schema";
import {
  isValidCity,
  isValidCountry,
  requireRole,
  requireUser,
} from "./lib";

export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireRole(ctx, ["influencer", "admin"]);
    if (user.role === "admin") return null;
    return await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
  },
});

export const createProfile = mutation({
  args: {
    displayName: v.string(),
    bio: v.string(),
    category: influencerCategory,
    country: v.string(),
    city: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["influencer"]);
    if (!isValidCountry(args.country) || !isValidCity(args.country, args.city)) {
      throw new Error("Invalid country or city");
    }

    const existing = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (existing) throw new Error("Profile already exists");

    const now = Date.now();
    return await ctx.db.insert("influencerProfiles", {
      userId: user._id,
      displayName: args.displayName,
      bio: args.bio,
      category: args.category,
      country: args.country,
      city: args.city,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateProfile = mutation({
  args: {
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    category: v.optional(influencerCategory),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["influencer"]);
    const profile = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile) throw new Error("Profile not found");

    const country = args.country ?? profile.country;
    const city = args.city ?? profile.city;
    if (!isValidCountry(country) || !isValidCity(country, city)) {
      throw new Error("Invalid country or city");
    }

    await ctx.db.patch(profile._id, {
      ...(args.displayName !== undefined
        ? { displayName: args.displayName }
        : {}),
      ...(args.bio !== undefined ? { bio: args.bio } : {}),
      ...(args.category !== undefined ? { category: args.category } : {}),
      country,
      city,
      updatedAt: Date.now(),
    });
  },
});

export const getProfileById = query({
  args: { profileId: v.id("influencerProfiles") },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);
    if (!profile) return null;

    const socialAccounts = await ctx.db
      .query("socialAccounts")
      .withIndex("by_influencerId", (q) => q.eq("influencerId", profile._id))
      .collect();

    const primaryId = profile.primarySocialAccountId;
    const primaryAccount =
      socialAccounts.find((a) => a._id === primaryId) ?? socialAccounts[0];

    const demographics = primaryAccount
      ? await ctx.db
          .query("audienceDemographics")
          .withIndex("by_socialAccountId", (q) =>
            q.eq("socialAccountId", primaryAccount._id),
          )
          .collect()
      : [];

    return { profile, socialAccounts, primaryAccount, demographics };
  },
});

export const listForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireRole(ctx, ["admin"]);
    return await ctx.db.query("influencerProfiles").collect();
  },
});
