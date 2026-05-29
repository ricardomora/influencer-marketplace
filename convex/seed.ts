import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";

const DEMO_INFLUENCERS = [
  {
    email: "demo.influencer1@marketplace.test",
    displayName: "Camila Ríos",
    bio: "Beauty y lifestyle en Bogotá.",
    category: "MICRO" as const,
    country: "Colombia",
    city: "Bogotá",
    platform: "INSTAGRAM" as const,
    username: "camila.rios.beauty",
  },
  {
    email: "demo.influencer2@marketplace.test",
    displayName: "Andrés Vega",
    bio: "Tech reviews y gadgets.",
    category: "CREATOR" as const,
    country: "Colombia",
    city: "Medellín",
    platform: "TIKTOK" as const,
    username: "andresvega.tech",
  },
  {
    email: "demo.influencer3@marketplace.test",
    displayName: "Valentina Mora",
    bio: "Moda sostenible y UGC.",
    category: "UGC" as const,
    country: "Colombia",
    city: "Cali",
    platform: "INSTAGRAM" as const,
    username: "valentinamora.eco",
  },
  {
    email: "demo.influencer4@marketplace.test",
    displayName: "Diego Paredes",
    bio: "Fitness y nutrición.",
    category: "MACRO" as const,
    country: "Colombia",
    city: "Barranquilla",
    platform: "YOUTUBE" as const,
    username: "diegoparedes.fit",
  },
  {
    email: "demo.influencer5@marketplace.test",
    displayName: "Isabella Cruz",
    bio: "Makeup tutorials LATAM.",
    category: "MICRO" as const,
    country: "Venezuela",
    city: "Caracas",
    platform: "INSTAGRAM" as const,
    username: "isabella.cruz.mua",
  },
  {
    email: "demo.influencer6@marketplace.test",
    displayName: "Mateo Linares",
    bio: "Gaming y streaming.",
    category: "CREATOR" as const,
    country: "Venezuela",
    city: "Maracaibo",
    platform: "TIKTOK" as const,
    username: "mateolinares.gg",
  },
  {
    email: "demo.influencer7@marketplace.test",
    displayName: "Sofía Delgado",
    bio: "Viajes y turismo local.",
    category: "MICRO" as const,
    country: "Venezuela",
    city: "Valencia",
    platform: "INSTAGRAM" as const,
    username: "sofiadelgado.travel",
  },
  {
    email: "demo.influencer8@marketplace.test",
    displayName: "Lucas Herrera",
    bio: "Comedia y sketches virales.",
    category: "MACRO" as const,
    country: "Colombia",
    city: "Bogotá",
    platform: "TIKTOK" as const,
    username: "lucasherrera.fun",
  },
  {
    email: "demo.influencer9@marketplace.test",
    displayName: "Natalia Oropeza",
    bio: "Maternidad y familia.",
    category: "CREATOR" as const,
    country: "Venezuela",
    city: "Barquisimeto",
    platform: "FACEBOOK" as const,
    username: "nataliaoropeza.family",
  },
  {
    email: "demo.influencer10@marketplace.test",
    displayName: "AI Avatar Luna",
    bio: "Avatar virtual para campañas digitales.",
    category: "AI_AVATAR" as const,
    country: "Colombia",
    city: "Medellín",
    platform: "INSTAGRAM" as const,
    username: "luna.ai.avatar",
  },
] as const;

