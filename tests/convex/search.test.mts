import { convexTest } from "convex-test";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import schema from "../../convex/schema.ts";
import { api } from "../../convex/_generated/api.js";
import { testModules } from "./testModules.ts";

describe("searchInfluencers", () => {
  it("filters by country and min followers", async () => {
    const t = convexTest(schema, testModules);

    const userId = await t.run(async (ctx) => {
      return await ctx.db.insert("users", {
        clerkId: "brand_test",
        email: "brand@test.com",
        role: "brand",
        locale: "es",
        onboardingCompleted: true,
        createdAt: Date.now(),
      });
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("brands", {
        userId,
        companyName: "Test Brand",
        industry: "Beauty",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });

    const profileId = await t.run(async (ctx) => {
      return await ctx.db.insert("influencerProfiles", {
        userId: await ctx.db.insert("users", {
          clerkId: "inf_test",
          email: "inf@test.com",
          role: "influencer",
          locale: "es",
          onboardingCompleted: true,
          createdAt: Date.now(),
        }),
        displayName: "Test Influencer",
        bio: "Test",
        category: "MICRO",
        country: "Colombia",
        city: "Bogotá",
        maxFollowers: 25_000,
        maxEngagementRate: 4.5,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });

    await t.run(async (ctx) => {
      const accountId = await ctx.db.insert("socialAccounts", {
        influencerId: profileId,
        platform: "INSTAGRAM",
        username: "test",
        followers: 25_000,
        avgViews: 5000,
        engagementRate: 4.5,
        lastSyncedAt: Date.now(),
        isMock: true,
      });
      await ctx.db.insert("audienceDemographics", {
        socialAccountId: accountId,
        country: "Colombia",
        ageRange: "18-24",
        genderMalePct: 35,
        genderFemalePct: 65,
        language: "es",
      });
      await ctx.db.patch(profileId, { primarySocialAccountId: accountId });
    });

    const asBrand = t.withIdentity({ subject: "brand_test" });
    const results = await asBrand.query(api.search.searchInfluencers, {
      country: "Colombia",
      minFollowers: 10_000,
    });

    assert.equal(results.length, 1);
    assert.equal(results[0]?.profile.displayName, "Test Influencer");
  });
});
