import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireRole, tryRequireRole } from "./lib";

export const send = mutation({
  args: {
    campaignId: v.id("campaigns"),
    influencerId: v.id("influencerProfiles"),
    rate: v.number(),
    message: v.optional(v.string()),
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

    const existing = await ctx.db
      .query("proposals")
      .withIndex("by_campaign_influencer", (q) =>
        q
          .eq("campaignId", args.campaignId)
          .eq("influencerId", args.influencerId),
      )
      .unique();
    if (existing) throw new Error("Proposal already sent");

    const now = Date.now();
    return await ctx.db.insert("proposals", {
      campaignId: args.campaignId,
      influencerId: args.influencerId,
      status: "PENDING",
      rate: args.rate,
      message: args.message,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const accept = mutation({
  args: { proposalId: v.id("proposals") },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["influencer"]);
    const profile = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile) throw new Error("Profile not found");

    const proposal = await ctx.db.get(args.proposalId);
    if (!proposal || proposal.influencerId !== profile._id) {
      throw new Error("Proposal not found");
    }
    if (proposal.status !== "PENDING") {
      throw new Error("Proposal is not pending");
    }

    await ctx.db.patch(proposal._id, {
      status: "ACCEPTED",
      updatedAt: Date.now(),
    });
  },
});

export const reject = mutation({
  args: { proposalId: v.id("proposals") },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx, ["influencer"]);
    const profile = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile) throw new Error("Profile not found");

    const proposal = await ctx.db.get(args.proposalId);
    if (!proposal || proposal.influencerId !== profile._id) {
      throw new Error("Proposal not found");
    }
    if (proposal.status !== "PENDING") {
      throw new Error("Proposal is not pending");
    }

    await ctx.db.patch(proposal._id, {
      status: "REJECTED",
      updatedAt: Date.now(),
    });
  },
});

export const listIncoming = query({
  args: {},
  handler: async (ctx) => {
    const user = await tryRequireRole(ctx, ["influencer"]);
    if (!user) return [];
    const profile = await ctx.db
      .query("influencerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!profile) return [];

    const proposals = await ctx.db
      .query("proposals")
      .withIndex("by_influencerId", (q) => q.eq("influencerId", profile._id))
      .collect();

    const enriched = [];
    for (const proposal of proposals) {
      const campaign = await ctx.db.get(proposal.campaignId);
      if (!campaign) continue;
      const brand = await ctx.db.get(campaign.brandId);
      enriched.push({ proposal, campaign, brand });
    }

    return enriched.sort((a, b) => b.proposal.createdAt - a.proposal.createdAt);
  },
});

export const listSent = query({
  args: {},
  handler: async (ctx) => {
    const user = await tryRequireRole(ctx, ["brand"]);
    if (!user) return [];
    const brand = await ctx.db
      .query("brands")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!brand) return [];

    const campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_brandId", (q) => q.eq("brandId", brand._id))
      .collect();

    const results = [];
    for (const campaign of campaigns) {
      const proposals = await ctx.db
        .query("proposals")
        .withIndex("by_campaignId", (q) => q.eq("campaignId", campaign._id))
        .collect();

      for (const proposal of proposals) {
        const influencer = await ctx.db.get(proposal.influencerId);
        results.push({ proposal, campaign, influencer });
      }
    }

    return results.sort((a, b) => b.proposal.createdAt - a.proposal.createdAt);
  },
});
