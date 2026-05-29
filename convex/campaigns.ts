import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { campaignStatus } from "./schema";
import { requireRole } from "./lib";

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireRole(ctx, ["brand"]);
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) return [];

    return await ctx.db
      .query("campaigns")
      .withIndex("by_brandId", (q) => q.eq("brandId", brand._id))
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    briefText: v.string(),
    budget: v.number(),
    requirementsJson: v.string(),
    status: v.optional(campaignStatus),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["brand"]);
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) throw new Error("Brand profile required");

    const now = Date.now();
    return await ctx.db.insert("campaigns", {
      brandId: brand._id,
      title: args.title,
      briefText: args.briefText,
      budget: args.budget,
      requirementsJson: args.requirementsJson,
      status: args.status ?? "draft",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    campaignId: v.id("campaigns"),
    title: v.optional(v.string()),
    briefText: v.optional(v.string()),
    budget: v.optional(v.number()),
    requirementsJson: v.optional(v.string()),
    status: v.optional(campaignStatus),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["brand"]);
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) throw new Error("Brand profile required");

    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign || campaign.brandId !== brand._id) {
      throw new Error("Campaign not found");
    }

    await ctx.db.patch(campaign._id, {
      ...(args.title !== undefined ? { title: args.title } : {}),
      ...(args.briefText !== undefined ? { briefText: args.briefText } : {}),
      ...(args.budget !== undefined ? { budget: args.budget } : {}),
      ...(args.requirementsJson !== undefined
        ? { requirementsJson: args.requirementsJson }
        : {}),
      ...(args.status !== undefined ? { status: args.status } : {}),
      updatedAt: Date.now(),
    });
  },
});

export const listAllForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireRole(ctx, ["admin"]);
    return await ctx.db.query("campaigns").collect();
  },
});
