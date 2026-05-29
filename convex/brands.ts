import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireRole } from "./lib";

export const getMyBrand = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireRole(ctx, ["brand", "admin"]);
    if (user.role === "admin") return null;
    return await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
  },
});

export const create = mutation({
  args: {
    companyName: v.string(),
    industry: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["brand"]);
    const existing = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (existing) throw new Error("Brand profile already exists");

    const now = Date.now();
    return await ctx.db.insert("brands", {
      userId: user._id,
      companyName: args.companyName,
      industry: args.industry,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    companyName: v.optional(v.string()),
    industry: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["brand"]);
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) throw new Error("Brand not found");

    await ctx.db.patch(brand._id, {
      ...(args.companyName !== undefined
        ? { companyName: args.companyName }
        : {}),
      ...(args.industry !== undefined ? { industry: args.industry } : {}),
      updatedAt: Date.now(),
    });
  },
});
