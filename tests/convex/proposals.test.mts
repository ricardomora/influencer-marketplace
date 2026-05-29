import { convexTest } from "convex-test";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import schema from "../../convex/schema.ts";
import { api } from "../../convex/_generated/api.js";
import { testModules } from "./testModules.ts";

describe("proposals", () => {
  it("influencer can accept a pending proposal", async () => {
    const t = convexTest(schema, testModules);

    const { campaignId, proposalId } = await t.run(async (ctx) => {
      const brandUserId = await ctx.db.insert("users", {
        clerkId: "brand_p",
        email: "brandp@test.com",
        role: "brand",
        locale: "es",
        onboardingCompleted: true,
        createdAt: Date.now(),
      });
      const brandId = await ctx.db.insert("brands", {
        userId: brandUserId,
        companyName: "Brand P",
        industry: "Tech",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const infUserId = await ctx.db.insert("users", {
        clerkId: "inf_p",
        email: "infp@test.com",
        role: "influencer",
        locale: "es",
        onboardingCompleted: true,
        createdAt: Date.now(),
      });
      const influencerId = await ctx.db.insert("influencerProfiles", {
        userId: infUserId,
        displayName: "Inf P",
        bio: "Bio",
        category: "CREATOR",
        country: "Colombia",
        city: "Bogotá",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const campaignId = await ctx.db.insert("campaigns", {
        brandId,
        title: "Campaign",
        briefText: "Brief",
        budget: 1000,
        requirementsJson: "{}",
        status: "active",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const proposalId = await ctx.db.insert("proposals", {
        campaignId,
        influencerId,
        status: "PENDING",
        rate: 200,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return { campaignId, proposalId };
    });

    void campaignId;

    const asInfluencer = t.withIdentity({ subject: "inf_p" });
    await asInfluencer.mutation(api.proposals.accept, { proposalId });

    const proposal = await t.run(async (ctx) => ctx.db.get(proposalId));
    assert.equal(proposal?.status, "ACCEPTED");
  });
});
