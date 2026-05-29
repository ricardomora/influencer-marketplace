import type { QueryCtx } from "./_generated/server";

export const LATAM_COUNTRIES = ["Colombia", "Venezuela"] as const;

export const LATAM_CITIES: Record<(typeof LATAM_COUNTRIES)[number], string[]> = {
  Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
  Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"],
};

export function isValidCountry(country: string): boolean {
  return (LATAM_COUNTRIES as readonly string[]).includes(country);
}

export function isValidCity(country: string, city: string): boolean {
  if (!isValidCountry(country)) return false;
  const cities = LATAM_CITIES[country as (typeof LATAM_COUNTRIES)[number]];
  return cities.includes(city);
}

export async function getAuthenticatedUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();
}

export async function requireUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated with Convex");
  }
  const user = await getAuthenticatedUser(ctx);
  if (!user) {
    throw new Error("User profile missing — refresh the page or sign in again");
  }
  return user;
}

export async function requireRole(
  ctx: QueryCtx,
  roles: Array<"influencer" | "brand" | "admin">,
) {
  const user = await requireUser(ctx);
  if (!roles.includes(user.role)) throw new Error("Forbidden");
  return user;
}

/** Like requireRole but returns null when signed out (avoids errors during sign-out). */
export async function tryRequireRole(
  ctx: QueryCtx,
  roles: Array<"influencer" | "brand" | "admin">,
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  const user = await getAuthenticatedUser(ctx);
  if (!user || !roles.includes(user.role)) return null;
  return user;
}