export const seedDemoData = mutation({
  args: { secret: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const expected = process.env.SEED_SECRET;
    if (expected && args.secret !== expected) {
      throw new Error("Invalid seed secret");
    }

    const now = Date.now();
    const influencerIds: Array<import("./_generated/dataModel").Id<"influencerProfiles">> =
      [];

    for (const demo of DEMO_INFLUENCERS) {
      let user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", demo.email))
        .unique();

      if (!user) {
        const userId = await ctx.db.insert("users", {
          clerkId: `seed_${demo.email}`,
          email: demo.email,
          name: demo.displayName,
          role: "influencer",
          locale: "es",
          onboardingCompleted: true,
          createdAt: now,
        });
        user = (await ctx.db.get(userId))!;
        await ctx.db.insert("subscriptions", {
          userId,
          plan: "FREE",
          status: "active",
          createdAt: now,
        });
      }

      let profile = await ctx.db
        .query("influencerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .unique();

      if (!profile) {
        const profileId = await ctx.db.insert("influencerProfiles", {
          userId: user._id,
          displayName: demo.displayName,
          bio: demo.bio,
          category: demo.category,
          country: demo.country,
          city: demo.city,
          createdAt: now,
          updatedAt: now,
        });
        profile = (await ctx.db.get(profileId))!;
      }

      influencerIds.push(profile._id);

      let account = await ctx.db
        .query("socialAccounts")
        .withIndex("by_influencer_platform", (q) =>
          q.eq("influencerId", profile._id).eq("platform", demo.platform),
        )
        .unique();

      if (!account) {
        const accountId = await ctx.db.insert("socialAccounts", {
          influencerId: profile._id,
          platform: demo.platform,
          username: demo.username,
          followers: 0,
          avgViews: 0,
          engagementRate: 0,
          lastSyncedAt: 0,
          isMock: true,
        });
        await ctx.scheduler.runAfter(
          0,
          internal.socialAccounts.applyMockMetrics,
          { socialAccountId: accountId },
        );
      } else {
        await ctx.scheduler.runAfter(
          0,
          internal.socialAccounts.applyMockMetrics,
          { socialAccountId: account._id },
        );
      }
    }

    const brandEmails = [
      "demo.brand1@marketplace.test",
      "demo.brand2@marketplace.test",
    ];
    const brandIds: Array<import("./_generated/dataModel").Id<"brands">> = [];

    for (const [i, email] of brandEmails.entries()) {
      let user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .unique();

      if (!user) {
        const userId = await ctx.db.insert("users", {
          clerkId: `seed_${email}`,
          email,
          name: i === 0 ? "LipLab Cosmetics" : "Andes Outdoor",
          role: "brand",
          locale: "es",
          onboardingCompleted: true,
          createdAt: now,
        });
        user = (await ctx.db.get(userId))!;
        await ctx.db.insert("subscriptions", {
          userId,
          plan: "FREE",
          status: "active",
          createdAt: now,
        });
      }

      let brand = await ctx.db
        .query("brands")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .unique();

      if (!brand) {
        const brandId = await ctx.db.insert("brands", {
          userId: user._id,
          companyName: i === 0 ? "LipLab Cosmetics" : "Andes Outdoor",
          industry: i === 0 ? "Beauty" : "Retail",
          createdAt: now,
          updatedAt: now,
        });
        brand = (await ctx.db.get(brandId))!;
      }
      brandIds.push(brand._id);
    }

    const brand1Campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_brandId", (q) => q.eq("brandId", brandIds[0]!))
      .collect();

    let campaignId = brand1Campaigns[0]?._id;
    if (!campaignId) {
      campaignId = await ctx.db.insert("campaigns", {
        brandId: brandIds[0]!,
        title: "Lanzamiento labial Bogotá",
        briefText:
          "Buscamos creadoras beauty 18-30 en Bogotá con 10k-50k seguidores.",
        budget: 2500,
        requirementsJson: JSON.stringify({
          platforms: ["INSTAGRAM", "TIKTOK"],
          deliverables: ["1 reel", "2 stories"],
        }),
        status: "active",
        createdAt: now,
        updatedAt: now,
      });
    }

    if (influencerIds[0]) {
      const existing = await ctx.db
        .query("proposals")
        .withIndex("by_campaign_influencer", (q) =>
          q.eq("campaignId", campaignId).eq("influencerId", influencerIds[0]!),
        )
        .unique();
      if (!existing) {
        await ctx.db.insert("proposals", {
          campaignId,
          influencerId: influencerIds[0]!,
          status: "PENDING",
          rate: 450,
          message: "¿Te interesa colaborar con LipLab?",
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    const brand2HasCampaign = await ctx.db
      .query("campaigns")
      .withIndex("by_brandId", (q) => q.eq("brandId", brandIds[1]!))
      .first();
    if (!brand2HasCampaign) {
      await ctx.db.insert("campaigns", {
        brandId: brandIds[1]!,
        title: "Campaña outdoor Venezuela",
        briefText: "Creadores aventura en Caracas y Valencia.",
        budget: 1800,
        requirementsJson: JSON.stringify({ platforms: ["INSTAGRAM"] }),
        status: "active",
        createdAt: now,
        updatedAt: now,
      });
    }

    return {
      influencersSeeded: influencerIds.length,
      brandsSeeded: brandIds.length,
      message: "Demo data seeded. Metrics sync scheduled.",
    };
  },
});

export const clearDemoData = internalMutation({
  args: {},
  handler: async (ctx) => {
    const demoUsers = await ctx.db.query("users").collect();
    for (const user of demoUsers.filter((u) => u.clerkId.startsWith("seed_"))) {
      const subs = await ctx.db
        .query("subscriptions")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .unique();
      if (subs) await ctx.db.delete(subs._id);

      if (user.role === "influencer") {
        const profile = await ctx.db
          .query("influencerProfiles")
          .withIndex("by_userId", (q) => q.eq("userId", user._id))
          .unique();
        if (profile) {
          const accounts = await ctx.db
            .query("socialAccounts")
            .withIndex("by_influencerId", (q) =>
              q.eq("influencerId", profile._id),
            )
            .collect();
          for (const account of accounts) {
            const demo = await ctx.db
              .query("audienceDemographics")
              .withIndex("by_socialAccountId", (q) =>
                q.eq("socialAccountId", account._id),
              )
              .collect();
            for (const d of demo) await ctx.db.delete(d._id);
            await ctx.db.delete(account._id);
          }
          const proposals = await ctx.db
            .query("proposals")
            .withIndex("by_influencerId", (q) =>
              q.eq("influencerId", profile._id),
            )
            .collect();
          for (const p of proposals) await ctx.db.delete(p._id);
          await ctx.db.delete(profile._id);
        }
      }

      if (user.role === "brand") {
        const brand = await ctx.db
          .query("brands")
          .withIndex("by_userId", (q) => q.eq("userId", user._id))
          .unique();
        if (brand) {
          const campaigns = await ctx.db
            .query("campaigns")
            .withIndex("by_brandId", (q) => q.eq("brandId", brand._id))
            .collect();
          for (const campaign of campaigns) {
            const proposals = await ctx.db
              .query("proposals")
              .withIndex("by_campaignId", (q) =>
                q.eq("campaignId", campaign._id),
              )
              .collect();
            for (const p of proposals) await ctx.db.delete(p._id);
            await ctx.db.delete(campaign._id);
          }
          await ctx.db.delete(brand._id);
        }
      }

      await ctx.db.delete(user._id);
    }
  },
});
