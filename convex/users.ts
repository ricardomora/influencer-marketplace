import { v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { getAuthenticatedUser } from "./lib";

export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    role: v.optional(
      v.union(
        v.literal("influencer"),
        v.literal("brand"),
        v.literal("admin"),
      ),
    ),
    locale: v.optional(v.union(v.literal("es"), v.literal("en"))),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name ?? existing.name,
        avatarUrl: args.avatarUrl ?? existing.avatarUrl,
        locale: args.locale ?? existing.locale,
        ...(args.role ? { role: args.role } : {}),
      });
      return existing._id;
    }

    const role = args.role ?? "influencer";
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      role,
      locale: args.locale ?? "es",
      onboardingCompleted: false,
      createdAt: Date.now(),
    });

    await ctx.db.insert("subscriptions", {
      userId,
      plan: "FREE",
      status: "active",
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getAuthenticatedUser(ctx);
  },
});

async function getOrCreateUserFromIdentity(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated with Convex");
  }

  const existing = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (existing) return existing;

  const userId = await ctx.db.insert("users", {
    clerkId: identity.subject,
    email: identity.email ?? "",
    name: identity.name ?? undefined,
    avatarUrl: identity.pictureUrl ?? undefined,
    role: "influencer",
    locale: "es",
    onboardingCompleted: false,
    createdAt: Date.now(),
  });

  await ctx.db.insert("subscriptions", {
    userId,
    plan: "FREE",
    status: "active",
    createdAt: Date.now(),
  });

  return (await ctx.db.get(userId))!;
}

/** Creates Convex user from Clerk JWT if webhook has not run yet (common in local dev). */
export const bootstrapCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    return await getOrCreateUserFromIdentity(ctx);
  },
});

export const setRole = mutation({
  args: {
    role: v.union(
      v.literal("influencer"),
      v.literal("brand"),
      v.literal("admin"),
    ),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUserFromIdentity(ctx);
    await ctx.db.patch(user._id, {
      role: args.role,
      onboardingCompleted: false,
    });
  },
});

export const completeOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getOrCreateUserFromIdentity(ctx);
    await ctx.db.patch(user._id, { onboardingCompleted: true });
  },
});

/** Single step: ensure user exists, set role, mark onboarding done. */
export const finishOnboarding = mutation({
  args: {
    role: v.union(
      v.literal("influencer"),
      v.literal("brand"),
      v.literal("admin"),
    ),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUserFromIdentity(ctx);
    await ctx.db.patch(user._id, {
      role: args.role,
      onboardingCompleted: true,
    });
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});
