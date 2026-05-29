export type DemoCampaignRow = {
  id: string;
  title: string;
  network: string;
  status: "active" | "draft" | "completed";
  budget: number;
  proposals: number;
  reach: string;
};

export type DemoProposalRow = {
  id: string;
  campaign: string;
  influencer: string;
  rate: number;
  status: "sent" | "accepted" | "rejected";
};

export const DEMO_CAMPAIGNS: DemoCampaignRow[] = [
  {
    id: "c1",
    title: "Lanzamiento skincare Q2",
    network: "Instagram",
    status: "active",
    budget: 12_000,
    proposals: 4,
    reach: "1.2M",
  },
  {
    id: "c2",
    title: "TikTok UGC verano",
    network: "TikTok",
    status: "active",
    budget: 8_500,
    proposals: 2,
    reach: "890K",
  },
  {
    id: "c3",
    title: "Awareness marca beverage",
    network: "YouTube",
    status: "draft",
    budget: 15_000,
    proposals: 0,
    reach: "—",
  },
];

export const DEMO_PROPOSALS: DemoProposalRow[] = [
  {
    id: "p1",
    campaign: "Lanzamiento skincare Q2",
    influencer: "Valentina López",
    rate: 2_400,
    status: "sent",
  },
  {
    id: "p2",
    campaign: "Lanzamiento skincare Q2",
    influencer: "María García",
    rate: 850,
    status: "accepted",
  },
  {
    id: "p3",
    campaign: "TikTok UGC verano",
    influencer: "Lucía Paredes",
    rate: 600,
    status: "sent",
  },
  {
    id: "p4",
    campaign: "TikTok UGC verano",
    influencer: "Diego Herrera",
    rate: 3_100,
    status: "rejected",
  },
];
