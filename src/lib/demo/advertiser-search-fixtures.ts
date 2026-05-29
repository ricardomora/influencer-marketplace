export type DemoNetwork = "instagram" | "tiktok" | "youtube";

export type DemoInfluencerRow = {
  id: string;
  displayName: string;
  handle: string;
  country: "Colombia" | "Venezuela";
  city: string;
  category: "MICRO" | "MACRO" | "CREATOR" | "UGC";
  followers: number;
  engagementRate: number;
  totalEngagement: number;
  networks: DemoNetwork[];
};

export const DEMO_INFLUENCERS: DemoInfluencerRow[] = [
  {
    id: "1",
    displayName: "Valentina López",
    handle: "@valentinalopez",
    country: "Colombia",
    city: "Bogotá",
    category: "MACRO",
    followers: 2_400_000,
    engagementRate: 4.8,
    totalEngagement: 115_200,
    networks: ["instagram", "tiktok"],
  },
  {
    id: "2",
    displayName: "Carlos Méndez",
    handle: "@carlosmendez",
    country: "Venezuela",
    city: "Caracas",
    category: "MACRO",
    followers: 1_800_000,
    engagementRate: 5.2,
    totalEngagement: 93_600,
    networks: ["instagram", "youtube"],
  },
  {
    id: "3",
    displayName: "María García",
    handle: "@mariagarcia",
    country: "Colombia",
    city: "Medellín",
    category: "CREATOR",
    followers: 310_000,
    engagementRate: 6.1,
    totalEngagement: 18_910,
    networks: ["tiktok"],
  },
  {
    id: "4",
    displayName: "Andrés Torres",
    handle: "@andrestorres",
    country: "Venezuela",
    city: "Valencia",
    category: "MICRO",
    followers: 98_000,
    engagementRate: 6.1,
    totalEngagement: 5_978,
    networks: ["instagram"],
  },
  {
    id: "5",
    displayName: "Sofía Ramírez",
    handle: "@sofiaramirez",
    country: "Colombia",
    city: "Cali",
    category: "CREATOR",
    followers: 1_500_000,
    engagementRate: 4.5,
    totalEngagement: 67_500,
    networks: ["instagram", "tiktok", "youtube"],
  },
  {
    id: "6",
    displayName: "Diego Herrera",
    handle: "@diegoherrera",
    country: "Venezuela",
    city: "Maracaibo",
    category: "UGC",
    followers: 2_100_000,
    engagementRate: 3.7,
    totalEngagement: 77_700,
    networks: ["youtube", "tiktok"],
  },
  {
    id: "7",
    displayName: "Camila Ruiz",
    handle: "@camilaruiz",
    country: "Colombia",
    city: "Barranquilla",
    category: "MICRO",
    followers: 1_200_000,
    engagementRate: 5.8,
    totalEngagement: 69_600,
    networks: ["instagram"],
  },
  {
    id: "8",
    displayName: "Lucía Paredes",
    handle: "@luciaparedes",
    country: "Venezuela",
    city: "Barquisimeto",
    category: "CREATOR",
    followers: 420_000,
    engagementRate: 5.4,
    totalEngagement: 22_680,
    networks: ["tiktok"],
  },
];
