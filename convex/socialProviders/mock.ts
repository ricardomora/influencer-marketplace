/**
 * Mock social provider (Fase 1). Real Instagram/TikTok providers in Fase 3.
 */
export type SocialProviderId = "mock" | "instagram" | "tiktok";

export interface SocialMetricsResult {
  followers: number;
  avgViews: number;
  engagementRate: number;
}

export interface SocialProvider {
  id: SocialProviderId;
  fetchMetrics(_accessToken: string): Promise<SocialMetricsResult>;
}

export const mockSocialProvider: SocialProvider = {
  id: "mock",
  async fetchMetrics() {
    const followers = Math.floor(5_000 + Math.random() * 495_000);
    return {
      followers,
      avgViews: Math.round(followers * 0.12),
      engagementRate: Number((1 + Math.random() * 7).toFixed(2)),
    };
  },
};

/** Stubs for Fase 3 */
export const instagramProvider: SocialProvider = {
  id: "instagram",
  async fetchMetrics() {
    throw new Error("Instagram Graph API not configured (Fase 3)");
  },
};

export const tiktokProvider: SocialProvider = {
  id: "tiktok",
  async fetchMetrics() {
    throw new Error("TikTok API not configured (Fase 3)");
  },
};
