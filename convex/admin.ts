import { query } from "./_generated/server";
import { requireRole } from "./lib";

export const overview = query({
  args: {},
  handler: async (ctx) => {
    await requireRole(ctx, ["admin"]);

    const users = await ctx.db.query("users").collect();
    const influencers = await ctx.db.query("influencerProfiles").collect();
    const brands = await ctx.db.query("brands").collect();
    const campaigns = await ctx.db.query("campaigns").collect();
    const proposals = await ctx.db.query("proposals").collect();

    return {
      userCount: users.length,
      influencerCount: influencers.length,
      brandCount: brands.length,
      campaignCount: campaigns.length,
      proposalCount: proposals.length,
      users: users.map((u) => ({
        _id: u._id,
        email: u.email,
        role: u.role,
        name: u.name,
        createdAt: u.createdAt,
      })),
      influencers,
      brands,
      campaigns,
    };
  },
});
